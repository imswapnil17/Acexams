import React, { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import { Toaster } from "react-hot-toast";


export default function Home() {
    const {isLoggedIn} = useAuthStore();
    const navigate = useNavigate()
   
  return (
    <>
        <Toaster/>
        Home
    </>
  );
}