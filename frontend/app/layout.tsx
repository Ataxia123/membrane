import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { cookies, headers } from "next/headers";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import Footer from "@/lib/components/Footer";
import { NavBar } from "@/lib/components/NavBar";
import { TrackingWrapper } from "@/lib/components/TrackingWrapper";
import { ToastProvider } from "@/lib/components/ui/Toast";
import { BrainProvider, FeatureFlagsProvider } from "@/lib/context";
import { BrainConfigProvider } from "@/lib/context/BrainConfigProvider/brain-config-provider";
import { SupabaseProvider } from "@/lib/context/SupabaseProvider";

import { chains, config } from "@/lib/context/Web3Provider/wagmi";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quivr - Get a Second Brain with Generative AI",
  description:
    "Quivr is your second brain in the cloud, designed to easily store and retrieve unstructured information.",
};

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body
        className={`bg-white text-black min-h-screen flex flex-col dark:bg-black dark:text-white w-full ${inter.className}`}
      >
        <FeatureFlagsProvider>
          <ToastProvider>
            <SupabaseProvider session={session}>
              <BrainConfigProvider>
                <BrainProvider>
                  <WagmiConfig config={config}>
                    <RainbowKitProvider chains={chains}>
                      {" "}
                      <NavBar />
                      <div className="flex-1">{children}</div>
                    </RainbowKitProvider>
                  </WagmiConfig>

                  <Footer />
                </BrainProvider>
              </BrainConfigProvider>
            </SupabaseProvider>
          </ToastProvider>
          <Analytics />
        </FeatureFlagsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
