/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {useNavigate} from "react-router-dom";
import {useUser,useAuth} from "@clerk/react";
import {toast} from 'react-hot-toast';


axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;


const AppContext=createContext();

export const AppProvider=({children})=>{

    const currency=import.meta.env.VITE_CURRENCY || "$";

    const navigate=useNavigate();
    const {user}=useUser();
    const {getToken}=useAuth();

    const [isOwner,setIsOwner]=useState(false);
    const [showHotelReg,setShowHotelReg]=useState(false);
    const [searchedCities,setSearchedCities]=useState([])
    const [rooms,setRooms]=useState([])

    const fetchRooms=useCallback(async()=>{
        try {
            const { data } = await axios.get('/api/rooms')

            if(data.success){
                setRooms(data.rooms)
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [])

    const fetchUser=useCallback(async()=>{
        try {
            const token = await getToken();
            if(!token) return;
            const {data}=await axios.get('/api/user',{headers:{Authorization:`Bearer ${token}`}})

            if(data.success){
                setIsOwner(data.role==="hotelOwner");
                setSearchedCities(data.recentSearchedCities || []);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [getToken])

    useEffect(()=>{
        if(user){
            Promise.resolve().then(() => fetchUser());
        }
    },[user, fetchUser])

    useEffect(()=>{
        let isMounted = true;
        (async () => {
            try {
                const { data } = await axios.get('/api/rooms');
                if (isMounted && data.success) {
                    setRooms(data.rooms);
                }
            } catch (error) {
                if (isMounted) toast.error(error.message);
            }
        })();
        return () => { isMounted = false; };
    },[])

    const value={
        currency,navigate,user,getToken,isOwner,setIsOwner,axios,showHotelReg,setShowHotelReg,searchedCities,setSearchedCities,
        rooms,setRooms,fetchRooms,fetchUser
    }


    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}


export const useAppContext=()=>useContext(AppContext)