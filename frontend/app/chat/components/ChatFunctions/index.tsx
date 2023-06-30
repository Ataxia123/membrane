/* eslint-disable */
"use client";
import Button from "@/lib/components/ui/Button";

import { useChat } from "@/app/chat/[chatId]/hooks/useAnalysis";
import { useState } from "react";
import { ChatInput } from "../ChatMessages/ChatInput";
import Card from "@/lib/components/ui/Card";

// esl

export const IntakeForm = (): JSX.Element => {
  const [name, setName] = useState("");

  const { addAnalysis, generatingAnswer } = useChat();

  const submitQuestion = () => {
    addAnalysis(name, () => setName(""));
  };

  async function handleSubmit() {
    console.log("harmless");
  }

  return (
    <Card className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <h1 className="text-2xl font-bold">Talk With your Research</h1>{" "}
      <ChatInput />
      <h1 className="text-2xl font-bold">Project Analyzer</h1>
      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!generatingAnswer) {
              submitQuestion();
            }
          }}
          className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center"
        >
          <label htmlFor="name">Project Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 m-2 border border-gray-300 rounded-md"
            style={{ color: "black" }}
          />
          <Button
            type="submit"
            className="p-2 m-2 border border-gray-300 rounded-md"
          >
            Submit Name for Analysis
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default IntakeForm;
