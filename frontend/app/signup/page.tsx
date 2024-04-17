"use client";
import Image from "next/image";
import Header from "@/components/header";
import womanUsingLaptop from "@/assets/womenUsingLaptop.png";
import { Button, TextField } from "@mui/material";
import { GradientButton, TextButton } from "@/components/buttons";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { handleError } from "@/utls/handleError";
import Link from "next/link";

export default function Home() {
  const signupUser = async () => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await axios.post("/users", {
      email: email,
      password: password,
    });
    return response.data;
  };

  const onSignUp = () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    if (email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) === null) {
      setError("Invalid email address");
      return;
    }
    mutation.mutate();
  };
  const mutation = useMutation({
    mutationFn: signupUser,
    mutationKey: ["signup"],
    onError: (error: AxiosError) => {
      setError(handleError(error));
    },
    onMutate: () => {
      
      setError("");
    },
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <main className="min-h-screen bg-dark-bg-gr-to-purple">
      <Header />
      <div className="flex justify-between">
        <div className="w-[50vw] h-[80vh] mt-5">
          <Image
            src={womanUsingLaptop}
            alt="Art"
            className="w-auto mx-32 h-[100%]"
          />
        </div>
        <div className="p-20 xl:mr-40 2xl:mr-48   flex flex-col gap-4 right-0">
          <text className="text-3xl font-semibold mb-3 mx-auto">Sign Up</text>
          {error ? (
            <text className="text-red-500 text-lg font-bold">{error}</text>
          ) : null}
          {mutation.isSuccess ? (
            <text className="text-green-500 text-lg font-bold">
              User created successfully
            </text>
          ) : null}
          <TextField
            label={
              <text className="text-white text-opacity-80 text-xl">Name</text>
            }
            variant="standard"
            type="text"
            className="w-80"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            label={
              <text className="text-white text-opacity-80 text-xl">Email Address</text>
            }
            variant="standard"
            type="email"
            className="w-80 text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            label={
              <text className="text-white text-opacity-80 text-xl">Password</text>
            }
            variant="standard"
            type="password"
            className="w-80 mb-6"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <GradientButton
            onClick={onSignUp}
            className="font-bold normal-case text-2xl"
          >
            Continue
          </GradientButton>
          <TextButton
            className="normal-case h-11 -mt-3 font-light"
            disableRipple={true}
          >
            <Link href="/signup" prefetch={true}>
              Login Instead
            </Link>
          </TextButton>
        </div>
      </div>
    </main>
  );
}
