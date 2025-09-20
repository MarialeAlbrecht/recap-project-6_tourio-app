import dbConnect from "@/db/connect";
import Place from "@/db/models/place";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const places = await Place.find();
      response.status(200).json(places);
      return;
    }
    if (request.method === "POST") {
      const newPlace = request.body;
      await Place.create(newPlace);
      response.status(201).json({ status: "new place created" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
    return;
  }
  response.status(405).json({ status: "Method not allowed." });
}
