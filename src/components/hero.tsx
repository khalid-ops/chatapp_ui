/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6yIr7dSwjMe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom"
import { Button } from "../lib/ui/button.tsx"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl">
                Unlock fast & secure Socializing
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Enjoy seamless sharing and communication.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
                <Button className="w-full" asChild>
                    <Link to='/login'>Get Started</Link>
                </Button>
            </div>
          </div>
          <img
            src="src/assets/social1.1.svg"
            width="550"
            height="310"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  )
}