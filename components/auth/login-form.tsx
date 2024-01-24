import React from "react";
import { CardWrapper } from "./card-wrapper";

function LoginForm() {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <div>Form</div>
    </CardWrapper>
  );
}

export default LoginForm;
