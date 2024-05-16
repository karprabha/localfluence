import { useState } from "react";
import { useRouter } from "next/navigation";
import createAuthService from "@/services/authService";

const authService = createAuthService();

const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const oauthLogin = async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.oauthLogin(token);
      router.push("/dashboard");
    } catch (err) {
      setError("OAuth login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signUp(name, email, password);
      router.push("/login");
    } catch (err) {
      setError("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    router.push("/login");
  };

  return { login, oauthLogin, signUp, logout, isLoading, error };
};

export default useAuth;
