"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Message } from "../types/message";

const countUnred = (messages: Message[]) => {
  const unreadMessages: Message[] = [];
  messages.forEach((message) => {
    if (message.read === false) {
      unreadMessages.push(message);
    }
  });

  return unreadMessages;
};

const MessagesBlock = () => {
  const [messages, setMessages] = useState<Message[]>();
  const [unread, setUnread] = useState<Message[]>();

  useEffect(() => {
    const fetchmessagess = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/messages/");
        const data = await response.json();
        const unreadMessageCount = countUnred(data.results);
        setUnread(unreadMessageCount);
        setMessages(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchmessagess();
  });
  return (
    <div className="p-3 flex flex-col justify-between rounded-lg bg-gray-100 h-50">
      <div className="flex justify-between items-center">
        <div>
          <strong>Messages</strong>
        </div>
        <div className="text-sm">
          <strong>Unread </strong>
          <span className="bg-red-400 rounded-full py-1 px-2 w-2 h-2 ml-1 text-white">
            {" "}
            {unread && unread.length}
          </span>
        </div>
      </div>
      <div>
        {messages?.map((message, index) => (
          Number(index) <= 4 && (
          <div key={index} className="py-.5 flex justify-between">
            <Link href={`/messages/${message.id}`} className="hover:underline">
              <strong>{message.sender}:</strong> {message.body.slice(0, 60)}...
            </Link>
            <p>{message.date.split("T")[0]}</p>
          </div>
          )
        ))}
      </div>
      <div>
        <Link href={"/messages"}>View all messages &rarr;</Link>
      </div>
    </div>
  );
};

export default MessagesBlock;
