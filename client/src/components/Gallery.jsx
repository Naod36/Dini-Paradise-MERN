"use client"

import { useState, useEffect, useRef } from "react"
import ImageWithFallback from "./figma/ImageWithFallback";
import { cn } from "../lib/utils"

export default function Gallery({ backgroundImage, images, rotationInterval = 3000, className }) {
  const [currentMainImage, setCurrentMainImage] = useState(0)
  const [tiltAngles, setTiltAngles] = useState({ rotateX: 0, rotateY: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const mainImageRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMainImage((prev) => (prev + 1) % images.length)
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [images.length, rotationInterval])

  const handleMouseMove = (e) => {
    if (!mainImageRef.current) return

    const rect = mainImageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)

    const maxTilt = 15
    setTiltAngles({
      rotateX: -y * maxTilt,
      rotateY: x * maxTilt,
    })
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => {
    setIsHovering(false)
    setTiltAngles({ rotateX: 0, rotateY: 0 })
  }

  const currentImage = images[currentMainImage]

  return (
    <section className={cn("relative min-h-screen w-full overflow-hidden", className)}>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 h-32 w-32 animate-float rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
          <div
            className="absolute top-1/2 right-1/4 h-40 w-40 animate-float-delayed rounded-full bg-gradient-to-br from-pink-500/20 to-orange-500/20 blur-3xl"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 h-36 w-36 animate-float rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 blur-3xl"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/3 right-1/3 h-28 w-28 animate-float-delayed rounded-full bg-gradient-to-br from-yellow-500/20 to-red-500/20 blur-3xl"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-20">
        <div className="relative h-[500px] w-full max-w-4xl" style={{ perspective: "1000px" }}>
          <div
            ref={mainImageRef}
            className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isHovering
                ? `rotateX(${tiltAngles.rotateX}deg) rotateY(${tiltAngles.rotateY}deg) scale(1.02)`
                : "rotateX(0deg) rotateY(0deg) scale(1)",
              transition: "transform 0.2s ease-out",
              transformStyle: "preserve-3d",
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000",
                  currentMainImage === index ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
              >
                <ImageWithFallback
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt || `Featured image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8">
              <h3 className="mb-2 text-3xl font-bold text-white">{currentImage.name}</h3>
              <p className="text-lg text-white/90">{currentImage.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentMainImage(index)}
              className={cn(
                "group relative h-28 w-28 overflow-hidden rounded-xl transition-all duration-300",
                currentMainImage === index
                  ? "ring-4 ring-white shadow-2xl scale-105"
                  : "opacity-70 hover:opacity-100 hover:scale-110 hover:shadow-xl",
              )}
            >
              <ImageWithFallback
                src={image.src || "/placeholder.svg"}
                alt={image.alt || `Thumbnail ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-xs font-semibold text-white line-clamp-2">{image.name}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* <div className="max-w-2xl rounded-xl bg-white/90 p-8 text-center backdrop-blur-sm dark:bg-black/90">
          <h2 className="mb-4 text-4xl font-bold">Parallax Gallery</h2>
          <p className="text-lg text-muted-foreground">
            Scroll to experience the parallax effect. Hover over the main image to see it move with your mouse. Click
            thumbnails to change the image, or watch them rotate automatically.
          </p>
        </div> */}
      </div>
    </section>
  )
}
