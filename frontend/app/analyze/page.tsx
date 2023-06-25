"use client";
import Link from "next/link";

import Button from "@/lib/components/ui/Button";
import { Divider } from "@/lib/components/ui/Divider";
import PageHeading from "@/lib/components/ui/PageHeading";

import IntakeForm from "./components/intakeForm";

const AnalyzePage = (): JSX.Element => {
  return (
    <main className="pt-10">
      <PageHeading
        title="Analyze Projects"
        subtitle="Use your knowledge base to determine the value proposition of a project"
      />
      STUFF GOES HERE
      <IntakeForm />
      <Divider text="or" className="m-5" />
      <div className="flex flex-col items-center justify-center gap-5 mt-5">
        <Link href={"/chat"}>
          <Button variant={"secondary"} className="py-3">
            Chat
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default AnalyzePage;
