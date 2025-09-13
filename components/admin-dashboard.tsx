"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Users, Settings, AlertTriangle, Bell, Activity, Database, Smartphone } from "lucide-react"
import { AIPredictionsDashboard } from "@/components/ai-predictions-dashboard"
import { SMSAlertSystem } from "@/components/sms-alert-system"

interface Miner {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "offline" | "emergency"
  location: string
  lastSeen: string
}

interface Alert {
  id: string
  type: "rockfall" | "evacuation" | "maintenance"
  location: string
  severity: "low" | "medium" | "high" | "critical"
  message: string
  timestamp: string
  acknowledged: boolean
}

const mockMiners: Miner[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@mine.com",
    phone: "+1234567890",
    status: "active",
    location: "Tunnel A - Section 2",
    lastSeen: "2 minutes ago",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@mine.com",
    phone: "+1234567891",
    status: "active",
    location: "Main Shaft - Level 1",
    lastSeen: "5 minutes ago",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike.wilson@mine.com",
    phone: "+1234567892",
    status: "offline",
    location: "Surface",
    lastSeen: "1 hour ago",
  },
]

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "rockfall",
    location: "Tunnel A - Section 3",
    severity: "high",
    message: "High probability rockfall detected. Immediate evacuation recommended.",
    timestamp: "2024-01-15T10:30:00Z",
    acknowledged: false,
  },
  {
    id: "2",
    type: "maintenance",
    location: "Sensor Array B",
    severity: "medium",
    message: "Sensor calibration required for optimal performance.",
    timestamp: "2024-01-15T09:15:00Z",
    acknowledged: true,
  },
]

export function AdminDashboard() {
  const [miners, setMiners] = useState<Miner[]>(mockMiners)
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [smsEnabled, setSmsEnabled] = useState(true)
  const [autoEvacuation, setAutoEvacuation] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "offline":
        return "bg-gray-600"
      case "emergency":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const sendBroadcastAlert = async () => {
    if (!alertMessage.trim()) return

    setIsSendingBroadcast(true)

    try {
      const response = await fetch("/api/send-broadcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: alertMessage,
          alertType: "emergency",
          priority: "critical",
          targetRoles: ["miner", "admin"],
        }),
      })

      const result = await response.json()

      if (result.success) {
        console.log("Broadcast sent successfully:", result)
        setAlertMessage("")

        // Add to alerts list
        const newAlert: Alert = {
          id: Date.now().toString(),
          type: "evacuation",
          location: "All Areas",
          severity: "high",
          message: alertMessage,
          timestamp: new Date().toISOString(),
          acknowledged: false,
        }

        setAlerts((prev) => [newAlert, ...prev])
      }
    } catch (error) {
      console.error("Failed to send broadcast:", error)
    } finally {
      setIsSendingBroadcast(false)
    }
  }

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }

  const activeMiners = miners.filter((m) => m.status === "active").length
  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-orange-500" />
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Control Panel</h1>
              <p className="text-slate-400">Welcome back, Administrator</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Active Miners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{activeMiners}</div>
              <p className="text-xs text-slate-500">Currently on duty</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-400">{unacknowledgedAlerts}</div>
              <p className="text-xs text-slate-500">Require attention</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">Online</div>
              <p className="text-xs text-slate-500">All systems operational</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Database className="h-4 w-4" />
                Data Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">1,247</div>
              <p className="text-xs text-slate-500">Collected today</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="predictions" className="data-[state=active]:bg-orange-600">
              AI Predictions
            </TabsTrigger>
            <TabsTrigger value="miners" className="data-[state=active]:bg-orange-600">
              Miners
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-orange-600">
              Alerts
            </TabsTrigger>
            <TabsTrigger value="sms" className="data-[state=active]:bg-orange-600">
              SMS System
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-orange-600">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Emergency Broadcast */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-orange-500" />
                  Emergency Broadcast
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Send immediate alerts to all miners via SMS and app notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="alert-message" className="text-slate-200">
                    Alert Message
                  </Label>
                  <Textarea
                    id="alert-message"
                    value={alertMessage}
                    onChange={(e) => setAlertMessage(e.target.value)}
                    placeholder="Enter emergency alert message..."
                    className="bg-slate-700/50 border-slate-600 text-white"
                    rows={3}
                  />
                </div>
                <Button
                  onClick={sendBroadcastAlert}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  disabled={!alertMessage.trim() || isSendingBroadcast}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  {isSendingBroadcast ? "Sending..." : "Send Emergency Alert"}
                </Button>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Alerts</CardTitle>
                <CardDescription className="text-slate-400">Latest system alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.slice(0, 5).map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-3 border border-slate-700 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="text-white font-medium">{alert.location}</p>
                          <p className="text-sm text-slate-400">{alert.message}</p>
                          <p className="text-xs text-slate-500">{new Date(alert.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getSeverityColor(alert.severity)} text-white`}>{alert.severity}</Badge>
                        {!alert.acknowledged && (
                          <Button
                            size="sm"
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="bg-orange-600 hover:bg-orange-700"
                          >
                            Acknowledge
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions">
            <AIPredictionsDashboard />
          </TabsContent>

          <TabsContent value="miners" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-500" />
                  Miner Management
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Monitor and manage all miners in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {miners.map((miner) => (
                    <div
                      key={miner.id}
                      className="flex items-center justify-between p-4 border border-slate-700 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(miner.status)}`} />
                        <div>
                          <h4 className="font-semibold text-white">{miner.name}</h4>
                          <p className="text-sm text-slate-400">{miner.email}</p>
                          <p className="text-sm text-slate-400">{miner.phone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(miner.status)} text-white mb-1`}>{miner.status}</Badge>
                        <p className="text-sm text-slate-400">{miner.location}</p>
                        <p className="text-xs text-slate-500">Last seen: {miner.lastSeen}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Alert History</CardTitle>
                <CardDescription className="text-slate-400">
                  Complete history of all system alerts and responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-4 border border-slate-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={`${getSeverityColor(alert.severity)} text-white`}>{alert.severity}</Badge>
                          <span className="text-white font-medium">{alert.location}</span>
                        </div>
                        <span className="text-sm text-slate-400">{new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-300 mb-2">{alert.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Type: {alert.type}</span>
                        {alert.acknowledged ? (
                          <Badge className="bg-green-600 text-white">Acknowledged</Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="bg-orange-600 hover:bg-orange-700"
                          >
                            Acknowledge
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sms" className="space-y-6">
            <SMSAlertSystem />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-orange-500" />
                  System Settings
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Configure system behavior and alert preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-200">SMS Alerts</Label>
                    <p className="text-sm text-slate-400">Send SMS notifications for high-priority alerts</p>
                  </div>
                  <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-200">Auto Evacuation</Label>
                    <p className="text-sm text-slate-400">Automatically trigger evacuation for critical alerts</p>
                  </div>
                  <Switch checked={autoEvacuation} onCheckedChange={setAutoEvacuation} />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-200">Alert Threshold</Label>
                  <Input
                    type="number"
                    defaultValue="75"
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="Risk percentage threshold"
                  />
                  <p className="text-sm text-slate-400">Minimum risk percentage to trigger alerts</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-200">SMS Gateway URL</Label>
                  <Input
                    type="url"
                    defaultValue="https://api.sms-gateway.com/send"
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="SMS service endpoint"
                  />
                </div>

                <Button className="bg-orange-600 hover:bg-orange-700 text-white">Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
