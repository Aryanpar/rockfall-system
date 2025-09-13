"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, ArrowLeft, Settings } from "lucide-react"

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, accept any email/password
      if (formData.email && formData.password) {
        // Store user session (in real app, use proper auth)
        localStorage.setItem("userRole", "admin")
        localStorage.setItem("userEmail", formData.email)
        router.push("/admin/dashboard")
      } else {
        setError("Please fill in all fields")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold">
              R
            </div>
            <h1 className="text-2xl font-bold text-white">RockGuard AI</h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-300">
            <Settings className="h-5 w-5" />
            <span className="text-lg font-medium">Admin Portal</span>
          </div>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Admin Access</CardTitle>
            <CardDescription className="text-slate-300">
              Sign in to access the administrative dashboard and system controls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="bg-red-900/50 border-red-700">
                  <AlertDescription className="text-red-200">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">Admin Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-slate-300">
                    Remember me
                  </Label>
                </div>
                <Link href="#" className="text-sm text-blue-400 hover:text-blue-300">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-400">
                Don't have an admin account?{" "}
                <Link href="/admin/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                  Request access
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-slate-500 text-sm">
                Are you a miner?{" "}
                <Link href="/miner/login" className="text-orange-400 hover:text-orange-300 font-medium">
                  Miner Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-6 bg-slate-800/30 border-slate-700">
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-slate-300 mb-2">Demo Credentials</h3>
            <div className="text-xs text-slate-400 space-y-1">
              <p><strong>Email:</strong> admin@demo.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="mt-4 bg-blue-900/20 border-blue-700">
          <CardContent className="pt-4">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-blue-300">Security Notice</h4>
                <p className="text-xs text-blue-200 mt-1">
                  Admin access is restricted to authorized personnel only. All login attempts are monitored and logged.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
