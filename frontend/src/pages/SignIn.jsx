import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import {  Navigate, replace, useNavigate } from 'react-router';

export default function SignIn() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const {signup,login,isLoggedIn} = useAuthStore()
  const submitFunc = async(e)=>{
    e.preventDefault();
    
      if(isSignup){
        signup({name,username,email,password});
      }
      else{
        if(username){
          login({username_email:username,password})
        }
        else{
          login({username_email:email,password})
        }
    }
  }
  return (
    isLoggedIn ? <Navigate to='/dashboard' replace/> : <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center px-6 py-10 overflow-hidden relative">
      <Toaster position='top-right' reverseOrder={false} />
      {/* Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-violet-600/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-cyan-500/20 blur-[120px] rounded-full" />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-[40px] overflow-hidden border border-white/10 bg-[#111827]/90 backdrop-blur-xl shadow-2xl shadow-violet-500/10 relative z-10 fade-in fold-out">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-cyan-500/20 border-r border-white/10 relative overflow-hidden">
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-3xl font-black shadow-lg shadow-violet-500/30">
                A
              </div>

              <div>
                <h1 className="text-4xl font-black tracking-tight">Acexams</h1>
                <p className="text-gray-300 mt-1">Smart PYQ Learning Platform</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-5xl font-black leading-tight">
                Learn smarter.
                <br />
                Track faster.
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                Track PYQs, manage tasks, analyze study progress, and stay
                consistent with your preparation journey.
              </p>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="relative h-[280px] mt-10">
            <div className="absolute top-0 left-0 bg-[#161B22] border border-white/10 rounded-3xl p-5 w-64 shadow-xl backdrop-blur-lg animate-pulse">
              <p className="text-gray-400 mb-2">Daily Progress</p>
              <h3 className="text-5xl font-black text-cyan-400">74%</h3>
              <div className="w-full h-3 bg-white/10 rounded-full mt-4 overflow-hidden">
                <div className="h-full w-[74%] bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full" />
              </div>
            </div>

            <div className="absolute bottom-0 right-0 bg-[#161B22] border border-white/10 rounded-3xl p-5 w-60 shadow-xl backdrop-blur-lg">
              <p className="text-gray-400 mb-2">Study Streak</p>
              <h3 className="text-5xl font-black text-orange-400">18🔥</h3>
              <p className="text-sm text-gray-400 mt-2">
                You're doing amazing this week.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex items-center justify-center p-8 lg:p-14 overflow-hidden">
          <div
            className={`w-full max-w-md transition-all duration-700 ${isSignup ? 'translate-x-0 opacity-100' : 'translate-x-0 opacity-100'
              }`}
          >
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-5xl font-black tracking-tight mb-3">
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </h2>

              <p className="text-gray-400 text-lg">
                {isSignup
                  ? 'Start tracking your preparation journey.'
                  : 'Sign in to continue your learning progress.'}
              </p>
            </div>

            <form className="space-y-5" onSubmit={submitFunc}>
              {isSignup && (
                <div className="transition-all duration-500">
                  <label className="text-sm text-gray-300 mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); }}
                    placeholder="Enter your name"
                    className="w-full bg-[#161B22] border border-white/10 focus:border-violet-500 rounded-2xl px-5 py-4 outline-none transition"
                  />
                </div>
              )}

              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Email Address
                </label>
                <input
                  type={isSignup ? "email" : "text"}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                  placeholder="Enter your email"
                  className="w-full bg-[#161B22] border border-white/10 focus:border-cyan-500 rounded-2xl px-5 py-4 outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  placeholder="Enter your password"
                  className="w-full bg-[#161B22] border border-white/10 focus:border-fuchsia-500 rounded-2xl px-5 py-4 outline-none transition"
                />
              </div>

              {isSignup && (
                <div className="transition-all duration-500">
                  <label className="text-sm text-gray-300 mb-2 block">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                    className="w-full lowercase bg-[#161B22] border border-white/10 focus:border-violet-500 rounded-2xl px-5 py-4 outline-none transition"
                  />
                </div>
              )}

              {!isSignup && (
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-violet-500" />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="hover:text-violet-400 transition"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 hover:scale-[1.02] transition-all duration-300 rounded-2xl py-4 font-bold text-lg shadow-lg shadow-violet-500/30"
              >
                {isSignup ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-[#161B22] border border-white/10 rounded-2xl py-4 font-semibold hover:bg-white/5 transition">
                Google
              </button>

              <button className="bg-[#161B22] border border-white/10 rounded-2xl py-4 font-semibold hover:bg-white/5 transition">
                GitHub
              </button>
            </div>

            {/* Switch */}
            <div className="mt-10 text-center text-gray-400">
              {isSignup
                ? 'Already have an account?'
                : "Don't have an account?"}

              <button
                onClick={() => setIsSignup(!isSignup)}
                className="ml-2 text-violet-400 font-semibold hover:text-cyan-400 transition"
              >
                {isSignup ? 'Sign In' : 'Create One'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
