import { type NextRequest, NextResponse } from "next/server"

interface BroadcastRequest {
  message: string
  alertType: "warning" | "evacuation" | "info" | "emergency"
  priority: "low" | "medium" | "high" | "critical"
  targetRoles?: ("admin" | "miner")[]
  locations?: string[]
}

// Mock user database - in production, fetch from actual database
const mockUsers = [
  { id: "1", name: "John Smith", phone: "+1234567890", role: "miner", location: "Tunnel A" },
  { id: "2", name: "Sarah Johnson", phone: "+1234567891", role: "miner", location: "Tunnel B" },
  { id: "3", name: "Mike Wilson", phone: "+1234567892", role: "miner", location: "Main Shaft" },
  { id: "4", name: "Admin User", phone: "+1234567893", role: "admin", location: "Control Room" },
  { id: "5", name: "Safety Officer", phone: "+1234567894", role: "admin", location: "Safety Station" },
]

export async function POST(request: NextRequest) {
  try {
    const { message, alertType, priority, targetRoles, locations }: BroadcastRequest = await request.json()

    let targetUsers = mockUsers

    if (targetRoles && targetRoles.length > 0) {
      targetUsers = targetUsers.filter((user) => targetRoles.includes(user.role as "admin" | "miner"))
    }

    if (locations && locations.length > 0) {
      targetUsers = targetUsers.filter((user) => locations.some((location) => user.location.includes(location)))
    }

    const phoneNumbers = targetUsers.map((user) => user.phone)

    // Send SMS to all target users
    const smsResponse = await fetch(`${request.nextUrl.origin}/api/send-sms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: phoneNumbers,
        message: `[${alertType.toUpperCase()}] ${message}`,
        priority,
        alertType,
      }),
    })

    const smsResult = await smsResponse.json()

    // Create broadcast log entry
    const broadcastLog = {
      id: `broadcast_${Date.now()}`,
      message,
      alertType,
      priority,
      targetUsers: targetUsers.length,
      sentTo: targetUsers.map((user) => ({
        name: user.name,
        phone: user.phone,
        role: user.role,
        location: user.location,
      })),
      timestamp: new Date().toISOString(),
      success: smsResult.success,
      results: smsResult.results,
    }

    console.log(`[BROADCAST ALERT] ${alertType.toUpperCase()} sent to ${targetUsers.length} users`)

    return NextResponse.json({
      success: true,
      broadcast: broadcastLog,
      smsResults: smsResult,
    })
  } catch (error) {
    console.error("Broadcast error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send broadcast alert",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
