"use client";

import React, { useEffect, useState } from "react";
import {
    Box, Typography, TextField, Button, Paper, Grid, Divider,
    IconButton, FormControlLabel, Checkbox
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SurveyEditor = ({ surveyId }) => {
    const [survey, setSurvey] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savingSurvey, setSavingSurvey] = useState(false);
    const [savingQuestions, setSavingQuestions] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resSurvey = await fetch(`${process.env.BASE_URL}/api/survey/survey/list?survey_id=${surveyId}`);
                const dataSurvey = await resSurvey.json();
                setSurvey(dataSurvey.survey);

                const resQuestions = await fetch(`${process.env.BASE_URL}/api/survey/question/list?survey_id=${surveyId}`);
                const dataQuestions = await resQuestions.json();
                setQuestions(dataQuestions);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [surveyId]);

    const handleSurveyChange = (field, value) => {
        setSurvey(prev => ({ ...prev, [field]: value }));
    };

    const handleSurveySave = async () => {
        setSavingSurvey(true);
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/survey/survey/edit?survey_id=${surveyId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(survey),
            });
            if (!res.ok) throw new Error("Failed to save");
            alert("Survey updated!");
        } catch (err) {
            console.error(err);
            alert("Error saving survey");
        } finally {
            setSavingSurvey(false);
        }
    };

    const handleQuestionChange = (id, field, value) => {
        setQuestions(prev =>
            prev.map(q => q.question_id === id ? { ...q, [field]: value } : q)
        );
    };

    const handleQuestionSave = async (q) => {
        const isNew = !q.question_id || q.question_id.startsWith("temp-");

        // Temporarily track the saving state using temp ID or actual ID
        const tempId = q.question_id || `temp-${Date.now()}`;
        setSavingQuestions(prev => ({ ...prev, [tempId]: true }));

        try {
            const payload = {
                name: q.name,
                type: q.type,
                option: q.option,
                description: q.description,
                related: q.related,
                condition: q.condition,
                survey_id: surveyId,
            };

            const res = await fetch(isNew ? `${process.env.BASE_URL}/api/survey/question/create` : `${process.env.BASE_URL}/api/survey/question/edit?question_id=${q.question_id}`, {
                method: isNew ? "POST" : "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save");

            const saved = await res.json();

            if (isNew) {
                // Replace temp question with saved one that has real question_id
                setQuestions(prev =>
                    prev.map(p => p.question_id === q.question_id ? saved : p)
                );
            } else {
                setQuestions(prev =>
                    prev.map(p => p.question_id === q.question_id ? saved : p)
                );
            }

            alert(`Question "${q.name}" ${isNew ? "created" : "updated"}!`);
        } catch (err) {
            console.error(err);
            alert("Error saving question");
        } finally {
            setSavingQuestions(prev => ({ ...prev, [tempId]: false }));
        }
    };


    if (loading) return <Typography>Loading...</Typography>;
    if (!survey) return <Typography>Survey not found</Typography>;

    return (
        <Box sx={{ width: "100vw", minHeight: "100vh", backgroundColor: "white", p: 4, color: "darkgray" }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                Edit Survey
            </Typography>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Survey Name"
                            value={survey.name || ""}
                            onChange={(e) => handleSurveyChange("name", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            multiline
                            rows={3}
                            value={survey.description || ""}
                            onChange={(e) => handleSurveyChange("description", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Thumbnail URL"
                            value={survey.thumbnail || ""}
                            onChange={(e) => handleSurveyChange("thumbnail", e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Paper>

            <Typography variant="h5" sx={{ mb: 2 }}>
                Questions
            </Typography>

            <Button
                variant="outlined"
                sx={{ mb: 2 }}
                onClick={() => {
                    const tempId = `temp-${Date.now()}`;
                    const newQuestion = {
                        question_id: tempId,
                        name: "",
                        type: "",
                        option: "",
                        description: "",
                        related: false,
                        condition: [],
                    };
                    setQuestions(prev => [...prev, newQuestion]);
                }}
            >
                + Add Question
            </Button>

            {questions.map((q, i) => (
                <Paper key={q.question_id} sx={{ p: 2, mb: 3, backgroundColor: "#f9f9f9" }}>
                    <Typography
                        variant="caption"
                        sx={{ color: "gray", mb: 1, cursor: "pointer" }}
                        onClick={() => {
                            navigator.clipboard.writeText(q.question_id);
                            alert("Question ID copied to clipboard!");
                        }}
                    >
                        Question ID: <strong>{q.question_id}</strong> (click to copy)
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={`Q${i + 1}: Question Label`}
                                value={q.name || ""}
                                onChange={(e) => handleQuestionChange(q.question_id, "name", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Type"
                                value={q.type}
                                onChange={(e) => handleQuestionChange(q.question_id, "type", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Options (semicolon-separated)"
                                value={q.option || ""}
                                onChange={(e) => handleQuestionChange(q.question_id, "option", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Description"
                                value={q.description || ""}
                                onChange={(e) => handleQuestionChange(q.question_id, "description", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={q.related}
                                        onChange={(e) => handleQuestionChange(q.question_id, "related", e.target.checked)}
                                    />
                                }
                                label="Is Related?"
                            />
                        </Grid>
                        {q.related && (
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Condition (JSON string)"
                                    value={JSON.stringify(q.condition || [], null, 2)}
                                    onChange={(e) => {
                                        try {
                                            const parsed = JSON.parse(e.target.value);
                                            handleQuestionChange(q.question_id, "condition", parsed);
                                        } catch {
                                            // silently fail if invalid JSON
                                        }
                                    }}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={<SaveIcon />}
                                onClick={() => handleQuestionSave(q)}
                                disabled={savingQuestions[q.question_id]}
                            >
                                {savingQuestions[q.question_id] ? "Saving..." : "Save Question"}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            ))}

            <Divider sx={{ my: 4 }} />

            <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSurveySave}
                disabled={savingSurvey}
            >
                {savingSurvey ? "Saving..." : "Save Survey Info"}
            </Button>
        </Box>
    );
};

export default SurveyEditor;
