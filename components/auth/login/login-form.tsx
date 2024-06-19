"use client";
import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { login } from "@/actions/login";
import { FormError } from "../../form-error";
import { FormSuccess } from "../../form-success";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") == "OAuthAccountNotLinked"
      ? "Email already linked to another account"
      : undefined;
  const [showToFactor, setShowToFactor] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState<string | undefined>();
  const [success, setSuccess] = React.useState<string | undefined>();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function submit(value: z.infer<typeof LoginSchema>) {
    setSuccess(undefined);
    setError(undefined);
    startTransition(() => {
      login(value, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
            form.reset();
          }
          if (data?.success) {
            setSuccess(data?.success);
          }
          if (data?.twoFactor) {
            setShowToFactor(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setError("Something went wrong!!!");
        });
    });
  }
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          <div className="space-y-4">
            {showToFactor && (
              <>
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {!showToFactor && (
              <>
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ex: jGvR0@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" type="password" />
                      </FormControl>
                      <Button size="sm" variant="link">
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />

          <Button className="w-full" type="submit" disabled={isPending}>
            {showToFactor ? "Submit" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
