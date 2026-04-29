import { Cpu, Globe, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Cpu className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">AR</span>
                <span className="text-xl font-extrabold gradient-text-static tracking-tight">KON</span>
              </div>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed max-w-sm mb-6 font-medium">
              Augmented Reality Komputer Organizer — Mengubah diagram mati di buku menjadi
              laboratorium CPU virtual yang interaktif dan modern.
            </p>
            <div className="flex items-center gap-2">
              <span className="badge badge-primary">LIDM 2025</span>
              <span className="badge badge-success">ITDP UNNES</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Navigasi</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Beranda' },
                { to: '/topics', label: 'Topik AR' },
                { to: '/quiz', label: 'Kuis Interaktif' },
                { to: '/dashboard', label: 'Dashboard' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-emerald-400 text-sm font-semibold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Informasi</h4>
            <ul className="space-y-4">
              <li className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Divisi ITDP · UNNES</li>
              <li className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Universitas Negeri Semarang</li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-emerald-400 text-sm font-semibold transition-colors duration-200"
                >
                  <Globe className="w-4 h-4" />
                  Website Official
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 dark:text-slate-500 text-xs font-semibold">
            © 2025 ARKON — Inovasi Teknologi Digital Pendidikan
          </p>
          <p className="text-slate-400 dark:text-slate-600 text-xs font-medium uppercase tracking-widest">
            React · Vite · A-Frame · Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
