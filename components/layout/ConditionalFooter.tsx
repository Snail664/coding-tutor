"use client";

import { usePathname } from "next/navigation";

interface ConditionalFooterProps {
  isHomePage?: boolean;
  forceShow?: boolean;
}

export default function ConditionalFooter({ isHomePage, forceShow }: ConditionalFooterProps) {
  const pathname = usePathname();
  
  // If forceShow is true, always show the footer
  if (forceShow) {
    return (
      <p className="text-center text-sm text-gray-500">
        Some Questions adapted from <a className="underline text-blue-500" href="https://codingquest.io" target="_blank">Coding Quest</a>
      </p>
    );
  }
  
  // Otherwise, check if we're on the homepage
  const isHome = isHomePage !== undefined ? isHomePage : pathname === '/';
  
  if (isHome) {
    return null;
  }
  
  return (
    <p className="text-center text-sm text-gray-500">
      Some Questions adapted from <a className="underline text-blue-500" href="https://codingquest.io" target="_blank">Coding Quest</a>
    </p>
  );
} 