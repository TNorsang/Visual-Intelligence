"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Button from "./ui/button";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import { useChat } from "ai/react";
import Logo from "./ui/logo";
import V from "./ui/v";
import "../styles/Chat.css";
import Image from "next/image";

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
    <div className="main bg-black flex flex-row relative h-screen w-screen justify-center items-center border">
      <div className="chatFrame relative h-screen w-9/12 flex flex-col items-center justify-center">
        <Logo className="m-5 w-10/12" />
        <div
          className="viewBox relative border-4 border-red-700 h-3/4 w-3/4 bg-gray-200 rounded-md overflow-auto p-2"
          ref={ref}
        >
          {error && <div className="text-sm">{error.message}</div>}
          {messages.map((m, index) => (
            <div className="whitespace-pre-wrap p-2">
              {m.role === "user" ? (
                <div className="flex justify-end items-center">
                  <span className="text-white p-2 pl-3 pr-3 border border-blue-500 bg-blue-500 rounded-md">
                    {m.content}
                  </span>
                  <UserIcon className="min-w-6 h-6 w-6 ml-1 flex relative" />
                </div>
              ) : (
                <div className="flex items-center justify-start">
                  <V className="min-w-6 h-6 w-6 mr-1 flex" />
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
        <div className="img flex flex-row">
          <Image
            className="book"
            src="/book.png"
            alt="Book Image"
            width={500}
            height={500}
          />
          <Image
            className="app"
            src="/app.png"
            alt="App Image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
