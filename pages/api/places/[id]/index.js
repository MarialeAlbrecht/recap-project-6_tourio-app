import dbConnect from "@/db/connect.js";
import Place from "@/db/models/place.js";

export default async function handler(request, response) {
  await dbConnect();

  try {
    const { id } = request.query;

    if (request.method === "GET") {
      const place = await Place.findById(id);
      if (!place) {
        response.status(404).json({ status: "Not found" });
        return;
      }
      response.status(200).json(place);
      return;
    }

    if (request.method === "PUT") {
      const updatePlace = request.body;
      await Place.findByIdAndUpdate(id, updatePlace);
      response.status(200).json({ message: "Place updated" });
      return;
    }

    if (request.method === "DELETE") {
      const result = await Place.findByIdAndDelete(id);
      response.status(200).json({ message: "Place deleted" });
      return;
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
  response.status(405).jason({ status: "Method not allowed" });
}
