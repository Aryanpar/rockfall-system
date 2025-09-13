import { AIPredictionsDashboard } from "@/components/ai-predictions-dashboard"

export default function PredictionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="container mx-auto">
        <AIPredictionsDashboard />
      </div>
    </div>
  )
}
