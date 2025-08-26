import React from 'react'
import FormSurvey from './FormSurvey';

const page = async ({ params }) => {
    const { slug } = await params;
    return (
        <>
            <FormSurvey survey_id={slug} />
        </>
    )
}

export default page