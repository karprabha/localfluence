export const fetchDataWithToken = async (token: string) => {
  const response = await fetch("/api/v1/auth/oauth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
