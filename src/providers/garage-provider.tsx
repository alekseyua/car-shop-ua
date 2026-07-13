'use client';

import { useEffect } from "react";
import { useGarageStore } from "../features/garage/model/garage.store";
import { useAuthStore } from "../features/auth-by-email/model/store";

export const GarageProvider = () => {
    const init = useGarageStore((state) => state.init);
    const user = useAuthStore((s)=> s.user);
    const clearGarage = useGarageStore((s) => s.clearGarage);
    useEffect(()=> {
        if(user){
            init();
        }else{
            clearGarage();
        }
    }, [init, clearGarage,user]);
    return null;
}