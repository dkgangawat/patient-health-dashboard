
'use client'
import { useAuthContext } from "@/components/AuthProvider";
import SideBar from "@/components/sideBar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ActivityIcon, File, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { loading, token, logout } = useAuthContext();
    const router = useRouter()
    useEffect(() => {
        if (!loading && !token) {
            router.replace('/login');
        }
    }, [loading, token, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!token) {
        return null;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <SideBar />
            <main className="flex-1  h-screen flex flex-col">
                <div className=" bg-white border-b h-14 flex items-center justify-between lg:flex-row-reverse px-4 ">
                    <div className="lg:hidden flex space-x-2">
                        <Sheet>
                            <SheetTrigger className=" lg:hidden">
                                <Menu size={24} />
                            </SheetTrigger>
                            <SheetContent className=" flex flex-col" >
                                <SheetHeader>
                                    <SheetTitle>Patient Dashboard</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col flex-1">
                                    <div className="p-2 flex-1 flex justify-between flex-col border-r">
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
                            </SheetContent>
                        </Sheet>
                        <h1 className="text-xl font-bold lg:hidden">Patient Dashboard</h1>
                    </div>
                    <img className="h-12 rounded-[50%]" src="https://placehold.co/56" alt="logo" />
                </div>
                <div className=" flex-1 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
