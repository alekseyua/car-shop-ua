'use client'

import { handleLogout } from "@/src/processes/logout/model/logout"


export default async function Profile (){

    return <div>
        Profile
        <br />
        <button 
            onClick={handleLogout}
            >exit</button>
    </div>
}