// src/components/exed/exed.jsx
import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { styled } from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import Heading from "../../utils/heading";

// Rail fallback icons (when no logo is supplied)
import gradSrc from "../../assets/icons/grad.png";
import workSrc from "../../assets/icons/work.png";

// === LOGOS (add/remove as needed) ===
import ncsuLogo from "../../assets/icons/ncsu.png";
import supplypointLogo from "../../assets/icons/supplypoint.png";
import citibankLogo from "../../assets/icons/citi.png";
import shyenaLogo from "../../assets/icons/shyena.jpeg";
import cumminsLogo from "../../assets/icons/cummins.png";

/* -------------------------------- DATA -------------------------------- */
const ITEMS = [
  {
    side: "left",
    type: "edu",
    period: "Aug 2023 – May 2025",
    title: "Master of Computer Science",
    org: "North Carolina State University",
    summary: "GPA 3.5. Focus on AI, Machine Learning, and Big-Data Engineering.",
    tags: ["AI/ML", "Big Data", "Research"],
    logo: ncsuLogo,
  },
  {
    side: "right",
    type: "work",
    period: "Aug 2024 – Present",
    title: "Web Developer",
    org: "SupplyPoint — Remote, USA",
    summary:
      "React/TypeScript + WCAG flows; onboarding time ↓25%. Shipped 15+ Figma → prod features (reviews ↓40%). Integrated Node/Express + SQL for 5+ Power BI dashboards (redundant reporting ↓50%). TDD to ~80% coverage (bugs ↓25%). Automated HR routing with Power Automate (SLA ↑20%).",
    tags: ["React", "TypeScript", "Node/Express", "Power BI", "TDD"],
    cta: { label: "Notable highlights →", href: "#work" },
    logo: supplypointLogo,
  },
  {
    side: "left",
    type: "work",
    period: "Jun 2024 – Aug 2024",
    title: "Research Assistant",
    org: "North Carolina State University — Raleigh, NC",
    summary:
      "Processed 5K+ logs with Python/R/SQL; flagged 120+ anomalies. Prototyped summarization pipelines; stability ↑18%. Delivered BI visuals used in 2 publications.",
    tags: ["Python", "R", "SQL", "BI/Visualization"],
    logo: ncsuLogo,
  },
  {
    side: "right",
    type: "work",
    period: "Jul 2022 – Jul 2023",
    title: "Software Engineer",
    org: "Citibank — Pune, India",
    summary:
      "Automated 15K+ Jira ETL to Oracle (accuracy ~95%). Built load-test stack (Angular + Python + Spring Boot) simulating 1K+ users. Dash/Plotly + MongoDB + Grafana cut triage time by 30%. Docker/K8s/OpenShift kept 99.9% uptime at 2.5× traffic. JUnit in CI/CD reduced defects 35%.",
    tags: ["Java/Python", "Angular", "Spring Boot", "Docker/K8s", "CI/CD"],
    logo: citibankLogo,
  },
  {
    side: "left",
    type: "edu",
    period: "Aug 2018 – May 2022",
    title: "Bachelor of Computer Engineering",
    org: "MKSSS Cummins College of Engineering — Pune, India",
    summary: "GPA 8.76.",
    tags: ["CS Fundamentals"],
    logo: cumminsLogo,
  },
  {
    side: "right",
    type: "work",
    period: "Aug 2021 – May 2022",
    title: "Software Developer Intern",
    org: "Shyena Tech Yarns — Pune, India",
    summary:
      "Banking chatbot with Python (RASA/NLP) automated Tier-1 (workload ↓80%). Tuned DynamoDB/Elasticsearch (latency ↓35%). Deployed on AWS with Docker/K8s (99.9% availability).",
    tags: ["Python/RASA", "Elasticsearch", "AWS", "Docker/K8s"],
    logo: shyenaLogo,
  },
];

/* ------------------------------- STYLES ------------------------------- */

const Section = styled(Box)`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 96px;
`;

const Rail = styled(Box)`
  position: absolute;
  inset: 0;
  left: 50%;
  width: 2px;
  margin-left: -1px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.9) 12%,
    rgba(255, 255, 255, 0.9) 88%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
`;

const Row = styled(Box)`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 120px 1fr; /* left | center | right */
  align-items: center;
  min-height: 220px;
  padding: 48px 0;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 32px 0 56px;
    min-height: unset;
  }
`;

const CenterCol = styled(Box)`
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Node = styled(Box)`
  /* dynamic ring color per type */
  --ring: ${(p) => (p.$type === "edu" ? "rgba(0, 200, 200, 0.28)" : "rgba(120, 160, 255, 0.28)")};

  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: radial-gradient(78% 78% at 50% 50%, #122033 0%, #0c1727 100%);
  border: 2px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45), 0 0 0 8px var(--ring);
  z-index: 2;

  svg {
    width: 70px;
    height: 70px;
    fill: #cfe0ff;
  }

  img {
    width: 70px;
    height: 70px;
    object-fit: contain;
    display: block;
  }
`;


const DateLabel = styled(Typography)`
  color: #ffd54a;            /* yellow */
  font-weight: 800 !important;
  font-style: italic;
  font-size: 0.98rem !important;
  line-height: 1.2;
  text-align: center;
  display: block;
  margin-bottom: 12px;       /* space above the card */
