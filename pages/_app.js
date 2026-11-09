// pages/_app.js
import '../styles/globals.css'
import { useState } from 'react'
import Layout from '../components/Layout'

// fallback demo wallet if MetaMask not used
function generateDemoWallet(username) {
  const base = Array.from(username + Date.now())
    .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('')
  return '0x' + base.slice(0, 40)
}

export default function App({ Component, pageProps }) {
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [signupName, setSignupName] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupCode, setSignupCode] = useState('')

  const [walletAddress, setWalletAddress] = useState(null)
  const [walletNfts, setWalletNfts] = useState([]) // { nftId, fileName, shaHash, signature? }

  // ------------- MetaMask connect -------------
  async function connectMetaMask() {
    if (typeof window === 'undefined') return

    if (!window.ethereum) {
      alert('MetaMask not detected. Please install the MetaMask extension.')
      return
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]) // real address from MetaMask
      }
    } catch (err) {
      console.error('MetaMask connection error:', err)
    }
  }

  function handleShowAuth() {
    setShowAuth(true)
  }

  function handleLogout() {
    setUsername('')
    setPassword('')
    setWalletAddress(null)
    setWalletNfts([])
  }

  // ------------- Auth handlers -------------

  function handleLoginSubmit(e) {
    e.preventDefault()
    if (!username || !password) return

    // if MetaMask already connected, keep that address
    // otherwise generate a demo wallet for this user
    if (!walletAddress) {
      setWalletAddress(generateDemoWallet(username))
    }

    setShowAuth(false)
  }

  function handleSignupSubmit(e) {
    e.preventDefault()
    if (!signupName || !signupPassword || !signupCode) return

    setUsername(signupName)
    setPassword(signupPassword)

    if (!walletAddress) {
      setWalletAddress(generateDemoWallet(signupName))
    }

    setShowAuth(false)
  }

  return (
    <Layout
      username={username}
      walletAddress={walletAddress}
      onShowAuth={handleShowAuth}
      onLogout={handleLogout}
      connectMetaMask={connectMetaMask}
    >
      {/* Auth modal (login / signup) */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {authMode === 'login' ? 'Login to ArtKnight' : 'Sign up for ArtKnight'}
              </h2>
              <button onClick={() => setShowAuth(false)} className="text-slate-400 text-xl">
                ×
              </button>
            </div>

            <div className="flex gap-2 mb-4 text-sm">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 rounded-lg border text-center ${
                  authMode === 'login' ? 'bg-slate-800 border-teal-400' : 'border-slate-700'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-2 rounded-lg border text-center ${
                  authMode === 'signup' ? 'bg-slate-800 border-teal-400' : 'border-slate-700'
                }`}
              >
                Sign up
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-3 text-sm">
                <input
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-teal-400"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-teal-400"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-teal-400 text-slate-950 font-semibold hover:bg-teal-300"
                >
                  Continue
                </button>

                <button
                  type="button"
                  onClick={connectMetaMask}
                  className="w-full py-2 rounded-lg border border-amber-400 text-amber-300 text-xs mt-2 hover:bg-amber-400/10"
                >
                  Connect MetaMask (optional)
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-3 text-sm">
                <input
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-teal-400"
                  placeholder="Name"
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                />
                <input
                  type="password"
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-teal-400"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                />
                <input
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-teal-400"
                  placeholder="Verification code (demo: anything)"
                  value={signupCode}
                  onChange={e => setSignupCode(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-teal-400 text-slate-950 font-semibold hover:bg-teal-300"
                >
                  Create account
                </button>

                <button
                  type="button"
                  onClick={connectMetaMask}
                  className="w-full py-2 rounded-lg border border-amber-400 text-amber-300 text-xs mt-2 hover:bg-amber-400/10"
                >
                  Connect MetaMask (optional)
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Page content gets username, walletAddress, walletNfts */}
      <Component
        {...pageProps}
        username={username}
        walletAddress={walletAddress}
        walletNfts={walletNfts}
        setWalletNfts={setWalletNfts}
      />
    </Layout>
  )
}
