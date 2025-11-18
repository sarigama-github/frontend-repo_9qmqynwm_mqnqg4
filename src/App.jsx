import Hero from './components/Hero'
import PromptForm from './components/PromptForm'
import Gallery from './components/Gallery'

function App() {
  const handleGenerated = () => {
    // No-op, gallery auto-refreshes by fetching from API
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      <Hero />
      <main className="relative z-10 -mt-24 md:-mt-28 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <PromptForm onGenerate={handleGenerated} />
        </div>
        <Gallery />
      </main>
      <footer className="border-t border-slate-800/60 py-8 text-center text-slate-400">
        Built with VideoGen AI • Create stunning videos from text
      </footer>
    </div>
  )
}

export default App
