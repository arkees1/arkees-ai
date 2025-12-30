export type EmailAttachment = {
  filename: string;
  content: Buffer | string;
  contentType: string;
};

export type AutomationEmailPayload = {
  to: string;
  subject: string;
  body: string;
  attachments?: EmailAttachment[];
};

/**
 * 🔥 DEMO EMAIL SENDER
 * Replace this with Brevo / Nodemailer / SES later
 */
export async function sendAutomationEmail(
  payload: AutomationEmailPayload
) {
  console.log("📧 SENDING AUTOMATION EMAIL");
  console.log("To:", payload.to);
  console.log("Subject:", payload.subject);
  console.log("Body:", payload.body);
  console.log(
    "Attachments:",
    payload.attachments?.map((a) => a.filename)
  );

  // Simulate async send
  await new Promise((res) => setTimeout(res, 500));

  return { success: true };
}
