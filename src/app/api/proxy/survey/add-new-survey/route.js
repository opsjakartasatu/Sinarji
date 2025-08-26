export async function POST(req) {
  const formData = await req.formData();

  const response = await fetch(
    "https://jakartasatu.jakarta.go.id/apimobile/internal/backend/survey/add-new-survey",
    {
      method: "POST",
      headers: {
        Authorization: req.headers.get("authorization"),
      },
      body: formData,
    }
  );

  const contentType =
    response.headers.get("content-type") || "application/json";
  const result = await response.text(); // safer for HTML fallback

  return new Response(result, {
    status: response.status,
    headers: { "Content-Type": contentType },
  });
}
