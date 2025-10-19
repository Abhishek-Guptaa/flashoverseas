import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

type CarouselApi = {
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollPrev: () => void
  scrollNext: () => void
}

type UseCarouselReturn = {
  carouselRef: React.RefObject<HTMLDivElement>
  api: CarouselApi
  current: number
  count: number
}

const useCarousel = (): UseCarouselReturn => {
  const [api, setApi] = React.useState<CarouselApi | undefined>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const carouselRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!carouselRef.current) return

    const carousel = carouselRef.current
    const items = carousel.querySelectorAll('[data-carousel-item]')
    const totalItems = items.length

    setCount(totalItems)

    const updateApi = () => {
      const scrollLeft = carousel.scrollLeft
      const scrollWidth = carousel.scrollWidth
      const clientWidth = carousel.clientWidth

      const canScrollPrev = scrollLeft > 0
      const canScrollNext = scrollLeft < scrollWidth - clientWidth

      setApi({
        canScrollPrev,
        canScrollNext,
        scrollPrev: () => {
          carousel.scrollBy({ left: -carousel.clientWidth, behavior: 'smooth' })
        },
        scrollNext: () => {
          carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' })
        },
      })

      // Update current item
      const itemWidth = carousel.clientWidth
      const newCurrent = Math.round(scrollLeft / itemWidth)
      setCurrent(newCurrent)
    }

    updateApi()
    carousel.addEventListener('scroll', updateApi)
    window.addEventListener('resize', updateApi)

    return () => {
      carousel.removeEventListener('scroll', updateApi)
      window.removeEventListener('resize', updateApi)
    }
  }, [])

  return { carouselRef, api, current, count }
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative", className)}
    {...props}
  />
))
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex overflow-hidden scroll-smooth",
      className
    )}
    {...props}
  />
))
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-carousel-item
    className={cn("min-w-0 flex-shrink-0 flex-grow-0", className)}
    {...props}
  />
))
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { api?: CarouselApi }
>(({ className, api, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white border border-slate-200 flex items-center justify-center transition-colors",
      className
    )}
    onClick={() => api?.scrollPrev()}
    disabled={!api?.canScrollPrev}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only">Previous slide</span>
  </button>
))
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { api?: CarouselApi }
>(({ className, api, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white border border-slate-200 flex items-center justify-center transition-colors",
      className
    )}
    onClick={() => api?.scrollNext()}
    disabled={!api?.canScrollNext}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
    <span className="sr-only">Next slide</span>
  </button>
))
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  useCarousel,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
