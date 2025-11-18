import { useEffect, useState } from 'react'

function Gallery() {
  const [jobs, setJobs] = useState([])
  const [history, setHistory] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchData = async () => {
    const j = await fetch(`${baseUrl}/api/jobs`).then(r=>r.json())
    const h = await fetch(`${baseUrl}/api/history`).then(r=>r.json())
    setJobs(j)
    setHistory(h)
  }

  useEffect(()=>{ fetchData() }, [])

  const toggleSave = async (jobId, saved) => {
    await fetch(`${baseUrl}/api/save`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ job_id: jobId, saved: !saved }) })
    fetchData()
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold text-white mb-4">Recent Generations</h2>
      {jobs.length === 0 && (
        <p className="text-slate-300/80">No videos yet. Generate something above!</p>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <div key={job.id} className="bg-slate-800/70 border border-slate-700/60 rounded-xl overflow-hidden">
            <div className="aspect-video bg-slate-900">
              {/* Using video tag with sample url */}
              <video src={job.video_url} controls className="w-full h-full object-cover" />
            </div>
            <div className="p-4 space-y-2">
              <p className="text-slate-100 text-sm line-clamp-2">{job.prompt}</p>
              <div className="flex items-center justify-between text-xs text-slate-300/80">
                <span>{job.style} • {job.duration}s • {job.aspect_ratio}</span>
                <button onClick={()=>toggleSave(job.id, job.saved)} className={`px-2 py-1 rounded border ${job.saved ? 'border-emerald-400 text-emerald-300' : 'border-slate-600 text-slate-300'}`}>{job.saved ? 'Saved' : 'Save'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Prompt History</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {history.map(h => (
          <div key={h.id} className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-4">
            <p className="text-slate-100 text-sm">{h.prompt}</p>
            <div className="text-xs text-slate-400 mt-2">{h.style} • {h.duration}s • {h.aspect_ratio} • {h.variations} variations</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gallery
