// src/components/work/Work.jsx
import React, { useMemo, useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "../../utils/heading";
import { projData as rawProjects } from "../../data/projectsData";

/* ------------------------------- assets helper ------------------------------- */
const ASSETS = require.context("../../assets", true, /\.(png|jpe?g|gif|svg)$/);
const getProjectImg = (p) => {
  if (p.icon) return p.icon;
  if (!p.image) return null;
  const candidate = p.image.includes("/") ? `./${p.image}` : `./images/${p.image}`;
  try { return ASSETS(candidate); } catch { try { return ASSETS(`./icons/${p.image}`); } catch { return null; } }
};

/* ---------------------------------- styles ---------------------------------- */
const Section = styled(Box)`position: relative;`;

const SideNav = styled(Box)`
  pointer-events: none;
  position: absolute; inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

const PagerBtn = styled.button`
  pointer-events: auto;
  justify-self: ${p => (p.$side === "left" ? "start" : "end")};
  margin: 0 10px;
  display: grid; place-items: center;
  width: 48px; height: 48px;
  border-radius: 999px;
  border: 1px solid rgba(147,197,253,0.35);
  background: rgba(173,216,255,0.28);
  color: #eaf2ff;
  box-shadow: 0 10px 24px rgba(0,0,0,0.28);
  cursor: pointer;
  transition: transform .15s ease, background .15s ease, border-color .15s ease, opacity .15s ease;
  &:hover { transform: translateY(-1px); background: rgba(173,216,255,0.36); border-color: rgba(147,197,253,0.55); }
  &:disabled { opacity: .45; cursor: default; transform: none; }
`;

const Grid = styled(motion.div)`
  --gap: clamp(14px, 2.2vw, 28px);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--gap);

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const Card = styled(motion.article)`
  background: #0e8074;               /* teal */
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 22px;
  box-shadow: 0 14px 36px rgba(0,0,0,0.32);
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr auto;
  color: #0d2430;
  font-family: "Times New Roman", Times, serif;
`;

const Thumb = styled(Box)`
  background: #0a1625;
  aspect-ratio: 16 / 8;
  display: grid; place-items: center;
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
  @media (max-height: 850px) { aspect-ratio: 16 / 7; }
`;

const CardBody = styled(Box)`
  padding: 14px 16px 8px;
  display: grid; gap: 10px;
  text-align: center;
  justify-items: center;
  font-family: "Times New Roman", Times, serif;
`;

const Title = styled(Typography)`
  font-family: "Times New Roman", Times, serif !important;
  font-weight: 800 !important;
  color: #0a1b2b !important;
  font-size: clamp(18px, 1.6vw, 24px) !important;
  line-height: 1.15; margin: 0 !important;
`;

const Teaser = styled(Typography)`
  font-family: "Times New Roman", Times, serif !important;
  color: #10273b;
  font-size: 16px;
  line-height: 1.55;
  max-width: min(64ch, 92%);
  @media (max-height: 850px) { font-size: 14.5px; line-height: 1.4; }
`;

const CardFoot = styled(Box)`
  padding: 10px 16px 14px;
  display: flex; gap: 12px; justify-content: center; align-items: center;
`;

/* === NEW: Yellow pill tech tags === */
const TagsRow = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  padding: 2px 18px 10px;
`;

const TechTag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 14px;
  border-radius: 999px;             /* fully rounded pill */
  background: #facc15;              /* bright yellow */
  color: #0a1b2b;                   /* dark text for contrast */
  font-family: "Times New Roman", Times, serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.2px;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 3px 8px rgba(0,0,0,0.15);
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;

  &:hover {
    transform: translateY(-2px);
    background: #fde047;           /* lighter yellow on hover */
    box-shadow: 0 6px 14px rgba(0,0,0,0.22);
  }
`;

const LinkBtn = styled.a`
  font-family: "Times New Roman", Times, serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 18px;
  text-decoration: none;
  color: #0a1b2b;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-2px);
    background: #ffffff;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }
  &[data-disabled="true"] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const PageIndicator = styled(Box)`
  margin-top: 18px;
  display: flex; justify-content: center;
  font-family: "Times New Roman", Times, serif;
  color: rgba(235,242,255,0.95);
  font-weight: 800;
  letter-spacing: .08em;
`;

/* --------------------------------- helpers ---------------------------------- */
const normalize = (p) => {
  const bullets = Array.isArray(p.points) && p.points.length
    ? p.points
    : (p.describtion ? p.describtion.split(". ").filter(Boolean) : []);
  const teaser = bullets[0] || "";
  return { ...p, bullets, teaser };
};

const gridVariants = {
  initial: { opacity: 0, y: 12 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.28 } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.22 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.05 * i, duration: 0.35, ease: "easeOut" } }),
};

const Chevron = ({ dir = "next", size = 22 }) => {
  const rotate = dir === "prev" ? "rotate(180deg)" : "none";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: rotate }} fill="none" aria-hidden>
      <path d="M8 4l8 8-8 8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/* -------------------------------- component --------------------------------- */
const Work = () => {
  const projects = useMemo(() => rawProjects.map(normalize), []);
  const pageSize = 2;
  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
  const [page, setPage] = useState(0);

  const goPrev = useCallback(() => setPage((p) => (p - 1 + totalPages) % totalPages), [totalPages]);
  const goNext = useCallback(() => setPage((p) => (p + 1) % totalPages), [totalPages]);

  const start = page * pageSize;
  const visible = projects.slice(start, start + pageSize);

  return (
    <Section id="work" className="work container second-black-container" style={{ position: "relative", padding: "0 40px" }}>
      <Heading headerText="My Work" />
      <Box sx={{ mt: -1 }} />

      {/* Centered arrow buttons */}
      <SideNav aria-hidden="true">
        <PagerBtn $side="left" onClick={goPrev} aria-label="Previous projects" style={{ marginLeft: "-60px" }}>
          <Chevron dir="prev" />
        </PagerBtn>

        <PagerBtn $side="right" onClick={goNext} aria-label="Next projects" style={{ marginRight: "-60px" }}>
          <Chevron dir="next" />
        </PagerBtn>
      </SideNav>

      {/* Card Grid */}
      <AnimatePresence mode="wait">
        <Grid
          key={page}
          variants={gridVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          style={{ padding: "0 10px" }}
        >
          {visible.map((p, i) => {
            const imgSrc = getProjectImg(p);
            return (
              <Card
                key={p.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={i}
                whileHover={{ y: -3, boxShadow: "0 16px 36px rgba(0,0,0,0.35)" }}
              >
                <Thumb>{imgSrc && <img src={imgSrc} alt={p.label || p.name} loading="lazy" />}</Thumb>

                <CardBody>
                  <Title component="h3">{p.name}</Title>
                  {p.teaser && <Teaser>{p.teaser}</Teaser>}
                </CardBody>

                {/* Yellow pill tech tags */}
                <TagsRow>
                  {p.tools?.map((tool) => (
                    <TechTag key={tool}>{tool}</TechTag>
                  ))}
                </TagsRow>

                <CardFoot>
                  <LinkBtn
                    href={p.link || "#"}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${p.name} live site`}
                    data-disabled={!p.link || p.link === "#"}
                  >
                    View Project →
                  </LinkBtn>
                </CardFoot>
              </Card>
            );
          })}
        </Grid>
      </AnimatePresence>

      {/* Page indicator below cards */}
      <PageIndicator>{String(page + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}</PageIndicator>
    </Section>
  );
};

export default Work;