`;

const CardWrap = styled(Box)`
  grid-column: ${(p) => (p.$side === "left" ? "1 / 2" : "3 / 4")};
  width: min(560px, 100%);
  ${(p) => (p.$side === "left" ? "justify-self:end;" : "justify-self:start;")}

  @media (max-width: 900px) {
    grid-column: 1 / -1;
    justify-self: stretch;
  }
`;

/* TEAL-BLUE CARD */
const Card = styled(Box)`
  background: linear-gradient(
    180deg,
    rgba(0, 128, 128, 0.9) 0%,
    rgba(0, 102, 128, 0.9) 100%
  );
  border: 1px solid rgba(0, 255, 255, 0.25);
  border-radius: 18px;
  padding: 22px 24px;
  color: #eafcff;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
`;

const HeaderRow = styled(Box)`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`;

const LogoBadge = styled("img")`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border: 0;                 /* no outline */
  background: transparent;   /* no tint */
  border-radius: 6px;        /* keep slight rounding; change if you want square */
  box-shadow: none;
`;

const Title = styled(Typography)`
  font-weight: 800 !important;
  color: #e9faff;
  margin: 0 !important;
`;

const Org = styled(Typography)`
  opacity: 0.9;
  margin-top: 2px !important;
  margin-bottom: 10px !important;
`;

const Summary = styled(Typography)`
  opacity: 0.95;
`;

const Tags = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
`;

const Tag = styled("span")`
  display: inline-block;
  padding: 6px 10px;
  font-size: 0.78rem;
  border-radius: 999px;
  color: #e0ffff;
  background: rgba(0, 180, 180, 0.2);
  border: 1px solid rgba(0, 200, 200, 0.35);
  letter-spacing: 0.2px;
`;

const CTA = styled(Typography)`
  display: inline-block;
  margin-top: 14px !important;
  font-weight: 700 !important;
  color: #b5f4ff !important;
`;

/* ------------------------------ ANIMATION ----------------------------- */

const STAGGER_SEC = 0.3;     
const ROW_DELAY = 0.3;

const flyIn = (side, delay, reduce) => ({
  hidden: { opacity: 0, x: side === "left" ? -40 : 40, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: reduce ? 0 : delay,
      duration: 0.6,
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
});

const fadeUp = (delay, reduce) => ({
  hidden: { opacity: 0, y: -6, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: reduce ? 0 : delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
});

const pop = (delay, reduce) => ({
  hidden: { opacity: 0, scale: 0.85, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay: reduce ? 0 : delay, type: "spring", stiffness: 300, damping: 20 },
  },
});

/* -------------------------------- UI -------------------------------- */

const ICONS = { edu: <img src={gradSrc} alt="Education" />, work: <img src={workSrc} alt="Work" /> };

const Exed = () => {
  const reduceMotion = useReducedMotion();

  return (
    <Box className="exed container black-container" id="exed" sx={{ position: "relative" }}>
      <Heading headerText="Experience & Education" id="exed-heading" />

      <Section>
        <Rail as={motion.div} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ transformOrigin: "top center" }} />

        {ITEMS.map((it, i) => {
          const base = i * STAGGER_SEC;
          const dateDelay = base + 0.0;
          const nodeDelay = base + ROW_DELAY;
          const cardDelay = base + ROW_DELAY;

          return (
            <Row key={i}>
              {/* Center rail: logo replaces icon when provided */}
              <CenterCol
                  as={motion.div}
                  variants={fadeUp(dateDelay, reduceMotion)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  
                >

                  <Node
                    $type={it.type}
                    as={motion.div}
                    variants={pop(nodeDelay, reduceMotion)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    aria-label={it.type === "edu" ? "Education" : "Work"}
                  >
                    {ICONS[it.type]}
                  </Node>
                </CenterCol>

              {/* Card column with date above the card */}
              <CardWrap $side={it.side}>
              <DateLabel
                    as={motion.span}
                    variants={fadeUp(dateDelay, reduceMotion)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {it.period}
                  </DateLabel>
                <Card
                  as={motion.div}
                  variants={flyIn(it.side, cardDelay, reduceMotion)}
                  initial="hidden"
                  whileInView="visible"
                   viewport={{ once: true, amount: 0.35 }}
                >
                  <HeaderRow>
                    {it.logo ? <LogoBadge src={it.logo} alt={`${it.org} logo`} /> : <span />}
                    <Box>
                      <Title variant="h6">{it.title}</Title>
                      {it.org && <Org variant="body2">{it.org}</Org>}
                    </Box>
                  </HeaderRow>

                  {it.summary && <Summary variant="body2">{it.summary}</Summary>}

                  {!!it.tags?.length && (
                    <Tags>
                      {it.tags.map((t, idx) => (
                        <Tag key={idx}>{t}</Tag>
                      ))}
                    </Tags>
                  )}

                  {it.cta && (
                    <CTA variant="body2">
                      <MuiLink href={it.cta.href} underline="hover" sx={{ color: "inherit" }}>
                        {it.cta.label}
                      </MuiLink>
                    </CTA>
                  )}
                </Card>
              </CardWrap>
            </Row>
          );
        })}
      </Section>
    </Box>
  );
};

export default Exed;
