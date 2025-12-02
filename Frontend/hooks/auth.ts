import { useEffect, useState } from "react";
import { getUserFromToken } from "@/utils/auth";

export function useAuth() {
  const [user, setUser] = useState(() => getUserFromToken());
  useEffect(() => {
    const onStorage = () => setUser(getUserFromToken());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return { user, refresh: () => setUser(getUserFromToken()) };
}
