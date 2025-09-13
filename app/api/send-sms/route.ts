import { type NextRequest, NextResponse } from "next/server"

interface SMSRequest {
  to: string | string[]
  message: string
  priority: "low" | "medium" | "high" | "critical"
  alertType: "warning" | "evacuation" | "info" | "emergency"
}

export async function POST(request: NextRequest) {
  try {
    const { to, message, priority, alertType }: SMSRequest = await request.json()

    // In production, integrate with services like Twilio, AWS SNS, or local SMS gateway

    const recipients = Array.isArray(to) ? to : [to]
    const timestamp = new Date().toISOString()

    // Simulate SMS sending delay based on priority
    const delay = priority === "critical" ? 100 : priority === "high" ? 500 : 1000
    await new Promise((resolve) => setTimeout(resolve, delay))

    // Mock SMS gateway response
    const results = recipients.map((phone) => ({
      phone,
      status: "sent",
      messageId: `sms_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp,
      cost: 0.05, // Mock cost per SMS
    }))

    // Log SMS for audit trail
    console.log(`[SMS ALERT] ${alertType.toUpperCase()} - Priority: ${priority}`)
    console.log(`Recipients: ${recipients.join(", ")}`)
    console.log(`Message: ${message}`)
    console.log(`Sent at: ${timestamp}`)

    // In production, you would integrate with actual SMS services:
    /*
    // Example with Twilio
    const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)
    
    const promises = recipients.map(phone => 
      twilio.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE,
        to: phone
      })
    )
    
    const results = await Promise.all(promises)
    */

    return NextResponse.json({
      success: true,
      results,
      totalSent: recipients.length,
      timestamp,
      alertType,
      priority,
    })
  } catch (error) {
    console.error("SMS sending error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send SMS alerts",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
