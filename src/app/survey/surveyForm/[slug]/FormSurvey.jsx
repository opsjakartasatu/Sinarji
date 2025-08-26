"use client";
import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    FormLabel,
    FormControlLabel,
    Button,
    RadioGroup,
    Radio,
    Paper,
    Grid
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const FormSurvey = ({ survey_id }) => {
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (survey_id) {
            const fetchData = async () => {
                try {
                    const questionsResponse = await fetch(`${process.env.BASE_URL}/api/survey/question/list?survey_id=${survey_id}`);
                    if (!questionsResponse.ok) throw new Error("Questions API failed to load");

                    const questionsData = await questionsResponse.json();
                    setQuestions(questionsData);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
    }, [survey_id]);

    useEffect(() => {
        if (questions) {
            setAnswers(questions.map(q => ({
                question_id: q.question_id,
                type: q.type,
                answer: q.type === "select_multiple" ? [] : ""
            })));
        }
    }, [questions]);

    const shouldShowQuestion = (question, customAnswers = answers) => {
        if (!question.condition || !question.related) return true;

        let conditionArray = [];

        try {
            conditionArray = typeof question.condition === "string"
                ? JSON.parse(question.condition)
                : question.condition;
        } catch (err) {
            console.error("Invalid condition format", err);
            return false;
        }

        return conditionArray.every(cond => {
            const relatedAnswer = customAnswers.find(a => a.question_id === cond.question_id)?.answer;

            if (Array.isArray(relatedAnswer)) {
                return relatedAnswer.includes(cond.value);
            }

            return String(relatedAnswer) === cond.value;
        });
    };

    const handleAnswerChange = (question_id, value) => {
        setAnswers(prev => {
            const updatedAnswers = prev.map(ans =>
                ans.question_id === question_id ? { ...ans, answer: value } : ans
            );

            return updatedAnswers.map(ans => {
                const question = questions.find(q => q.question_id === ans.question_id);
                return question && !shouldShowQuestion(question, updatedAnswers)
                    ? { ...ans, answer: question.type === "select_multiple" ? [] : "" }
                    : ans;
            });
        });
    };

    const parseOption = (optionString) => {
        return optionString ? optionString.split(";").map(s => s.trim()) : [];
    };

    const handleSubmit = async () => {
        try {
            const submission_id = uuidv4();
            for (const answer of answers) {
                console.log(JSON.stringify({
                    survey_id,
                    question_id: answer.question_id,
                    submission_id,
                    type: answer.type,
                    answer: Array.isArray(answer.answer) ? JSON.stringify(answer.answer) : answer.answer
                }));

                await fetch(`${process.env.BASE_URL}/api/survey/answer/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        survey_id,
                        question_id: answer.question_id,
                        submission_id,
                        type: answer.type,
                        answer: Array.isArray(answer.answer) ? JSON.stringify(answer.answer) : answer.answer
                    })
                });
            }

            Swal.fire({
                icon: "success",
                title: "Thank you!",
                text: "Your response has been submitted.",
                confirmButtonText: "OK"
            }).then(() => {
                setAnswers(questions.map(q => ({
                    question_id: q.question_id,
                    type: q.type,
                    answer: q.type === "select_multiple" ? [] : ""
                })));
            });

        } catch (error) {
            console.error("Error submitting survey:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to submit survey."
            });
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f2f6fc", py: 6 }}>
            <Container maxWidth="sm">
                <Paper elevation={6} sx={{ borderRadius: 4, p: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}>
                        Survey Form
                    </Typography>
                    <Box mt={3}>
                        <form>
                            <Grid container spacing={3}>
                                {questions?.map(question => shouldShowQuestion(question) && (
                                    <Grid item xs={12} key={question.question_id}>
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ mb: 1, fontWeight: 500 }}>{question.name}</FormLabel>

                                            {question.type === "text" && (
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    value={answers.find(a => a.question_id === question.question_id)?.answer || ""}
                                                    onChange={(e) => handleAnswerChange(question.question_id, e.target.value)}
                                                />
                                            )}

                                            {question.type === "number" && (
                                                <TextField
                                                    variant="outlined"
                                                    type="number"
                                                    fullWidth
                                                    value={answers.find(a => a.question_id === question.question_id)?.answer || ""}
                                                    onChange={(e) => handleAnswerChange(question.question_id, e.target.value)}
                                                />
                                            )}

                                            {question.type === "select_one" && (
                                                <RadioGroup
                                                    value={answers.find(a => a.question_id === question.question_id)?.answer || ""}
                                                    onChange={(e) => handleAnswerChange(question.question_id, e.target.value)}
                                                >
                                                    {parseOption(question.option).map(value => (
                                                        <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
                                                    ))}
                                                </RadioGroup>
                                            )}

                                            {question.type === "select_multiple" && (
                                                <Select
                                                    multiple
                                                    fullWidth
                                                    value={answers.find(a => a.question_id === question.question_id)?.answer || []}
                                                    onChange={(e) => handleAnswerChange(question.question_id, e.target.value)}
                                                >
                                                    {parseOption(question.option).map(value => (
                                                        <MenuItem key={value} value={value}>{value}</MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                        </FormControl>
                                    </Grid>
                                ))}
                            </Grid>

                            <Box mt={4} textAlign="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={handleSubmit}
                                    sx={{ px: 5, py: 1.5, fontWeight: "bold" }}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default FormSurvey;
