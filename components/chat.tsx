"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Button from "./ui/button";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import { useChat } from "ai/react";
import LogoSVG from "./ui/logo";
import JustLogo from "./ui/justLogo";
import "../styles/Chat.css";

export default function Chat() {
  const ref = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat();

  //   const handleSubmitCallback = useCallback(() => {
  //     if (handleSubmit) {
  //       console.log("Hello!!");
  //       handleSubmit;
  //     }
  //   }, [handleSubmit]);

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);
  return (
    <section className="container relative text-sinc-700 h-screen w-screen flex justify-center items-center flex flex-row ">
      <div className="relative h-screen w-3/4 flex flex-col items-center justify-center left-10">
        <div
          className="relative h-3/4 w-3/4 bg-gray-200 rounded-md overflow-auto p-2"
          ref={ref}
        >
          {error && <div className="text-sm">{error.message}</div>}
          {messages.map((m, index) => (
            <div key={index} className="whitespace-pre-wrap p-2">
              {m.role === "user" ? (
                <div className="flex justify-end items-center">
                  <span className="text-white p-2 pl-3 pr-3 border border-blue-500 bg-blue-500 rounded-md">
                    {m.content}
                  </span>
                  <UserIcon className="min-w-6 h-6 w-6 ml-1 flex relative" />
                </div>
              ) : (
                <div className="flex items-start">
                  <JustLogo className="min-w-6 h-6 w-6 mr-1" />
                  <span className="text-white p-3 pl-5 border bg-red-800 rounded-lg">
                    {m.content}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative w-3/4 mt-2">
          <div className="relative">
            <textarea
              className="p-2 rounded shadow-xl resize-none w-full"
              value={input}
              placeholder="Type here to learn more about Visual Intelligence..."
              onChange={handleInputChange}
              rows={2}
            />
            <Button
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
              type="submit"
              disabled={isLoading}
            >
              <ChatBubbleLeftRightIcon className="text-blue-500 h-6 w-6" />
            </Button>
          </div>
        </form>
      </div>
      <div className="bottom-component relative border w-md flex justify-center">
        <LogoSVG />
      </div>
    </section>
  );
}
