"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchDataWithToken } from "@/services/apiService";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const oAuthToken = searchParams.get("oauth-token");

    if (!oAuthToken) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const data = await fetchDataWithToken(oAuthToken);
        console.log(data);
        router.push("/");
      } catch (error: any) {
        console.log(error.message);
        router.push("/login");
      }
    };

    fetchData();
  }, [searchParams, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default Page;
