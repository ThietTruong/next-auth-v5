"use client";
import { useRouter } from "next/navigation";
interface RegisterProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function Register({
  children,
  mode = "redirect",
  asChild,
}: RegisterProps) {
  const router = useRouter();
  function onClick() {
    console.log("REGISTER BUTTON CLICKED");
    router.push("/login");
  }
  if (mode === "modal") {
    return (
      <button
        onClick={onClick}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      >
        {/* {children} */}
        TODO : implement model mode
      </button>
    );
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
