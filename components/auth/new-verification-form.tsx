/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token does not exist");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong");
        setSuccess(undefined);
      });
  }, [token, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirm your verification"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="flex item-center w-full justify-center">
        {!success && !error && <BeatLoader />}
      </div>
      <div className="w-full flex justify-center items-center">
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
      </div>
    </CardWrapper>
  );
};
