import { NextResponse } from "next/server";
import { ResponseError } from "../../../../error/response-error";

export async function POST(request) {
  try {
    const url = "http://10.1.2.180/gateway/public/api/sendemail";

    const bodyrequest = await request.formData();
    const subject = bodyrequest.get("subject");
    const email = bodyrequest.get("email");
    const html = bodyrequest.get("html");

    const body = new FormData();
    body.append("subject", subject);
    body.append("email", email);
    body.append("html", html);

    const response = await fetch(url, {
      method: "POST",
      body: body,
    });
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
