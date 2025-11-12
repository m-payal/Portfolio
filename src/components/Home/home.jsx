// src/components/Home/Home.jsx
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

import PersonalImage from "../../assets/images/Personal_Image.jpeg";
import CustomButton from "../../utils/customButton";
import CV from "../../assets/CV/Payal_Resume.pdf";
import openIcon from "../../assets/icons/open.png";
import "../Home/ScrollingTags.css";

const fadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: d } },
});

const imageVar = {
  hidden: { opacity: 0, scale: 0.96, rotate: -2 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1.0, type: "spring", delay: 0.4 } },
};

// keep this in sync with CSS --ticker-h
const TICKER_H = 36;

const bullets = [
  { text: "AI that adapts", color: "#FACC15" },
  { text: "Dashboards that explain themselves", color: "#FACC15" },
  { text: "Effortless UIs", color: "#FACC15" },
  { text: "Workflows that think ahead", color: "#34D399" },
  { text: "Data that tells a story", color: "#FACC15" },
];

export default function Home() {
  return (
    <Box
      id="home"
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        // exact 80% viewport height minus ticker
        minHeight: `calc(95vh - ${TICKER_H}px)`,
        // no extra bottom padding creating the gap
        pb: 0,
        overflow: "hidden",
      }}
    >
      {/* content wrapper fills available height */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 3 },
          pt: { xs: 6, md: 8 },
          // ensure vertical space distribution without leaving a hole
          minHeight: `calc(80vh - ${TICKER_H}px)`,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 6 }}
          alignItems={{ xs: "flex-start", md: "center" }}
          sx={{ width: "100%" }}
        >
          {/* LEFT */}
          <Box sx={{ flex: { md: "0 0 58%" }, width: "100%" }}>
            <Typography
              component={motion.p}
              variants={fadeUp(0)}
              initial="hidden"
              animate="visible"
              sx={{
                color: "#7DD3FC",
                letterSpacing: 1,
                fontSize: { xs: 12, md: 13 },
                fontFamily: '"Sora", system-ui',
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              Hi there, my name is
            </Typography>

            <Typography
              component={motion.h1}
              variants={fadeUp(0.05)}
              initial="hidden"
              animate="visible"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 800,
                fontSize: { xs: "3rem", sm: "3.4rem", md: "4rem" },
                lineHeight: 1.05,
                mb: 1.25,
                color: "white",
              }}
            >
              Payal Mehta
            </Typography>

            <Typography
              component={motion.div}
              variants={fadeUp(0.1)}
              initial="hidden"
              animate="visible"
              sx={{ fontSize: { xs: 14, md: 16 }, color: "rgba(255,255,255,0.9)", mb: 3, fontWeight: 800 }}
            >
              <span style={{ color: "#7CFC00" }}>Software Developer</span>
              <span style={{ margin: "0 10px", color: "rgba(255,255,255,0.85)" }}>•</span>
              <span style={{ color: "#7DD3FC" }}>UX Designer</span>
              <span style={{ margin: "0 10px", color: "rgba(255,255,255,0.85)" }}>•</span>
              <span style={{ color: "#FACC15" }}>Data Analyst</span>
            </Typography>

            <Typography
              component={motion.blockquote}
              variants={fadeUp(0.15)}
              initial="hidden"
              animate="visible"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontSize: { xs: 22, md: 26 },
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.95)",
                borderLeft: "4px solid #2dd4bf",
                pl: 3,
                ml: 0,
                mt: 2,
                mb: 3,
                maxWidth: { xs: "100%", md: "90%" },
                textWrap: "balance",
              }}
            >
              “Turning ideas into things people actually use, AI that adapts, dashboards that explain themselves, and flows that move fast without breaking.”
            </Typography>

            <Typography
              component={motion.p}
              variants={fadeUp(0.2)}
              initial="hidden"
              animate="visible"
              sx={{ fontFamily: '"Inter", system-ui', fontSize: { xs: 15, md: 16 }, color: "rgba(222,244,255,0.9)", mb: 3 }}
            >
              Work sits where <Box component="span" sx={{ fontWeight: 800, color: "#93c5fd" }}>logic</Box> meets{" "}
              <Box component="span" sx={{ fontWeight: 800, color: "#facc15" }}>design</Box>. Clean code paired with clever UX.
            </Typography>

            <motion.a
              variants={fadeUp(0.25)}
              initial="hidden"
              animate="visible"
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "fit-content", textDecoration: "none", display: "inline-block" }}
            >
              <CustomButton
                startFilled
                beforeBgColorHover="#BAF7E7"
                textColor="#F5897D"
                hoverColor="#0b1220"
                content={
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: '"Playfair Display", serif',
                      fontStyle: "italic",
                    }}
                  >
                    View my Resume
                    <img src={openIcon} alt="" aria-hidden="true" style={{ width: 22, height: 22, display: "block" }} />
                  </span>
                }
              />
            </motion.a>
          </Box>

          {/* divider */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: "2px",
              alignSelf: "stretch",
              bgcolor: "rgba(255,255,255,0.18)",
              mx: 2,
              borderRadius: 1,
            }}
          />

          {/* RIGHT */}
          <Stack spacing={3} sx={{ flex: { md: "1 1 auto" }, alignItems: "center", textAlign: "center", width: "100%" }}>
            <Box
              component={motion.div}
              variants={imageVar}
              initial="hidden"
              animate={{
                ...imageVar.visible,
                y: [0, -6, 0],
                transition: { ...imageVar.visible.transition, repeat: Infinity, repeatType: "loop", duration: 6, ease: "easeInOut" },
              }}
              whileHover={{ scale: 1.01 }}
              sx={{
                width: { xs: 260, sm: 300, md: 340 },
                height: { xs: 260, sm: 300, md: 340 },
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid rgba(125,211,252,0.35)",
                boxShadow: "0 18px 36px rgba(0,0,0,0.45)",
              }}
            >
              <Box
                component="img"
                src={PersonalImage}
                alt="Payal Mehta"
                sx={{ width: "100%", height: "100%", display: "block", objectFit: "cover", borderRadius: "50%", objectPosition: "center 30%" }}
              />
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography
                component={motion.div}
                variants={fadeUp(0.15)}
                initial="hidden"
                animate="visible"
                sx={{ fontSize: { xs: 22, md: 26 }, color: "#FACC15", fontWeight: 800, fontStyle: "italic", mb: 1, textShadow: "0 2px 14px rgba(0,0,0,0.35)" }}
              >
                My Hobbies:
              </Typography>

              <Typography
                component={motion.div}
                variants={fadeUp(0.2)}
                initial="hidden"
                animate="visible"
                variant="h5"
                sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, letterSpacing: 0.3, mb: 1.25 }}
              >
                Dancing, Drawing, Travelling
              </Typography>

              <Box
                component={motion.a}
                variants={fadeUp(0.25)}
                initial="hidden"
                animate="visible"
                href="/paintings"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontWeight: 700,
                  color: "#93c5fd",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  cursor: "pointer",
                  "&:hover": { color: "#38bdf8" },
                }}
                whileHover={{ x: 2, transition: { duration: 0.35 } }}
              >
                View my paintings
                <Box component={motion.span} aria-hidden="true" initial={{ x: 0 }} whileHover={{ x: 3 }}>
                  →
                </Box>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Box>

      {/* pinned ticker at the bottom of Home */}
      <Box className="bullet-row-wrap pinned">
        <div className="bullet-row">
          <div className="bullet-track">
            {bullets.concat(bullets).map((it, i) => (
              <span className="bullet-pill" key={i}>
                <span className="dot" style={{ backgroundColor: it.color }} />
                {it.text}
              </span>
            ))}
          </div>
        </div>
      </Box>
    </Box>
  );
}
