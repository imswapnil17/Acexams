import React, { useEffect, useState } from "react";
import { Router,Routes,Route, useNavigate } from "react-router";
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn";
import Home from "./pages/Home"
import { useAuthStore } from "./store/authStore";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import SplashScreen from "./components/SplashScreen";

export default function App() {
  const { authCheck } = useAuthStore()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    const initApp = async () => {
      await authCheck();
      if (document.readyState == "complete") {
        setLoading(false)
        if (isLoggedIn) {
          navigate("/dashboard")
        }
      }
      else {
        window.addEventListener("load", () => {
          setLoading(false)
          if (isLoggedIn) {
            navigate("/dashboard")
          }
        })
      }
    }
    initApp()
  }, []);

  return (
    isLoading ? <SplashScreen /> : <>
      {/* <Toaster/> */}
      <Routes>
        {isLoggedIn ? <Route path="/dashboard" element={<Dashboard />} /> : null}
        <Route path="/auth" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>404 not Found</h1>} />
      </Routes>


    </>
  );
}