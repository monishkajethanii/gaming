// src/app/api/sendTelegramMessage
import { sendTelegramMessage } from "../../../lib/telegram"; // Adjust the import path

export async function POST(request) {
  const { chatId, message, botToken } = await request.json();
  
  try {
    const result = await sendTelegramMessage(chatId, message, botToken);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Failed to send message", { status: 500 });
  }
}
