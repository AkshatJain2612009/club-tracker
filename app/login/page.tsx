"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert("Error: " + error.message)
    else alert("Login Successful!")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center">
        <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">♣️</div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-slate-500 mb-8">Login to access your club records</p>
        <div className="space-y-4">
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          <button onClick={handleLogin} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">Login</button>
        </div>
      </div>
    </div>
  )
}
