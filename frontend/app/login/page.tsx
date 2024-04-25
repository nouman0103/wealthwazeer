"use client";
import Image from "next/image";
import Header from "@/components/header";
import womanUsingLaptop from "@/assets/womenUsingLaptop.png";
import { Button, TextField } from "@mui/material";
import {
  GradientButton,
  GlassmorphicButton,
  TextButton,
} from "@/components/buttons";
import SvgIcon from "@mui/material/SvgIcon";
import GoogleIcon from "@/assets/GoogleIcon";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "@/context/AuthContex";
import { handleError } from "@/utls/handleError";
import { Axios, AxiosError } from "axios";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setToken,api } = useAuth();
  const login = async () => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    const response = await api.post("/token", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onError: (error:AxiosError) => {
      setError(handleError(error));
    },
    onSuccess: (data) => {
      setToken(data.access_token);
    },
    onMutate: () => {
      setError("");
    }
  });

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
          <span className="text-3xl font-semibold mb-3 mx-auto">Login</span>
          {
            error && (
              <span className="text-red-500 text-lg">
                {error}
              </span>
            )
          }
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label={
              <span className="text-white text-opacity-80 text-xl">
                Email Address
              </span>
            }
            variant="standard"
            type="email"
            className="w-80"
          />
          <TextField
            label={
              <text className="text-white text-opacity-80 text-xl">
                Password
              </text>
            }
            variant="standard"
            type="password"
            className="w-80 mb-6"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="ml-auto -my-3">
          <TextButton
            disableRipple={true}
            sx={{
              fontWeight: 400,
              textTransform: "none",
            }}
          >
            <span className="text-sm text-right -mr-5">
              Forgot Password?
            </span>
          </TextButton>
          </div>
          <GradientButton
            onClick={() => {
              mutation.mutate();
            }}
            className="normal-case font-bold text-2xl"
          >
            Login
          </GradientButton>
          <GlassmorphicButton
            startIcon={
              <SvgIcon>
                <GoogleIcon />
              </SvgIcon>
            }
            className="shadow-glassmorphic"
          >
            <span className="mx-auto">Continue with Google</span>
          </GlassmorphicButton>
          <TextButton
            disableRipple={true}
            sx={{
              fontWeight: 400,
              height: "2.75rem",
              textTransform: "none",
              marginTop: "-0.5rem"
            }}
          >
            <Link href="/signup" prefetch={true}>
              Sign Up Instead
              </Link>
          </TextButton>
        </div>
      </div>
    </main>
  );
}
