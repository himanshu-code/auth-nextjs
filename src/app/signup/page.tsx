"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { set } from "mongoose";

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("User created successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("SignUpFailed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">{loading ? "Loading..." : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="bg-white text-black p-2 rounded-lg mb-4 focus:ouline-none focus:border-gray-600"
        type="text"
        id="username"
        value={user.username}
        placeholder="userName"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">Email</label>
      <input
        className="bg-white text-black p-2 rounded-lg mb-4 focus:ouline-none focus:border-gray-600"
        type="email"
        id="email"
        value={user.email}
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        className="bg-white text-black p-2 rounded-lg mb-4 focus:ouline-none focus:border-gray-600"
        type="password"
        id="password"
        value={user.password}
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        disabled={buttonDisabled}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSignUp}
      >
        Signup here
      </button>
      <Link href="/login">Visit login</Link>
    </div>
  );
};

export default SignUp;
