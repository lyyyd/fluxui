"use client"

import { Button as AdaptiveButton } from "@/components/adaptive/button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useIsMobile as useMobile } from "@/hooks/use-mobile"
import { Smartphone, Monitor, Palette } from "lucide-react"

export default function DemoPage() {
  const isMobile = useMobile()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                FluxUI
              </span>
            </h1>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              v1.0.0
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isMobile ? (
                <>
                  <Smartphone className="h-4 w-4" />
                  <span className="hidden sm:inline">Mobile View</span>
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4" />
                  <span className="hidden sm:inline">Desktop View</span>
                </>
              )}
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              🌊 Next-gen UI Kit for Web & Mobile
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl">
              One unified component system that seamlessly adapts between desktop and mobile devices
            </p>
            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
              <AdaptiveButton size="lg">Get Started</AdaptiveButton>
              <AdaptiveButton variant="outline" size="lg">
                View on GitHub
              </AdaptiveButton>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-bold">Features</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  3 Beautiful Themes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Neutral, Blue, and Purple themes with Light/Dark modes. Built with OKLCH color space.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Cross-Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  shadcn/ui for desktop, antd-mobile for mobile. Automatic switching based on viewport.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Smart Adaptation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Detects device type and loads optimal components for best performance and UX.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Component Showcase */}
        <section className="mb-12">
          <h3 className="mb-6 text-2xl font-bold">Component Showcase</h3>
          
          <Tabs defaultValue="buttons" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="data">Data Display</TabsTrigger>
            </TabsList>

            {/* Buttons Tab */}
            <TabsContent value="buttons" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>
                    {isMobile ? "Using antd-mobile" : "Using shadcn/ui"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <AdaptiveButton>Default</AdaptiveButton>
                    <AdaptiveButton variant="secondary">Secondary</AdaptiveButton>
                    <AdaptiveButton variant="destructive">Destructive</AdaptiveButton>
                    <AdaptiveButton variant="outline">Outline</AdaptiveButton>
                    <AdaptiveButton variant="ghost">Ghost</AdaptiveButton>
                    <AdaptiveButton variant="link">Link</AdaptiveButton>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Button Sizes</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <AdaptiveButton size="sm">Small</AdaptiveButton>
                      <AdaptiveButton size="default">Default</AdaptiveButton>
                      <AdaptiveButton size="lg">Large</AdaptiveButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Forms Tab */}
            <TabsContent value="forms" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Form Controls</CardTitle>
                  <CardDescription>
                    Input, Checkbox, Radio, Switch components
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Input */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      Accept terms and conditions
                    </Label>
                  </div>

                  {/* Radio Group */}
                  <div className="space-y-3">
                    <Label>Notification Preferences</Label>
                    <RadioGroup defaultValue="all">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all" className="font-normal">All notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="important" id="important" />
                        <Label htmlFor="important" className="font-normal">Important only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="none" />
                        <Label htmlFor="none" className="font-normal">None</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Switch */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="airplane-mode" className="font-normal">
                      Airplane Mode
                    </Label>
                    <Switch id="airplane-mode" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data Display Tab */}
            <TabsContent value="data" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Badges & Labels</CardTitle>
                  <CardDescription>
                    Various badge styles and colors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Status Indicators</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-500">Active</Badge>
                      <Badge className="bg-yellow-500">Pending</Badge>
                      <Badge className="bg-red-500">Error</Badge>
                      <Badge className="bg-blue-500">Info</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <Separator className="my-12" />

        {/* Tech Stack */}
        <section>
          <h3 className="mb-6 text-2xl font-bold">Tech Stack</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold">Desktop (PC)</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ shadcn/ui (53 components)</li>
                    <li>✓ Radix UI primitives</li>
                    <li>✓ Tailwind CSS</li>
                    <li>✓ Class Variance Authority</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold">Mobile (H5)</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ antd-mobile</li>
                    <li>✓ Touch-optimized</li>
                    <li>✓ Responsive design</li>
                    <li>✓ Native-like experience</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold">Framework</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Next.js 15 (App Router)</li>
                    <li>✓ React 19</li>
                    <li>✓ TypeScript 5</li>
                    <li>✓ OKLCH Color Space</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold">Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ View Transitions API</li>
                    <li>✓ Dark/Light mode</li>
                    <li>✓ 3 color themes</li>
                    <li>✓ Auto device detection</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Try resizing your browser window to see components adapt between desktop and mobile views
          </p>
          <p className="mt-2">
            Current breakpoint: <Badge variant="outline">{isMobile ? "Mobile (< 768px)" : "Desktop (≥ 768px)"}</Badge>
          </p>
        </div>
      </main>
    </div>
  )
}
