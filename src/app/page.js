'use client'

import ChatBot from '../../src/components/chatBot';
import KritikSaran from '../../src/components/kritikSaran';
import ScrollTop from '../../src/components/scrollTop';
import BackToPortal from '@/components/backToPortal';
import FiturTerbaru from '@/components/fiturTerbaru';
import MenuBeranda from '@/components/menuBeranda';
import Navbar from '../../src/components/navbar/navbar';
import '../components/navbar/style.css';
import LandingPage from '../../src/components/homeRedesign/homeRedesign';
// import LandingPage from '../../src/components/homeRedesignOpsiEmpat/homeRedesignOpsiEmpat';
// import LandingPage from '../../src/components/home/home';
import Box from '../../src/components/box/box';
import Footer from '../../src/components/footer/footer';
import styles from '../../src/components/page.module.css'
import { useState } from 'react';

export default function Home() {
  const [halamanBeranda, setHalamanBeranda] = useState(true);

  return (
    <>
      <div style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(137, 193, 250, 0.44)",
        zIndex: "-1",
        overflowY: "auto",
        overflowX: "hidden"
      }}>
        <main className={styles.main}>
          <LandingPage />
          {/* <Box /> */}
          {/* <Footer /> */}
          <MenuBeranda />
          {/* <FiturTerbaru />
          <BackToPortal />
          <ChatBot />
          <KritikSaran />
          <ScrollTop /> */}
        </main>
      </div>
    </>
  )
}
