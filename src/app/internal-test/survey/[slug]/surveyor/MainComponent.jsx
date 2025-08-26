"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Chip,
  Pagination,
} from "@mui/material";
import { Add, Delete, Refresh, Search } from "@mui/icons-material";
import AddSurveyor from "./AddSurveyor";

const MainComponent = ({ session, survey_id }) => {
  const [value, setValue] = useState(0);
  const [userTargetListByUser, setUserTargetListByUser] = useState([]);
  const [userTargetListByGroup, setUserTargetListByGroup] = useState([]);
  const [addSurveyorOpen, setAddSurveyorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, item: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchUserTargetList = async () => {
    if (!session || !survey_id) return;

    setLoading(true);
    setError("");

    try {
      const user = JSON.parse(session.value).user;
      console.log(survey_id);
      const response = await fetch(
        `${process.env.API_WEB}/survey/list-target?survey_id=${survey_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized access");
        } else if (response.status === 404) {
          throw new Error("Survey not found");
        } else {
          throw new Error("Failed to fetch surveyor list");
        }
      }

      const data = await response.json();
      const targetList = data.data || [];

      setUserTargetListByUser(
        targetList.filter((item) => item.type === "by_user")
      );
      setUserTargetListByGroup(
        targetList.filter((item) => item.type === "by_group")
      );
    } catch (error) {
      console.error("Error fetching target list:", error);
      setError(error.message || "Failed to fetch surveyor list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTargetList();
  }, [session, survey_id]);

  const handleDeleteSurveyor = async (item) => {
    try {
      const user = JSON.parse(session.value).user;
      const response = await fetch(
        `${process.env.API_WEB}/survey/delete-target`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
          body: JSON.stringify({
            survey_id,
            user_target_id: item.user_target_id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete surveyor");
      }

      // Refresh the list
      fetchUserTargetList();
      setDeleteDialog({ open: false, item: null });
    } catch (error) {
      console.error("Error deleting surveyor:", error);
      setError(error.message || "Failed to delete surveyor");
    }
  };

  const openDeleteDialog = (item) => {
    setDeleteDialog({ open: true, item });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, item: null });
  };

  const filterData = (data) => {
    if (!searchTerm) return data;
    return data.filter(
      (item) =>
        item.name
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.email
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.ponsel?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const paginateData = (data) => {
    const filteredData = filterData(data);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      data: filteredData.slice(startIndex, endIndex),
      totalPages: Math.ceil(filteredData.length / itemsPerPage),
      totalItems: filteredData.length,
    };
  };

  const renderTable = (data) => {
    const { data: paginatedData, totalPages, totalItems } = paginateData(data);

    return (
      <Box>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            size="small"
            placeholder="Search surveyors..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            InputProps={{
              startAdornment: <Search sx={{ color: "action.active", mr: 1 }} />,
            }}
            sx={{ width: 300 }}
          />
          <Typography variant="body2" color="text.secondary">
            {totalItems} surveyor{totalItems !== 1 ? "s" : ""} found
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Nama</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Nomor Ponsel</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <TableRow
                    key={row.user_target_id || index}
                    hover
                    sx={{ "&:hover": { backgroundColor: "action.hover" } }}
                  >
                    {row.type === "by_user" ? <TableCell>{row.name || "N/A"}</TableCell> : <TableCell>{row.simpul_jaringan || "N/A"}</TableCell>}
                    <TableCell>{row.email || "N/A"}</TableCell>
                    <TableCell>{row.ponsel || "N/A"}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => openDeleteDialog(row)}
                        title="Delete surveyor"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      {searchTerm
                        ? "No surveyors found matching your search"
                        : "No surveyors added yet"}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              color="primary"
            />
          </Box>
        )}
      </Box>
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(1); // Reset pagination when switching tabs
    setSearchTerm(""); // Clear search when switching tabs
  };

  const toggleModal = () => {
    setAddSurveyorOpen(!addSurveyorOpen);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Surveyor Management
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
          {error}
        </Alert>
      )}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button
          startIcon={<Refresh />}
          variant="outlined"
          onClick={fetchUserTargetList}
          disabled={loading}
        >
          Refresh
        </Button>

        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={toggleModal}
          disabled={loading}
        >
          Add Surveyor
        </Button>
      </Box>
      <Box
        sx={{ width: "100%", borderBottom: 1, borderColor: "divider", mb: 2 }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label={`By User (${userTargetListByUser.length})`}
            disabled={loading}
          />
          <Tab
            label={`By Group (${userTargetListByGroup.length})`}
            disabled={loading}
          />
        </Tabs>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: value === 0 ? "block" : "none",
              width: "100%",
              p: 2,
            }}
          >
            {renderTable(userTargetListByUser)}
          </Box>

          <Box
            sx={{
              display: value === 1 ? "block" : "none",
              width: "100%",
              p: 2,
            }}
          >
            {renderTable(userTargetListByGroup)}
          </Box>
        </>
      )}
      {/* <AddSurveyor
        addSurveyorOpen={addSurveyorOpen}
        toggleModal={toggleModal}
        session={session}
        survey_id={survey_id}
        onSurveyorAdded={onSurveyorAdded}
      /> */}
    </Box>
  );
};

export default MainComponent;
