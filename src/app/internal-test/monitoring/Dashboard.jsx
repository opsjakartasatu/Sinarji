import { Box, Button, Divider, Fab, MenuItem, Select, Skeleton, Stack, styled, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Pie, Bar } from "react-chartjs-2";
import DashboardSkeleton from "./Skeleton";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

Chart.register(ChartDataLabels);

const CustomSelectStyle = {
  textAlign: "start",
  color: "rgba(0, 0, 0, 0.60)",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "150%",
  letterSpacing: "-0.266px",
  "& .MuiOutlinedInput-notchedOutline": {
    border: 'none',
    borderRadius: "5px",
  },
  "& .MuiSelect-outlined": {
    padding: "3px 12px",
    borderRadius: "5px",
    backgroundColor: "rgba(0, 53, 119, 0.08)",

    '&:hover': {
      borderRadius: "5px",
    },
    '&.Mui-focused': {
      borderRadius: "5px",
    }
  },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    fontFamily: "var(--font-family)",
    color: "rgba(0, 0, 0, 0.60)",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "150%",
    letterSpacing: "-0.266px",
  }
}

const Dashboard = () => {
  const { data: session } = useSession(); // session
  const hasFetched = useRef(false); // Ref buat nahan rerender load API
  const pieBerbagiRef = useRef();
  const piePakaiRef = useRef();
  const grafikJumlahBerbagiPakaiRef = useRef();
  const chartInstanceJumlahBerbagiPakaiRef = useRef(null);
  const grafikBerbagiDataRef = useRef();
  const grafikJumlahPengunjungRef = useRef();
  const chartInstanceJumlahPengunjungRef = useRef(null);
  const grafikPakaiDataRef = useRef();

  // State untuk semua data
  const [jumlahBerbagiPakai, setJumlahBerbagiPakai] = useState();
  const [jumlahPengunjung, setJumlahPengunjung] = useState();
  const [pieBerbagi, setPieBerbagi] = useState();
  const [piePakai, setPiePakai] = useState();
  const [grafikJumlahBerbagiPakai, setGrafikJumlahBerbagiPakai] = useState([]);
  const [grafikJumlahPengunjung, setGrafikJumlahPengunjung] = useState([]);
  const [grafikPakaiData, setGrafikPakaiData] = useState();
  const [grafikBerbagiData, setGrafikBerbagiData] = useState();
  const [riwayatBerbagiData, setRiwayatBerbagiData] = useState();
  const [riwayatPakaiData, setRiwayatPakaiData] = useState();

  const [loading, setLoading] = useState(true);

  const [filteredGrafikJumlahBerbagiPakai, setFilteredGrafikJumlahBerbagiPakai] = useState([]);
  const [grafikJumlahBerbagiPakaiYear, setGrafikJumlahBerbagiPakaiYear] = useState(2025);

  const [filteredGrafikJumlahPengunjung, setFilteredGrafikJumlahPengunjung] = useState([]);
  const [grafikJumlahPengunjungYear, setGrafikJumlahPengunjungYear] = useState(2025);

  // Function untuk ambil data
  const fetchData = async (urlPath) => {
    try {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${session?.user?.access_token}`);
      const response = await fetch(`${process.env.API_WEB}${urlPath}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // useEffect untuk load data
  useEffect(() => {
    const loadData = async () => {
      if (!session?.user?.access_token || hasFetched.current) return;

      hasFetched.current = true;

      const urls = [
        "/auth/dashboard/jumlah-berbagi-pakai",
        "/auth/dashboard/pengunjung",
        "/auth/dashboard/berbagi-pie",
        "/auth/dashboard/pakai-pie",
        "/auth/dashboard/berbagi-pakai-grafik",
        "/auth/dashboard/berbagi-status",
        "/auth/dashboard/berbagi-pakai-grafik-pengunjung",
        "/auth/dashboard/pakai-status",
        "/auth/berbagi?page=1&limit=9007199254740991&sortedBy=desc&orderBy=updated_at",
        "/auth/pakai-aplikasi?page=1&limit=9007199254740991&sortedBy=desc&orderBy=updated_at",
      ];

      const results = await Promise.all(urls.map((url) => fetchData(url)));

      setJumlahBerbagiPakai(results[0]?.data);
      setJumlahPengunjung(results[1]?.data);
      setPieBerbagi(results[2]?.data);
      setPiePakai(results[3]?.data);
      setGrafikJumlahBerbagiPakai(results[4]?.data);
      setGrafikBerbagiData(results[5]?.data);
      setGrafikJumlahPengunjung(results[6]?.data);
      setGrafikPakaiData(results[7]?.data);
      setRiwayatBerbagiData(results[8]?.items);
      setRiwayatPakaiData(results[9]?.items);

      setLoading(false);
    };

    loadData();
  }, [session]);

  //useEffect untuk Pie Chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        // Configure data labels if needed
        display: false, // Set to true if you want to show data labels
      },
    },
    layout: {
      padding: 0 // Hilangkan padding internal
    }
  };

  const createChartData = (dataState) => ({
    labels: dataState?.map((item) => item.kategori) || [],
    datasets: [
      {
        data: dataState?.map((item) => item.persentase) || [],
        borderWidth: 0.5,
        // You can add more styling options here
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ], // Add colors as needed
      },
    ],
  });

  useEffect(() => {
    if (grafikJumlahBerbagiPakai.length > 0) {
      // Pastikan filter dijalankan saat pertama kali data tersedia
      handleChangeYear(
        grafikJumlahBerbagiPakai,
        setFilteredGrafikJumlahBerbagiPakai,
        setGrafikJumlahBerbagiPakaiYear,
        grafikJumlahBerbagiPakaiYear || new Date().getFullYear() // default ke tahun sekarang
      );
    }
  }, [grafikJumlahBerbagiPakai]);

  // Set initial filtered data Grafik jumlah berbagi pakai
  const jumlahBerbagiPakaiData = {
    labels: filteredGrafikJumlahBerbagiPakai.map((item) => item.bulan),
    datasets: [
      {
        label: "Berbagi",
        data: filteredGrafikJumlahBerbagiPakai.map(
          (item) => item.total_berbagi
        ),
        backgroundColor: "#003577",
      },
      {
        label: "Pakai",
        data: filteredGrafikJumlahBerbagiPakai.map(
          (item) => item.total_pakai
        ),
        backgroundColor: "#F7941D",
      },
    ],
  };

  // Chart options for Grafik Jumlah Berbagi Pakai
  const jumlahBerbagiPakaiOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true, // Gunakan point style untuk legend
          pointStyle: 'rect',
          padding: 15,
          font: {
            size: 10
          }
        }
      },
      title: {
        display: false,
        text: "Grafik Jumlah Berbagi Pakai",
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: Math.round,
        font: {
          size: 10
        }
      },
    },
    layout: {
      padding: 0 // Hilangkan padding internal
    }
  };

  // Chart data for Berbagi Data
  const berbaginDataChartData = {
    labels: ['Status Berbagi'], // Single category
    datasets: grafikBerbagiData?.map((item, i) => {
      const colors = [
        "#003577",
        "#F7941D",
        "#07975C",
      ];
      return {
        label: item.status, // Setiap status jadi dataset terpisah
        data: [item.total], // Array dengan satu nilai
        backgroundColor: colors[i % colors.length],
        borderColor: colors[i % colors.length].replace('0.7', '1'),
        borderWidth: 1
      };
    }) || [],
  };

  // Chart options for Berbagi Data
  const berbaginDataOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1 // Jika data berupa integer
        }
      },
      x: {
        ticks: {
          display: false // Hide x-axis labels karena tidak perlu
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true, // Gunakan point style untuk legend
          pointStyle: 'rect',
          padding: 15,
          font: {
            size: 10
          }
        }
      },
      title: {
        display: false,
        text: "Berbagi Data",
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: Math.round,
        font: {
          size: 12
        },
        color: 'black'
      },
    },
    layout: {
      padding: 0
    },
    // Atur jarak antar bar
    categoryPercentage: 0.8,
    barPercentage: 0.9
  };

  // Set initial filtered data Grafik jumlah pengunjung
  useEffect(() => {
    if (grafikJumlahPengunjung.length > 0) {
      handleChangeYear(grafikJumlahPengunjung, setFilteredGrafikJumlahPengunjung, setGrafikJumlahPengunjungYear, grafikJumlahPengunjungYear);
    }
  }, [grafikJumlahPengunjung, grafikJumlahPengunjungYear]);

  // Chart render effect Grafik jumlah berbagi pakai
  useEffect(() => {
    if (!filteredGrafikJumlahPengunjung.length || !grafikJumlahPengunjungRef.current) return;

    if (chartInstanceJumlahPengunjungRef.current) {
      chartInstanceJumlahPengunjungRef.current.destroy();
    }

    chartInstanceJumlahPengunjungRef.current = new Chart(grafikJumlahPengunjungRef.current, {
      type: "line",
      data: {
        labels: filteredGrafikJumlahPengunjung.map((item) => item.bulan),
        datasets: [
          {
            label: "Jumlah Pengunjung",
            data: filteredGrafikJumlahPengunjung.map(
              (item) => item.total_pengunjung
            ),
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            borderColor: "#8979FF",
          },
        ],

      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
            text: "Grafik Jumlah Berbagi Pakai",
          },
          datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: Math.round,
            font: {
              weight: 'bold'
            }
          },
        },
        layout: {
          padding: 0 // Hilangkan padding internal
        }
      },
      plugins: [ChartDataLabels],
    });

    return () => {
      if (chartInstanceJumlahPengunjungRef.current) {
        chartInstanceJumlahPengunjungRef.current.destroy();
      }
    };
  }, [filteredGrafikJumlahPengunjung]);

  useEffect(() => {
    if (grafikPakaiData && grafikPakaiDataRef.current) {
      const chartInstance = new Chart(grafikPakaiDataRef.current, {
        type: "bar",
        data: {
          labels: ['Status Pakai'], // Single category
          datasets: grafikPakaiData.map((item, i) => {
            const colors = [
              "#003577",
              "#F7941D",
              "#07975C",
            ];
            return {
              label: item.status, // Setiap status jadi dataset terpisah
              data: [item.total], // Array dengan satu nilai
              backgroundColor: colors[i % colors.length],
              borderColor: colors[i % colors.length].replace('0.7', '1'),
              borderWidth: 1
            };
          })
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            },
            x: {
              ticks: {
                display: false // Hide x-axis labels
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                padding: 15,
                font: {
                  size: 10
                }
              }
            },
            title: {
              display: false,
              text: "Pakai Data",
            },
            datalabels: {
              anchor: 'end',
              align: 'top',
              formatter: Math.round,
              font: {
                weight: 'bold'
              }
            },
          },
          layout: {
            padding: 0
          },
          // Atur jarak antar bar
          categoryPercentage: 0.8,
          barPercentage: 0.9
        },
        plugins: [ChartDataLabels],
      });

      return () => chartInstance.destroy();
    }
  }, [grafikPakaiData]);

  const handleChangeYear = (dataState, setFilteredDataState, setDataStateYear, year) => {
    const filtered = dataState.filter((item) => item.tahun === year);
    setFilteredDataState(filtered);
    setDataStateYear(year);
  };

  // Fungsi untuk menentukan warna berdasarkan status
  const getProgressColorBerbagiData = (status) => {
    switch (status) {
      case 'DATA DIPROSES':
        return 'var(--jakartasatu-orange)';
      case 'DATA SELESAI DIPROSES':
        return 'var(--jakartasatu-hijau)';
      case 'MENUNGGU KONFIRMASI':
        return '#FED253';
      case 'PERLU PERBAIKAN':
        return 'white';
    }
  };

  // Fungsi untuk menentukan nilai progress berdasarkan status
  const getProgressValueBerbagiData = (status) => {
    switch (status) {
      case 'DATA DIPROSES':
        return 70;
      case 'DATA SELESAI DIPROSES':
        return 100;
      case 'MENUNGGU KONFIRMASI':
        return 35;
      case 'PERLU PERBAIKAN':
        return 0;
    }
  };

  const getProgressColorPakaiData = (status) => {
    switch (status) {
      case 'MEDIA INFORMASI SELESAI DIPROSES':
        return 'var(--jakartasatu-hijau)';
      case 'MEDIA INFORMASI DIPROSES':
        return 'var(--jakartasatu-orange)';
    }
  };

  // Fungsi untuk menentukan nilai progress berdasarkan status
  const getProgressValuePakaiData = (status) => {
    switch (status) {
      case 'MEDIA INFORMASI SELESAI DIPROSES':
        return 100;
      case 'MEDIA INFORMASI DIPROSES':
        return 50;
    }
  };

  return (
    <>
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <Stack direction="column" spacing={{ xs: 2, sm: 4, md: 4, lg: 4, xl: 4 }}>
          <Box>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={1}
            >
              <Typography
                variant="p"
                sx={{
                  color: "var(--jakartasatu-biru)",
                  fontSize: "32px",
                  fontWeight: "600",
                }}
              >
                Dashboard Monitoring Berbagi Pakai
              </Typography>
              <Typography
                variant="p"
                sx={{
                  color: "rgba(0, 0, 0, 0.70)",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "180%",
                }}
              >
                Informasi mengenai statistik dari jumlah data yang tersedia di website Jakarta Satu
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Stack
              direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
              justifyContent="center"
              alignItems="center"
              spacing={{ xs: 2, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "183px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  padding: "20px",
                  border: "1px solid #DFE6E9",
                  boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                }}
              >
                {jumlahBerbagiPakai && (
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Typography variant="p" sx={{
                      color: "rgba(0, 0, 0, 0.50)",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: 600,
                      lineHeight: "150%",
                      letterSpacing: "-0.304px",
                    }}>
                      Jumlah Berbagi Pakai
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      spacing={{ xs: 3, sm: 6, md: 6, lg: 6, xl: 6 }}
                    >
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography variant="p"
                          sx={{
                            color: "var(--jakartasatu-biru)",
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: 600,
                            lineHeight: "150%",
                            letterSpacing: "-0.456px",
                          }}
                        >
                          Total
                        </Typography>
                        <Typography variant="p"
                          sx={{
                            color: "var(--jakartasatu-hijau)",
                            textAlign: "center",
                            fontSize: "38px",
                            fontWeight: 600,
                            lineHeight: "150%",
                            letterSpacing: "-0.722px",
                          }}
                        >
                          {`${jumlahBerbagiPakai?.total}`}
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          borderRightWidth: 5,
                          height: "96px",
                          borderRadius: "5px",
                          borderColor: "#DFE6E9"
                        }} />
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                      >
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={4}
                        >
                          {/* <Box sx={{ width: "100%", minWidth: "50px", display: "flex", justifyContent: "flex-end" }}> */}
                          <Typography variant="p"
                            sx={{
                              color: "var(--jakartasatu-orange)",
                              textAlign: "end",
                              fontSize: "24px",
                              fontWeight: 600,
                              lineHeight: "150%",
                              letterSpacing: "-0.456px",
                            }}
                          >
                            {`${jumlahBerbagiPakai["total-berbagi"]}`}
                          </Typography>
                          {/* </Box> */}
                          {/* <Box sx={{ width: "100%", minWidth: "100px", display: "flex", alignItems: "flex-start" }}> */}
                          <Typography variant="p"
                            sx={{
                              color: "var(--jakartasatu-biru)",
                              textAlign: "start",
                              fontSize: "22px",
                              fontWeight: 600,
                              lineHeight: "150%",
                              letterSpacing: "-0.456px",
                            }}
                          >
                            Berbagi
                          </Typography>
                          {/* </Box> */}
                        </Stack>
                        <Divider orientation="horizontal"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            borderBottomWidth: 3,
                            width: "100%",
                            maxWidth: "256px",
                            borderRadius: "5px",
                            borderColor: "#DFE6E9"
                          }} />
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={4}
                        >
                          {/* <Box sx={{ width: "100%", minWidth: "50px", display: "flex", justifyContent: "flex-end" }}> */}
                          <Typography variant="p"
                            sx={{
                              color: "var(--jakartasatu-orange)",
                              textAlign: "end",
                              fontSize: "24px",
                              fontWeight: 600,
                              lineHeight: "150%",
                              letterSpacing: "-0.456px",
                            }}
                          >
                            {`${jumlahBerbagiPakai["total-pakai"]}`}
                          </Typography>
                          {/* </Box> */}
                          {/* <Box sx={{ width: "100%", minWidth: "100px", display: "flex", alignItems: "flex-start" }}> */}
                          <Typography variant="p"
                            sx={{
                              color: "var(--jakartasatu-biru)",
                              textAlign: "start",
                              fontSize: "22px",
                              fontWeight: 600,
                              lineHeight: "150%",
                              letterSpacing: "-0.456px",
                            }}
                          >
                            Pakai
                          </Typography>
                          {/* </Box> */}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                )}
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "183px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  padding: "20px",
                  border: "1px solid #DFE6E9",
                  boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                }}
              >
                {jumlahPengunjung && (
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Typography variant="p" sx={{
                      color: "rgba(0, 0, 0, 0.50)",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: 600,
                      lineHeight: "150%",
                      letterSpacing: "-0.304px",
                    }}>
                      Jumlah Pengunjung
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      spacing={{ xs: 3, sm: 6, md: 6, lg: 6, xl: 6 }}
                    >
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography variant="p"
                          sx={{
                            color: "var(--jakartasatu-biru)",
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: 600,
                            lineHeight: "150%",
                            letterSpacing: "-0.456px",
                          }}
                        >
                          Total
                        </Typography>
                        <Typography variant="p"
                          sx={{
                            color: "var(--jakartasatu-hijau)",
                            textAlign: "center",
                            fontSize: "38px",
                            fontWeight: 600,
                            lineHeight: "150%",
                            letterSpacing: "-0.722px",
                          }}
                        >
                          {`${jumlahPengunjung["pengunjung-hari-ini"]}`}
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          borderRightWidth: 5,
                          height: "96px",
                          borderRadius: "5px",
                          borderColor: "#DFE6E9"
                        }} />
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography variant="p"
                          sx={{
                            color: "var(--jakartasatu-biru)",
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: 600,
                            lineHeight: "150%",
                            letterSpacing: "-0.456px",
                          }}
                        >
                          Tahun 2025
                        </Typography>
                        <Typography variant="p"
                          sx={{
                            color: "var(--jakartasatu-hijau)",
                            textAlign: "center",
                            fontSize: "38px",
                            fontWeight: 600,
                            lineHeight: "150%",
                            letterSpacing: "-0.722px",
                          }}
                        >
                          {`${jumlahPengunjung["pengunjung-tahun-ini"]}`}
                        </Typography>
                        {/*13852*/}
                      </Stack>
                    </Stack>
                  </Stack>
                )}
              </Box>
            </Stack>
          </Box>
          <Box>
            <Stack
              direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
              justifyContent="space-around"
              alignItems="center">
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "340px",
                  }}
                >
                  {pieBerbagi && (
                    <Pie
                      data={createChartData(pieBerbagi)}
                      options={chartOptions}
                    />
                  )}
                </Box>
                <Typography
                  variant="p"
                  sx={{
                    color: "var(--jakartasatu-biru)",
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "150%",
                    letterSpacing: "-0.342px",
                  }}
                >
                  Berbagi
                </Typography>
              </Stack>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "340px",
                  }}
                >
                  {piePakai && (
                    <Pie
                      data={createChartData(piePakai)}
                      options={chartOptions}
                    />
                  )}
                </Box>
                <Typography
                  variant="p"
                  sx={{
                    color: "var(--jakartasatu-biru)",
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "150%",
                    letterSpacing: "-0.342px",
                  }}
                >
                  Pakai
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box>
            <Grid container
              alignItems="stretch"
              justifyContent="center"
              spacing={{ xs: 2, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <Grid xs={12} sm={12} md={7} lg={7} xl={7}>
                <Box
                  sx={{
                    height: "100%",
                    minHeight: "296px",
                    backgroundColor: "white",
                    padding: "13px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                    border: "1px solid #DFE6E9",
                    boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <Box sx={{ position: "absolute" }}>
                    <Select
                      variant="outlined"
                      onChange={(e) => handleChangeYear(
                        grafikJumlahBerbagiPakai,
                        setFilteredGrafikJumlahBerbagiPakai,
                        setGrafikJumlahBerbagiPakaiYear,
                        parseInt(e.target.value)
                      )}
                      value={grafikJumlahBerbagiPakaiYear}
                      IconComponent={(props) => (
                        <KeyboardArrowDownRoundedIcon
                          {...props}
                          style={{ color: "var(--jakartasatu-biru)" }} />
                      )}
                      sx={CustomSelectStyle}
                    >
                      <MenuItem value={2024}>2024</MenuItem>
                      <MenuItem value={2025}>2025</MenuItem>
                    </Select>
                  </Box>
                  <Box sx={{ width: "100%", display: "flex", justifyContent: { xs: "flex-end", sm: "center" }, alignItems: "center" }}>
                    <Typography variant="p" sx={{
                      color: "rgba(0, 0, 0, 0.50)",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: 600,
                      lineHeight: "150%",
                      letterSpacing: "-0.304px",
                    }}>
                      Grafik Jumlah Berbagi Pakai
                    </Typography>
                  </Box>
                  <Box sx={{
                    width: "100%",
                    height: "100%",
                  }}>
                    <Bar
                      data={jumlahBerbagiPakaiData}
                      options={jumlahBerbagiPakaiOptions}
                      plugins={[ChartDataLabels]}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid xs={12} sm={12} md={5} lg={5} xl={5}>
                <Box
                  sx={{
                    height: "100%",
                    minHeight: "296px",
                    backgroundColor: "white",
                    padding: "13px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    // gap: "5px",
                    border: "1px solid #DFE6E9",
                    boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Typography variant="p" sx={{
                      color: "rgba(0, 0, 0, 0.50)",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: 600,
                      lineHeight: "150%",
                      letterSpacing: "-0.304px",
                    }}>
                      Berbagi Data
                    </Typography>
                    <Box sx={{
                      width: "100%",
                      maxWidth: "110px",
                      height: "26px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(0, 53, 119, 0.08)",
                    }}>
                    </Box>
                  </Stack>
                  <Box sx={{
                    width: "100%",
                    height: "100%",
                  }}>
                    {grafikBerbagiData && (
                      <Bar
                        data={berbaginDataChartData}
                        options={berbaginDataOptions}
                        plugins={[ChartDataLabels]}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container
              alignItems="stretch"
              justifyContent="center"
              spacing={{ xs: 2, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <Grid xs={12} sm={12} md={7} lg={7} xl={7}>
                <Box
                  sx={{
                    height: "100%",
                    minHeight: "296px",
                    backgroundColor: "white",
                    padding: "13px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                    border: "1px solid #DFE6E9",
                    boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <Box sx={{ position: "absolute" }}>
                    <Select
                      onChange={(e) => handleChangeYear(
                        grafikJumlahPengunjung,
                        setFilteredGrafikJumlahPengunjung,
                        setGrafikJumlahPengunjungYear,
                        parseInt(e.target.value))}
                      value={grafikJumlahPengunjungYear}
                      IconComponent={(props) => (
                        <KeyboardArrowDownRoundedIcon
                          {...props}
                          style={{ color: "var(--jakartasatu-biru)" }} />
                      )}
                      sx={CustomSelectStyle}
                    >
                      <MenuItem value={2024}>2024</MenuItem>
                      <MenuItem value={2025}>2025</MenuItem>
                    </Select>
                  </Box>
                  <Box sx={{ width: "100%", display: "flex", justifyContent: { xs: "flex-end", sm: "center" }, alignItems: "center" }}>
                    <Typography variant="p" sx={{
                      color: "rgba(0, 0, 0, 0.50)",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: 600,
                      lineHeight: "150%",
                      letterSpacing: "-0.304px",
                    }}>
                      Grafik Jumlah Pengunjung
                    </Typography>
                  </Box>
                  <Box sx={{
                    width: "100%",
                    height: "100%",
                  }}>
                    <canvas
                      ref={grafikJumlahPengunjungRef}
                    ></canvas>
                  </Box>
                </Box>
              </Grid>
              <Grid xs={12} sm={12} md={5} lg={5} xl={5}>
                <Box
                  sx={{
                    height: "100%",
                    minHeight: "296px",
                    backgroundColor: "white",
                    padding: "13px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    // gap: "5px",
                    border: "1px solid #DFE6E9",
                    boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Typography variant="p" sx={{
                      color: "rgba(0, 0, 0, 0.50)",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: 600,
                      lineHeight: "150%",
                      letterSpacing: "-0.304px",
                    }}>
                      Pakai Aplikasi
                    </Typography>
                    <Box sx={{
                      width: "100%",
                      maxWidth: "110px",
                      height: "26px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(0, 53, 119, 0.08)",
                    }}>
                    </Box>
                  </Stack>
                  <Box sx={{
                    width: "100%",
                    height: "100%",
                  }}>
                    <canvas
                      ref={grafikPakaiDataRef}
                    ></canvas>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container
              alignItems="stretch"
              justifyContent="center"
              spacing={{ xs: 2, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box
                  sx={{
                    height: "100%",
                    maxHeight: "456px",
                    backgroundColor: "white",
                    padding: "22px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    border: "1px solid #DFE6E9",
                    boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Typography variant="p" sx={{
                      color: "var(--jakartasatu-biru)",
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "150%",
                      letterSpacing: "-0.342px",
                    }}>
                      Riwayat Berbagi Data
                    </Typography>
                    <Box sx={{
                      width: "100%",
                      maxWidth: "110px",
                      height: "26px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(0, 53, 119, 0.08)",
                    }}>
                    </Box>
                  </Stack>
                  <Box sx={{
                    overflow: "auto",
                    paddingRight: { xs: "15px", sm: "10px", md: "10px", lg: "10px", xl: "10px" },
                    marginRight: { xs: "-15px", sm: "-10px", md: "-10px", lg: "-10px", xl: "-10px" },

                    '::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '::-webkit-scrollbar-track': {
                      borderRadius: '4px',
                      border: "1px solid #DFE6E9",
                      margin: "0 20px"
                    },
                    '::-webkit-scrollbar-thumb': {
                      background: '#003577',
                      borderRadius: '5px',
                    },
                    '::-webkit-scrollbar-thumb:hover': {
                      background: '#002b5e',
                    },
                  }}>
                    {riwayatBerbagiData.map((item, i) => (
                      <div key={i}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                          sx={{ width: "100%" }}>
                          <Button disabled disableFocusRipple disableRipple
                            sx={{
                              alignSelf: "flex-start",
                              minWidth: "46px",
                              borderRadius: "100%",
                              width: "46px",
                              height: "46px",
                              backgroundColor: "var(--jakartasatu-biru)",

                              "&:hover": {
                                backgroundColor: "var(--jakartasatu-biru)",
                                opacity: "80%",
                              }
                            }}>
                            <ShareRoundedIcon sx={{ color: "white", marginLeft: "-2px" }} />
                          </Button>
                          <Stack
                            direction={{ xs: "column", sm: "row", md: "row", lg: "row", xl: "row" }}
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            sx={{ width: "100%" }}>
                            <Stack
                              direction="column"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                              sx={{ width: "100%" }}>
                              <Typography variant="p" sx={{
                                alignItems: "start",
                                color: "var(--jakartasatu-biru)",
                                fontSize: "16px",
                                fontWeight: 600,
                                lineHeight: "150%",
                                letterSpacing: "-0.304px",
                              }}>
                                {item.nama}
                              </Typography>
                              <Typography variant="p" sx={{
                                alignItems: "start",
                                color: "rgba(0, 0, 0, 0.70)",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "150%",
                                letterSpacing: "-0.266px",
                              }}>
                                {item.nama_pic}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="column"
                              justifyContent="center"
                              alignItems="flex-start"
                              sx={{ width: "100%" }}>
                              <Box sx={{
                                display: "flex",
                                justifyContent: { xs: "flex-start", sm: "center", md: "center", lg: "center", xl: "center" },
                                width: {
                                  xs: "100%",
                                  sm: "calc(100% - 40px)",
                                  md: "calc(100% - 40px)",
                                  lg: "calc(100% - 40px)",
                                  xl: "calc(100% - 40px)"
                                },
                              }}>
                                <Typography variant="p" sx={{
                                  textAlign: "center",
                                  color: "rgba(0, 0, 0, 0.60)",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  lineHeight: "150%",
                                  letterSpacing: "-0.266px",
                                }}>
                                  Progres
                                </Typography>
                              </Box>
                              <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                              }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={getProgressValueBerbagiData(item.status)}
                                  sx={{
                                    width: "100%",
                                    height: "16px",
                                    borderRadius: 5,
                                    backgroundColor: "white",
                                    border: "1.5px solid #DFE6E9",

                                    "& .MuiLinearProgress-barColorPrimary": {
                                      backgroundColor: "white"
                                    },
                                    "& .MuiLinearProgress-bar": {
                                      borderRadius: 5,
                                      backgroundColor: getProgressColorBerbagiData(item.status),
                                    }
                                  }} />
                                <Typography variant="p" sx={{
                                  color: "rgba(0, 0, 0, 0.60)",
                                  fontSize: "14px",
                                  fontStyle: "italic",
                                  fontWeight: 500,
                                  lineHeight: "150%",
                                  letterSpacing: "-0.266px",
                                }}>
                                  {getProgressValueBerbagiData(item.status)}%
                                </Typography>
                              </Box>
                            </Stack>
                          </Stack>
                          <Box sx={{ minWidth: "45px", display: "flex", justifyContent: "flex-end" }}>
                            <Button disabled disableFocusRipple disableRipple sx={{
                              minWidth: "25px",
                              borderRadius: "50px",
                              width: "25px",
                              height: "25px",
                              backgroundColor: "var(--jakartasatu-biru)",

                              "&:hover": {
                                backgroundColor: "var(--jakartasatu-biru)",
                                opacity: "80%",
                              }
                            }}>
                              <KeyboardArrowRightRoundedIcon sx={{ color: "white", marginRight: "-1.5px", marginTop: "-1px" }} />
                            </Button>
                          </Box>
                        </Stack>
                        {i !== riwayatBerbagiData.length - 1 && (
                          <Divider sx={{ margin: "20px 0" }} />
                        )}
                      </div>
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box
                  sx={{
                    height: "100%",
                    maxHeight: "456px",
                    backgroundColor: "white",
                    padding: "22px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    border: "1px solid #DFE6E9",
                    boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Typography variant="p" sx={{
                      color: "var(--jakartasatu-biru)",
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "150%",
                      letterSpacing: "-0.342px",
                    }}>
                      Riwayat Pakai Data
                    </Typography>
                    <Box sx={{
                      width: "100%",
                      maxWidth: "110px",
                      height: "26px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(0, 53, 119, 0.08)",
                    }}>
                    </Box>
                  </Stack>
                  <Box sx={{
                    overflow: "auto",
                    paddingRight: { xs: "15px", sm: "10px", md: "10px", lg: "10px", xl: "10px" },
                    marginRight: { xs: "-15px", sm: "-10px", md: "-10px", lg: "-10px", xl: "-10px" },

                    '::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '::-webkit-scrollbar-track': {
                      borderRadius: '4px',
                      border: "1px solid #DFE6E9",
                      margin: "0 20px"
                    },
                    '::-webkit-scrollbar-thumb': {
                      background: '#003577',
                      borderRadius: '5px',
                    },
                    '::-webkit-scrollbar-thumb:hover': {
                      background: '#002b5e',
                    },
                  }}>
                    {riwayatPakaiData.map((item, i) => (
                      <div key={i}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                          sx={{ width: "100%" }}>
                          <Button disabled disableFocusRipple disableRipple
                            sx={{
                              alignSelf: "flex-start",
                              minWidth: "46px",
                              borderRadius: "100%",
                              width: "46px",
                              height: "46px",
                              backgroundColor: "var(--jakartasatu-biru)",

                              "&:hover": {
                                backgroundColor: "var(--jakartasatu-biru)",
                                opacity: "80%",
                              }
                            }}>
                            <WorkHistoryRoundedIcon sx={{ color: "white" }} />
                          </Button>
                          <Stack
                            direction={{ xs: "column", sm: "row", md: "row", lg: "row", xl: "row" }}
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            sx={{ width: "100%" }}>
                            <Stack
                              direction="column"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                              sx={{ width: "100%" }}>
                              <Typography variant="p" sx={{
                                alignItems: "start",
                                color: "var(--jakartasatu-biru)",
                                fontSize: "16px",
                                fontWeight: 600,
                                lineHeight: "150%",
                                letterSpacing: "-0.304px",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}>
                                {item.judul}
                              </Typography>
                              <Typography variant="p" sx={{
                                alignItems: "start",
                                color: "rgba(0, 0, 0, 0.70)",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "150%",
                                letterSpacing: "-0.266px",
                              }}>
                                {item.nama_pic}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="column"
                              justifyContent="center"
                              alignItems="flex-start"
                              sx={{ width: "100%" }}>
                              <Box sx={{
                                display: "flex",
                                justifyContent: { xs: "flex-start", sm: "center", md: "center", lg: "center", xl: "center" },
                                width: {
                                  xs: "100%",
                                  sm: "calc(100% - 40px)",
                                  md: "calc(100% - 40px)",
                                  lg: "calc(100% - 40px)",
                                  xl: "calc(100% - 40px)"
                                },
                              }}>
                                <Typography variant="p" sx={{
                                  color: "rgba(0, 0, 0, 0.60)",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  lineHeight: "150%",
                                  letterSpacing: "-0.266px",
                                }}>
                                  Progres
                                </Typography>
                              </Box>
                              <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                              }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={getProgressValuePakaiData(item.status)}
                                  sx={{
                                    width: "100%",
                                    height: "16px",
                                    borderRadius: 5,
                                    backgroundColor: "white",
                                    border: "1.5px solid #DFE6E9",

                                    "& .MuiLinearProgress-barColorPrimary": {
                                      backgroundColor: "white"
                                    },
                                    "& .MuiLinearProgress-bar": {
                                      borderRadius: 5,
                                      backgroundColor: getProgressColorPakaiData(item.status),
                                    }
                                  }} />
                                <Typography variant="p" sx={{
                                  color: "rgba(0, 0, 0, 0.60)",
                                  fontSize: "14px",
                                  fontStyle: "italic",
                                  fontWeight: 500,
                                  lineHeight: "150%",
                                  letterSpacing: "-0.266px",
                                }}>
                                  {getProgressValuePakaiData(item.status)}%
                                </Typography>
                              </Box>
                            </Stack>
                          </Stack>
                          <Box sx={{ minWidth: "45px", display: "flex", justifyContent: "flex-end" }}>
                            <Button disabled disableFocusRipple disableRipple sx={{
                              minWidth: "25px",
                              borderRadius: "50px",
                              width: "25px",
                              height: "25px",
                              backgroundColor: "var(--jakartasatu-biru)",

                              "&:hover": {
                                backgroundColor: "var(--jakartasatu-biru)",
                                opacity: "80%",
                              }
                            }}>
                              <KeyboardArrowRightRoundedIcon sx={{ color: "white", marginRight: "-1.5px", marginTop: "-1px" }} />
                            </Button>
                          </Box>
                        </Stack>
                        {i !== riwayatPakaiData.length - 1 && (
                          <Divider sx={{ margin: "20px 0" }} />
                        )}
                      </div>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default Dashboard;
