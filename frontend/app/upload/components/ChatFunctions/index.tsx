/* eslint-disable */
"use client";
import Button from "@/lib/components/ui/Button";

import { useChat } from "@/app/chat/[chatId]/hooks/useChat";
import { useState } from "react";

export const IntakeForm = (): JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState<string>(""); // for optimistic updates
  const { addQuestion, generatingAnswer } = useChat();

  const submitQuestion = () => {
    addQuestion(message, () => setMessage(""));
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
          submitQuestion(); }
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
            />
            <label htmlFor="email">Project Description</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 m-2 border border-gray-300 rounded-md"
            />
            <label htmlFor="phone">Project Landing Page</label>
            <input
              id="phone"
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-2 m-2 border border-gray-300 rounded-md"
            />
            <label htmlFor="phone">Project Landing Page</label>
            <input
              id="phone"
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-2 m-2 border border-gray-300 rounded-md"
            />
            <Button
              type="submit"
              className="p-2 m-2 border border-gray-300 rounded-md"
            >
              Submit
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
