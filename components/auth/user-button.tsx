"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import React from "react";
import { useCurrentUser } from "@/hooks/use-current-uset";
import { FaUser } from "react-icons/fa";
import { LogoutButton } from "./logout/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
function UserButton() {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={user?.image || "https://github.com/shadcn.png"}
            alt="@shadcn"
          />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="color-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
