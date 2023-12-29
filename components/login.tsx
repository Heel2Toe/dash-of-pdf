"use client";
import { useUser } from "@/hooks/useUser";
import { loginUser } from "@/actions/loginUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import classNames from "classnames";
import { Github } from "lucide-react";

const Login = () => {
  const { updateUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const logIn = async () => {
    try {
      setLoading(true);
      const result = await loginUser(updateUser);
      if (result == "ok") {
        setSuccess(true);
        router.push("/dash");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-full flex flex-col space-y-4 p-32 items-center">
      <Github
       onClick={()=>router.push('https://github.com/Heel2Toe/dash-of-pdf')}
       className="absolute flex space-x-3 top-5 left-5 h-10 w-10 hover:-translate-y-2 text-gray-600 
                  cursor-pointer transition duration-500" />

      <div
        onClick={logIn}
        className={classNames(
          `border rounded-xl flex flex-col space-y-5 items-center justify-center w-44 sm:w-72 p-4 sm:p-8
        cursor-pointer hover:-translate-y-3 hover:border-red-500 transition duration-500`,
          success ? "bg-green-400" : loading && "bg-orange-400"
        )}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xs sm:text-3xl">Dash of</h1>
          <img src="./images/pdfLogo.png" alt="" className="h-16 w-16 sm:h-40 sm:w-40" />
        </div>
        <p className="text-gray-600 text-xs sm:text-xl">Click to get started !</p>
      </div>
    </div>
  );
};

export default Login;
