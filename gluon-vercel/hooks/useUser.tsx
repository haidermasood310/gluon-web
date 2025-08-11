import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function useUser() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setAccessToken, token, setAuth, setUser } = useAuthStore();

  const fetchCurrentUser = async () => {
    if (localStorage.getItem("accessToken")) {
      // const res = await getCurrentUser();
      // setAuth({
      //   user: res.data.data,
      //   token: localStorage.getItem("accessToken") || "",
      //   refreshToken: localStorage.getItem("refreshToken") || "",
      // });
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    // Check for existing access token in localStorage
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken && !token) {
      setAccessToken(storedToken);
    }
  }, []);

  const logout = async () => {
    localStorage.clear();
    router.replace("/login");
    setAccessToken(null);
    setIsLoading(false);
  };

  return {
    logout,
    setAccessToken,
    isLoading,
    fetchCurrentUser,
  };
}
