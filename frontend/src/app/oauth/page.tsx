"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const OAuthPage = () => {
  const searchParams = useSearchParams();
  const { oauthLogin, isLoading, error } = useAuth();

  useEffect(() => {
    const handleOAuthLogin = async () => {
      const oauthToken = searchParams.get("oauth-token");

      if (typeof oauthToken === "string") {
        await oauthLogin(oauthToken);
      }
    };

    handleOAuthLogin();
  }, [searchParams, oauthLogin]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return null;
};

export default OAuthPage;
