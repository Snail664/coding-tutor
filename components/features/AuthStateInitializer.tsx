"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setUser } from "@/slices/AuthSlice";

export default function AuthStateInitializer({ user }: { user: any }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch, user]);

  return null;
}
