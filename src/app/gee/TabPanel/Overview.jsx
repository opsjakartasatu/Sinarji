import { Box, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

import styles from "../../page.module.css";

const members = [
  {
    name: "Senior GIS Engineer",
    href: "",
  },
  {
    name: "Junior Spatial Researcher",
    href: "",
  },
  {
    name: "GIS Engineer",
    href: "",
  },
  {
    name: "Data Analyst",
    href: "",
  },
  {
    name: "GIS Developer and Education",
    href: "",
  },
];

const Overview = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container} style={{ textAlign: "center", marginTop: "180px", width: "90vw", maxWidth: "1220px" }}>
        <section id="welcome">
          <Typography variant="p"
            style={{
              color: 'var(--jakartasatu-biru)',
              textAlign: "center",
              fontSize: "36px",
              fontWeight: "800",
            }}>
            Environmental Data Portal
          </Typography>
          <Divider
            style={{
              margin: '15px auto 50px auto',
              backgroundColor: 'var(--jakartasatu-biru)',
              height: 5,
              width: '75px',
              borderRadius: '4px',
            }}
          />
          <Typography variant="p" paragraph
            style={{
              color: "rgba(0, 0, 0, 0.70)",
              textAlign: "justify",
              fontSize: "18px",
              fontWeight: "400",
              lineHeight: "190%"
            }}>
            <strong>Environmental Data Portal</strong> merupakan sebuah platform
            Jakarta Satu yang menyediakan akses dan
            pengunduhan hasil pengolahan citra. Portal ini dibuat untuk
            menyediakan berbagai analisis data lingkungan dan geospasial yang
            biasanya dapat diakses melalui Google Earth Engine (GEE). GEE
            merupakan sebuah platform berbasis <i>cloud</i> untuk menganalisis
            citra satelit, memungkinkan pengguna untuk mengolah data seperti
            citra satelit Sentinel dan Landsat, yang memerlukan pengetahuan
            bahasa pemrograman JavaScript. Portal ini mempermudah akses{" "}
            <mark style={{ backgroundColor: "#a5c5eb" }}>
              untuk pengguna yang tidak terbiasa dengan JavaScript.
            </mark>
          </Typography>
          <Divider
            variant="middle"
            sx={{
              height: "3px",
              border: "none",
              backgroundColor: "#A7C2F7",
              marginY: "12px",
            }}
          />
          <Typography variant="p" paragraph
            style={{
              color: "rgba(0, 0, 0, 0.70)",
              textAlign: "justify",
              fontSize: "18px",
              fontWeight: "400",
              lineHeight: "190%"
            }}>
            <i>
              <strong>Environmental Data Portal</strong> is a platform developed
              by Jakarta Satu that allows users to access and
              download image processing results. This portal is intended to
              provide a variety of environmental and geospatial data analysis
              that are commonly available through Google Earth Engine (GEE). GEE
              is a cloud-based platform for satellite image analysis, enabling
              users to process datasets such as Sentinel and Landsat, which
              typically require knowledge of the JavaScript programming
              language. This web portal simplifies access for users{" "}
              <mark style={{ backgroundColor: "#a5c5eb" }}>
                who are not familiar with JavaScript.
              </mark>
            </i>
          </Typography>
        </section>

        
        {/* <section id="about" style={{ margin: "50px 0" }}>
          <div style={{ textAlign: "start" }}>
            <Typography variant="p"
              style={{
                color: 'var(--jakartasatu-biru)',
                textAlign: "center",
                fontSize: "36px",
                fontWeight: "800",
              }}>
              About
            </Typography>
            <Divider
              style={{
                margin: '15px 0',
                backgroundColor: 'var(--jakartasatu-biru)',
                height: 5,
                width: '75px',
                borderRadius: '4px',
              }}
            />
          </div>
          <Typography variant="p" paragraph
            style={{
              color: "rgba(0, 0, 0, 0.70)",
              textAlign: "justify",
              fontSize: "18px",
              fontWeight: "400",
              lineHeight: "190%"
            }}>
            The Jakarta Satu Research Team established in early 2024, is dedicated
            to advancing innovative research and development projects. The team
            tries to provide and deliver the geospatial data products that can be
            easly accessed by public. As expected, the project dab help people and
            organization make better decission and give positive impact on
            society. Here is research team members.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="flex-start" alignItems={{ xs: "flex-start", sm: "center" }} gap={2}>
            {members.map((member, index) => (
              <Stack direction="row" justifyContent="flex-start" alignItems="center" gap={0.5}
                key={index}
                sx={{
                  backgroundColor: "white",
                  boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                  borderRadius: "4px",
                  padding: "5px",
                  color: "#012653",
                  fontSize: "14px",
                }}
              >
                <FaLinkedin size={"24px"} color="#0072b1" />
                <Link href={member.href}>{member.name}</Link>
              </Stack>
            ))}
          </Stack>
        </section> */}
      </div>
    </main>
  );
};

export default Overview;
