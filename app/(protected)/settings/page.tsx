"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-uset";

const SettingPage = () => {
  const user = useCurrentUser();
  const onclick = () => {
    logout();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={onclick}>Sign out</button>
    </div>
  );
};
export default SettingPage;
