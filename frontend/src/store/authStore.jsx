import {create}  from "zustand"
import axios from "axios"
import toast from "react-hot-toast"
const backendUrl ="http://localhost:3000"
export const useAuthStore = create((set)=>({
    user:null,
    isSigningIn:false,
    isLoggingOut:false,
    isLoggedIn:false,
    signup: async(credentails)=>{
        set({isSigningIn:true})
        try{    
            const res = await axios.post(`${backendUrl}/api/v1/auth/sign-up`,credentails,{withCredentials:true});
            set({user:res.data.user,isSigningIn:false,isLoggedIn:true})
            toast(res.data.message)

        }
        catch(e){
            set({user:null,isSigningIn:false});
            toast.error(e.response.data.message);

        }    },
    login: async(credentails)=>{
        set({isSigningIn:true});
        try{
            const res = await axios.post(`${backendUrl}/api/v1/auth/login`,credentails,{withCredentials:true})
            set({isSigningIn:false,isLoggedIn:true})
            toast("Logged In")
        }
        catch(err){
            toast.error(err.response.data.message)
            set({user:null,isSigningIn:false})
        }
    }
    ,
    logout: async()=>{
        set({isLoggingOut:true})
        try{
            const res = await axios.post(`${backendUrl}/api/v1/auth/logout`,{},{withCredentials:true});
            toast.error(res.data.message)
            set({user:null,isLoggedIn:false,isLoggingOut:false})
        }
        catch(error){
            toast.error(error.response.message)
            set({user:null,isLoggingOut:false})
        }

    }
    ,
    authCheck: async()=>{
        try{
            const res = await axios.get(`${backendUrl}/api/v1/auth/authCheck`,{withCredentials:true})
            set({user:res.data.user,isLoggedIn:true})
//            toast(res.data.message)
            
        }
        catch(error){
            // toast.error(error.response.data.message)
            set({user:null,isLoggedIn:false})
        }
    }
    
    
}))