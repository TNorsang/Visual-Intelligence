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
    <section className="relative text-sinc-700 h-screen w-screen flex justify-center items-center">
      <div className="relative h-screen w-1/2 flex flex-col justify-center left-10">
        <div
          className="relative h-3/4 w-3/4 bg-blue-200 rounded-md overflow-auto"
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
          className="relative overflow-y-auto w-3/4"
        >
          <textarea
            className="p-2 mt-2 rounded shadow-xl resize-none"
            value={input}
            placeholder="Ask your question here..."
            onChange={handleInputChange}
            rows={2}
            style={{
              width: "100%",
              paddingRight: "10%",
            }}
          >
            <Button
              className="absolute right-2"
              type="submit"
              disabled={isLoading}
            >
              <ChatBubbleLeftRightIcon className="text-blue-500 h-6 w-6" />
            </Button>
          </textarea>
        </form>
      </div>
      <Image
        className="relative right-3"
        src="/images/pupil-distortion.png"
        alt="pupilImage"
        width={500}
        height={500}
      />
    </section>
  );
}
