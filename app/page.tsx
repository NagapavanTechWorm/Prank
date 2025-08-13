"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function TrustPrankApp() {
  const [step, setStep] = useState(1)
  const [showMessage, setShowMessage] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [countdown, setCountdown] = useState(15)
  const [showCracks, setShowCracks] = useState(false)
  const [corruptionLevel, setCorruptionLevel] = useState(0)
  const [showGlitch, setShowGlitch] = useState(false)
  const [digitalNoise, setDigitalNoise] = useState("")
  const [systemMessages, setSystemMessages] = useState<string[]>([])
  const [bloodDrips, setBloodDrips] = useState<Array<{ x: number; delay: number }>>([])

  // Move the "No" button to random position (mobile-friendly)
  const moveNoButton = () => {
    const maxX = window.innerWidth - 140 // button width + padding
    const maxY = window.innerHeight - 60 // button height + padding
    setNoButtonPosition({
      x: Math.max(70, Math.random() * maxX),
      y: Math.max(100, Math.random() * maxY),
    })
  }

  const handleNoClick = () => {
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
      setStep(2)
    }, 2000)
  }

  const handleYesClick = () => {
    setStep(2)
  }

  // Generate corrupted digital noise
  const generateDigitalNoise = () => {
    const chars = "█▓▒░▄▀■□▪▫◘◙☻☺♠♣♥♦01"
    let result = ""
    for (let i = 0; i < 150; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
      if (i % 15 === 0) result += "\n"
    }
    return result
  }

  // Generate blood drips
  const generateBloodDrips = () => {
    const drips = []
    for (let i = 0; i < 12; i++) {
      drips.push({
        x: Math.random() * 100,
        delay: Math.random() * 3,
      })
    }
    setBloodDrips(drips)
  }

  // Step 2 effects
  useEffect(() => {
    if (step === 2) {
      // Digital corruption effect
      const corruptionInterval = setInterval(() => {
        setCorruptionLevel((prev) => {
          if (prev >= 100) return 100
          return prev + 2
        })
      }, 100)

      // Digital noise generation
      const noiseInterval = setInterval(() => {
        setDigitalNoise(generateDigitalNoise())
      }, 150)

      // System messages appearing
      const messageTimeout = setTimeout(() => {
        const messages = [
          "DEVICE COMPROMISED",
          "UNAUTHORIZED ACCESS DETECTED",
          "MALWARE INJECTION COMPLETE",
          "PERSONAL DATA BEING STOLEN...",
          "CAMERA ACTIVATED REMOTELY",
          "MICROPHONE RECORDING ACTIVE",
          "BANKING CREDENTIALS ACCESSED",
          "LOCATION TRACKING ENABLED",
          "ALL FILES BEING ENCRYPTED",
        ]

        let messageIndex = 0
        const messageInterval = setInterval(() => {
          if (messageIndex < messages.length) {
            setSystemMessages((prev) => [...prev, messages[messageIndex]])
            messageIndex++
          } else {
            clearInterval(messageInterval)
          }
        }, 1200)
      }, 2000)

      // Screen cracks
      const cracksTimeout = setTimeout(() => {
        setShowCracks(true)
      }, 4000)

      // Glitch effects
      const glitchTimeout = setTimeout(() => {
        setShowGlitch(true)
      }, 3000)

      // Countdown
      const countdownTimeout = setTimeout(() => {
        const countdownInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }, 5000)

      return () => {
        clearInterval(corruptionInterval)
        clearInterval(noiseInterval)
        clearTimeout(messageTimeout)
        clearTimeout(cracksTimeout)
        clearTimeout(glitchTimeout)
        clearTimeout(countdownTimeout)
      }
    }
  }, [step])

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Beautiful floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {showMessage && (
          <div className="absolute inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white/90 backdrop-blur-sm border-2 border-red-200 text-red-600 p-4 sm:p-6 rounded-2xl text-lg sm:text-xl font-semibold shadow-2xl animate-bounce max-w-sm">
              <div className="text-red-500 text-center">Oops! Try again 😊</div>
              <div className="text-gray-600 text-sm mt-2 text-center">The button is a bit shy...</div>
            </div>
          </div>
        )}

        <div className="text-center mb-8 sm:mb-12 relative px-4">
          <h1 className="text-gray-800 text-4xl sm:text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
            Do You Trust Me?
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed">
            This is a simple question that requires your honest answer. Choose wisely! ✨
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8 items-center w-full max-w-sm">
          <Button
            onClick={handleYesClick}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 h-auto font-semibold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-green-500/30 border-0 w-full"
            size="lg"
          >
            Yes, I Trust You! 💚
          </Button>

          <Button
            onClick={handleNoClick}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            className="bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto font-medium rounded-2xl shadow-lg transition-all duration-300 absolute hover:shadow-red-400/30 border-0 z-10"
            style={{
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              transform: "translate(-50%, -50%)",
            }}
            size="sm"
          >
            No, I Don't 🤔
          </Button>
        </div>

        <div className="mt-8 sm:mt-12 text-gray-500 text-sm text-center max-w-sm px-4">
          <p>💡 Hint: One of these buttons might be a little playful!</p>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div
        className="min-h-screen flex flex-col relative overflow-hidden transition-all duration-300"
        style={{
          background: `linear-gradient(45deg, 
            rgb(${Math.min(40 + corruptionLevel / 2, 80)}, 0, 0), 
            rgb(0, 0, 0), 
            rgb(${Math.min(60 + corruptionLevel / 3, 100)}, 0, 0)
          )`,
          filter: showGlitch ? "contrast(200%) saturate(300%) brightness(0.7)" : "contrast(120%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-red-500 opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: "0%",
                height: `${30 + Math.random() * 70}%`,
                animationDelay: `${i * 0.3}s`,
                boxShadow: "0 0 8px rgba(239, 68, 68, 0.8)",
              }}
            />
          ))}
        </div>

        {showGlitch && (
          <div className="absolute inset-0 opacity-30 font-mono text-red-400 text-xs overflow-hidden pointer-events-none whitespace-pre leading-none p-2">
            {digitalNoise}
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl sm:text-3xl md:text-5xl animate-pulse"
              style={{
                left: `${(i * 15 + 10) % 85}%`,
                top: `${(i * 20 + 15) % 75}%`,
                color: `rgb(${200 + corruptionLevel / 3}, 0, 0)`,
                textShadow: `0 0 15px rgb(${200 + corruptionLevel / 3}, 0, 0)`,
                transform: `rotate(${Math.sin(Date.now() / 1000 + i) * 10}deg)`,
              }}
            >
              ⚠️
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-center relative z-10">
          <div className="bg-black/95 border-4 border-red-600 text-red-300 p-4 sm:p-6 md:p-8 rounded-lg mb-6 sm:mb-8 max-w-xs sm:max-w-lg shadow-2xl shadow-red-900/80 backdrop-blur-sm relative overflow-hidden">
            {showGlitch && (
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/50 via-transparent to-red-800/50 animate-pulse"></div>
            )}

            <div className="relative z-10">
              <div
                className="text-4xl sm:text-5xl md:text-7xl mb-4 animate-bounce filter drop-shadow-lg"
                style={{
                  color: `rgb(${220 + corruptionLevel / 4}, 0, 0)`,
                  textShadow: `0 0 30px rgb(${220 + corruptionLevel / 4}, 0, 0)`,
                }}
              >
                🚨
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-red-200 font-mono tracking-wider animate-pulse">
                DEVICE HACKED
              </h2>
              <p className="text-sm sm:text-base md:text-lg mb-2 font-mono text-red-400 animate-pulse">
                UNAUTHORIZED ACCESS DETECTED
              </p>
              <p className="text-xs sm:text-sm text-red-500 font-mono animate-pulse">SECURITY BREACH IN PROGRESS</p>
              <div className="mt-4 text-xs text-red-700 font-mono border-t border-red-800 pt-2">[MALWARE ACTIVE]</div>
              <div className="mt-2 text-xs text-red-800 font-mono">[DATA THEFT: {corruptionLevel}%]</div>
            </div>
          </div>

          <div className="mb-4 sm:mb-6 space-y-2 max-w-xs sm:max-w-md w-full px-2">
            {systemMessages.map((message, index) => (
              <div
                key={index}
                className="bg-black/80 border border-red-600 text-red-300 p-2 sm:p-3 rounded font-mono text-xs sm:text-sm animate-pulse"
                style={{
                  textShadow: `0 0 10px rgb(220, 38, 38)`,
                }}
              >
                ► {message}
              </div>
            ))}
          </div>

          {countdown <= 15 && countdown > 0 && (
            <div className="text-red-400 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-mono animate-bounce mb-4 filter drop-shadow-lg text-center">
              <span className="text-red-500 block sm:inline">WIPE IN:</span>{" "}
              <span
                className="text-red-300 block sm:inline"
                style={{
                  textShadow: `0 0 40px rgb(220, 38, 38)`,
                }}
              >
                {countdown}
              </span>
            </div>
          )}

          {countdown === 0 && (
            <div className="text-red-300 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold font-mono animate-pulse filter drop-shadow-lg text-center">
              <div
                className="text-red-500 mb-2"
                style={{
                  textShadow: `0 0 50px rgb(220, 38, 38)`,
                }}
              >
                DEVICE
              </div>
              <div
                className="text-red-400"
                style={{
                  textShadow: `0 0 50px rgb(220, 38, 38)`,
                }}
              >
                DESTROYED
              </div>
            </div>
          )}
        </div>

        {showCracks && (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M20,10 L30,25 L45,20 L60,35 L80,30"
                stroke="rgba(220,38,38,0.9)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
                filter="drop-shadow(0 0 8px rgba(220,38,38,1))"
              />
              <path
                d="M10,40 L25,50 L40,45 L55,60 L70,55 L90,70"
                stroke="rgba(185,28,28,0.8)"
                strokeWidth="1.5"
                fill="none"
                className="animate-pulse"
                filter="drop-shadow(0 0 6px rgba(185,28,28,1))"
              />
              <path
                d="M15,70 L35,80 L50,75 L75,90"
                stroke="rgba(239,68,68,0.8)"
                strokeWidth="2.5"
                fill="none"
                className="animate-pulse"
                filter="drop-shadow(0 0 10px rgba(239,68,68,1))"
              />
              <path
                d="M5,5 L95,95"
                stroke="rgba(220,38,38,0.9)"
                strokeWidth="3"
                fill="none"
                className="animate-pulse"
                filter="drop-shadow(0 0 12px rgba(220,38,38,1))"
              />
            </svg>
          </div>
        )}

        {/* ... existing glitch effects ... */}
        {showGlitch && (
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-red-900/40 via-red-600/30 to-red-900/40 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-800/20 to-black/90"></div>
          </div>
        )}

        {showGlitch && (
          <div
            className="absolute inset-0 opacity-25 pointer-events-none animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.6'/%3E%3C/svg%3E")`,
              mixBlendMode: "multiply",
              filter: "hue-rotate(0deg) saturate(200%)",
            }}
          />
        )}
      </div>
    )
  }

  return null
}
