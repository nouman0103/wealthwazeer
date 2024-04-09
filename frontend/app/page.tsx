"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import api from "@/utls/api";
export default function Home() {
  const getData = async () => {
    const { data } = await api.get("/");
    return data;
    
  }
  const { data, isLoading,error } = useQuery({
    queryKey: ["posts"],
    queryFn: getData,
  });
  if (error) {
    return <div>Error Fetching Data</div>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col  justify-between">
        <div>
          This is a Content Render by Next.js with Tailwind CSS          
        </div>
        <div>
          {isLoading ? (
            <div>Loading Waiting for Data on Client Side...</div>
          ) : (
            <div>
              {data.Hello}
              </div>
            )}

        </div>
        </div>
    </main>
  );
}
