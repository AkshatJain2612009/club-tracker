"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [campuses, setCampuses] = useState<any[]>([])
  const [clubs, setClubs] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])
  const [activities, setActivities] = useState<any[]>([])
  const [submissions, setSubmissions] = useState<any[]>([])
  const [newCampus, setNewCampus] = useState('')
  const [clubName, setClubName] = useState('')
  const [selectedCampus, setSelectedCampus] = useState('')
  const [selectedClubForAct, setSelectedClubForAct] = useState('')
  const [actTopic, setActTopic] = useState('')
  const [actDate, setActDate] = useState('')
  const [actCode, setActCode] = useState('')
  const [scoreVal, setScoreVal] = useState<any>({})
  const [feedbackVal, setFeedbackVal] = useState<any>({})

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data: cD } = await supabase.from('campuses').select('*')
    const { data: clD } = await supabase.from('clubs').select('*, campuses(name)')
    const { data: rD } = await supabase.from('memberships').select('*, profiles(full_name), clubs(name)')
    const { data: aD } = await supabase.from('activities').select('*, clubs(name)')
    const { data: sD } = await supabase.from('submissions').select('*, profiles(full_name), activities(topic)')
    if (cD) setCampuses(cD); if (clD) setClubs(clD); if (rD) setRequests(rD); if (aD) setActivities(aD); if (sD) setSubmissions(sD)
  }

  async function addCampus() {
    if (!newCampus) return alert("Type a name!"); await supabase.from('campuses').insert([{ name: newCampus }]); setNewCampus(''); fetchData()
  }
  async function addClub() {
    if (!clubName || !selectedCampus) return alert("Fill all fields!"); await supabase.from('clubs').insert([{ name: clubName, campus_id: selectedCampus }]); setClubName(''); fetchData()
  }
  async function approveMember(id: string) {
    await supabase.from('memberships').update({ status: 'approved' }).eq('id', id); fetchData()
  }
  async function addActivity() {
    if (!selectedClubForAct || !actTopic || !actDate || !actCode) return alert("Fill all fields!")
    await supabase.from('activities').insert([{ club_id: selectedClubForAct, topic: actTopic, date: actDate, session_code: actCode, status: 'planned' }])
    setActTopic(''); setActDate(''); setActCode(''); setSelectedClubForAct(''); fetchData()
  }
  async function gradeSubmission(id: string) {
    const s = scoreVal[id]; const f = feedbackVal[id]
    if (s === undefined) return alert("Enter a score!")
    await supabase.from('submissions').update({ score: s, feedback: f }).eq('id', id)
    alert("Graded!"); fetchData()
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Admin Control Panel</h1>
          <p className="text-slate-500">Manage campuses, clubs, and student certifications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Campus Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">🏫 Campus Manager</h2>
            <div className="flex gap-2 mb-4">
              <input type="text" placeholder="Campus Name" value={newCampus} onChange={(e) => setNewCampus(e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              <button onClick={addCampus} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium">Add</button>
            </div>
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {campuses.map((c: any) => <li key={c.id} className="p-2 bg-slate-50 rounded-md text-sm text-slate-600 border border-slate-100">{c.name}</li>)}
            </ul>
          </div>

          {/* Club Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">♣️ Club Manager</h2>
            <div className="space-y-3 mb-4">
              <input type="text" placeholder="Club Name" value={clubName} onChange={(e) => setClubName(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              <select value={selectedCampus} onChange={(e) => setSelectedCampus(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                <option value="">Select Campus</option>
                {campuses.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <button onClick={addClub} className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium">Create Club</button>
            </div>
          </div>
        </div>

        {/* Activity Planner Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">📅 Activity Planner (Verified)</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
            <select value={selectedClubForAct} onChange={(e) => setSelectedClubForAct(e.target.value)} className="px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Club</option>{clubs.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input type="text" placeholder="Topic" value={actTopic} onChange={(e) => setActTopic(e.target.value)} className="px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="date" value={actDate} onChange={(e) => setActDate(e.target.value)} className="px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" placeholder="Secret Code" value={actCode} onChange={(e) => setActCode(e.target.value)} className="px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500" />
            <button onClick={addActivity} className="py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-medium">Plan</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activities.map((a: any) => <div key={a.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm flex justify-between items-center"><span>📅 {a.date} - <b className="text-slate-800">{a.clubs?.name}</b>: {a.topic}</span> <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">Code: {a.session_code}</span></div>)}
          </div>
        </div>

        {/* Evaluator Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">📝 Submission Evaluator</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold border-b border-slate-200">Student</th>
                  <th className="p-3 font-semibold border-b border-slate-200">Activity</th>
                  <th className="p-3 font-semibold border-b border-slate-200">Work</th>
                  <th className="p-3 font-semibold border-b border-slate-200">Score</th>
                  <th className="p-3 font-semibold border-b border-slate-200">Feedback</th>
                  <th className="p-3 font-semibold border-b border-slate-200">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600">
                {submissions.map((s: any) => (
                  <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium text-slate-800">{s.profiles?.full_name}</td>
                    <td className="p-3">{s.activities?.topic}</td>
                    <td className="p-3"><a href={s.content} target="_blank" className="text-blue-600 hover:underline font-medium">View Link</a></td>
                    <td className="p-3"><input type="number" value={scoreVal[s.id] || s.score || ''} onChange={(e) => setScoreVal({...scoreVal, [s.id]: e.target.value})} className="w-16 p-1 border rounded outline-none focus:ring-1 focus:ring-blue-500" /></td>
                    <td className="p-3"><input type="text" value={feedbackVal[s.id] || s.feedback || ''} onChange={(e) => setFeedbackVal({...feedbackVal, [s.id]: e.target.value})} className="p-1 border rounded outline-none focus:ring-1 focus:ring-blue-500" /></td>
                    <td className="p-3"><button onClick={() => gradeSubmission(s.id)} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all text-xs font-bold">Grade</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
