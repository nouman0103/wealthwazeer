import Image from "next/image";
import Drawer from "@/components/drawer";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg-gr-to-purple flex">
      <Drawer/>
      <div>

        {
          // work inside this div, and remove this comment including {}
        }
        <text>
          This is a sample text. 
        </text>


      </div>
    </main>
  );
}
