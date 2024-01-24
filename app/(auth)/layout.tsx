import React from "react";

function AuthLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div>
      <nav>This is auth nav</nav>
      <div>{children}</div>
    </div>
  );
}

export default AuthLayout;
