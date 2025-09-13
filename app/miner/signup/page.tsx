"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, ArrowLeft, User, Mail, Phone, Building } from "lucide-react"

export default function MinerSignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    employeeId: "",
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

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
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
        localStorage.setItem("userRole", "miner")
        localStorage.setItem("userEmail", formData.email)
        router.push("/miner/dashboard")
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
            <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
            <p className="text-slate-300 mb-4">
              Your account has been created successfully. Redirecting to your dashboard...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
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
            <Shield className="h-5 w-5" />
            <span className="text-lg font-medium">Miner Registration</span>
          </div>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Create Account</CardTitle>
            <CardDescription className="text-slate-300">
              Join RockGuard AI to access real-time safety alerts and monitoring
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
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 pl-10"
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
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500"
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
                    placeholder="john.doe@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 pl-10"
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
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 pl-10"
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
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeId" className="text-slate-200">Employee ID</Label>
                <Input
                  id="employeeId"
                  name="employeeId"
                  type="text"
                  placeholder="EMP001"
                  value={formData.employeeId}
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
                    placeholder="Create a strong password"
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
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 pr-10"
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
                  className="rounded border-slate-600 bg-slate-700 text-orange-500 focus:ring-orange-500"
                  required
                />
                <Label htmlFor="terms" className="text-sm text-slate-300">
                  I agree to the{" "}
                  <Link href="#" className="text-orange-400 hover:text-orange-300">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-orange-400 hover:text-orange-300">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-400">
                Already have an account?{" "}
                <Link href="/miner/login" className="text-orange-400 hover:text-orange-300 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-slate-500 text-sm">
                Are you an admin?{" "}
                <Link href="/admin/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                  Admin Registration
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
