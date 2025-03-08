"use client";
import { Provider } from "react-redux";
import store from "@/store";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { setUser } from "@/slices/AuthSlice";

function StoreInitializer() {
  const { user, isLoading } = useUser();
  
  useEffect(() => {
    if (user && !isLoading) {
      store.dispatch(setUser({
        sid: user.sid as string,
        sub: user.sub as string,
        name: user.name || "",
        email: user.email || "",
        picture: user.picture || "",
        isWalkthroughEnabled: true, // Default to true
      }));
    }
  }, [user, isLoading]);
  
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <Provider store={store}>
        <StoreInitializer />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </Provider>
    </UserProvider>
  );
}
