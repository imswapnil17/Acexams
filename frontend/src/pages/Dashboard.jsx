import { Link, Navigate, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { Toaster } from "react-hot-toast";
import { useRef } from "react";

export default function Dashboard() {
  const pyqStats = [
    {
      subject: 'Mathematics',
      solved: 184,
      total: 250,
      color: 'from-violet-500 to-fuchsia-500',
    },
    {
      subject: 'Physics',
      solved: 142,
      total: 200,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      subject: 'Chemistry',
      solved: 96,
      total: 180,
      color: 'from-orange-500 to-red-500',
    },
    {
      subject: 'English',
      solved: 72,
      total: 100,
      color: 'from-emerald-500 to-lime-500',
    },
  ];

  const tasks = [
    {
      title: 'Complete 2022 Physics PYQs',
      time: 'Today',
      done: true,
    },
    {
      title: 'Finish Integration Questions',
      time: '6 PM',
      done: false,
    },
    {
      title: 'Revise Organic Chemistry Notes',
      time: 'Tomorrow',
      done: false,
    },
    {
      title: 'Solve English Literature PYQs',
      time: 'Sunday',
      done: true,
    },
  ];
  const {logout,isLoggingOut,isLoggedIn} = useAuthStore()
  const navigate = useNavigate();
  const logoutHandler = ()=>{
   logout()
   navigate("/")
  }
  const mainPage = useRef()
  const completedTasks = tasks.filter((task) => task.done).length;
  const taskProgress = (completedTasks / tasks.length) * 100;
 return (
  !isLoggedIn ? <Navigate to="/" replace /> : <div ref={mainPage}  className={isLoggingOut ? "page-disabled" :"min-h-screen bg-[#0B1120] text-white flex overflow-hidden fade-in" }>
      <Toaster/>
      {/* Sidebar */}
      <aside className="w-72 bg-[#111827] border-r border-white/10 p-6 hidden lg:flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-3xl font-black shadow-lg shadow-violet-500/40">
              A
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight">Acexams</h1>
              <p className="text-gray-400 text-sm">PYQ Tracker</p>
            </div>
          </div>

          <nav className="space-y-3">
            {[
              'Dashboard',
              'Subjects',
              'PYQ Tracker',
              'Tasks',
              'Analytics',
              'Study Material',
              'Settings'
            ].map((item, index) => (
              <button
                key={item}
                className={`w-full text-left px-5 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  index === 0
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/30'
                    : 'hover:bg-white/5' 
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-3xl p-5 border border-white/10">
          <p className="text-sm text-gray-300 mb-2">Daily Progress</p>
          <h2 className="text-4xl font-black mb-3">{Math.round(taskProgress)}%</h2>

          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
              style={{ width: `${taskProgress}%` }}
            />
          </div>

          <p className="text-xs text-gray-400 mt-3">
            {completedTasks} / {tasks.length} tasks completed
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-2">
              Welcome back, Swap 👋
            </h1>
            <p className="text-gray-400 text-lg">
              Track your PYQs, assignments, and preparation progress.
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <input
              placeholder="Search subjects, PYQs, tasks..."
              className="bg-[#161B22] border border-white/10 px-5 py-4 rounded-2xl w-80 outline-none focus:border-violet-500 transition"
            />
            <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-4 rounded-2xl font-bold shadow-lg shadow-violet-500/30 hover:scale-105 transition-transform">
              + Add Task
            </button>
            <Link to={"/"}  ><button className="bg-gradient-to-r from-red-600 to-pink-600 px-6 py-4 rounded-2xl font-bold transition-transform hover:scale-105" onClick={logoutHandler}>Logout</button></Link>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#161B22] border border-white/10 rounded-3xl p-6">
            <p className="text-gray-400 mb-2">Total PYQs Solved</p>
            <h2 className="text-5xl font-black">494</h2>
          </div>

          <div className="bg-[#161B22] border border-white/10 rounded-3xl p-6">
            <p className="text-gray-400 mb-2">Completion Rate</p>
            <h2 className="text-5xl font-black text-cyan-400">74%</h2>
          </div>

          <div className="bg-[#161B22] border border-white/10 rounded-3xl p-6">
            <p className="text-gray-400 mb-2">Study Streak</p>
            <h2 className="text-5xl font-black text-orange-400">18🔥</h2>
          </div>

          <div className="bg-[#161B22] border border-white/10 rounded-3xl p-6">
            <p className="text-gray-400 mb-2">Pending Tasks</p>
            <h2 className="text-5xl font-black text-red-400">
              {tasks.length - completedTasks}
            </h2>
          </div>
        </div>

        {/* Subject Progress */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
          <div className="bg-[#161B22] border border-white/10 rounded-3xl p-7">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black">PYQ Subject Tracker</h2>
                <p className="text-gray-400 mt-1">
                  Track solved previous year questions.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {pyqStats.map((item) => {
                const progress = (item.solved / item.total) * 100;

                return (
                  <div key={item.subject}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{item.subject}</h3>
                      <span className="text-gray-400 text-sm">
                        {item.solved}/{item.total}
                      </span>
                    </div>

                    <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-[#161B22] border border-white/10 rounded-3xl p-7">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black">Self Assigned Tasks</h2>
                <p className="text-gray-400 mt-1">
                  Manage daily study goals.
                </p>
              </div>
            </div>

            <div className="space-y-5 mb-8">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-5 border transition-all duration-300 ${
                    task.done
                      ? 'bg-emerald-500/10 border-emerald-500/20'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-black ${
                          task.done
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-gray-500'
                        }`}
                      >
                        {task.done ? '✓' : ''}
                      </div>

                      <div>
                        <h3
                          className={`font-semibold text-lg ${
                            task.done ? 'line-through text-gray-400' : ''
                          }`}
                        >
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-400">{task.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 font-medium">
                  Task Completion
                </span>
                <span className="text-violet-400 font-bold">
                  {Math.round(taskProgress)}%
                </span>
              </div>

              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
                  style={{ width: `${taskProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#161B22] border border-white/10 rounded-3xl p-7">
            <h2 className="text-2xl font-black mb-6">Recent Activity</h2>

            <div className="space-y-5">
              {[
                'Solved 24 Physics PYQs from 2021 paper',
                'Completed Integration practice set',
                'Added new Chemistry revision task',
                'Finished English PYQ mock test',
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white/5 rounded-2xl p-4"
                >
                  <div className="w-3 h-3 rounded-full bg-cyan-400" />
                  <p className="text-gray-200">{activity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-600/20 to-cyan-500/20 border border-white/10 rounded-3xl p-7">
            <h2 className="text-2xl font-black mb-6">Focus Meter</h2>

            <div className="flex items-center justify-center mb-6">
              <div className="w-48 h-48 rounded-full border-[16px] border-violet-500 flex items-center justify-center shadow-2xl shadow-violet-500/20">
                <div className="text-center">
                  <h1 className="text-5xl font-black">82%</h1>
                  <p className="text-gray-300 mt-2">Productivity</p>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-center leading-relaxed">
              You're maintaining a strong preparation pace this week.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
