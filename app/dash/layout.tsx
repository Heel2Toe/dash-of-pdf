import Navbar from "@/components/navbar";

export default function DashLayout({children}: {children: React.ReactNode})  {
    return ( 
        <>
        <Navbar/>
        {children}
        </>
     );
}
 
