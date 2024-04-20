"use client";

import React, { useEffect, useRef } from "react";
import Button from "./ui/button";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/outline";
import { useChat } from "ai/react";

export default function Chat() {
  const ref = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat();

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);
  return (
    <section className="relative border text-sinc-700 h-screen w-screen flex justify-center items-center">
      <div className="relative h-screen w-1/2 flex flex-col items-center justify-center">
        <div
          className="relative border h-1/2 w-1/2 border-pink-500 bg-blue-200 rounded=md"
          ref={ref}
        >
          {error && <div className="text-sm">{error.message}</div>}
          {messages.map((m, index) => (
            <div key={index} className="whitespace-pre-wrap p-2">
              {m.role === "user" ? (
                <span className="flex items-start">
                  <UserIcon className="min-w-6 h-6 w-6" />
                  (You) <span className="text-blue-400"> {m.content} </span>
                </span>
              ) : (
                <span className="flex items-start">
                  (Visual Intelligence)
                  <span className="text-yellow-500"> {m.content} </span>
                </span>
              )}
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto border border-blue-500"
        >
          <textarea
            className="border border-white-500 w-1/3"
            value={input}
            placeholder="Ask your question here..."
            onChange={handleInputChange}
            rows={2}
            style={{
              width: "100%",
              paddingRight: "10%",
              boxSizing: "border-box",
            }}
          ></textarea>
          <Button
            className="absolute right-2"
            type="submit"
            disabled={isLoading}
          >
            <ChatBubbleLeftRightIcon className="text-blue-500 h-6 w-6" />
          </Button>
        </form>
      </div>
      <Image
        src="/images/pupil-distortion.png"
        alt="pupilImage"
        width={300}
        height={300}
      />
    </section>
  );
}
