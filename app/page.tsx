export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 text-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="max-w-3xl">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
          MSOT Academy Official
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Track Your <span className="text-blue-600">Club Journey</span> in Real-Time.
        </h1>
        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
          The all-in-one platform for club memberships, verified attendance, 
          and digital co-curricular transcripts.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/login" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            Get Started Now
          </a>
          <a href="/transcript" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">
            View Sample Transcript
          </a>
        </div>
      </div>
    </div>
  )
}

