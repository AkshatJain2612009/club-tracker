"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TranscriptPage() {
  const [profile, setProfile] = useState<any>(null)
  const [records, setRecords] = useState<any[]>([])
  const [date, setDate] = useState('')

  useEffect(() => { 
    // This ensures the date is only calculated on the client device, fixing the Vercel error
    setDate(new Date().toLocaleDateString())
    fetchData() 
  }, [])

  async function fetchData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: pData } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    setProfile(pData)
    const { data: sData } = await supabase.from('submissions').select('*, activities(topic, date)').eq('student_id', user.id)
    if (sData) setRecords(sData)
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-12 flex flex-col items-center">
      <div className="bg-white w-full max-w-4xl p-8 md:p-16 shadow-2xl rounded-sm border-[12px] border-double border-slate-800">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-slate-900 uppercase tracking-widest">Co-Curricular Transcript</h1>
          <div className="h-1 w-32 bg-blue-600 mx-auto my-4"></div>
          <p className="text-slate-500 font-serif italic">Official MSOT Academy Verification Record</p>
        </div>

        <div className="flex justify-between mb-12 text-slate-700 font-serif">
          <div>
            <p className="text-sm uppercase tracking-tight text-slate-400">Student Name</p>
            <p className="text-xl font-bold">{profile?.full_name || 'Loading...'}</p>
          </div>
          <div className="text-right">
            <p className="text-sm uppercase tracking-tight text-slate-400">Date of Issue</p>
            <p className="text-xl font-bold">{date}</p>
          </div>
        </div>

        <table className="w-full text-left border-collapse mb-16">
          <thead>
            <tr className="border-b-2 border-slate-800 text-slate-900 font-serif uppercase text-sm">
              <th className="py-3 px-2">Activity/Topic</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Score</th>
              <th className="py-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody className="font-serif text-slate-700">
            {records.length === 0 ? (
              <tr><td colSpan={4} className="py-10 text-center text-slate-400 italic">No verified records available.</td></tr>
            ) : (
              records.map((r, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-2 font-medium">{r.activities?.topic}</td>
                  <td className="py-4 px-2">{r.activities?.date}</td>
                  <td className="py-4 px-2 font-bold">{r.score || 'TBD'}</td>
                  <td className="py-4 px-2 text-emerald-600 font-bold">Verified ✓</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-end mt-20">
          <div className="text-center">
            <div className="w-48 border-t border-slate-800 mb-2"></div>
            <p className="text-xs uppercase text-slate-400">Student Signature</p>
          </div>
          <div className="text-center">
            <div className="w-48 border-t border-slate-800 mb-2"></div>
            <p className="text-xs uppercase text-slate-400">Academic Registrar</p>
          </div>
        </div>
      </div>
      <button onClick={() => window.print()} className="mt-8 px-6 py-3 bg-slate-800 text-white rounded-full hover:bg-slate-900 transition-all shadow-lg font-bold cursor-pointer">
        Download PDF Transcript
      </button>
    </div>
  )
}
