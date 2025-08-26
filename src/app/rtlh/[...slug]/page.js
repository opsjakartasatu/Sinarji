import GaleriRtlh from "./rtlh";
import React from "react";

const page = ({ params }) => {
  const { slug } = params;

  return (
    <div>
      <GaleriRtlh slug={slug} />
    </div>
  );
};

export default page;
