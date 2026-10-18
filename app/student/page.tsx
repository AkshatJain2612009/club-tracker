"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function StudentPage() {
  const [clubs, setClubs] = useState<any[]>([])
  const [myActivities, setMyActivities] = useState<any[]>([])
  const [submissionText, setSubmissionText] = useState<any>({})
  const [codeText, setCodeText] = useState<any>({})

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data: allClubs } = await supabase.from('clubs').select('*, campuses(name)')
    if (allClubs) setClubs(allClubs)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: myApprovedClubs } = await supabase.from('memberships').select('club_id').eq('student_id', user.id).eq('status', 'approved')
      if (myApprovedClubs && myApprovedClubs.length > 0) {
        const clubIds = myApprovedClubs.map(m => m.club_id)
        const { data: acts } = await supabase.from('activities').select('*, clubs(name)').in('club_id', clubIds)
        if (acts) setMyActivities(acts)
      }
    }
  }

  async function joinClub(clubId: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return alert("Please login first!")
    await supabase.from('memberships').insert([{ student_id: user.id, club_id: clubId, status: 'pending' }])
    alert("Request sent!")
  }

  async function checkIn(activityId: string, correctCode: string) {
    const enteredCode = codeText[activityId]
    if (!enteredCode) return alert("Please enter the secret code!")
    if (enteredCode !== correctCode) return alert("Wrong code!")
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return alert("Login required!")
    await supabase.from('attendance').insert([{ activity_id: activityId, student_id: user.id, status: 'present' }])
    alert("Verified! Check-in Successful.")
  }

  async function submitWork(activityId: string) {
    const { data: { user } } = await supabase.auth.getUser()
    const content = submissionText[activityId]
    if (!user || !content) return alert("Please enter a link!")
    await supabase.from('submissions').insert([{ activity_id: activityId, student_id: user.id, content: content }])
    alert("Work submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900">My Learning Hub</h1>
          <p className="text-slate-500">Track your sessions and submit your club deliverables.</p>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">📅 Active Sessions</h2>
          <div className="grid gap-4">
            {myActivities.length === 0 ? <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">No active sessions found for your clubs.</div> : (
              myActivities.map(act => (
                <div key={act.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{act.clubs?.name}</h3>
                      <p className="text-sm text-slate-500">{act.topic} • {act.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 flex gap-2">
                      <input type="text" placeholder="Secret Code" onChange={(e) => setCodeText({...codeText, [act.id]: e.target.value})} className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-green-500" />
                      <button onClick={() => checkIn(act.id, act.session_code)} className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-all">Verify</button>
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input type="text" placeholder="Submission Link" onChange={(e) => setSubmissionText({...submissionText, [act.id]: e.target.value})} className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500" />
                      <button onClick={() => submitWork(act.id)} className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all">Submit</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">♣️ Discover Clubs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {clubs.map(club => (
              <div key={club.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-800">{club.name}</h3>
                  <p className="text-xs text-slate-400">{club.campuses?.name}</p>
                </div>
                <button onClick={() => joinClub(club.id)} className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all">Join</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
