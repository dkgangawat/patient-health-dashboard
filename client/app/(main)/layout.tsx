
'use client'
import { useAuthContext } from "@/components/AuthProvider";
import SideBar from "@/components/sideBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { loading, token} = useAuthContext();
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
                <div className=" bg-white border-b h-14 flex items-center justify-between md:flex-row-reverse px-4 ">
                    <h1 className="text-xl font-bold md:hidden">Patient Dashboard</h1>
                    <img className="h-12 rounded-[50%]" src="https://placehold.co/56" alt="logo" />
                </div>
                <div className=" flex-1 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
