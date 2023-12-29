"use client";
import { useUser } from "@/hooks/useUser";
import { loginUser } from "@/actions/loginUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Button from "./ui/button";
import classNames from "classnames";

const Login = () => {
  const { updateUser, email } = useUser();
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
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (email != "") {
      toast("Welcome Back", { icon: "🙌" });
      router.push("/dash");
    }
  }, []);

  return (
    <div className="h-full flex flex-col space-y-4 p-32 items-center">

      <div onClick={logIn} className={classNames(`border rounded-xl flex flex-col space-y-5 items-center justify-center p-8
        cursor-pointer hover:-translate-y-3 hover:border-red-500 transition duration-500`,
         success ? 'bg-green-400' : loading && 'bg-orange-400'
        )}>
        <div className="flex flex-col items-center justify-center">
          <h1 className=" text-3xl">Dash of</h1>
          <img src="./images/pdfLogo.png" alt="" className="h-40 w-40" />
        </div>
        <h1 className="text-gray-600">Click to get started !</h1>
      </div>
    </div>
  );
};

export default Login;
