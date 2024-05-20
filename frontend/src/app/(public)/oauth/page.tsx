"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const SuspenseChild = () => {
  const searchParams = useSearchParams();
  const { oauthLogin, isLoading, error } = useAuth();
  const [hasRequested, setHasRequested] = useState(false);

  const oauthToken = useMemo(
    () => searchParams.get("oauth-token"),
    [searchParams]
  );

  useEffect(() => {
    const handleOAuthLogin = async () => {
      if (typeof oauthToken === "string" && !hasRequested) {
        setHasRequested(true);
        await oauthLogin(oauthToken);
        setHasRequested(false);
      }
    };

    handleOAuthLogin();
  }, [oauthToken, oauthLogin, hasRequested]);

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

const OAuthPage = () => {
  return (
    <Suspense>
      <SuspenseChild />
    </Suspense>
  );
};

export default OAuthPage;
