// src/components/exed/exed.jsx
import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { styled } from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import Heading from "../../utils/heading";

// Rail fallback icons
import gradSrc from "../../assets/icons/grad.png";
import workSrc from "../../assets/icons/work.png";

// LOGOS
import ncsuLogo from "../../assets/icons/ncsu.png";
import supplypointLogo from "../../assets/icons/supplypoint.png";
import citibankLogo from "../../assets/icons/citi.png";
import shyenaLogo from "../../assets/icons/shyena.jpeg";
import cumminsLogo from "../../assets/icons/cummins.png";

/* -------------------------------- DATA --------------------------------
   - tags = technologies shown on the FRONT
   - manualHighlights = 4 lines shown on the BACK (no numbers/percents; “what I did”)
--------------------------------------------------------------------------- */
const ITEMS = [
  {
    side: "left",
    type: "edu",
    period: "Aug 2023 – May 2025",
    title: "Master of Computer Science",
    org: "North Carolina State University",
    tags: ["AI/ML", "Big Data", "HCI", "Data"],
    logo: ncsuLogo,
    manualHighlights: [
      "GPA: 3.5/4",
      "Coursework:  Human-Computer Interaction (HCI), Software Engineering, Program-Centered Design, Neural Networks, Database Management, Data Science, Software Security, Program-Centered User Design",
    ],
  },
  {
    side: "right",
    type: "work",
    period: "Aug 2024 – Present",
    title: "Web Developer",
    org: "SupplyPoint — Remote, USA",
    summary:
      "React/TypeScript + WCAG flows; onboarding time ↓25%. Shipped 15+ Figma → prod features (reviews ↓40%). Integrated Node/Express + SQL for 5+ Power BI dashboards (redundant reporting ↓50%). TDD to ~80% coverage (bugs ↓25%). Automated HR routing with Power Automate (SLA ↑20%).",
    tags: ["React", "TypeScript", "Node/Express", "SQL", "Power BI", "HTML","CSS", "Power Automate", "Microsoft Tools"],
    logo: supplypointLogo,
    manualHighlights: [
      "Built an employee onboarding site with React and Redux on a Node and Express backend. Authentication used JWT and role based access so people saw only what they should. Drew the experience in Figma and Balsamiq and translated it into clean HTML, CSS and JavaScript for the company site. Shaped Power BI dashboards with SQL and DAX and ran HR operations with Microsoft tools including Power Automate, SharePoint ticketing, Copilot and Excel."
     ]
  },
  {
    side: "left",
    type: "work",
    period: "Jun 2024 – Aug 2024",
    title: "Research Assistant",
    org: "North Carolina State University — Raleigh, NC",
    summary:
      "Processed 5K+ logs with Python/R/SQL; flagged 120+ anomalies. Prototyped summarization pipelines; stability ↑18%. Delivered BI visuals used in 2 publications.",
    tags: ["Python", "R", "SQL", "NLP", "BI/Visualization"],
    logo: ncsuLogo,
    manualHighlights: [
      "Explored system and application logs until clear patterns and outliers stood out. Wrote Python and R notebooks that turned long traces into short, readable notes. Built visual stories in Matplotlib and shared them with faculty for decisions. Kept data, runs, and code versioned so experiments stayed repeatable."
    ],
  },
  {
    side: "right",
    type: "work",
    period: "Jul 2022 – Jul 2023",
    title: "Software Engineer",
    org: "Citibank — Pune, India",
   tags: ["Java", "Python", "Angular","Apache Kafka", "Spring Boot", "Dash","Plotly", "MongoDB", "Grafana", "Docker", "Kubernetes", "CI/CD"],
    logo: citibankLogo,
    manualHighlights: [
      "Delivered Spring Boot services behind Angular interfaces and ensured their stability in production. Integrated Kafka streams and Oracle data models to support risk analytics, while building a lightweight load-testing rig that surfaced bottlenecks early. Produced dashboards in Dash, Plotly, and Grafana to reveal patterns and reduce triage time, and kept services containerized and deployed on Kubernetes with a strengthened CI/CD pipeline backed by comprehensive JUnit tests.",
    ],
  },
  {
    side: "left",
    type: "edu",
    period: "Aug 2018 – May 2022",
    title: "Bachelor of Computer Engineering",
    org: "MKSSS Cummins College of Engineering — Pune, India",
    summary: "GPA 8.76.",
    tags: ["Data Structures", "Algorithms", "Systems", "Databases"],
    logo: cumminsLogo,
    manualHighlights: [
      "GPA: 8.76/10",
      "Coursework: Data Structures, Cloud Computing, Network Security, Data Mining And Data Warehouse, Software Testing, Artificial Intelligence and Machine Learning, Statistics, Big Data Analytics, Software Architecture",
    ],
  },
  {
    side: "right",
    type: "work",
    period: "Aug 2021 – May 2022",
    title: "Software Developer Intern",
    org: "Shyena Tech Yarns — Pune, India",
    summary:
      "Banking chatbot with Python (RASA/NLP) automated Tier-1 (workload ↓80%). Tuned DynamoDB/Elasticsearch (latency ↓35%). Deployed on AWS with Docker/K8s (99.9% availability).",
    tags: ["Python", "RASA", "NLP", "DynamoDB", "Elasticsearch", "AWS", "Dockeer", "K8s"],
    logo: shyenaLogo,
    manualHighlights: [
     "Built a multilingual banking assistant using RASA that could interpret real customer intents and respond naturally. Modeled dialog flows, refined entities, and tested NLP accuracy across multiple scenarios. Optimized DynamoDB and Elasticsearch for faster queries and reliable state storage, then deployed the stack on AWS using Docker and Kubernetes while monitoring system health in production.",
    ],
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
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.9) 12%,
    rgba(255,255,255,0.9) 88%,
    rgba(255,255,255,0) 100%
  );
  pointer-events: none;
