import { NextResponse } from "next/server";
import { ResponseError } from "../../../../../../error/response-error";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const jamParam = searchParams.get("jam");

    const targetUrl = jamParam
      ? `https://jakartasatu.jakarta.go.id/api-jakartasatu/simulasi_banjir/result/?jam=${jamParam}`
      : `https://jakartasatu.jakarta.go.id/api-jakartasatu/simulasi_banjir/result/`;

    console.log("Proxy fetching from:", targetUrl); // 🪵 Untuk debugging

    const response = await fetch(targetUrl, { cache: "no-store" });

    if (!response.ok) {
      console.error("API error with status", response.status);
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch data" }),
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof ResponseError) {
      return new NextResponse(JSON.stringify({ errors: error.message }), {
        status: error.status,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ errors: "Internal Server Error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
}
