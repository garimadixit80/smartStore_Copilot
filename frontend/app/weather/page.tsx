"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WeatherWidget } from "@/components/weather/weather-widget"
import { WeatherAutomation } from "@/components/weather/weather-automation"
import { Thermometer, Droplets, Wind, Sun, AlertTriangle, MapPin, Settings, Zap, Activity } from "lucide-react"

const mockWeatherData = {
  current: {
    location: "Downtown Store",
    temperature: 78,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    uvIndex: 6,
    precipitation: 0,
  },
  locations: [
    { id: 1, name: "Downtown Store", temp: 78, condition: "Partly Cloudy", alerts: 0 },
    { id: 2, name: "Mall Location", temp: 82, condition: "Sunny", alerts: 1 },
    { id: 3, name: "Suburban Store", temp: 75, condition: "Overcast", alerts: 0 },
  ],
  alerts: [
    {
      id: 1,
      type: "High Temperature",
      location: "Mall Location",
      severity: "medium",
      message: "Temperature expected to reach 95°F this afternoon",
      timestamp: "2024-01-15T10:30:00Z",
    },
  ],
  suppliers: [
    { id: 1, name: "Fresh Foods Co.", status: "active", lastContact: "2 hours ago" },
    { id: 2, name: "Dairy Direct", status: "delayed", lastContact: "4 hours ago" },
    { id: 3, name: "Produce Plus", status: "active", lastContact: "1 hour ago" },
  ],
}

export default function WeatherPage() {
  const [selectedLocation, setSelectedLocation] = useState("Downtown Store")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Weather Management</h1>
          <p className="text-gray-600">Monitor weather conditions and manage automated responses</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Activity className="h-3 w-3" />
            <span>Live Monitoring</span>
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Current Weather Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Temperature</p>
                <p className="text-2xl font-bold">{mockWeatherData.current.temperature}°F</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Humidity</p>
                <p className="text-2xl font-bold">{mockWeatherData.current.humidity}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Wind Speed</p>
                <p className="text-2xl font-bold">{mockWeatherData.current.windSpeed} mph</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">UV Index</p>
                <p className="text-2xl font-bold">{mockWeatherData.current.uvIndex}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather Alerts */}
      {mockWeatherData.alerts.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              <span>Active Weather Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockWeatherData.alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>{alert.severity}</Badge>
                    <div>
                      <p className="font-medium">{alert.type}</p>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{alert.location}</p>
                    <p className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeatherWidget />

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest weather-related events and automations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Automation Triggered</p>
                      <p className="text-xs text-gray-600">High wind advisory activated at Mall Location</p>
                    </div>
                    <span className="text-xs text-gray-500">2 min ago</span>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Activity className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Weather Update</p>
                      <p className="text-xs text-gray-600">Temperature dropped to 75°F at Suburban Store</p>
                    </div>
                    <span className="text-xs text-gray-500">15 min ago</span>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Alert Issued</p>
                      <p className="text-xs text-gray-600">High temperature warning for Mall Location</p>
                    </div>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation">
          <WeatherAutomation />
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Store Locations</h3>
            <p className="text-sm text-gray-600">Weather conditions across all store locations</p>
          </div>

          <div className="grid gap-4">
            {mockWeatherData.locations.map((location) => (
              <Card key={location.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-semibold">{location.name}</h4>
                        <p className="text-sm text-gray-600">{location.condition}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold">{location.temp}°F</p>
                        {location.alerts > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {location.alerts} alert{location.alerts > 1 ? "s" : ""}
                          </Badge>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Supplier Status</h3>
            <p className="text-sm text-gray-600">Weather impact on supplier operations</p>
          </div>

          <div className="grid gap-4">
            {mockWeatherData.suppliers.map((supplier) => (
              <Card key={supplier.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{supplier.name}</h4>
                      <p className="text-sm text-gray-600">Last contact: {supplier.lastContact}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={supplier.status === "active" ? "default" : "secondary"}>{supplier.status}</Badge>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
