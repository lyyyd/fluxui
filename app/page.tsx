import Link from "next/link"
import { ThemeSwitcher } from "@/components/theme-switcher-simple"
import { Button } from "@/components/ui/button"
import { ArrowRight, Palette, Smartphone, Zap, Github } from "lucide-react"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary/10%),transparent)]" />
      
      {/* Header */}
      <header className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            FluxUI
          </h1>
        </Link>
        <ThemeSwitcher />
      </header>

      {/* Hero Section */}
      <main className="container">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
          <div className="mx-auto max-w-4xl space-y-8 px-4 py-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm">
              <Zap className="h-4 w-4" />
              <span>Next-gen UI Kit for Web & Mobile</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Build Once,
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Run Everywhere
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A unified component system that seamlessly adapts between desktop and mobile.
              shadcn/ui for PC, antd-mobile for H5. One codebase, perfect experience everywhere.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
              <Link href="/playground/button">
                <Button size="lg" className="gap-2">
                  Button Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/playground/select">
                <Button size="lg" variant="secondary" className="gap-2">
                  Select Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="https://github.com/yourusername/fluxui" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </a>
            </div>

            {/* Features */}
            <div className="grid gap-6 pt-12 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-3 rounded-lg border bg-card p-6 transition-colors hover:bg-accent">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">3 Beautiful Themes</h3>
                <p className="text-sm text-muted-foreground">
                  Neutral, Blue, Purple with Light/Dark modes
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 rounded-lg border bg-card p-6 transition-colors hover:bg-accent">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Cross-Platform</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic switching between desktop and mobile
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 rounded-lg border bg-card p-6 transition-colors hover:bg-accent">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Built on Next.js 15</h3>
                <p className="text-sm text-muted-foreground">
                  Latest React 19 & App Router
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and antd-mobile</p>
      </footer>
    </div>
  )
}
