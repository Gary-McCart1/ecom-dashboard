import { messages } from "@/app/data/messages"

export const GET = () => {
    return Response.json(messages)
}

