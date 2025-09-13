"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, RefreshCw, Brain, Zap, CloudRain, Activity, Mountain } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { AIChatAssistant } from "./ai-chat-assistant"

interface PredictionData {
  id: string
  location: string
  riskLevel: "low" | "medium" | "high" | "critical"
  probability: number
  timestamp: string
  factors: string[]
  recommendation: string
  timeWindow?: string
  confidence?: number
}

interface SensorData {
  time: string
  vibration: number
  moisture: number
  temperature: number
  pressure: number
  rainfall: number
  windSpeed: number
  seismicActivity: number
  rockStability: number
  slopeAngle: number
  groundwaterLevel: number
  weatherSeverity: number
}

interface EnvironmentalData {
  parameter: string
  current: number
  threshold: number
  status: "safe" | "warning" | "danger"
  unit: string
}

const mockPredictions: PredictionData[] = [
  {
    id: "1",
    location: "Tunnel A - Section 3",
    riskLevel: "high",
    probability: 78,
    timestamp: "2024-01-15T10:30:00Z",
    factors: [
      "High moisture content (85%)",
      "Recent seismic activity (7.2/10)",
      "Rock fracture patterns detected",
      "Heavy rainfall (45mm/hr)",
    ],
    recommendation: "Evacuate area immediately and conduct structural assessment",
    timeWindow: "Next 2-4 hours",
    confidence: 92,
  },
  {
    id: "2",
    location: "Tunnel B - Section 1",
    riskLevel: "medium",
    probability: 45,
    timestamp: "2024-01-15T10:25:00Z",
    factors: [
      "Moderate vibration levels (3.8 Hz)",
      "Increasing groundwater (2.1m)",
      "Weather conditions deteriorating",
    ],
    recommendation: "Increase monitoring frequency and limit personnel",
    timeWindow: "Next 6-8 hours",
    confidence: 76,
  },
  {
    id: "3",
    location: "Main Shaft - Level 2",
    riskLevel: "low",
    probability: 23,
    timestamp: "2024-01-15T10:20:00Z",
    factors: ["Stable conditions", "Normal sensor readings", "Favorable weather"],
    recommendation: "Continue normal operations with standard monitoring",
    timeWindow: "Next 24 hours",
    confidence: 88,
  },
]

const mockSensorData: SensorData[] = [
  {
    time: "00:00",
    vibration: 2.1,
    moisture: 45,
    temperature: 18,
    pressure: 1013,
    rainfall: 0,
    windSpeed: 12,
    seismicActivity: 2.1,
    rockStability: 7.8,
    slopeAngle: 35,
    groundwaterLevel: 1.2,
    weatherSeverity: 2,
  },
  {
    time: "04:00",
    vibration: 2.3,
    moisture: 48,
    temperature: 17,
    pressure: 1012,
    rainfall: 2,
    windSpeed: 15,
    seismicActivity: 2.8,
    rockStability: 7.5,
    slopeAngle: 35,
    groundwaterLevel: 1.4,
    weatherSeverity: 3,
  },
  {
    time: "08:00",
    vibration: 3.1,
    moisture: 52,
    temperature: 19,
    pressure: 1011,
    rainfall: 8,
    windSpeed: 18,
    seismicActivity: 4.2,
    rockStability: 6.9,
    slopeAngle: 35,
    groundwaterLevel: 1.8,
    weatherSeverity: 5,
  },
  {
    time: "12:00",
    vibration: 4.2,
    moisture: 58,
    temperature: 21,
    pressure: 1010,
    rainfall: 15,
    windSpeed: 22,
    seismicActivity: 5.8,
    rockStability: 6.2,
    slopeAngle: 35,
    groundwaterLevel: 2.1,
    weatherSeverity: 7,
  },
  {
    time: "16:00",
    vibration: 3.8,
    moisture: 55,
    temperature: 20,
    pressure: 1012,
    rainfall: 12,
    windSpeed: 20,
    seismicActivity: 4.9,
    rockStability: 6.5,
    slopeAngle: 35,
    groundwaterLevel: 1.9,
    weatherSeverity: 6,
  },
  {
    time: "20:00",
    vibration: 2.9,
    moisture: 50,
    temperature: 18,
    pressure: 1013,
    rainfall: 5,
    windSpeed: 16,
    seismicActivity: 3.2,
    rockStability: 7.1,
    slopeAngle: 35,
    groundwaterLevel: 1.6,
    weatherSeverity: 4,
  },
]

const environmentalData: EnvironmentalData[] = [
  { parameter: "Rainfall Rate", current: 15, threshold: 20, status: "warning", unit: "mm/hr" },
  { parameter: "Wind Speed", current: 22, threshold: 25, status: "warning", unit: "km/h" },
  { parameter: "Seismic Activity", current: 5.8, threshold: 6.0, status: "warning", unit: "/10" },
  { parameter: "Rock Stability", current: 6.2, threshold: 5.0, status: "safe", unit: "/10" },
  { parameter: "Groundwater Level", current: 2.1, threshold: 2.5, status: "warning", unit: "m" },
  { parameter: "Slope Angle", current: 35, threshold: 40, status: "safe", unit: "°" },
]

