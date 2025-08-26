export async function POST(request) {
  try {
    const body = await request.json();
    const { x, y } = body;

    if (!x || !y) {
      return new Response(JSON.stringify({ error: "Missing x or y" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const bufferDistance = 500;
    const geometryParam = JSON.stringify({
      x,
      y,
      spatialReference: { wkid: 4326 },
    });

    // --- Step 1: Query zona kota (polygon)
    const zonaUrl =
      "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Pola_Ruang_RDTR_2022/MapServer/0/query";
    const zonaQuery = `${zonaUrl}?f=json&geometry=${encodeURIComponent(
      geometryParam
    )}&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=false&inSR=4326`;

    console.log(zonaQuery);

    const zonaRes = await fetch(zonaQuery);
    const zonaData = await zonaRes.json();

    if (!zonaData.features || zonaData.features.length === 0) {
      return new Response(
        JSON.stringify({
          message: "Titik tidak berada dalam zona kota manapun.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // --- Step 2: Query lokasi sekitar dalam 100 meter
    const lokasiUrl =
      "https://tataruang.jakarta.go.id/server/rest/services/Geodatabase_Pemetaan/Survei_Toponimi_2023/MapServer/0/query";
    const lokasiQuery = `${lokasiUrl}?f=json&geometry=${encodeURIComponent(
      geometryParam
    )}&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&distance=${bufferDistance}&units=esriSRUnit_Meter&outFields=*&inSR=4326&returnGeometry=true`;

    console.log(lokasiQuery);

    const lokasiRes = await fetch(lokasiQuery);
    const lokasiData = await lokasiRes.json();

    // Ambil field yang diinginkan saja
    const lokasiTerdekat = lokasiData.features.map((f) => {
      const attr = f.attributes;
      return {
        Nama: attr.NAMOBJ,
        Dinas: attr.REMARK,
      };
    });

    const responseBody = {
      //   zonaKota: zonaData.features[0].attributes,
      //   lokasiTerdekat: lokasiData.features.map((f) => f.attributes),
      zonaKota: {
        nama_zona: zonaData.features[0].attributes.NAMOBJ,
        bersyarat: zonaData.features[0].attributes.BST,
        diizinkan: zonaData.features[0].attributes.IZN,
      },
      lokasiTerdekat,
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan pada server" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
