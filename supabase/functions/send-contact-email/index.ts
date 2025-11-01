import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact notification email for:", email);

    // Send notification to admin with all contact details
    const adminEmailResponse = await resend.emails.send({
      from: "ForesiteaiMessaging <onboarding@resend.dev>",
      to: ["foresiteai@gmail.com"],
      replyTo: email, // Allow direct reply to the person who submitted the form
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">You can reply directly to this email to respond to ${firstName}.</p>
      `,
    });

    console.log("Admin notification sent successfully:", adminEmailResponse);

    // Send confirmation to user
    const userEmailResponse = await resend.emails.send({
      from: "ForesiteaiMessaging <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for reaching out to ForeSite AI",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Contacting Us!</h1>
            </div>
            
            <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Dear ${firstName} ${lastName},</p>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                Thank you for reaching out to <strong>ForeSite AI</strong>. We have successfully received your message and our team is reviewing it carefully.
              </p>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                We understand that your time is valuable, and we're committed to providing you with the best possible AI solutions. One of our specialists will get back to you within 24 hours during business days (Monday - Friday, 9:00 AM - 6:00 PM CST).
              </p>
              
              <div style="background: #f9fafb; padding: 20px; border-left: 4px solid #667eea; margin: 30px 0; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; font-weight: bold; color: #667eea;">Your Message:</p>
                <p style="white-space: pre-wrap; margin: 0; color: #4b5563;">${message}</p>
              </div>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                In the meantime, feel free to explore our <a href="https://foresiteai.com" style="color: #667eea; text-decoration: none; font-weight: 600;">website</a> to learn more about how we're transforming businesses with cutting-edge AI solutions.
              </p>
              
              <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
                <p style="font-size: 16px; margin-bottom: 5px;">Warm regards,</p>
                <p style="font-size: 16px; font-weight: bold; color: #667eea; margin: 0;">The ForeSite AI Team</p>
                <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">11111 Katy Freeway Suite 910, Houston, TX 77079</p>
                <p style="font-size: 14px; color: #6b7280; margin: 5px 0;">
                  <a href="mailto:Info@foresiteai.com" style="color: #667eea; text-decoration: none;">Info@foresiteai.com</a> | 
                  <a href="tel:5555555555" style="color: #667eea; text-decoration: none;">(555) 555-5555</a>
                </p>
              </div>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p style="margin: 5px 0;">© 2024 ForeSite AI. All rights reserved.</p>
              <p style="margin: 5px 0;">This is an automated message. Please do not reply directly to this email.</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("User confirmation sent successfully:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        adminEmail: adminEmailResponse,
        userEmail: userEmailResponse
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
