"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type SignUpInput } from "@/lib/schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

const ClassFormField = () => {
  const t = useTranslations("auth.inputs.class");
  const form = useFormContext<Pick<SignUpInput, "class">>();

  return (
    <FormField
      control={form.control}
      name="class"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="class">{t("label")}</FormLabel>
          <FormControl>
            <Input
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                field.onChange(isNaN(val) ? "" : val);
              }}
              type="number"
              placeholder="2025"
              className="clear-input-style h-10 !ring ring-border"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ClassFormField;
