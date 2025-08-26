import React from 'react'
import SurveyEditor from './SurveyEditor';

const page = async ({ params }) => {
  const { slug } = await params;
  return (
    <>
      <SurveyEditor surveyId={slug} />
    </>
  )
}

export default page