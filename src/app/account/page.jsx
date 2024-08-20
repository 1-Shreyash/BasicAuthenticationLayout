"use client"
import React from 'react';
import { UserAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from 'react';

const Account = () => {
  const { user, logOut } = UserAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    if(!user){
        router.push('/login')
    }
  }, [user])


  return (
    <div className='w-[300px] m-auto'>
      <h1 className='text-center text-2xl font-bold pt-12'>Account</h1>
      <div>
      {user?.displayName?(
        <p>Welcome, {user?.displayName} </p>):(<></>)}
      <p>User Email: {user && user.email}</p>
      </div>
      <button onClick={handleSignOut} className='border py-2 px-5 mt-10'>
        Logout
      </button>
    </div>
  );
};

export default Account;