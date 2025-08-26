import { NextResponse } from "next/server";
import { ResponseError } from "../../../../../error/response-error";
import Polygon from "@arcgis/core/geometry/Polygon.js"; 
import * as intersectionOperator from "@arcgis/core/geometry/operators/intersectionOperator.js";
import * as geodesicUtils from "@arcgis/core/geometry/support/geodesicUtils.js";

export async function POST(request) {
  try {
    const bodyRequest = await request.formData();
    const fid = bodyRequest.get("fid");
    const title = bodyRequest.get("title");

    //==== Get GeoJSON BPN ==== //
    const inputPolygonUrl = urlLayer(title);
    const inputPolygonQueryParams = new URLSearchParams({
      where: `FID=${fid}`,
      outFields: "*",
      returnGeometry: "true",
      f: "geojson",
    });

    const responseInputTargetUrl = await fetch(`${inputPolygonUrl}query?${inputPolygonQueryParams.toString()}`);
    const geoJSONInputPolygon = await responseInputTargetUrl.json();

    if (!geoJSONInputPolygon.features || geoJSONInputPolygon.features.length === 0) {
      return NextResponse.json({ message: "FID Not Found" }, { status: 404 });
    }

    // ==== Get GeoJSON RDTR ==== //
    const polygonToSelect = {
      rings: geoJSONInputPolygon.features[0].geometry.coordinates,
      spatialReference: { wkid: 4326 },
    };

    const targetPolygonUrl = "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Pola_Ruang_RDTR_2022/MapServer/0/";
    const targetPolygonQueryParams = new URLSearchParams({
      where: "1=1",
      geometry: JSON.stringify(polygonToSelect),
      geometryType: "esriGeometryPolygon",
      spatialRel: "esriSpatialRelIntersects",
      outFields: "*",
      returnGeometry: "true",
      f: "geojson",
    });

    const responseTargetPolygon = await fetch(`${targetPolygonUrl}query?${targetPolygonQueryParams.toString()}`);

    if (!responseTargetPolygon.ok) {
      return NextResponse.json(
        { message: "Failed to fetch target polygon data" },
        { status: responseTargetPolygon.status }
      );
    }

    let geoJSONTargetPolygon;

    try {
      geoJSONTargetPolygon = await responseTargetPolygon.json();
    } catch (error) {
      console.error("Failed to parse GeoJSON:", error.message);
      return NextResponse.json(
        { message: "Invalid GeoJSON response from server" },
        { status: 500 }
      );
    }

    // ==== Intesect Operation ====
    const intersectPolygons = [];

    const persilPolygon = new Polygon({
      spatialReference: { wkid: 4326 },
      rings: geoJSONInputPolygon.features[0].geometry.coordinates,
    });

    geoJSONTargetPolygon.features.forEach((feature) => {
      const rdtrPolygon = new Polygon({
        spatialReference: { wkid: 4326 },
        rings: feature.geometry.coordinates,
      });

      const intersectPolygon = intersectionOperator.execute(persilPolygon, rdtrPolygon);
      
      if (intersectPolygon) {
        const properties = feature.properties;
        const luas = geodesicUtils.geodesicAreas([intersectPolygon], "square-meters")[0];
        intersectPolygons.push({
            properties: {
                NAMOBJ: properties.NAMOBJ,
                KODSZNTEXT: properties.KODSZNTEXT,
                KDB: properties.KDB,
                KLB: properties.KLB,
                KTB: properties.KTB,
                KDH: properties.KDH,
                LUAS: luas
            },
            geometry: intersectPolygon.toJSON()
        });
      }
    });

    return NextResponse.json({ intersectPolygons }, { status: 200 });

  } catch (error) {
    if (error instanceof ResponseError) {
      return NextResponse.json(
        { errors: error.message },
        { status: error.status }
      );
    } else {
      console.error(error);
      return NextResponse.json(
        { errors: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

const urlLayer = (title) => {
  const layers = {
    "Persil Tanah Jakarta Pusat": 6,
    "Persil Tanah Jakarta Utara & Kepulauan Seribu": 7,
    "Persil Tanah Jakarta Barat": 8,
    "Persil Tanah Jakarta Selatan": 9,
    "Persil Tanah Jakarta Timur": 10,
  };

  return `https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/${
    layers[title] || 10
  }/`;
};
