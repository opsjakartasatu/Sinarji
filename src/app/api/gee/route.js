import { NextResponse } from "next/server";
import ee from "@google/earthengine";
import { initializeEarthEngine } from "../../../../lib/earthengine";

export async function POST(req) {
  try {
    await initializeEarthEngine();

    const data = await req.formData();
    const index_type = data.get("index_type");
    const citra_satelit = data.get("citra_satelit");
    const start_date = data.get("start_date");
    const end_date = data.get("end_date");

    const aoi = ee.FeatureCollection("projects/ee-atikaardian/assets/admin");

    const satelliteImage = ee
      .ImageCollection(citra_satelit)
      .filterDate(start_date, end_date)
      .filterBounds(aoi);

    const size = await satelliteImage.size().getInfo();
    if (size === 0) {
      return NextResponse.json(
        { error: "Tidak ada citra ditemukan untuk parameter yang dipilih." },
        { status: 400 }
      );
    }

    const mosaicImage = satelliteImage.mosaic();
    const clippedImage = mosaicImage.clip(aoi);

    let processedImage = clippedImage;
    let visParams = {};

    if (index_type === "NDVI") {
      if (citra_satelit === "COPERNICUS/S2_SR_HARMONIZED") {
        processedImage = clippedImage
          .normalizedDifference(["B8", "B4"])
          .rename("NDVI");
        visParams = {
          bands: ["NDVI"],
          min: -1,
          max: 1,
          palette: ["brown", "yellow", "green"],
        };
      } else if (citra_satelit === "LANDSAT/LC08/C02/T1_L2") {
        processedImage = clippedImage
          .normalizedDifference(["SR_B5", "SR_B4"])
          .rename("NDVI");
        visParams = {
          bands: ["NDVI"],
          min: -1,
          max: 1,
          palette: ["brown", "yellow", "green"],
        };
      } else {
        return NextResponse.json(
          { error: "Kombinasi satelit dan NDVI tidak didukung." },
          { status: 400 }
        );
      }
    } else if (index_type === "NDBI") {
      if (citra_satelit === "COPERNICUS/S2_SR_HARMONIZED") {
        processedImage = clippedImage
          .normalizedDifference(["B11", "B8"])
          .rename("NDBI");
        visParams = {
          bands: ["NDBI"],
          min: -1,
          max: 1,
          palette: ["blue", "white", "red"],
        };
      } else if (citra_satelit === "LANDSAT/LC08/C02/T1_L2") {
        processedImage = clippedImage
          .normalizedDifference(["SR_B6", "SR_B5"])
          .rename("NDBI");
        visParams = {
          bands: ["NDBI"],
          min: -1,
          max: 1,
          palette: ["blue", "white", "red"],
        };
      } else {
        return NextResponse.json(
          { error: "Kombinasi satelit dan NDBI tidak didukung." },
          { status: 400 }
        );
      }
    } else if (index_type === "NDWI") {
      if (citra_satelit === "COPERNICUS/S2_SR_HARMONIZED") {
        processedImage = clippedImage
          .normalizedDifference(["B3", "B8"])
          .rename("NDWI");
        visParams = {
          bands: ["NDWI"],
          min: -1,
          max: 1,
          palette: ["blue", "white", "brown"],
        };
      } else if (citra_satelit === "LANDSAT/LC08/C02/T1_L2") {
        processedImage = clippedImage
          .normalizedDifference(["SR_B3", "SR_B5"])
          .rename("NDWI");
        visParams = {
          bands: ["NDWI"],
          min: -1,
          max: 1,
          palette: ["blue", "white", "brown"],
        };
      } else {
        return NextResponse.json(
          { error: "Kombinasi satelit dan NDBI tidak didukung." },
          { status: 400 }
        );
      }
    } else if (index_type === "EVI") {
      if (citra_satelit === "COPERNICUS/S2_SR_HARMONIZED") {
        const nir = clippedImage.select("B8");
        const red = clippedImage.select("B4");
        const blue = clippedImage.select("B2");
        processedImage = nir
          .subtract(red)
          .divide(nir.add(red.multiply(6)).subtract(blue.multiply(7.5)).add(1))
          .multiply(2.5)
          .rename("EVI");
        visParams = {
          bands: ["EVI"],
          min: -1,
          max: 1,
          palette: ["brown", "white", "green"],
        };
      } else if (citra_satelit === "LANDSAT/LC08/C02/T1_L2") {
        const nir = clippedImage.select("SR_B5");
        const red = clippedImage.select("SR_B4");
        const blue = clippedImage.select("SR_B2");
        processedImage = nir
          .subtract(red)
          .divide(nir.add(red.multiply(6)).subtract(blue.multiply(7.5)).add(1))
          .multiply(2.5)
          .rename("EVI");
        visParams = {
          bands: ["EVI"],
          min: -1,
          max: 1,
          palette: ["brown", "white", "green"],
        };
      } else {
        return NextResponse.json(
          { error: "Kombinasi satelit dan EVI tidak didukung." },
          { status: 400 }
        );
      }
    } else if (index_type === "SAVI") {
      const L = 0.5;

      if (citra_satelit === "COPERNICUS/S2_SR_HARMONIZED") {
        const nir = clippedImage.select("B8");
        const red = clippedImage.select("B4");
        processedImage = nir
          .subtract(red)
          .divide(nir.add(red).add(L))
          .multiply(1 + L)
          .rename("SAVI");
        visParams = {
          bands: ["SAVI"],
          min: -1,
          max: 1,
          palette: ["red", "white", "green"],
        };
      } else if (citra_satelit === "LANDSAT/LC08/C02/T1_L2") {
        const nir = clippedImage.select("SR_B5");
        const red = clippedImage.select("SR_B4");
        processedImage = nir
          .subtract(red)
          .divide(nir.add(red).add(L))
          .multiply(1 + L)
          .rename("SAVI");
        visParams = {
          bands: ["SAVI"],
          min: -1,
          max: 1,
          palette: ["red", "white", "green"],
        };
      } else {
        return NextResponse.json(
          { error: "Kombinasi satelit dan SAVI tidak didukung." },
          { status: 400 }
        );
      }
    } else if (index_type === "BAEI") {
      if (citra_satelit === "COPERNICUS/S2_SR_HARMONIZED") {
        const red = clippedImage.select("B4");
        const green = clippedImage.select("B3");
        const nir = clippedImage.select("B8");
        const swir = clippedImage.select("B11");
        processedImage = red.add(green).divide(nir.add(swir)).rename("BAEI");
        visParams = {
          bands: ["BAEI"],
          min: -1,
          max: 1,
          palette: ["white", "orange", "red"],
        };
      } else if (citra_satelit === "LANDSAT/LC08/C02/T1_L2") {
        const red = clippedImage.select("SR_B4");
        const green = clippedImage.select("SR_B3");
        const nir = clippedImage.select("SR_B5");
        const swir = clippedImage.select("SR_B6");
        processedImage = red.add(green).divide(nir.add(swir)).rename("BAEI");
        visParams = {
          bands: ["BAEI"],
          min: -1,
          max: 1,
          palette: ["white", "orange", "red"],
        };
      } else {
        return NextResponse.json(
          { error: "Kombinasi satelit dan BAEI tidak didukung." },
          { status: 400 }
        );
      }
    } else if (index_type === "BUI") {
      if (citra_satelit === "COPERNICUS/S2_SR_HARMONIZED") {
        const nir = clippedImage.select("B8");
        const red = clippedImage.select("B4");
        const swir = clippedImage.select("B11");

        const ndvi = nir.subtract(red).divide(nir.add(red));
        const ndbi = swir.subtract(nir).divide(swir.add(nir));
        processedImage = ndbi.subtract(ndvi).rename("BUI");
        visParams = {
          bands: ["BUI"],
          min: -1,
          max: 1,
          palette: ["blue", "white", "red"],
        };
      } else if (citra_satelit === "LANDSAT/LC08/C02/T1_L2") {
        const nir = clippedImage.select("SR_B5");
        const red = clippedImage.select("SR_B4");
        const swir = clippedImage.select("SR_B6");

        const ndvi = nir.subtract(red).divide(nir.add(red));
        const ndbi = swir.subtract(nir).divide(swir.add(nir));
        processedImage = ndbi.subtract(ndvi).rename("BUI");
        visParams = {
          bands: ["BUI"],
          min: -1,
          max: 1,
          palette: ["blue", "white", "red"],
        };
      } else {
        return NextResponse.json(
          { error: "Kombinasi satelit dan BUI tidak didukung." },
          { status: 400 }
        );
      }
    } else if (index_type === "DBI") {
      if (citra_satelit === "COPERNICUS/S2_SR_HARMONIZED") {
        const nir = clippedImage.select("B8");
        const red = clippedImage.select("B4");
        const swir = clippedImage.select("B11");

        const savi = nir
          .subtract(red)
          .divide(nir.add(red).add(0.5))
          .multiply(1.5);

        const ndbi = swir.subtract(nir).divide(swir.add(nir));

        processedImage = ndbi
          .subtract(savi)
          .divide(ndbi.add(savi))
          .rename("DBI");
        visParams = {
          bands: ["DBI"],
          min: -1,
          max: 1,
          palette: ["blue", "white", "purple"],
        };
      } else if (citra_satelit === "LANDSAT/LC08/C02/T1_L2") {
        const nir = clippedImage.select("SR_B5");
        const red = clippedImage.select("SR_B4");
        const swir = clippedImage.select("SR_B6");

        const savi = nir
          .subtract(red)
          .divide(nir.add(red).add(0.5))
          .multiply(1.5);

        const ndbi = swir.subtract(nir).divide(swir.add(nir));

        processedImage = ndbi
          .subtract(savi)
          .divide(ndbi.add(savi))
          .rename("DBI");
        visParams = {
          bands: ["DBI"],
          min: -1,
          max: 1,
          palette: ["blue", "white", "purple"],
        };
      } else {
        return NextResponse.json(
          { error: "Kombinasi satelit dan DBI tidak didukung." },
          { status: 400 }
        );
      }
    } else {
      // Default RGB if no index selected
      processedImage = clippedImage;
      if (citra_satelit === "COPERNICUS/S2_SR_HARMONIZED") {
        visParams = {
          bands: ["B4", "B3", "B2"],
          min: 0,
          max: 3000,
        };
      } else if (citra_satelit === "LANDSAT/LC08/C02/T1_L2") {
        visParams = {
          bands: ["SR_B5", "SR_B4", "SR_B3"],
          min: 0,
          max: 30000,
        };
      }
    }

    const visualizedImage = processedImage.visualize(visParams);

    const mapInfo = await new Promise((resolve, reject) => {
      visualizedImage.getMap({}, (map, error) => {
        if (error) reject(error);
        else resolve(map);
      });
    });

    return NextResponse.json(
      {
        tileUrl: [
          {
            imageId: Date.now().toString(),
            urlImage: mapInfo.urlFormat,
          },
        ],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Earth Engine API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
