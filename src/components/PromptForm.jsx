import { useState } from 'react'

const STYLES = ["realistic", "cinematic", "anime", "horror", "cartoon", "digital art"]
const DURATIONS = [3, 5, 10, 20]
const RATIOS = ["16:9", "9:16", "1:1", "4:3"]

function PromptForm({ onGenerate }) {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('cinematic')
  const [duration, setDuration] = useState(5)
  const [aspect, setAspect] = useState('16:9')
  const [variations, setVariations] = useState(1)
  const [refImages, setRefImages] = useState([])
  const [img2vidImages, setImg2vidImages] = useState([])
  const [loading, setLoading] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const uploadFiles = async (files, type) => {
    const ids = []
    for (const f of files) {
      const fd = new FormData()
      fd.append('file', f)
      fd.append('type', type)
      const res = await fetch(`${baseUrl}/api/upload`, { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      ids.push(data.id)
    }
    return ids
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return
    setLoading(true)
    try {
      const refIds = await uploadFiles(refImages, 'reference')
      const img2vidIds = await uploadFiles(img2vidImages, 'image2video')

      const res = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          duration: Number(duration),
          style,
          aspect_ratio: aspect,
          variations: Number(variations),
          reference_image_ids: refIds,
          image_to_video_ids: img2vidIds
        })
      })

      const data = await res.json()
      onGenerate?.(data)
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 md:p-8 backdrop-blur space-y-6">
      <div>
        <label className="block text-sm text-slate-200 mb-2">Describe your video</label>
        <textarea
          className="w-full rounded-xl bg-slate-900 text-slate-100 placeholder-slate-400 border border-slate-700 focus:border-blue-500 focus:outline-none p-4 min-h-[100px]"
          placeholder="A neon-lit city street at night, rain reflections, slow camera dolly..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs text-slate-300 mb-1">Duration</label>
          <select value={duration} onChange={(e)=>setDuration(e.target.value)} className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2.5">
            {DURATIONS.map(d => <option key={d} value={d}>{d}s</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Style</label>
          <select value={style} onChange={(e)=>setStyle(e.target.value)} className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2.5">
            {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Aspect Ratio</label>
          <select value={aspect} onChange={(e)=>setAspect(e.target.value)} className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2.5">
            {RATIOS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Variations</label>
          <input type="number" min={1} max={8} value={variations} onChange={(e)=>setVariations(e.target.value)} className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2.5" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-slate-200 mb-2">Reference images (character consistency)</label>
          <input multiple type="file" accept="image/*" onChange={(e)=>setRefImages([...e.target.files])} className="block w-full text-sm text-slate-300" />
        </div>
        <div>
          <label className="block text-sm text-slate-200 mb-2">Image-to-video images</label>
          <input multiple type="file" accept="image/*" onChange={(e)=>setImg2vidImages([...e.target.files])} className="block w-full text-sm text-slate-300" />
        </div>
      </div>

      <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/60 text-white font-semibold rounded-xl py-3 transition-colors">
        {loading ? 'Generating…' : 'Generate Video'}
      </button>
    </form>
  )
}

export default PromptForm
