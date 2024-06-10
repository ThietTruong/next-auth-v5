"use client";

import { logout } from "@/actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const handleOnClick = () => {
    logout();
  };

  return (
    <span aria-hidden="true" onClick={handleOnClick}>
      {children}
    </span>
  );
};
