'use client'
import React from 'react'
import { ActivityIcon, File, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useAuthContext } from './AuthProvider'

const SideBar = () => {
    const { logout } = useAuthContext();

    return (
        <>
        <div className="hidden lg:block w-64  bg-white">
            <div className="flex flex-col h-screen">
                <div className="p-4 border-b h-14">
                    <h1 className="text-xl font-bold">Patient Dashboard</h1>
                </div>
                <div className="p-4 flex-1 flex justify-between flex-col border-r">
                    <ul className="space-y-4">
                        <Link href={"/"} className="flex items-center space-x-2">
                            <ActivityIcon size={24} />
                            <span>Patients</span>
                        </Link>
                        <Link href={`/prior-authorization-requests`} className="flex items-center space-x-2">
                            <File size={24} />
                            <span> Requests</span>
                        </Link>
                    </ul>
                    <button onClick={logout} className="p-2 w-full flex items-center rounded-md mt-auto space-x-2">
                        <LogOut size={24} />
                        <span>Logout</span>
                    </button>
                    </div>
            </div>
        </div>
        </>
    )
}

export default SideBar
