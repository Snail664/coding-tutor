"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { fetchUserDataThunk } from "@/slices/AuthSlice";

export default function AuthStateInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initial fetch
    dispatch(fetchUserDataThunk());

    // Set up periodic fetch every 5 seconds
    const interval = setInterval(() => {
      dispatch(fetchUserDataThunk());
    }, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
}
