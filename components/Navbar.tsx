"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 text-white p-1.5 rounded-lg font-bold text-xl">♣️</div>
        <span className="text-xl font-bold tracking-tight text-slate-800">
          Club<span className="text-blue-600">Tracker</span>
        </span>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <Link href="/student" className="hover:text-blue-600 transition-colors">Student</Link>
        <Link href="/admin" className="hover:text-blue-600 transition-colors">Admin</Link>
        <Link href="/transcript" className="hover:text-blue-600 transition-colors">Transcript</Link>
        <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all shadow-sm">
          Login
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        <svg
          className="h-6 w-6 text-slate-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-slate-200 md:hidden">
          <div className="flex flex-col p-4 space-y-3 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link href="/student" className="hover:text-blue-600 transition-colors" onClick={() => setMobileOpen(false)}>
              Student
            </Link>
            <Link href="/admin" className="hover:text-blue-600 transition-colors" onClick={() => setMobileOpen(false)}>
              Admin
            </Link>
            <Link href="/transcript" className="hover:text-blue-600 transition-colors" onClick={() => setMobileOpen(false)}>
              Transcript
            </Link>
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-full text-center hover:bg-blue-700 transition-all" onClick={() => setMobileOpen(false)}>
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
