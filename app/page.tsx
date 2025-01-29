import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Plane as Plant, Sprout, Droplets, Wind } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-800 dark:text-green-300 mb-4">
            AgroPredict
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Advanced Crop Yield Prediction & Agricultural Analytics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Plant className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Crop Yield Prediction</h3>
            <p className="text-gray-600 dark:text-gray-300">
              AI-powered predictions for optimal crop yields
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Sprout className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fertilizer Recommendations</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Personalized fertilizer guidance for your crops
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Droplets className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Soil Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive soil nutrient assessment
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Wind className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Weather Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Real-time weather monitoring and forecasts
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/auth/signin">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white mr-4">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}