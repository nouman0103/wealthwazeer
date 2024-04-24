"use client";
import { usePathname } from "next/navigation";
import {
  useContext,
  createContext,
  memo,
  useLayoutEffect,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosInstance } from "axios";
interface User {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
}
interface AuthContextType {
  user: User | null;
  token: string | null;
  setToken: (token: string | null) => void;
  api: AxiosInstance;
}

const AuthContext = createContext<any>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});
export const useAuth = () => useContext<AuthContextType>(AuthContext);

const unprotected_routes = [
  "/login",
  "/signup",
  "/",
  "/forget-password",
  "/forgetpassword",
];
const unaccessible_routes_during_login = [
  "/login",
  "/signup",
  "/forgetpassword",
];
const AuthProviderComponent = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useLocalStorage("token", null, {
    initializeWithValue: true,
  });
  const [loading, setLoading] = useState(true);
  const get_user = async () => {
    const response = await api.get("/users/me");
    return response.data;
  };
  const { data, error } = useQuery<User>({
    queryKey: ["user"],
    queryFn: get_user,
    enabled: !!token,
    retry: 1,
  });
  const api = useMemo(() => {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);
  const pathname = usePathname();
  useLayoutEffect(() => {
    setLoading(true);
    if (!token) {
      if (!unprotected_routes.includes(pathname)) {
        redirect("/login");
      } else {
        setLoading(false);
      }
    } else if (token) {
      if (unaccessible_routes_during_login.includes(pathname)) {
        redirect("/user/dashboard");
      } else {
        setLoading(false);
      }
    }
  }, [token, pathname]);

  useEffect(() => {
    if (error) {
      setToken(null);
    }
  }, [error]);
  console.log(data);

  return (
    <AuthContext.Provider value={{ user:data, token, setToken, api }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const AuthProvider = memo(AuthProviderComponent);
