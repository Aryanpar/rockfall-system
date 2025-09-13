"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, MapPin, Clock, Smartphone, CheckCircle, XCircle, Bell, Activity } from "lucide-react"

interface SafetyAlert {
  id: string
  type: "warning" | "danger" | "evacuation" | "info"
  title: string
  message: string
  location: string
  timestamp: string
  acknowledged: boolean
  priority: "low" | "medium" | "high" | "critical"
}

interface LocationStatus {
  area: string
  riskLevel: "safe" | "caution" | "danger" | "critical"
  lastUpdate: string
  aiPrediction: number
}

const mockAlerts: SafetyAlert[] = [
  {
    id: "1",
    type: "danger",
    title: "High Rockfall Risk Detected",
    message:
      "AI systems have detected a 78% probability of rockfall in Tunnel A - Section 3. Avoid this area immediately.",
    location: "Tunnel A - Section 3",
    timestamp: "2024-01-15T10:30:00Z",
    acknowledged: false,
    priority: "critical",
  },
  {
    id: "2",
    type: "warning",
    title: "Increased Vibration Levels",
    message: "Seismic sensors are detecting elevated vibration levels. Exercise caution in this area.",
    location: "Main Shaft - Level 2",
    timestamp: "2024-01-15T09:45:00Z",
    acknowledged: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "info",
    title: "Safety Equipment Check",
    message: "Reminder: Daily safety equipment inspection is due. Please report to safety station.",
    location: "All Areas",
    timestamp: "2024-01-15T08:00:00Z",
    acknowledged: true,
    priority: "low",
  },
]

const mockLocationStatus: LocationStatus[] = [
  { area: "Tunnel A - Section 1", riskLevel: "safe", lastUpdate: "2 min ago", aiPrediction: 15 },
  { area: "Tunnel A - Section 2", riskLevel: "caution", lastUpdate: "1 min ago", aiPrediction: 35 },
  { area: "Tunnel A - Section 3", riskLevel: "critical", lastUpdate: "30 sec ago", aiPrediction: 78 },
  { area: "Tunnel B - Section 1", riskLevel: "safe", lastUpdate: "3 min ago", aiPrediction: 22 },
  { area: "Main Shaft - Level 1", riskLevel: "safe", lastUpdate: "1 min ago", aiPrediction: 18 },
  { area: "Main Shaft - Level 2", riskLevel: "caution", lastUpdate: "2 min ago", aiPrediction: 42 },
]

export function MinerDashboard() {
  const [alerts, setAlerts] = useState<SafetyAlert[]>(mockAlerts)
  const [locationStatus, setLocationStatus] = useState<LocationStatus[]>(mockLocationStatus)
  const [currentLocation, setCurrentLocation] = useState("Tunnel A - Section 2")
  const [isOnline, setIsOnline] = useState(true)

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "safe":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "caution":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      case "danger":
        return "text-orange-400 bg-orange-400/10 border-orange-400/20"
      case "critical":
        return "text-red-400 bg-red-400/10 border-red-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "danger":
      case "evacuation":
        return "border-red-500/50 bg-red-500/10"
      case "warning":
        return "border-orange-500/50 bg-orange-500/10"
      case "info":
        return "border-blue-500/50 bg-blue-500/10"
      default:
        return "border-gray-500/50 bg-gray-500/10"
    }
  }

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-600"
      case "high":
        return "bg-orange-600"
      case "medium":
        return "bg-yellow-600"
      case "low":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const unacknowledgedAlerts = alerts.filter((alert) => !alert.acknowledged)
  const criticalAlerts = alerts.filter((alert) => alert.priority === "critical" && !alert.acknowledged)
  const currentLocationStatus = locationStatus.find((loc) => loc.area === currentLocation)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLocationStatus((prev) =>
        prev.map((loc) => ({
          ...loc,
          lastUpdate: Math.random() > 0.7 ? "Just now" : loc.lastUpdate,
          aiPrediction: Math.max(0, Math.min(100, loc.aiPrediction + (Math.random() - 0.5) * 10)),
        })),
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-orange-500" />
            <div>
              <h1 className="text-2xl font-bold text-white">Miner Safety Dashboard</h1>
              <p className="text-slate-400">Welcome, Miner</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-red-400"}`} />
              <span className="text-sm text-slate-300">{isOnline ? "Online" : "Offline"}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Critical Alerts Banner */}
        {criticalAlerts.length > 0 && (
          <div className="mb-6">
            {criticalAlerts.map((alert) => (
              <Alert key={alert.id} className="border-red-500/50 bg-red-500/10 mb-4">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-400">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>{alert.title}</strong> - {alert.message}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="bg-red-600 hover:bg-red-700 text-white ml-4"
                    >
                      Acknowledge
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Current Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-white">{currentLocation}</div>
              {currentLocationStatus && (
                <Badge className={`mt-1 ${getRiskColor(currentLocationStatus.riskLevel)} border`}>
                  {currentLocationStatus.riskLevel.toUpperCase()}
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-400">{unacknowledgedAlerts.length}</div>
              <p className="text-xs text-slate-500">Require attention</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                AI Risk Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">
                {currentLocationStatus?.aiPrediction.toFixed(0) || 0}%
              </div>
              <p className="text-xs text-slate-500">Current area risk</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Shift Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">Active</div>
              <p className="text-xs text-slate-500">6h 23m remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Safety Alerts */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Safety Alerts
              </CardTitle>
              <CardDescription className="text-slate-400">Important safety notifications and warnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 border rounded-lg ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={`${getPriorityBadgeColor(alert.priority)} text-white`}>
                          {alert.priority}
                        </Badge>
                        <h4 className="font-semibold text-white">{alert.title}</h4>
                      </div>
                      {alert.acknowledged ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <p className="text-slate-300 mb-2">{alert.message}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {alert.location}
                      </span>
                      <span className="text-slate-500">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                    {!alert.acknowledged && (
                      <Button
                        size="sm"
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="mt-3 bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        Acknowledge
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Area Status */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-500" />
                Area Safety Status
              </CardTitle>
              <CardDescription className="text-slate-400">Real-time safety status of all mining areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {locationStatus.map((location, index) => (
                  <div key={index} className={`p-3 border rounded-lg ${getRiskColor(location.riskLevel)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{location.area}</h4>
                      <Badge className={`${getRiskColor(location.riskLevel)} border-0`}>
                        {location.riskLevel.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">AI Prediction: {location.aiPrediction.toFixed(0)}%</span>
                      <span className="text-slate-400">Updated {location.lastUpdate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <Card className="bg-slate-800/50 border-slate-700 mt-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-orange-500" />
              Emergency Contact
            </CardTitle>
            <CardDescription className="text-slate-400">In case of immediate danger or emergency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">Emergency Hotline: +1-800-MINE-911</p>
                <p className="text-slate-400">Available 24/7 for immediate assistance</p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Smartphone className="h-4 w-4 mr-2" />
                Call Emergency
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
