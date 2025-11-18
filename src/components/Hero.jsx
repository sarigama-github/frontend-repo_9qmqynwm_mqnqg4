import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Gradient overlay for readability (doesn't block interactions) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs mb-4 backdrop-blur">
          VideoGen AI • Text-to-Video Studio
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-sm">
          Turn ideas into videos in seconds
        </h1>
        <p className="mt-4 md:mt-6 text-slate-200/90 text-base md:text-lg max-w-2xl mx-auto">
          Generate high‑quality AI videos from a simple prompt. Add reference images, choose a style, set duration, and create multiple variations instantly.
        </p>
      </div>
    </section>
  )
}

export default Hero
