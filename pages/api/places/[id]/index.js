import dbConnect from "@/db/connect.js";
import Place from "@/db/models/place.js";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      response.status(404).json({ status: "Not found" });
      return;
    }
    response.status(200).json(place);
  }

  response.status(405).jason({ status: "Method not allowed" });
}
