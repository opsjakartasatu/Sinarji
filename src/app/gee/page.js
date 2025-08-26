import React from "react";
import MainComponent from "./MainComponent";

import styles from "../page.module.css";

const page = () => {
  return (
    <main className={styles.main}>
      <MainComponent />
    </main>
  );
};

export default page;
