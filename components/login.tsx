'use client'
import { useUser } from '@/hooks/useUser'
import { loginUser } from "@/actions/loginUser";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const Login = () => {
   
  const {updateUser, email} = useUser();  
  const router = useRouter();

  const logIn = async () => {
  try{
    const result = await loginUser(updateUser);
    if(result == 'ok'){
        router.push('/dash');
    }
 } catch(err){
    toast.error('Something went wrong');
    console.log(err);
  }
}

useEffect(()=>{
  if(email != ''){
    toast('Welcome Back', {icon: '🙌'})
    router.push('/dash');
  }
},[])


  return ( 
    <div className="h-full bg-red-600 flex flex-col p-32 items-center">

      <div className="flex flex-col items-center justify-center w-40">
        <h1 className=" text-3xl">Dash of</h1>
      <img src="./images/pdfLogo.png" alt="" className="h-40 w-40 bg-white" />
      </div>

      <button onClick={logIn}>
         get started !
      </button>

    </div>
   );
}
 
export default Login;