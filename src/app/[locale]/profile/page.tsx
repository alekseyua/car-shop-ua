'use client'

import { handleLoguot } from "@/src/features/auth-by-email/model/actions";

export default async function Profile (){

    return <div>
        Profile
        <button 
            onClick={handleLoguot}
            >exit</button>
    </div>
}