import { NextResponse } from "next/server";
import { ResponseError } from "../../../../../error/response-error";

export const dynamic = "force-dynamic";

const urlToponimi = "https://tataruang.jakarta.go.id/server/rest/services/Geodatabase_Pemetaan/Survei_Toponimi_2023/FeatureServer/0"

export async function GET(request) {
    try {
        const { searchParams } = request.nextUrl;
        const latitudeRequest = parseFloat(searchParams.get("latitude"));
        const longitudeRequest = parseFloat(searchParams.get("longitude"));
        const distance = parseFloat(searchParams.get("distance"));

        const params = new URLSearchParams({
            f: "geojson",
            returnGeometry: "true",
            geometryType: "esriGeometryPoint",
            inSR: "4326",
            outSR: "4326",
            returnFieldName: "true",
            outFields: "OBJECTID,NAMOBJ,JNS",
            units: "esriSRUnit_Meter",
            supportsQueryWithDistance: "true",
            distance: distance.toString(),
            geometry: `${longitudeRequest},${latitudeRequest}`,
            where: "JNS IS NOT NULL"
        });

        const response = await fetch(`${urlToponimi}/query?${params.toString()}`, {
            method: "GET",
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            return NextResponse.json({ message: "Data tidak bisa diakses" }, { status: 400 });
        }

        const geojson = await response.json();

        if (geojson.features.length === 0) {
            return NextResponse.json({ message: "Toponimi tidak ditemukan" }, { status: 404 });
        }

        for (const feature of geojson.features) {
            const objectId = feature.properties.OBJECTID;

            const attachRes = await fetch(`${urlToponimi}/queryAttachments?objectIds=${objectId}&f=json`);

            if (!attachRes.ok) {
                feature.properties.image = [];
                continue;
            }

            const attachData = await attachRes.json();

            const attachmentInfos = attachData?.attachmentGroups?.[0]?.attachmentInfos || [];

            const images = attachmentInfos.length > 0 ? attachmentInfos.map(att => `${urlToponimi}/${objectId}/attachments/${att.id}`) : [`${process.env.BASE_URL}/image-not-found.png`];

            feature.properties.image = images;
        }

        const categoryNames = [...new Set(geojson.features.map(feature => feature.properties.JNS))].sort();

        const category = categoryNames.map(name => {
            const iconEntry = categoryIcon.find(entry => entry.category === name);
            return {
                category: name,
                icon: iconEntry ? iconEntry.icon : "https://dummyimage.com/50x50/cccccc/000000&text=No+Icon"
            };
        });

        return NextResponse.json({ category, geojson }, { status: 200 });

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
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }
    }
}

const categoryIcon = [
    {
        "category": "Administratif",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Fisik Alamiah",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Industri",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Kesehatan",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Limbah",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Olahraga",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Pariwisata dan Hiburan",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Pendidikan",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Peribadatan",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Perdagangan dan Jasa",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Perkantoran",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Perkantoran dan Perdagangan Jasa",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Perkantoran, Perdagangan dan Jasa",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Permukiman",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Pertahanan dan Keamanan",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "RTH dan Sejenisnya",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Sosial",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Tranportasi",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Transportasi",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Utilitas",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    },
    {
        "category": "Wisata dan Hiburan",
        "icon": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/feaab436b7464c6d807d2656e49310ed/data"
    }
]