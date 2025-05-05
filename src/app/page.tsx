'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { ArrowRight, MessageSquare, Users, FileText } from "lucide-react"

export default function Home() {
  const handleGetStarted = () => {
    console.log('Get Started clicked')
  }

  const handleHowItWorks = () => {
    console.log('How It Works clicked')
  }

  const handleTakeQuiz = () => {
    console.log('Take Quiz clicked')
  }

  const handleJoinGroup = () => {
    console.log('Join Group clicked')
  }

  const handleCreateChange = () => {
    console.log('Create Change clicked')
  }

  const handleBeliefQuiz = () => {
    console.log('Belief Quiz clicked')
  }

  const handleGuidedConversation = () => {
    console.log('Guided Conversation clicked')
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Common Ground. Build Real Solutions.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Small-group, AI-assisted civic conversations that lead to real-world action — not just arguments.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={handleGetStarted} className="cursor-pointer">Get Started</Button>
            <Button size="lg" variant="outline" onClick={handleHowItWorks} className="cursor-pointer">How It Works</Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleTakeQuiz}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Take the Quiz</h3>
                  <p className="text-muted-foreground">Answer a few questions about your beliefs and values.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleJoinGroup}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Join a Group</h3>
                  <p className="text-muted-foreground">Get matched with others in your area or interest group.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleCreateChange}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Create Change</h3>
                  <p className="text-muted-foreground">Collaborate on proposals to improve your community.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Tired of endless online arguments? So are we.</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Common Ground brings people together to talk with each other — not past each other. 
              With guided discussions and helpful AI, we help neighbors understand each other and 
              co-create local solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trust & Transparency</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">AI never speaks for you</h3>
                <p className="text-muted-foreground">Your voice remains your own, with AI only facilitating the conversation.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Transparent & Optional</h3>
                <p className="text-muted-foreground">AI&apos;s role is transparent, opt-outable, and non-pushy.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Community-First</h3>
                <p className="text-muted-foreground">Moderation is community-first, not censor-first.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <blockquote className="text-xl italic mb-4">
              &ldquo;I went in expecting to argue, but came out drafting a shared proposal with someone who disagreed with me.&rdquo;
            </blockquote>
            <p className="text-muted-foreground">— Jordan, Beta Tester</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Make a Difference?</h2>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={handleBeliefQuiz} className="cursor-pointer">Take the Belief Quiz</Button>
            <Button size="lg" variant="secondary" onClick={handleGuidedConversation} className="cursor-pointer">Try a Guided Conversation</Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
