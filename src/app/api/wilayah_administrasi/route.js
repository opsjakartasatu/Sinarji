export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { ResponseError } from "../../../../error/response-error";

export async function GET(request) {
  try {
    const { searchParams } = request.nextUrl;
    const kelurahan = searchParams.get("kelurahan")?.replace(/"/g, ""); // remove quotes if any
    const FeatureServerUrl =
      "https://jakartasatu.jakarta.go.id/server/rest/services/Batas_Administrasi_Update/Batas_Administrasi_DKI_Jakarta_Update_View/FeatureServer/3/query?where=1%3D1&f=geojson&returnGeometry=false&outFields=WADMKK,WADMKC,WADMKD";

    const response = await fetch(FeatureServerUrl);
    const data = await response.json();

    const features = data.features || [];
    const arrayProps = features.map((feature) => feature.properties);

    const data2 = arrayProps.find((feature) => feature.WADMKD === kelurahan);

    if (!data2) {
      return new NextResponse(
        JSON.stringify({ error: "Kelurahan not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return NextResponse.json(data2, { status: 200 });
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
