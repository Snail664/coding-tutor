"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const generatePastelColor = () => {
  // Predefined hues that work well for avatars
  const hues = [
    210,  // Blue
    230,  // Indigo
    170,  // Teal
    200,  // Steel Blue
    280,  // Purple
    330,  // Dark Pink
    150,  // Forest Green
    20,   // Dark Orange
    350,  // Deep Red
    190   // Ocean Blue
  ];
  
  const hue = hues[Math.floor(Math.random() * hues.length)];
  const saturation = 35 + Math.random() * 15; // Lower saturation (35-50)
  const lightness = 25 + Math.random() * 15;  // Lower lightness (25-40)
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const getProviderFromSub = (sub: string) => {
  const provider = sub.split("|")[0].trim().toWellFormed();
  if (provider === "auth0") {
    return "Email";
  } else if (provider === "google-oauth2") {
    return "Google";
  } else if (provider === "windowslive") {
    return "Microsoft";
  } else {
    return provider;
  }
};

interface NavbarUserModalProps {
  name: string;
  email: string;
  sub: string;
}

export default function NavbarUserModal({
  name,
  email,
  sub,
}: NavbarUserModalProps) {
  const [avatarColor, setAvatarColor] = useState(generatePastelColor());
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarFallback 
              style={{ 
                color: 'white', 
                backgroundColor: avatarColor,
                border: `2px solid ${avatarColor}`
              }}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback 
                className="text-lg"
                style={{ 
                  color: 'white', 
                  backgroundColor: avatarColor,
                  border: `2px solid ${avatarColor}`
                }}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">{name}</h2>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm font-medium">Login Method</span>
            <span className="text-sm text-muted-foreground">{getProviderFromSub(sub)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-medium">Account Type</span>
            <span className="text-sm text-muted-foreground">Free</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <a
            href="/api/auth/logout"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 px-4 py-2"
          >
            Logout
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
