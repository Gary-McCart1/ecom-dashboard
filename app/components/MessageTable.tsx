"use client";

import React, { useEffect, useState } from "react";
import { Message } from "../types/message";
import MessageRow from "./MessageRow"


const MessageTable = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("https://foamhead-a8f24bda0c5b.herokuapp.com/api/messages/");
        const data = await response.json();
        setMessages(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="mt-10">
      <div className="overflow-x-auto overflow-y-scroll max-h-[screen]">
        <table className="table w-full">
          {/* head */}
          <thead className="text-zinc-950">
            <tr>
              <th className="text-lg">ID</th>
              <th className="text-lg">Sender</th>
              <th className="text-lg">Subject</th>
              <th className="text-lg">Status</th>
              <th className="text-lg">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <MessageRow key={index} message={message} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageTable;
