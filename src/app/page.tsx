import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to My Next.js App</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Learn how to use shadcn/ui components</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is a sample card component from shadcn/ui. You can use it to display content in a structured way.</p>
            </CardContent>
            <CardFooter>
              <Button>Learn More</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>What this template includes</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li>Next.js 13 with App Router</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>shadcn/ui Components</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View Docs</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
