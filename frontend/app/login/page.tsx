import Image from "next/image";
import Header from "@/components/header";
import womanUsingLaptop from "@/assets/womenUsingLaptop.png";
import { Button, TextField } from "@mui/material";
import {
  GradientButton,
  TranslucentButton,
  TextButton,
} from "@/components/buttons";
import SvgIcon from "@mui/material/SvgIcon";
import GoogleIcon from "@/assets/GoogleIcon";
import Link from "next/link";

export default function Home() {
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
          <text className="text-5xl font-bold mb-3 mx-auto">Login</text>
          <TextField
            label="Email"
            variant="standard"
            type="email"
            className="w-80"
          />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            className="w-80 mb-6"
          />
          <TextButton
            className="normal-case text-base -mt-10 -mb-3 text-right ml-auto -mr-5 font-light w-min whitespace-nowrap"
            disableRipple={true}
          >
            <Link href="/forgot-password" prefetch={true}>
              Forgot Password?
            </Link>
          </TextButton>
          <GradientButton className="normal-case font-bold text-2xl">
            Login
          </GradientButton>
          <TranslucentButton
            startIcon={
              <SvgIcon>
                <GoogleIcon />
              </SvgIcon>
            }
            className="shadow-glassmorphic"
          >
            {" "}
            Continue with Google
          </TranslucentButton>
          <TextButton
            className="normal-case h-11 -mt-3 font-light"
            disableRipple={true}
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
