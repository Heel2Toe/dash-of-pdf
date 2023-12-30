'use client'

import { signOut } from "firebase/auth";
import DashLogo from "./dash-logo";
import { useUser } from "@/hooks/useUser";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "./ui/button";
import PdfUploader from "./pdf-uploader";

const Navbar = () => {

    const {logoutUser} = useUser();
    const router = useRouter();

    const logout = async () => {
        try{
          await signOut(auth);
          logoutUser();
          router.push('/')
        }
        catch(err){
             toast.error('Something went wrong');
             console.log('LOGOUT_ERR',err);
             
        }
    }


return ( 
  
<div className="border-b flex items-center px-4 space-x-4 h-16 w-full">
  <DashLogo onClick={()=>router.push('/dash')}/>
  <div className="flex space-x-4">
    <PdfUploader/>
    <Button variant="primary" onClick={logout}>logout</Button>
  </div>
</div>
     );
}
 
export default Navbar;