type Channel = "email" | "whatsapp";

export type NotificationPayload = {
  userId: string;
  channel: Channel;
  subject: string;
  message: string;
};

export async function sendNotification(payload: NotificationPayload) {
  const { channel, subject, message, userId } = payload;

  /**
   * MVP STUB:
   * Replace with real providers later.
   * - Email: Resend / Brevo / SES
   * - WhatsApp: Twilio / Meta API
   */
  if (channel === "email") {
    console.log(
      `[EMAIL] to=${userId} | subject="${subject}" | message="${message}"`
    );
  }

  if (channel === "whatsapp") {
    console.log(
      `[WHATSAPP] to=${userId} | message="${message}"`
    );
  }

  return { success: true };
}
