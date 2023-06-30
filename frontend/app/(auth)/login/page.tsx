/* eslint-disable */
"use client";
import { redirect } from "next/navigation";

import Card from "@/lib/components/ui/Card";
import Field from "@/lib/components/ui/Field";
import PageHeading from "@/lib/components/ui/PageHeading";
import { useSupabase } from "@/lib/context/SupabaseProvider";

import { useSearchParams } from "next/navigation";

import { useEventTracking } from "@/services/analytics/useEventTracking";
import { GoogleLoginButton } from "./components/GoogleLogin";

import { MagicLinkLogin } from "./components/MagicLinkLogin";
import { PasswordForgotten } from "./components/PasswordForgotten";
import { useLogin } from "./hooks/useLogin";

export default function Login() {
  const { session } = useSupabase();
  const { track } = useEventTracking();
  const { handleLogin, setEmail, setPassword, email, isPending, password } =
    useLogin();

  const params = useSearchParams();
  const previousPage = params?.get("previous-page");

  if (session?.user !== undefined) {
    void track("SIGNED_IN");
    if (previousPage === undefined || previousPage === null) {
      redirect("/upload");
    }
    redirect(previousPage as string);
  }

  return (
    <main>
      <section className="w-full min-h-[80vh] h-full outline-none flex flex-col gap-5 items-center justify-center p-6">
        <PageHeading title="Login" subtitle="Welcome back" />
        <Card className="max-w-md w-full p-5 sm:p-10 text-left">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="flex flex-col gap-2"
          >
            <Field
              name="email"
              required
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <MagicLinkLogin email={email} setEmail={setEmail} />
          </form>
        </Card>
      </section>
    </main>
  );
}
