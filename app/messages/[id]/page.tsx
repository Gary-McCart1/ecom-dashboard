"use client";

import MessageReply from "@/app/components/MessageReply";
import { Message } from "@/app/types/message";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const MessagePage = () => {
  const [message, setMessage] = useState<Message>();
  const [toggleReply, setToggleReply] = useState(false)
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch(`https://foamhead-a8f24bda0c5b.herokuapp.com/api/messages/${id}/`);

      // Make sure there's actually something in the response
      if (!response.ok) {
        console.error("Failed to fetch message", response.status);
        return;
      }
      const text = await response.text();
      if (!text) {
        console.warn("No data returned from API");
        return;
      }
      try {
        const data = JSON.parse(text);
        setMessage(data);
      } catch (err) {
        console.error("Invalid JSON:", err);
      }
    };

    fetchMessage();
  }, [id]);

  return (
    <div className="m-20">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Message</h1>
        {/* TODO */}
        {/* <button className="btn" onClick={() => {setToggleReply(!toggleReply)}}>Reply</button> */}
      </div>
      {message ? (
        <div className="my-10 bg-gray-100 p-5 rounded-lg">
          <div className="flex justify-between mb-3">
            <p>
              <strong>From: </strong>
              {message.sender}
            </p>
            <p>
              <strong>Date: </strong>
              {message.date.split("T")[0]}
            </p>
          </div>
          <div className="my-5">
            <p>
              <strong>Subject: </strong>
              {message.subject}
            </p>
          </div>
          <div className="my-3">
            <p>
              <strong>Message: </strong>
              {message.body}
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full h-[600px] flex justify-center items-center">
          <span className="loading loading-spinner w-[80px] h-[80px]"></span>
        </div>
      )}
      {(toggleReply && message) && (
        <div>
          <MessageReply id={message.id} setToggleReply={setToggleReply} />
        </div>
      )}
    </div>
  );
};

export default MessagePage;
