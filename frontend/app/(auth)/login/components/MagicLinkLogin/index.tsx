/* eslint-disable */
"use client";
import { useState } from "react";

import Button from "@/lib/components/ui/Button";
import { useSupabase } from "@/lib/context/SupabaseProvider";
import { useToast } from "@/lib/hooks/useToast";
import { useAccount, useContractRead } from "wagmi";
import ERC1155ABI from "../../../../contracts/erc1155.json";
type MaginLinkLoginProps = {
  email: string;
  setEmail: (email: string) => void;
};

export const MagicLinkLogin = ({ email, setEmail }: MaginLinkLoginProps) => {
  const { address } = useAccount();

  const contractRead = useContractRead({
    address: "0xf90c831efeb6e228f836ca0ca3b78237d8b2bef2",
    abi: ERC1155ABI,
    functionName: "balanceOf",
    args: [address, 1],
  });
  const balance = parseInt(contractRead.data?.toString() || "0");
  console.log(balance, "balance");
  console.log(ERC1155ABI, contractRead.data?.toString(), "contractRead");
  const { supabase } = useSupabase();
  const [isPending, setIsPending] = useState(false);

  const { publish } = useToast();

  const handleLogin = async () => {
    if (balance == 0) {
      publish({
        variant: "danger",
        text: "You Need To Hold At Least 1 BRAIN Token To Login",
      });
      return;
    }

    setIsPending(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://ai.nerd.finance", // current domain name. for eg localhost:3000, localhost:3001, https://...
      },
    });

    if (error) {
      publish({
        variant: "danger",
        text: error.message,
      });
    } else {
      publish({
        variant: "success",
        text: "Magic link sent successfully if NFT recognized",
      });

      setEmail("");
    }
    setIsPending(false);
  };

  return (
    <Button
      type="button"
      variant={"tertiary"}
      onClick={handleLogin}
      isLoading={isPending}
    >
      Send Magic Link
    </Button>
  );
};
