import { useRootNavigation, useRouter, useSegments } from "expo-router";
import React, { useContext, useEffect, useState, createContext } from "react";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProviderProps, AuthContextValue, SignOutResponse } from "~data/types";
import JWT from "expo-jwt";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function Provider(props: ProviderProps) {
  const router = useRouter();
  const [user, setAuth] = useState(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  // This hook protects the route access based on user authentication.
  const useProtectedRoute = (user: object) => {
    const segments = useSegments();
    const rootNavigation = useRootNavigation();
    const [isNavigationReady, setNavigationReady] = useState(false);

    useEffect(() => {
      const unsubscribe = rootNavigation?.addListener("state", () =>
        setNavigationReady(true)
      );

      return function cleanup() {
        if (unsubscribe) unsubscribe();
      };
    }, [rootNavigation]);

    useEffect(() => {
      if (!isNavigationReady) return;

      const inAuthGroup = segments[0] === "(auth)";

      if (!authInitialized) return;

      // If the user is not signed in and the initial segment is not anything in the auth group.
      if (!user && !inAuthGroup) {
        // Redirect to the sign-in page.
        router.push("/sign-in");
      } else if (user && inAuthGroup) {
        router.push("/");
      }
    }, [user, segments, authInitialized, isNavigationReady]);
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (token) {
          const decoded = JWT.decode(token, "bellsant"); // this should be in an env file

          setAuth(decoded);
        }
      } catch (error) {
        console.log("error", error);
        setAuth(null);
      }

      setAuthInitialized(true);
    })();
  }, []);

  const signOut = async (): Promise<SignOutResponse> => {
    try {
      await AsyncStorage.removeItem("userToken");

      return { error: undefined, data: undefined };
    } catch (error) {
      return { error, data: undefined };
    } finally {
      setAuth(null);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post("/sign-in", {
        email,
        password,
      });

      const { data } = response;

      if (data && data.token) {
        await AsyncStorage.setItem("userToken", data.token);

        setAuth(data.user);

        return { data: data.user, error: undefined };
      } else {
        return { data: undefined, error: new Error("Authentication failed") };
      }
    } catch (error) {
      return { data: undefined, error };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    username: string
  ): Promise<any> => {
    try {
      const user = { email, password, username };

      await api.post("/sign-up", user);

      router.push("/sign-in");

      return { data: user, error: undefined };
    } catch (error) {
      setAuth(null);
      return { error: error as Error, data: undefined };
    }
  };

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, signUp, user, authInitialized }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
};
