import { useState, useEffect, useCallback } from "react";
import { fetchProfile } from "../api/auth";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    try {
      const { data } = await fetchProfile();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, [loadProfile]);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return { user, setUser, loading, logout };
}
