"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const oAuthToken = searchParams.get("oauth-token");

    if (!oAuthToken) {
      router.push("/login");
      return;
    }

    const getData = async () => {
      try {
        const response = await fetch("/api/v1/auth/oauth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: oAuthToken }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          router.push("/");
        } else {
          console.log(response.statusText);
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
        router.push("/login");
      }
    };

    getData();
  }, [searchParams, router]);

  return <div>loading...</div>;
};

export default Page;
