import { useState } from 'react'

interface SearchInputProps {
  onSearch: (url: string) => void
  loading: boolean
}

export function SearchInput({ onSearch, loading }: SearchInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSearch(value.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative group max-w-3xl mx-auto w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Insira a URL para download (ex: Instagram, TikTok, etc...)"
        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 placeholder:text-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all shadow-xl"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="absolute right-3 top-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white px-5 py-2 rounded-xl font-semibold transition-all cursor-pointer"
      >
        {loading ? 'Analisando...' : 'Analisar'}
      </button>
    </form>
  )
}