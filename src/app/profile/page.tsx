"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = React.useState("nothing");
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setUserData(res.data?.data?._id);
    } catch (error: any) {
      console.log("Error in getting user details", error.message);
      toast.error(error.message);
    }
  };
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout Successfull");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout Failed", error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <h2 className="p-4 rounded bg-green-500">
        {userData == "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${userData}`}>{userData}</Link>
        )}
      </h2>
      <button
        onClick={getUserDetails}
        className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Get user data
      </button>
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
