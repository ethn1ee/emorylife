"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type SignInInput, type SignUpInput } from "@/lib/schema";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

type PasswordProps = {
  isSignUp?: boolean;
};

const Password = ({ isSignUp = false }: PasswordProps) => {
  const form = useFormContext<SignInInput | SignUpInput>();

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem className="grid gap-3">
          <div className="flex items-center">
            <FormLabel htmlFor="password">Password</FormLabel>
            {!isSignUp && (
              <Link
                href="#"
                className="ml-auto text-sm underline-offset-2 hover:underline"
              >
                Forgot your password?
              </Link>
            )}
          </div>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter your password"
              type="password"
              required
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Password;
