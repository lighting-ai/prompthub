"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface Testimonial {
  content: string
  author: {
    name: string
    title: string
    avatar?: string
    initials: string
  }
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  interval?: number
}

export function TestimonialCarousel({ testimonials, autoPlay = true, interval = 8000 }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (!autoPlay) return

    const intervalId = setInterval(() => {
      next()
    }, interval)

    return () => clearInterval(intervalId)
  }, [autoPlay, interval, next])

  if (testimonials.length === 0) return null

  return (
    <div className="relative py-10">
      <div className="overflow-hidden">
        <div className="relative mx-auto max-w-3xl px-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            >
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="pt-6">
                  <div className="relative">
                    <Quote className="absolute -top-6 -left-6 h-12 w-12 text-primary/20" />
                    <blockquote className="text-xl font-medium leading-8 text-center">
                      "{testimonial.content}"
                    </blockquote>
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                      <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                      <AvatarFallback>{testimonial.author.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.author.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.author.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-background/90" onClick={prev}>
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-background/90" onClick={next}>
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>

      <div className="mt-6 flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "bg-primary w-4" : "bg-primary/30"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to testimonial {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
