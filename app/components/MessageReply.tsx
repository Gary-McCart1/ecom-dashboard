import React, { useEffect, useState } from "react";
import { Message } from "../types/message";
import Toast from "./Toast";

interface Props {
  id: number;
  setToggleReply: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageReply = ({ id, setToggleReply }: Props) => {
  const [message, setMessage] = useState<Message>();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [toastToggle, setToastToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`https://foamhead-a8f24bda0c5b.herokuapp.com/api/messages/${id}`);
        if (!response.ok) {
          return;
        }
        const text = await response.text();
        if (!text) throw new Error("No message found with that id");
        const data = await JSON.parse(text);
        if (!data) return;
        setMessage(data);
        if (message) {
          setTo(message.email);
          setSubject(message.subject);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  });
  const handleReply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!content || !subject || !to){
        setError("No field can be blank")
        return
    }
    setError("")
    setToastToggle(true);
    setTimeout(() => {
        setToggleReply(false);
      }, 1000);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Reply</h1>
      <div className="my-5 bg-gray-100 p-5 rounded-lg w-full">
        {!loading ? (
          <form onSubmit={(e) => handleReply(e)}>
            <div className="flex items-center justify-between w-3/4 mb-3">
              <strong>To: </strong>
              <input
                className="bg-white p-1 ml-5 w-full rounded-lg"
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="my-5 flex items-center justify-between w-3/4 mb-3">
              <strong>Subject: </strong>
              <input
                className="bg-white p-1 ml-5 w-full rounded-lg"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="my-3">
              <strong>Message: </strong>
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="bg-white w-full h-40 mt-2.5 p-2 rounded-lg"
              ></textarea>
              {error && <p>{error}</p>}
            </div>
            <div className="flex justify-end">
              <input value="Send Reply" type="submit" className="btn w-full" />
            </div>
          </form>
        ) : (
          <div className="w-full h-[600px] flex justify-center items-center">
            <span className="loading loading-spinner w-[80px] h-[80px]"></span>
          </div>
        )}
        {toastToggle && (
          <Toast
            color="green"
            message="Reply sent successfully"
            onClose={() => setToastToggle(!toastToggle)}
          />
        )}
      </div>
    </>
  );
};

export default MessageReply;
