import { NextResponse } from "next/server";
import { ResponseError } from "../../../../../error/response-error";

export const dynamic = "force-dynamic";

export async function GET(request) {
    try {
        const { searchParams } = request.nextUrl;
        const latitudeRequest = parseFloat(searchParams.get("latitude"));
        const longitudeRequest = parseFloat(searchParams.get("longitude"));
        const distance = parseFloat(searchParams.get("distance"));

        const wmsHalteQuery = "https://jakartasatu.jakarta.go.id/server/rest/services/Data_Master/Halte_Jakarta/MapServer/0/query?";

        const params = new URLSearchParams({
            f: "geojson",
            returnGeometry: "true",
            geometryType: "esriGeometryPoint",
            inSR: "4326",
            outSR: "4326",
            returnFieldName: "true",
            outFields: "*",
            units: "esriSRUnit_Meter",
            supportsQueryWithDistance: "true",
            distance: distance.toString(),
            geometry: `${longitudeRequest},${latitudeRequest}`,
        });

        const response = await fetch(`${wmsHalteQuery}${params.toString()}`, {
            method: "GET",
            next: {
                revalidate: 0
            }
        });

        if (!response.ok) {
            return NextResponse.json({ message: "Data tidak bisa diakses" }, { status: 400 });
        }

        const data = await response.json();

        if (data.features.length === 0) {
            return NextResponse.json({ message: "Halte tidak ditemukan" }, { status: 404 });
        }

        const updatedFeatures = [];
        for (const feature of data.features) {
            const destination = {
                latitude: feature.geometry.coordinates[1],
                longitude: feature.geometry.coordinates[0],
            };
            const origin = {
                latitude: latitudeRequest,
                longitude: longitudeRequest,
            };

            const distanceTime = await getDistanceTime(origin, destination);

            if (distanceTime) {
                feature.properties.distance = distanceTime.distance;
                feature.properties.time = distanceTime.time;
                feature.properties.polyline = distanceTime.polyline;
            }

            updatedFeatures.push(feature);
        }

        data.features = updatedFeatures;

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

// Distance and time fetcher
const getDistanceTime = async (origin, destination) => {
    try {
        const API_KEY = process.env.GOOGLE_MAP_API_KEY;

        const headers = new Headers();
        headers.append("X-Goog-Api-Key", API_KEY);
        headers.append("X-Goog-FieldMask", "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline");
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify({
            origin: {
                location: {
                    latLng: {
                        latitude: origin.latitude,
                        longitude: origin.longitude
                    }
                }
            },
            destination: {
                location: {
                    latLng: {
                        latitude: destination.latitude,
                        longitude: destination.longitude
                    }
                }
            },
            travelMode: "DRIVE"
        });

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: body,
            next: {
                revalidate: 0
            }
        };

        const response = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", requestOptions);

        if (!response.ok) {
            console.error("Google Directions API error", await response.text());
            return null;
        }

        const data = await response.json();
        const route = data.routes?.[0];

        if (!route) {
            console.error("No route found in Google Maps API response.");
            return null;
        }

        const distanceMeters = route.distanceMeters;
        const durationSeconds = parseInt(route.duration.replace("s", ""));
        const durationFormatted = formatDuration(durationSeconds);
        const polyline = route.polyline.encodedPolyline;

        return {
            distance: distanceMeters,
            time: durationFormatted,
            polyline: polyline
        };
    } catch (error) {
        console.error("Failed to fetch Google Maps distance/time:", error);
        return null;
    }
};


function formatDuration(durationStr) {
    const totalSeconds = parseInt(durationStr);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours} hr`);
    if (minutes > 0) parts.push(`${minutes} min`);
    if (hours === 0 && minutes === 0 && seconds > 0) parts.push(`${seconds} sec`);

    return parts.join(" ");
}