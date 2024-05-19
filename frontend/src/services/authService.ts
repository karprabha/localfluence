import axios from "axios";

const API_URL = "/api/v1/auth";

const createAuthService = () => {
  const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const getAccessToken = () => localStorage.getItem("accessToken");
  const getRefreshToken = () => localStorage.getItem("refreshToken");

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.accessToken && response.data.refreshToken) {
      setTokens(response.data.accessToken, response.data.refreshToken);
    }
    return response.data;
  };

  const oauthLogin = async (token: string) => {
    const response = await axios.post(`${API_URL}/oauth`, { token });
    if (response.data.accessToken && response.data.refreshToken) {
      setTokens(response.data.accessToken, response.data.refreshToken);
    }
    return response.data;
  };

  const signUp = async (name: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      password,
    });

    return response.data;
  };

  const refreshToken = async () => {
    const refreshToken = getRefreshToken() || "";
    const response = await axios.post(`${API_URL}/refresh`, {
      refreshToken,
    });
    if (response.data.accessToken) {
      setTokens(response.data.accessToken, refreshToken);
    }
    return response.data.accessToken;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return {
    login,
    oauthLogin,
    signUp,
    refreshToken,
    logout,
    getAccessToken,
    getRefreshToken,
  };
};

export default createAuthService;
