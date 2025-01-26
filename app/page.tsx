"use client";
import LoadingScreen from "@/components/layout/LoadingScreen";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("@/components/features/Main"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function Page() {
  return <Main />;
}
