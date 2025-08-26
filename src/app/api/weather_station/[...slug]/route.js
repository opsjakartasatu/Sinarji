import { NextResponse } from "next/server";
import { ResponseError } from "../../../../../error/response-error";

export async function GET(request, { params }) {
  try {
    const responseGeoJSON = await fetch(
      "https://jakartasatu.jakarta.go.id/server/rest/services/DLH/Kualitas_Udara/FeatureServer/0/query?where=1%3D1&f=geojson&outFields=*",
      {
        headers: {
          "Cache-Control": "no-store",
          Pragma: "no-store",
          Expires: "0",
        },
        next: {
          revalidate: 0,
        },
      }
    );
    const geoJSON = await responseGeoJSON.json();

    if (!geoJSON.features || geoJSON.features.length === 0) {
      throw new ResponseError("No features found in GeoJSON", 404);
    }

    const { slug } = params;

    if (slug[0] === "nearest") {
      const { searchParams } = request.nextUrl;
      const latitudeRequest = parseFloat(searchParams.get("lat"));
      const longitudeRequest = parseFloat(searchParams.get("long"));

      if (isNaN(latitudeRequest) || isNaN(longitudeRequest)) {
        throw new ResponseError("Invalid latitude or longitude", 400);
      }

      let closestPoint = null;
      let minDistance = Infinity;

      for (const feature of geoJSON.features) {
        if (feature.geometry.type === "Point") {
          const [long, lat] = feature.geometry.coordinates;
          const distance = haversineDistance(
            lat,
            long,
            latitudeRequest,
            longitudeRequest
          );

          if (distance < minDistance) {
            minDistance = distance;
            closestPoint = feature;
          }
        }
      }

      if (!closestPoint) {
        throw new ResponseError("No valid points found in GeoJSON", 404);
      }

      const modifiedClosestPoint = {
        ...closestPoint,
        properties: {
          ...closestPoint.properties,
          TGL: closestPoint.properties.TGL
            ? formatTime(closestPoint.properties.TGL)
            : null,
        },
      };

      return NextResponse.json(
        { closestPoint: modifiedClosestPoint, distance: minDistance },
        { status: 200 }
      );
    } else if (slug[0] === "all") {
      const modifiedFeatures = geoJSON.features.map((feature) => {
        if (feature.properties.TGL) {
          return {
            ...feature,
            properties: {
              ...feature.properties,
              TGL: formatTime(feature.properties.TGL),
            },
          };
        }
        return feature;
      });

      const modifiedGeoJSON = { ...geoJSON, features: modifiedFeatures };

      return NextResponse.json(modifiedGeoJSON, { status: 200 });
    }
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

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const toRad = (angle) => (angle * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function formatTime(timestamp) {
  const utc7Millis = 7 * 60 * 60 * 1000;
  const date = new Date(timestamp + utc7Millis);
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const month = monthNames[date.getUTCMonth()];
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(1, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
}

