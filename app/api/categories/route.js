

export async function GET() {
  const categories = ["bedroom", "living", "dining", "kids"];
  return Response.json(categories);
}



