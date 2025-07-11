"use client";

import { Button } from "@/components/ui/button";
import { Form as FormComponent } from "@/components/ui/form";
import { authClient } from "@/lib/auth";
import { signInInput, type SignInInput } from "@/lib/schema";
import { getNow } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Password from "../_form/password";
import Username from "../_form/username";

const SignIn = () => {
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("next") ?? "/";
  console.log(redirectUrl);

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInInput),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (values: SignInInput) => {
    await authClient.signIn.username({
      ...values,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Welcome back!", {
            position: "top-center",
            description: getNow(),
          });
          window.location.href = redirectUrl;
        },
        onError: ({ error }) => {
          let message: string;
          switch (error.code) {
            case "INVALID_USERNAME_OR_PASSWORD":
              message = "Invalid username or password";
              break;

            default:
              message = "Unknown error occurred";
              console.error(error);
          }

          toast.error("Failed to sign in!", {
            position: "top-center",
            description: message,
          });
        },
      },
    });
  };

  return (
    <FormComponent {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6 w-full max-w-lg"
      >
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-balance">
            Sign in to your EmoryLife account
          </p>
        </div>

        <Username />
        <Password />

        <Button
          type="submit"
          disabled={
            form.formState.isSubmitting ||
            !!signInInput.safeParse(form.watch()).error
          }
          className="w-full"
        >
          {form.formState.isSubmitting ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Sign in"
          )}
        </Button>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="underline underline-offset-4 font-medium text-primary"
          >
            Sign up
          </Link>
        </div>
      </form>
    </FormComponent>
  );
};

export default SignIn;
