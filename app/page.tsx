import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold">
              R
            </div>
            <h1 className="text-2xl font-bold text-white">RockGuard AI</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/dashboard">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">Admin Dashboard</Button>
            </Link>
            <Link href="/miner/dashboard">
              <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 bg-transparent">
                Miner Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 text-sm font-semibold">
              🏆 Smart India Hackathon 2024 Finalist
            </Badge>
          </div>

          <h2 className="text-5xl font-bold text-white mb-6 text-balance">
            AI-Powered Rockfall Prediction & Alert System
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto text-pretty">
            Protect mining operations with advanced AI predictions powered by Groq, real-time monitoring, and instant
            SMS alerts to keep workers safe from rockfall hazards.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/admin/dashboard">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                Admin Dashboard
              </Button>
            </Link>
            <Link href="/miner/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-200 hover:bg-slate-800 bg-transparent"
              >
                Miner Dashboard
              </Button>
            </Link>
            <Link href="/predictions">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white bg-transparent"
              >
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader>
              <div className="text-4xl mb-2">🧠</div>
              <CardTitle className="text-white">AI Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300">
                Advanced Groq-powered AI analyzes geological data to predict rockfall risks with 95% accuracy
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader>
              <div className="text-4xl mb-2">📱</div>
              <CardTitle className="text-white">SMS Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300">
                Instant SMS notifications and mobile alerts when danger levels increase, reaching workers in seconds
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader>
              <div className="text-4xl mb-2">👥</div>
              <CardTitle className="text-white">Multi-Role Access</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300">
                Separate interfaces for administrators and miners with role-based permissions and dashboards
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader>
              <div className="text-4xl mb-2">🛡️</div>
              <CardTitle className="text-white">Safety First</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300">
                Comprehensive safety monitoring with historical data, trend analysis, and emergency protocols
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-8">Powered by Cutting-Edge Technology</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="text-4xl mb-2">⚡</div>
                <CardTitle className="text-white">Groq AI Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300">
                  Lightning-fast AI predictions using Groq's advanced language models for real-time risk assessment
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="text-4xl mb-2">💾</div>
                <CardTitle className="text-white">Real-time Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300">
                  24/7 sensor data collection and analysis with instant alerts for anomalous conditions
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="text-4xl mb-2">📊</div>
                <CardTitle className="text-white">Smart Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300">
                  Advanced data visualization and predictive analytics to identify patterns and prevent accidents
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-8">Why Choose RockGuard AI?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl mt-1 flex-shrink-0">✅</div>
                <div>
                  <h4 className="text-white font-semibold">95% Prediction Accuracy</h4>
                  <p className="text-slate-400">AI-powered risk assessment with industry-leading precision</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl mt-1 flex-shrink-0">✅</div>
                <div>
                  <h4 className="text-white font-semibold">Instant SMS Alerts</h4>
                  <p className="text-slate-400">Emergency notifications delivered in under 5 seconds</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl mt-1 flex-shrink-0">✅</div>
                <div>
                  <h4 className="text-white font-semibold">24/7 Monitoring</h4>
                  <p className="text-slate-400">Continuous surveillance of all mining areas and conditions</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl mt-1 flex-shrink-0">✅</div>
                <div>
                  <h4 className="text-white font-semibold">Easy Integration</h4>
                  <p className="text-slate-400">Seamlessly integrates with existing mining infrastructure</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl mt-1 flex-shrink-0">✅</div>
                <div>
                  <h4 className="text-white font-semibold">Cost Effective</h4>
                  <p className="text-slate-400">Reduces insurance costs and prevents costly accidents</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl mt-1 flex-shrink-0">✅</div>
                <div>
                  <h4 className="text-white font-semibold">Scalable Solution</h4>
                  <p className="text-slate-400">Grows with your mining operations and requirements</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Card className="bg-slate-800/30 border-slate-700 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl text-white mb-4">Ready to Enhance Mine Safety?</CardTitle>
              <CardDescription className="text-slate-300 text-lg mb-6">
                Join the future of mining safety with AI-powered rockfall prediction
              </CardDescription>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">95%</div>
                  <div className="text-sm text-slate-400">Prediction Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">5s</div>
                  <div className="text-sm text-slate-400">Alert Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">24/7</div>
                  <div className="text-sm text-slate-400">Continuous Monitoring</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/admin/dashboard">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                    Access Admin Panel
                  </Button>
                </Link>
                <Link href="/predictions">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-600 text-slate-200 hover:bg-slate-800 bg-transparent"
                  >
                    View AI Predictions
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-6 w-6 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold text-sm">
                R
              </div>
              <span className="text-white font-semibold">RockGuard AI</span>
            </div>
            <p className="text-slate-400 text-sm">Protecting miners with AI-powered rockfall prediction technology</p>
            <p className="text-slate-500 text-xs mt-2">Built for Smart India Hackathon 2024 • Powered by Groq AI</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
