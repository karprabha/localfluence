import queryString from "query-string";

interface OAuthOptions {
  client_id: string;
  redirect_uri: string;
  scope: string;
  allow_signup?: boolean;
  path?: string;
  response_type?: string;
  access_type?: string;
  prompt?: string;
}

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI || "";

export const githubOAuthOptions: OAuthOptions = {
  client_id: GITHUB_CLIENT_ID,
  redirect_uri: `${REDIRECT_URI}/github`,
  scope: ["user:email"].join(" "),
  allow_signup: true,
  path: "/",
};

export const googleOAuthOptions: OAuthOptions = {
  client_id: GOOGLE_CLIENT_ID,
  redirect_uri: `${REDIRECT_URI}/google`,
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ].join(" "),
  response_type: "code",
  access_type: "online",
  prompt: "consent",
};

export const generateOAuthUrl = (
  provider: string,
  options: OAuthOptions
): string => {
  const params = queryString.stringify(options);
  return `https://${
    provider === "github"
      ? "github.com/login/oauth/authorize"
      : "accounts.google.com/o/oauth2/v2/auth"
  }?${params}`;
};
