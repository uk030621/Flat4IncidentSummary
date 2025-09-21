import clientPromise from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const client = await clientPromise;
  const db = client.db("incidentdb");
  const incidents = await db.collection("incidents").find().toArray();
  return new Response(JSON.stringify(incidents), { status: 200 });
}

export async function POST(req) {
  try {
    const data = await req.json();

    const client = await clientPromise;
    const db = client.db("incidentdb");
    const result = await db.collection("incidents").insertOne(data);

    // Parse admin emails into array
    const adminEmails = process.env.RESEND_ADMIN_EMAILS.split(",").map((e) =>
      e.trim()
    );

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: adminEmails,
      subject: `Flat 4 - New Incident Submitted - ${data.incidentCode}`,
      html: `
        <h2>New Incident Reported</h2>
        <p><b>Incident Code:</b> ${data.incidentCode}</p>
        <p>View details in the app: <a href="${process.env.APP_URL}">${process.env.APP_URL}</a></p>
      `,
    });

    return new Response(
      JSON.stringify({
        message: "Incident saved and email sent",
        id: result.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving incident:", error);
    return new Response(
      JSON.stringify({ error: "Failed to submit incident" }),
      {
        status: 500,
      }
    );
  }
}
