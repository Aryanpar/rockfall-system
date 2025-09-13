"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Smartphone, Send, Users, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface SMSLog {
  id: string
  message: string
  recipients: number
  alertType: string
  priority: string
  timestamp: string
  status: "sent" | "failed" | "pending"
}

export function SMSAlertSystem() {
  const [message, setMessage] = useState("")
  const [alertType, setAlertType] = useState<string>("")
  const [priority, setPriority] = useState<string>("")
  const [targetRoles, setTargetRoles] = useState<string[]>([])
  const [specificNumbers, setSpecificNumbers] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [lastResult, setLastResult] = useState<any>(null)
  const [smsLogs, setSmsLogs] = useState<SMSLog[]>([
    {
      id: "1",
      message: "High rockfall risk detected in Tunnel A - Section 3. Evacuate immediately.",
      recipients: 12,
      alertType: "evacuation",
      priority: "critical",
      timestamp: "2024-01-15T10:30:00Z",
      status: "sent",
    },
    {
      id: "2",
      message: "Safety equipment inspection reminder for all personnel.",
      recipients: 25,
      alertType: "info",
      priority: "low",
      timestamp: "2024-01-15T08:00:00Z",
      status: "sent",
    },
  ])

  const handleRoleChange = (role: string, checked: boolean) => {
    if (checked) {
      setTargetRoles((prev) => [...prev, role])
    } else {
      setTargetRoles((prev) => prev.filter((r) => r !== role))
    }
  }

  const sendSMSAlert = async () => {
    if (!message.trim() || !alertType || !priority) {
      return
    }

    setIsSending(true)
    setLastResult(null)

    try {
      let endpoint = "/api/send-broadcast"
      let payload: any = {
        message,
        alertType,
        priority,
        targetRoles: targetRoles.length > 0 ? targetRoles : undefined,
      }

      // If specific numbers are provided, use direct SMS endpoint
      if (specificNumbers.trim()) {
        endpoint = "/api/send-sms"
        const numbers = specificNumbers
          .split(",")
          .map((n) => n.trim())
          .filter((n) => n)
        payload = {
          to: numbers,
          message: `[${alertType.toUpperCase()}] ${message}`,
          priority,
          alertType,
        }
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      setLastResult(result)

      if (result.success) {
        // Add to SMS logs
        const newLog: SMSLog = {
          id: Date.now().toString(),
          message,
          recipients: result.broadcast?.targetUsers || result.totalSent || 0,
          alertType,
          priority,
          timestamp: new Date().toISOString(),
          status: "sent",
        }
        setSmsLogs((prev) => [newLog, ...prev])

        // Reset form
        setMessage("")
        setAlertType("")
        setPriority("")
        setTargetRoles([])
        setSpecificNumbers("")
      }
    } catch (error) {
      console.error("Failed to send SMS:", error)
      setLastResult({
        success: false,
        error: "Failed to send SMS alert",
      })
    } finally {
      setIsSending(false)
    }
  }

  const getPriorityColor = (priority: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* SMS Composer */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-orange-500" />
              Send SMS Alert
            </CardTitle>
            <CardDescription className="text-slate-400">
              Send emergency alerts and notifications via SMS
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lastResult && (
              <Alert
                className={`${lastResult.success ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"}`}
              >
                <AlertTriangle className={`h-4 w-4 ${lastResult.success ? "text-green-500" : "text-red-500"}`} />
                <AlertDescription className={lastResult.success ? "text-green-400" : "text-red-400"}>
                  {lastResult.success
                    ? `SMS sent successfully to ${lastResult.broadcast?.targetUsers || lastResult.totalSent} recipients`
                    : lastResult.error || "Failed to send SMS"}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label className="text-slate-200">Alert Type</Label>
              <Select value={alertType} onValueChange={setAlertType}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select alert type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="emergency" className="text-white">
                    Emergency
                  </SelectItem>
                  <SelectItem value="evacuation" className="text-white">
                    Evacuation
                  </SelectItem>
                  <SelectItem value="warning" className="text-white">
                    Warning
                  </SelectItem>
                  <SelectItem value="info" className="text-white">
                    Information
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Priority Level</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="critical" className="text-white">
                    Critical
                  </SelectItem>
                  <SelectItem value="high" className="text-white">
                    High
                  </SelectItem>
                  <SelectItem value="medium" className="text-white">
                    Medium
                  </SelectItem>
                  <SelectItem value="low" className="text-white">
                    Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Target Recipients</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="miners"
                    checked={targetRoles.includes("miner")}
                    onCheckedChange={(checked) => handleRoleChange("miner", checked as boolean)}
                  />
                  <Label htmlFor="miners" className="text-slate-300">
                    All Miners
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="admins"
                    checked={targetRoles.includes("admin")}
                    onCheckedChange={(checked) => handleRoleChange("admin", checked as boolean)}
                  />
                  <Label htmlFor="admins" className="text-slate-300">
                    All Administrators
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Specific Phone Numbers (Optional)</Label>
              <Input
                value={specificNumbers}
                onChange={(e) => setSpecificNumbers(e.target.value)}
                placeholder="Enter phone numbers separated by commas"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-500">Leave empty to use role-based targeting above</p>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Message</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your alert message..."
                className="bg-slate-700/50 border-slate-600 text-white"
                rows={4}
              />
              <p className="text-xs text-slate-500">{message.length}/160 characters</p>
            </div>

            <Button
              onClick={sendSMSAlert}
              disabled={!message.trim() || !alertType || !priority || isSending}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSending ? "Sending..." : "Send SMS Alert"}
            </Button>
          </CardContent>
        </Card>

        {/* SMS History */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-500" />
              SMS History
            </CardTitle>
            <CardDescription className="text-slate-400">Recent SMS alerts and delivery status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {smsLogs.map((log) => (
                <div key={log.id} className="p-3 border border-slate-700 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(log.status)}
                      <Badge className={`${getPriorityColor(log.priority)} text-white`}>{log.priority}</Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {log.alertType}
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{log.message}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Recipients: {log.recipients}</span>
                    <span>Status: {log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
