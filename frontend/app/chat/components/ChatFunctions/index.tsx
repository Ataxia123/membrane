/* eslint-disable */
"use client";
import Button from "@/lib/components/ui/Button";

import { useChat } from "@/app/chat/[chatId]/hooks/useAnalysis";
import { useState } from "react";

// esl

export const IntakeForm = (): JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState<string>(""); // for optimistic updates
  const { addAnalysis, generatingAnswer } = useChat();

  const submitQuestion = () => {
    addAnalysis(name, () => setMessage(""));
  };

  async function handleSubmit() {
    console.log("harmless");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Intake Form</h1>
        <p className="mt-3 text-2xl">
          Please fill out the following form to the best of your ability.
        </p>

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
        <div>
          {name}
          {email}
          {phone}
        </div>
      </main>
    </div>
  );
};

export default IntakeForm;
