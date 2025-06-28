"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Cloud, CloudRain, Sun, CloudSnow, Wind, Droplets, MapPin, AlertTriangle } from "lucide-react"

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  visibility: number
  alerts: WeatherAlert[]
  forecast: ForecastDay[]
}

interface WeatherAlert {
  id: string
  type: "warning" | "watch" | "advisory"
  title: string
  description: string
  severity: "minor" | "moderate" | "severe"
}

interface ForecastDay {
  date: string
  high: number
  low: number
  condition: string
  precipitation: number
}

const weatherIcons = {
  clear: Sun,
  sunny: Sun,
  cloudy: Cloud,
  "partly cloudy": Cloud,
  rainy: CloudRain,
  snowy: CloudSnow,
  windy: Wind,
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchWeatherData()
    const interval = setInterval(fetchWeatherData, 300000) // Update every 5 minutes
    return () => clearInterval(interval)
  }, [])

  const fetchWeatherData = async () => {
    try {
      setLoading(true)
      // Simulate API call - replace with actual weather API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockWeatherData: WeatherData = {
        location: "Downtown District",
        temperature: 72,
        condition: "partly cloudy",
        humidity: 65,
        windSpeed: 8,
        visibility: 10,
        alerts: [
          {
            id: "1",
            type: "warning",
            title: "Rain Expected",
            description: "Light rain expected in downtown area. Delivery delays possible.",
            severity: "moderate",
          },
        ],
        forecast: [
          { date: "Today", high: 75, low: 62, condition: "rainy", precipitation: 70 },
          { date: "Tomorrow", high: 78, low: 65, condition: "sunny", precipitation: 10 },
          { date: "Wed", high: 73, low: 60, condition: "cloudy", precipitation: 30 },
        ],
      }

      setWeather(mockWeatherData)
      setError(null)
    } catch (err) {
      setError("Failed to fetch weather data")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error || !weather) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-32">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">{error || "Weather data unavailable"}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const WeatherIcon = weatherIcons[weather.condition.toLowerCase() as keyof typeof weatherIcons] || Cloud

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-blue-600" />
            Weather Impact
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{weather.location}</span>
            <Badge variant="outline" className="text-xs">
              Live
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Current Weather */}
          <motion.div
            className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              >
                <WeatherIcon className="h-8 w-8 text-blue-600" />
              </motion.div>
              <div>
                <div className="text-2xl font-bold">{weather.temperature}°F</div>
                <div className="text-sm text-muted-foreground capitalize">{weather.condition}</div>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Droplets className="h-3 w-3" />
                {weather.humidity}%
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Wind className="h-3 w-3" />
                {weather.windSpeed} mph
              </div>
            </div>
          </motion.div>

          {/* Weather Alerts */}
          {weather.alerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2"
            >
              {weather.alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-lg border-l-4 ${
                    alert.severity === "severe"
                      ? "bg-red-50 border-red-500 dark:bg-red-950/20"
                      : alert.severity === "moderate"
                        ? "bg-yellow-50 border-yellow-500 dark:bg-yellow-950/20"
                        : "bg-blue-50 border-blue-500 dark:bg-blue-950/20"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle
                      className={`h-4 w-4 mt-0.5 ${
                        alert.severity === "severe"
                          ? "text-red-600"
                          : alert.severity === "moderate"
                            ? "text-yellow-600"
                            : "text-blue-600"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{alert.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{alert.description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* 3-Day Forecast */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">3-Day Forecast</h4>
            <div className="space-y-2">
              {weather.forecast.map((day, index) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 bg-white/30 dark:bg-gray-800/30 rounded"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium w-16">{day.date}</div>
                    <div className="flex items-center gap-1">
                      {React.createElement(
                        weatherIcons[day.condition.toLowerCase() as keyof typeof weatherIcons] || Cloud,
                        {
                          className: "h-4 w-4 text-blue-600",
                        },
                      )}
                      <span className="text-xs text-blue-600">{day.precipitation}%</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{day.high}°</span>
                    <span className="text-muted-foreground">/{day.low}°</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
