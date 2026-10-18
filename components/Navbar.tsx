import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 text-white p-1.5 rounded-lg font-bold text-xl">♣️</div>
        <span className="text-xl font-bold tracking-tight text-slate-800">Club<span className="text-blue-600">Tracker</span></span>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <Link href="/student" className="hover:text-blue-600 transition-colors">Student</Link>
        <Link href="/admin" className="hover:text-blue-600 transition-colors">Admin</Link>
        <Link href="/transcript" className="hover:text-blue-600 transition-colors">Transcript</Link>
        <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all shadow-sm">Login</Link>
      </div>
    </nav>
  )
}