const radarData = [
  { subject: "Vibration", A: 65, fullMark: 100 },
  { subject: "Moisture", A: 78, fullMark: 100 },
  { subject: "Seismic", A: 58, fullMark: 100 },
  { subject: "Weather", A: 70, fullMark: 100 },
  { subject: "Stability", A: 38, fullMark: 100 },
  { subject: "Groundwater", A: 84, fullMark: 100 },
]

export function AIPredictionsDashboard() {
  const [predictions, setPredictions] = useState<PredictionData[]>(mockPredictions)
  const [sensorData, setSensorData] = useState<SensorData[]>(mockSensorData)
  const [environmentalStatus, setEnvironmentalStatus] = useState<EnvironmentalData[]>(environmentalData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isGeneratingPrediction, setIsGeneratingPrediction] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      setSensorData((prev) =>
        prev.map((data) => ({
          ...data,
          vibration: Math.max(0.5, data.vibration + (Math.random() - 0.5) * 0.5),
          moisture: Math.max(20, Math.min(90, data.moisture + (Math.random() - 0.5) * 5)),
          seismicActivity: Math.max(0, Math.min(10, data.seismicActivity + (Math.random() - 0.5) * 1)),
          rainfall: Math.max(0, data.rainfall + (Math.random() - 0.5) * 3),
          rockStability: Math.max(1, Math.min(10, data.rockStability + (Math.random() - 0.5) * 0.3)),
          groundwaterLevel: Math.max(0, data.groundwaterLevel + (Math.random() - 0.5) * 0.2),
          weatherSeverity: Math.max(1, Math.min(10, data.weatherSeverity + (Math.random() - 0.5) * 1)),
        })),
      )
      setLastUpdate(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const refreshPredictions = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLastUpdate(new Date())
    setIsRefreshing(false)
  }

  const generateAIPrediction = async (location: string) => {
    setIsGeneratingPrediction(true)

    try {
      const currentSensorData = sensorData[sensorData.length - 1]
      const enhancedSensorData = {
        vibration: currentSensorData.vibration,
        moisture: currentSensorData.moisture,
        temperature: currentSensorData.temperature,
        pressure: currentSensorData.pressure,
        rainfall: currentSensorData.rainfall,
        windSpeed: currentSensorData.windSpeed,
        seismicActivity: currentSensorData.seismicActivity,
        rockStability: currentSensorData.rockStability,
        slopeAngle: currentSensorData.slopeAngle,
        groundwaterLevel: currentSensorData.groundwaterLevel,
        weatherSeverity: currentSensorData.weatherSeverity,
        weatherConditions: `Rainfall: ${currentSensorData.rainfall}mm/hr, Wind: ${currentSensorData.windSpeed}km/h, Severity: ${currentSensorData.weatherSeverity}/10`,
        location,
      }

      const response = await fetch("/api/ai-prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enhancedSensorData),
      })

      const aiPrediction = await response.json()

      if (response.ok) {
        // Add the new AI prediction to the list
        const newPrediction: PredictionData = {
          id: aiPrediction.id,
          location: aiPrediction.location,
          riskLevel: aiPrediction.riskLevel.toLowerCase() as "low" | "medium" | "high" | "critical",
          probability: aiPrediction.probability,
          timestamp: aiPrediction.timestamp,
          factors: aiPrediction.riskFactors,
          recommendation: aiPrediction.recommendations,
          timeWindow: aiPrediction.timeWindow,
          confidence: aiPrediction.confidence,
        }

        setPredictions((prev) => [newPrediction, ...prev.slice(0, 4)]) // Keep only 5 most recent
        setLastUpdate(new Date())
      }
    } catch (error) {
      console.error("Failed to generate AI prediction:", error)
    } finally {
      setIsGeneratingPrediction(false)
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
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

  const getRiskTextColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-red-400"
      case "high":
        return "text-orange-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "danger":
        return "text-red-400"
      case "warning":
        return "text-yellow-400"
      case "safe":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const highRiskCount = predictions.filter((p) => p.riskLevel === "high" || p.riskLevel === "critical").length
  const averageRisk = predictions.reduce((acc, p) => acc + p.probability, 0) / predictions.length
  const averageConfidence = predictions.reduce((acc, p) => acc + (p.confidence || 0), 0) / predictions.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            <Brain className="h-8 w-8 text-orange-500" />
            AI Predictions Dashboard
          </h2>
          <p className="text-slate-400 mt-1">Last updated: {lastUpdate.toLocaleTimeString()}</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => generateAIPrediction("Tunnel A - Section 4")}
            disabled={isGeneratingPrediction}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Zap className={`h-4 w-4 mr-2 ${isGeneratingPrediction ? "animate-pulse" : ""}`} />
            {isGeneratingPrediction ? "Generating..." : "Generate AI Prediction"}
          </Button>
          <Button onClick={refreshPredictions} disabled={isRefreshing} className="bg-orange-600 hover:bg-orange-700">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Updating..." : "Refresh"}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">High Risk Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">{highRiskCount}</div>
            <p className="text-xs text-slate-500">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Average Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{averageRisk.toFixed(1)}%</div>
            <p className="text-xs text-slate-500">Across all monitored areas</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">AI Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{averageConfidence.toFixed(1)}%</div>
            <p className="text-xs text-slate-500">Prediction accuracy</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Sensors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">24</div>
            <p className="text-xs text-slate-500">All systems operational</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Predictions Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-400">156</div>
            <p className="text-xs text-slate-500">AI analyses completed</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Mountain className="h-5 w-5 text-orange-500" />
            Environmental Monitoring
          </CardTitle>
          <CardDescription className="text-slate-400">
            Real-time monitoring of critical rockfall parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {environmentalStatus.map((env, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-slate-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">{env.parameter}</p>
                  <p className="text-xs text-slate-400">
                    Threshold: {env.threshold} {env.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getStatusColor(env.status)}`}>
                    {env.current} {env.unit}
                  </p>
                  <Badge
                    className={`text-xs ${
                      env.status === "danger"
                        ? "bg-red-600"
                        : env.status === "warning"
                          ? "bg-yellow-600"
                          : "bg-green-600"
                    }`}
                  >
                    {env.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Predictions */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Current Risk Predictions</CardTitle>
          <CardDescription className="text-slate-400">
            Real-time AI analysis of rockfall probability across mining areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`h-5 w-5 ${getRiskTextColor(prediction.riskLevel)}`} />
                    <div>
                      <h4 className="font-semibold text-white">{prediction.location}</h4>
                      <p className="text-sm text-slate-400">{new Date(prediction.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getRiskColor(prediction.riskLevel)} text-white`}>
                      {prediction.riskLevel.toUpperCase()}
                    </Badge>
                    <p className="text-sm text-slate-400 mt-1">{prediction.probability}% probability</p>
                    {prediction.confidence && (
                      <p className="text-xs text-slate-500">Confidence: {prediction.confidence}%</p>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <Progress value={prediction.probability} className="h-2" />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-slate-300 mb-2">Risk Factors:</h5>
                    <ul className="text-sm text-slate-400 space-y-1">
                      {prediction.factors.map((factor, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-orange-500 rounded-full" />
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-slate-300 mb-2">Recommendation:</h5>
                    <p className="text-sm text-slate-400">{prediction.recommendation}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-slate-300 mb-2">Time Window:</h5>
                    <p className="text-sm text-slate-400">{prediction.timeWindow || "Not specified"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Sensor Data Charts */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-4 w-4 text-orange-500" />
                  Vibration & Seismic Activity
                </CardTitle>
                <CardDescription className="text-slate-400">
                  24-hour monitoring of ground movement and seismic events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="vibration"
                      stroke="#F97316"
                      strokeWidth={2}
                      dot={{ fill: "#F97316", strokeWidth: 2 }}
                      name="Vibration (Hz)"
                    />
                    <Line
                      type="monotone"
                      dataKey="seismicActivity"
                      stroke="#EF4444"
                      strokeWidth={2}
                      dot={{ fill: "#EF4444", strokeWidth: 2 }}
                      name="Seismic Activity"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CloudRain className="h-4 w-4 text-blue-500" />
                  Weather Conditions
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Rainfall, wind speed, and weather severity impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="rainfall" fill="#3B82F6" name="Rainfall (mm/hr)" />
                    <Bar dataKey="windSpeed" fill="#10B981" name="Wind Speed (km/h)" />
                    <Bar dataKey="weatherSeverity" fill="#8B5CF6" name="Weather Severity" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Mountain className="h-4 w-4 text-green-500" />
                  Rock Stability & Groundwater
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Structural integrity and water level monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rockStability"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ fill: "#10B981", strokeWidth: 2 }}
                      name="Rock Stability"
                    />
                    <Line
                      type="monotone"
                      dataKey="groundwaterLevel"
                      stroke="#06B6D4"
                      strokeWidth={2}
                      dot={{ fill: "#06B6D4", strokeWidth: 2 }}
                      name="Groundwater Level (m)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Risk Factor Analysis</CardTitle>
                <CardDescription className="text-slate-400">
                  Comprehensive risk assessment across all parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#9CA3AF", fontSize: 10 }} />
                    <Radar
                      name="Risk Level"
                      dataKey="A"
                      stroke="#F97316"
                      fill="#F97316"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
        <div>
          <AIChatAssistant />
        </div>
      </div>
    </div>
  )
}
