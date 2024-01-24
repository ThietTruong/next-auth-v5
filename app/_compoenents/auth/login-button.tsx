"use client";
interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  function onClick() {
    console.log("LOGIN BUTTON CLICKED");
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
