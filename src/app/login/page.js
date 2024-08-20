"use client"; // Add this directive if you're using Next.js

import { UserAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { useRouter } from "next/navigation";
// import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {googleSignIn, user} = UserAuth();
  const [error, setError] = useState('');
  const router = useRouter();
  const { signIn } = UserAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    // Add your sign-in logic here
    // setError('')
    try {
      await signIn(email, password)
      router.push('/account')
    } catch (e) {
      alert(e.message)
      console.log(e.message)
    }
  };

  const handleGoogleSignIn = async (e) =>{
     try {
      await googleSignIn();
     } catch (error) {
      console.log(error)
     }
  }
  useEffect(()=>{
    if(user!=null){
   router.push('/account')
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center mt-4">
          <div className="border-t border-gray-300 w-1/4"></div>
          <div className="text-sm text-gray-500 px-4">OR</div>
          <div className="border-t border-gray-300 w-1/4"></div>
        </div>

        <div className="max-w-[240px] m-auto py-4">
          <GoogleButton onClick={handleGoogleSignIn}/>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
