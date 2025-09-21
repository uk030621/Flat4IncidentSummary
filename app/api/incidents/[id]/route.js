import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req, context) {
  const { id } = await context.params; // ✅ await params
  const data = await req.json();
  const client = await clientPromise;
  const db = client.db("incidentdb");

  await db
    .collection("incidents")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });

  return new Response(JSON.stringify({ message: "Updated" }), { status: 200 });
}

export async function DELETE(req, context) {
  const { id } = await context.params; // ✅ await params
  const client = await clientPromise;
  const db = client.db("incidentdb");

  await db.collection("incidents").deleteOne({ _id: new ObjectId(id) });
  return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
}
