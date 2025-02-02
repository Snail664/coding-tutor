"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setUser } from "@/slices/AuthSlice";
import { Auth0User } from "@/lib/types";

export default function AuthStateInitializer({ user }: { user: Auth0User }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      const user_state = {
        sid: user.auth0_sid,
        sub: user.auth0_sub,
        name: user.auth0_name ?? "",
        email: user.auth0_email ?? "",
        picture: user.auth0_picture ?? "",
        isWalkthroughEnabled: user.isWalkthroughEnabled,
      };
      dispatch(setUser(user_state));
    }
  }, [dispatch, user]);

  return null;
}
