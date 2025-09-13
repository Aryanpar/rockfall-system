import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

interface SensorData {
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
  weatherConditions: string
  location: string
}

export async function POST(request: NextRequest) {
  try {
    const sensorData: SensorData = await request.json()

    const prompt = `
You are an expert AI system for predicting rockfall risks in mining operations. Analyze the following comprehensive sensor data and provide a detailed risk assessment.

SENSOR DATA ANALYSIS:
- Location: ${sensorData.location}
- Vibration Level: ${sensorData.vibration} Hz (Normal: <3, Warning: 3-5, Critical: >5)
- Moisture Content: ${sensorData.moisture}% (Normal: <50%, Warning: 50-70%, Critical: >70%)
- Temperature: ${sensorData.temperature}°C
- Atmospheric Pressure: ${sensorData.pressure} hPa
- Rainfall Rate: ${sensorData.rainfall} mm/hr (Normal: <5, Warning: 5-15, Critical: >15)
- Wind Speed: ${sensorData.windSpeed} km/h (Normal: <20, Warning: 20-30, Critical: >30)
- Seismic Activity: ${sensorData.seismicActivity}/10 (Normal: <3, Warning: 3-6, Critical: >6)
- Rock Stability Index: ${sensorData.rockStability}/10 (Safe: >7, Warning: 5-7, Critical: <5)
- Slope Angle: ${sensorData.slopeAngle}° (Safe: <30°, Warning: 30-45°, Critical: >45°)
- Groundwater Level: ${sensorData.groundwaterLevel}m (Normal: <1.5m, Warning: 1.5-2.5m, Critical: >2.5m)
- Weather Severity: ${sensorData.weatherSeverity}/10 (Normal: <4, Warning: 4-7, Critical: >7)
- Weather Conditions: ${sensorData.weatherConditions}

RISK ASSESSMENT FACTORS:
1. Geological Stability: Consider rock type, fracture patterns, and structural integrity
2. Hydrological Impact: Rainfall, groundwater, and moisture effects on rock stability
3. Seismic Influence: Ground vibrations and seismic activity impact
4. Weather Conditions: Combined effect of rain, wind, and atmospheric pressure
5. Slope Geometry: Angle and orientation affecting gravitational forces
6. Time-dependent Factors: Rate of change and trend analysis

Please provide a comprehensive analysis with:
1. Risk Level (Low, Medium, High, Critical)
2. Probability Percentage (0-100%)
3. Key Risk Factors (list 3-5 specific concerns with measurements)
4. Immediate Recommendations (specific actions required)
5. Predicted Time Window (when risk may materialize)
6. Confidence Level (0-100% based on data quality and model certainty)

Format your response as JSON with the following structure:
{
  "riskLevel": "string",
  "probability": number,
  "riskFactors": ["string"],
  "recommendations": "string",
  "timeWindow": "string",
  "confidence": number
}
`

    const { text } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt,
      temperature: 0.2, // Lower temperature for more consistent predictions
    })

    // Parse the AI response
    let aiResponse
    try {
      aiResponse = JSON.parse(text)
    } catch (parseError) {
      console.log("[v0] AI response parsing failed, using fallback:", text)
      const riskScore = calculateRiskScore(sensorData)
      aiResponse = {
        riskLevel: getRiskLevel(riskScore),
        probability: Math.min(95, Math.max(5, riskScore)),
        riskFactors: generateRiskFactors(sensorData),
        recommendations: generateRecommendations(riskScore),
        timeWindow: getTimeWindow(riskScore),
        confidence: 75,
      }
    }

    // Add metadata
    const prediction = {
      ...aiResponse,
      id: Date.now().toString(),
      location: sensorData.location,
      timestamp: new Date().toISOString(),
      sensorData,
      aiModel: "Groq Llama 3.1 70B",
    }

    return NextResponse.json(prediction)
  } catch (error) {
    console.error("AI Prediction Error:", error)
    return NextResponse.json({ error: "Failed to generate AI prediction" }, { status: 500 })
  }
}

function calculateRiskScore(data: SensorData): number {
  let score = 0

  // Vibration risk (0-20 points)
  if (data.vibration > 5) score += 20
  else if (data.vibration > 3) score += 12
  else if (data.vibration > 2) score += 5

  // Moisture risk (0-15 points)
  if (data.moisture > 70) score += 15
  else if (data.moisture > 50) score += 8
  else if (data.moisture > 40) score += 3

  // Seismic activity risk (0-20 points)
  if (data.seismicActivity > 6) score += 20
  else if (data.seismicActivity > 3) score += 10
  else if (data.seismicActivity > 2) score += 4

  // Rock stability risk (0-15 points)
  if (data.rockStability < 5) score += 15
  else if (data.rockStability < 7) score += 8
  else if (data.rockStability < 8) score += 3

  // Weather conditions risk (0-15 points)
  if (data.rainfall > 15) score += 8
  if (data.windSpeed > 30) score += 4
  if (data.weatherSeverity > 7) score += 3

  // Groundwater risk (0-10 points)
  if (data.groundwaterLevel > 2.5) score += 10
  else if (data.groundwaterLevel > 1.5) score += 5

  // Slope angle risk (0-5 points)
  if (data.slopeAngle > 45) score += 5
  else if (data.slopeAngle > 35) score += 2

  return Math.min(100, score)
}

function getRiskLevel(score: number): string {
  if (score >= 70) return "Critical"
  if (score >= 50) return "High"
  if (score >= 25) return "Medium"
  return "Low"
}

function generateRiskFactors(data: SensorData): string[] {
  const factors = []

  if (data.vibration > 3) factors.push(`High vibration levels (${data.vibration.toFixed(1)} Hz)`)
  if (data.moisture > 50) factors.push(`Elevated moisture content (${data.moisture.toFixed(1)}%)`)
  if (data.seismicActivity > 3) factors.push(`Significant seismic activity (${data.seismicActivity.toFixed(1)}/10)`)
  if (data.rockStability < 7) factors.push(`Reduced rock stability (${data.rockStability.toFixed(1)}/10)`)
  if (data.rainfall > 5) factors.push(`Heavy rainfall (${data.rainfall.toFixed(1)} mm/hr)`)
  if (data.groundwaterLevel > 1.5) factors.push(`Rising groundwater levels (${data.groundwaterLevel.toFixed(1)}m)`)
  if (data.weatherSeverity > 4) factors.push(`Severe weather conditions (${data.weatherSeverity}/10)`)

  return factors.length > 0 ? factors : ["Normal sensor readings", "Stable environmental conditions"]
}

function generateRecommendations(score: number): string {
  if (score >= 70)
    return "IMMEDIATE EVACUATION required. Cease all operations and conduct emergency structural assessment."
  if (score >= 50)
    return "Evacuate non-essential personnel. Increase monitoring frequency and prepare emergency response."
  if (score >= 25) return "Limit personnel in area. Enhance monitoring and review safety protocols."
  return "Continue normal operations with standard monitoring procedures."
}

function getTimeWindow(score: number): string {
  if (score >= 70) return "Immediate risk (0-2 hours)"
  if (score >= 50) return "Short-term risk (2-6 hours)"
  if (score >= 25) return "Medium-term risk (6-24 hours)"
  return "Long-term monitoring (24+ hours)"
}