`;

const Row = styled(Box)`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 120px 1fr;
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
  --ring: ${(p) => (p.$type === "edu" ? "rgba(0,200,200,0.28)" : "rgba(120,160,255,0.28)")};
  width: 70px; height: 70px; border-radius: 50%;
  display: grid; place-items: center;
  background: radial-gradient(78% 78% at 50% 50%, #122033 0%, #0c1727 100%);
  border: 2px solid rgba(255,255,255,0.35);
  box-shadow: 0 12px 36px rgba(0,0,0,0.45), 0 0 0 8px var(--ring);
  z-index: 2;

  img { width: 70px; height: 70px; object-fit: contain; display: block; }
`;

const DateLabel = styled(Typography)`
  color: #ffd54a; font-weight: 800 !important; font-style: italic;
  font-size: 0.98rem !important; line-height: 1.2; text-align: center;
  display: block; margin-bottom: 12px;
`;

const CardWrap = styled(Box)`
  grid-column: ${(p) => (p.$side === "left" ? "1 / 2" : "3 / 4")};
  width: min(560px, 100%);
  ${(p) => (p.$side === "left" ? "justify-self:end;" : "justify-self:start;")}
  @media (max-width: 900px) { grid-column: 1 / -1; justify-self: stretch; }
`;

/* --- 3D Flip Card --- */
const Card3D = styled(Box)`
  perspective: 1200px;
  &:hover .inner, &:focus-within .inner { transform: rotateY(180deg); }
`;

const Inner = styled(Box)`
  position: relative;
  transform-style: preserve-3d;
  transition: transform .6s cubic-bezier(.2,.8,.2,1);
`;

const Face = styled(Box)`
  backface-visibility: hidden;
  border-radius: 18px;
  padding: 22px 24px;
  color: #eafcff;
  background: linear-gradient(180deg, rgba(0,128,128,0.9) 0%, rgba(0,102,128,0.9) 100%);
  border: 1px solid rgba(0,255,255,0.25);
  box-shadow: 0 24px 60px rgba(0,0,0,0.35);
  min-height: 190px;
`;

const Back = styled(Face)`
  position: absolute; inset: 0; transform: rotateY(180deg);
  background: linear-gradient(180deg, #0e3c55, #0b3348);
`;

const HeaderRow = styled(Box)`
  display: grid; grid-template-columns: 40px 1fr; gap: 12px;
  align-items: center; margin-bottom: 8px;
`;

const LogoBadge = styled("img")`
  width: 40px; height: 40px; object-fit: contain; display: block;
  border-radius: 6px; background: transparent; box-shadow: none;
`;

const Title = styled(Typography)`
  font-weight: 800 !important; color: #e9faff; margin: 0 !important;
`;

const Org = styled(Typography)`
  opacity: 0.9; margin-top: 2px !important; margin-bottom: 10px !important;
`;

const Tags = styled(Box)`
  display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;
`;

const Tag = styled("span")`
  display: inline-block; padding: 6px 10px; font-size: 0.78rem;
  border-radius: 999px; color: #e0ffff;
  background: rgba(0,180,180,0.2); border: 1px solid rgba(0,200,200,0.35);
  letter-spacing: 0.2px;
`;

const Lines = styled(Box)`
  display: grid;
  gap: 6px;
  > p { margin: 0; }
`;

const CTA = styled(Typography)`
  display: inline-block; margin-top: 14px !important;
  font-weight: 700 !important; color: #b5f4ff !important;
`;

/* ------------------------------ ANIMATION ----------------------------- */

const STAGGER_SEC = 0.3;
const ROW_DELAY = 0.3;

const flyIn = (side, delay, reduce) => ({
  hidden: { opacity: 0, x: side === "left" ? -40 : 40, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1, x: 0, y: 0, filter: "blur(0px)",
    transition: { delay: reduce ? 0 : delay, duration: 0.6, type: "spring", stiffness: 300, damping: 30 },
  },
});
const fadeUp = (delay, reduce) => ({
  hidden: { opacity: 0, y: -6, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: reduce ? 0 : delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
});
const pop = (delay, reduce) => ({
  hidden: { opacity: 0, scale: 0.85, filter: "blur(4px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
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
          const dateDelay = i * STAGGER_SEC + 0.0;
          const nodeDelay = i * STAGGER_SEC + ROW_DELAY;
          const cardDelay = i * STAGGER_SEC + ROW_DELAY;

          // ensure exactly up to 4 lines, already written without numbers/percents
          const highlights = (it.manualHighlights || []).slice(0, 4);

          return (
            <Row key={i}>
              {/* Center node */}
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

              {/* Date + Card */}
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

                <Card3D
                  as={motion.div}
                  variants={flyIn(it.side, cardDelay, reduceMotion)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  tabIndex={0}
                  aria-label={`${it.title} — flip for notable highlights`}
                >
                  <Inner className="inner">
                    {/* FRONT: title/org + TECH + hint */}
                    <Face>
                      <HeaderRow>
                        {it.logo ? <LogoBadge src={it.logo} alt={`${it.org} logo`} /> : <span />}
                        <Box>
                          <Title variant="h6">{it.title}</Title>
                          {it.org && <Org variant="body2">{it.org}</Org>}
                        </Box>
                      </HeaderRow>

                      {!!it.tags?.length && (
                        <Tags aria-label="Technologies used">
                          {it.tags.map((t, idx) => (
                            <Tag key={idx}>{t}</Tag>
                          ))}
                        </Tags>
                      )}

                      {/* explicit hint on the front */}
                      <CTA variant="body2">Notable highlights →</CTA>
                    </Face>

                    {/* BACK: 4 lines, no bullets, no quantifiers */}
                    <Back>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                        Notable highlights
                      </Typography>
                      <Lines>
                        {highlights.map((h, idx) => (
                          <Typography key={idx} variant="body2">
                            {h}
                          </Typography>
                        ))}
                      </Lines>
                      {it.cta && (
                        <Typography variant="body2" sx={{ mt: 1.25, fontWeight: 700, color: "#b5f4ff" }}>
                          <MuiLink href={it.cta.href} underline="hover" sx={{ color: "inherit" }}>
                            {it.cta.label}
                          </MuiLink>
                        </Typography>
                      )}
                    </Back>
                  </Inner>
                </Card3D>
              </CardWrap>
            </Row>
          );
        })}
      </Section>
    </Box>
  );
};

export default Exed;
