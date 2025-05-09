import React from "react";
import { Message } from "../types/message";
import Link from "next/link";

interface Props {
  message: Message;
}

const messageRow = ({ message }: Props) => {


  const handleEditMessage = async() => {
    const updatedMessage = {
      id: Number(message.id),
      sender: message.sender,
      subject: message.subject,
      body: message.body,
      date: message.date,
      read: true,
    };

    try {
      const response = await fetch(
        `https://foamhead-a8f24bda0c5b.herokuapp.com/api/orders/${message.id}/`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedMessage),
        }
      );
      if (response.ok){
        console.log("Message has been read")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td>{message.id}</td>
      <td>
        <div className="font-bold">{message.sender}</div>
      </td>
      <td>
        <strong>Subject:</strong> {message.subject}
      </td>
      <td>
        <span
          className={
            message.read
              ? "bg-green-400 rounded-lg p-2"
              : "bg-red-400 rounded-lg p-2"
          }
        >
          {message.read ? "Read" : "Unread"}
        </span>
      </td>
      <td>{message.date.split("T")[0]}</td>
      <td>
        <Link href={`/messages/${message.id}`}>
          <button onClick={handleEditMessage} className="btn btn-ghost btn-s">
            Details
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default messageRow;
