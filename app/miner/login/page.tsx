"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, ArrowLeft } from "lucide-react"

export default function MinerLoginPage() {
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
        localStorage.setItem("userRole", "miner")
        localStorage.setItem("userEmail", formData.email)
        router.push("/miner/dashboard")
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
            <Shield className="h-5 w-5" />
            <span className="text-lg font-medium">Miner Portal</span>
          </div>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-slate-300">
              Sign in to access your mining dashboard and safety alerts
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
                <Label htmlFor="email" className="text-slate-200">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="miner@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500"
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
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 pr-10"
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
                    className="rounded border-slate-600 bg-slate-700 text-orange-500 focus:ring-orange-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-slate-300">
                    Remember me
                  </Label>
                </div>
                <Link href="#" className="text-sm text-orange-400 hover:text-orange-300">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-400">
                Don't have an account?{" "}
                <Link href="/miner/signup" className="text-orange-400 hover:text-orange-300 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-slate-500 text-sm">
                Are you an admin?{" "}
                <Link href="/admin/login" className="text-blue-400 hover:text-blue-300 font-medium">
                  Admin Login
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
              <p><strong>Email:</strong> miner@demo.com</p>
              <p><strong>Password:</strong> password123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
