"use client";
import { UserInfo } from "@/components/user-infor";
import { useCurrentUser } from "@/hooks/use-current-uset";
import { currentUser } from "@/lib/auth";
function ClientPage() {
  const user = useCurrentUser();
  return <UserInfo label="Client component" user={user} />;
}

export default ClientPage;
