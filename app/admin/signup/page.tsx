"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, ArrowLeft, Settings, User, Mail, Phone, Building, Key } from "lucide-react"

export default function AdminSignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    department: "",
    adminKey: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    if (formData.adminKey !== "ADMIN2024") {
      setError("Invalid admin key. Please contact system administrator.")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, simulate successful registration
      setSuccess(true)
      
      // Auto redirect after 2 seconds
      setTimeout(() => {
        localStorage.setItem("userRole", "admin")
        localStorage.setItem("userEmail", formData.email)
        router.push("/admin/dashboard")
      }, 2000)
      
    } catch (err) {
      setError("Registration failed. Please try again.")
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

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6 text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin Account Created!</h2>
            <p className="text-slate-300 mb-4">
              Your admin account has been created successfully. Redirecting to admin dashboard...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    )
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
            <span className="text-lg font-medium">Admin Registration</span>
          </div>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Request Admin Access</CardTitle>
            <CardDescription className="text-slate-300">
              Create an admin account to access system controls and monitoring dashboards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="bg-red-900/50 border-red-700">
                  <AlertDescription className="text-red-200">{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-200">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-200">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-200">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-200">Mining Company</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="ABC Mining Corp"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-slate-200">Department</Label>
                <Input
                  id="department"
                  name="department"
                  type="text"
                  placeholder="Safety Management"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminKey" className="text-slate-200">Admin Key</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="adminKey"
                    name="adminKey"
                    type="text"
                    placeholder="Enter admin key"
                    value={formData.adminKey}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-slate-400">
                  Contact your system administrator for the admin key
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-200">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                  required
                />
                <Label htmlFor="terms" className="text-sm text-slate-300">
                  I agree to the{" "}
                  <Link href="#" className="text-blue-400 hover:text-blue-300">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-blue-400 hover:text-blue-300">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating Admin Account..." : "Create Admin Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-400">
                Already have an admin account?{" "}
                <Link href="/admin/login" className="text-blue-400 hover:text-blue-300 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-slate-500 text-sm">
                Are you a miner?{" "}
                <Link href="/miner/signup" className="text-orange-400 hover:text-orange-300 font-medium">
                  Miner Registration
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Admin Key */}
        <Card className="mt-6 bg-slate-800/30 border-slate-700">
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-slate-300 mb-2">Demo Admin Key</h3>
            <div className="text-xs text-slate-400 space-y-1">
              <p><strong>Admin Key:</strong> ADMIN2024</p>
              <p className="text-slate-500">Use this key for demo purposes only</p>
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
                  Admin accounts require approval and admin key verification. All admin activities are logged and monitored.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
