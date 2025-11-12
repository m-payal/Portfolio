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
    type: "work",
    period: "May 2025 – Present",
    title: "Web Developer",
    org: "SupplyPoint - Durham, USA",
    tags: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind",
      "Redux",
      "Hooks",
      "Context API",
      "SQL",
      "PostgreSQL",
      "Wyn Enterprise",
      "Power BI",
      "Azure",
      "GitHub Actions"
      ],
    logo: supplypointLogo,
    manualHighlights: [
      "Developed responsive React dashboards and reusable components with Hooks and Redux",
      "Integrated REST APIs and Wyn Enterprise analytics for reliable data flow and insights",
      "Implemented unit testing and CI pipelines to ensure build stability and fast releases",
      "Collaborated across design and backend teams to maintain performance and accessibility"
    ]
    },
  {
  side: "right",
  type: "edu",
  period: "Aug 2023 – May 2025",
  title: "Master of Computer Science",
  org: "North Carolina State University",
  tags: ["AI/ML", "Software Engineering", "Software Security", "HCI", "Data Analytics"],
  logo: ncsuLogo,
  manualHighlights: [
  "GPA: 3.5/4",
  "Coursework: Human Computer Interaction, Software Engineering, Program Centered Design, Neural Networks, Database Management, Data Science, Software Security, Program Centered User Design"
  ]
  },
  
  {
  side: "left",
  type: "work",
  period: "Aug 2024 – May 2025",
  title: "Web Design Intern",
  org: "SupplyPoint - Durham, USA",
  summary:
  "Translated Figma prototypes into front end components. Defined UI patterns with Framer Motion. Helped tighten the design system and accessibility. Built templates for analytics dashboards.",
  tags: [
    "Figma",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "TypeScript",
    "Lighthouse",
    "Chrome DevTools",
    "Accessibility",
    "WCAG",
    "Webpack",
    "Git"
    ],
  logo: supplypointLogo,
  manualHighlights: [
    "Converted Figma wireframes into accessible React views with clean CSS",
    "Standardized motion and UI patterns with Framer Motion and Tailwind",
    "Optimized rendering with Lighthouse and code splitting",
    "Kept builds stable with Webpack, Babel and Git workflows"
    ]
  },
  {
    side: "right",
    type: "work",
    period: "Jun 2024 – Aug 2024",
    title: "Research Assistant",
    org: "North Carolina State University - Raleigh, NC",
    summary:
      "Processed 5K+ logs with Python/R/SQL; flagged 120+ anomalies. Prototyped summarization pipelines; stability ↑18%. Delivered BI visuals used in 2 publications.",
      tags: [
        "Flask",
        "Python",
        "SQL",
        "OpenEMR",
        "Data Visualization",
        "Analytics",
        "Healthcare",
        "UI/UX",
        "Software Security",
        "Vulnerability Testing"
      ],
    logo: ncsuLogo,
    manualHighlights: [
      "Developed analytics dashboards and UI enhancements for the OpenEMR healthcare system",
      "Integrated React and Flask APIs to visualize patient and operations data interactively",
      "Implemented data preprocessing and visualization pipelines using Python and SQL",
      "Collaborated with faculty to evaluate usability and improve clinical data workflows"
    ]
  },
  {
    side: "left",
    type: "work",
    period: "Jul 2022 – Jul 2023",
    title: "Software Engineer",
    org: "Citibank - Pune, India",
   tags: ["Java", "Python", "Angular","Apache Kafka", "Spring Boot", "Dash","Plotly", "MongoDB", "Grafana", "Docker", "Kubernetes", "CI/CD"],
    logo: citibankLogo,
    manualHighlights: [
      "Developed financial dashboards using Angular and Spring Boot microservices",
      "Integrated Kafka pipelines and Oracle SQL models for compliance analytics",
      "Built Plotly and Grafana dashboards to monitor performance and reliability",
      "Containerized microservices with Docker and Kubernetes using automated CI/CD"
    ],
  },
  {
    side: "right",
    type: "edu",
    period: "Aug 2018 – May 2022",
    title: "Bachelor of Computer Engineering",
    org: "MKSSS Cummins College of Engineering — Pune, India",
    summary: "GPA 8.76.",
    tags: ["Data Structures", "Algorithms", "System Design", "Databases", "Java Full stack", "Big Data Analytics"],
    logo: cumminsLogo,
    manualHighlights: [
      "GPA: 8.76/10",
      "Coursework: Data Structures, Cloud Computing, Network Security, Data Mining And Data Warehouse, Software Testing, Artificial Intelligence and Machine Learning, Statistics, Big Data Analytics, Software Architecture",
    ],
  },
  {
    side: "left",
    type: "work",
    period: "Aug 2021 – May 2022",
    title: "Software Developer Intern",
    org: "Shyena Tech Yarns — Pune, India",
    summary:
      "Banking chatbot with Python (RASA/NLP) automated Tier-1 (workload ↓80%). Tuned DynamoDB/Elasticsearch (latency ↓35%). Deployed on AWS with Docker/K8s (99.9% availability).",
    tags: ["Python", "RASA", "NLP", "DynamoDB", "Elasticsearch", "AWS", "Docker", "K8s"],
    logo: shyenaLogo,
    manualHighlights: [
     "Built a multilingual banking assistant using RASA to resolve customer intents.", 
     "Modeled dialog flows and tested NLP accuracy across multiple scenarios.",
     "Optimized DynamoDB and Elasticsearch for faster queries and reliable state storage.",
     "Deployed on AWS using Docker and Kubernetes, monitoring system health in production."
    ],
  },
];

/* ------------------------------- STYLES ------------------------------- */

const Section = styled(Box)`
  position: relative;
  max-width: 1440px;
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
  grid-template-columns: minmax(0, 1.4fr) 72px minmax(0, 1.4fr);
  column-gap: 48px;
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
  width: 70px; 
  height: 70px; border-radius: 50%;
  display: grid; place-items: center;
  background: radial-gradient(78% 78% at 50% 50%, #122033 0%, #0c1727 100%);
  border: 2px solid rgba(255,255,255,0.35);
  box-shadow: 0 12px 36px rgba(0,0,0,0.45), 0 0 0 8px var(--ring);
  z-index: 2;

  img { width: 70px; height: 70px; object-fit: contain; display: block; }
`;

const DateLabel = styled(Typography)`
  color: #ffd54a; font-weight: 800 !important; font-style: italic;
  font-size: 2 rem !important; line-height: 1.2; text-align: center;
  display: block; margin-bottom: 12px;
  font-family: "Times New Roman";
`;

const CardWrap = styled(Box)`
  grid-column: ${(p) => (p.$side === "left" ? "1 / 2" : "3 / 4")};
  width: 100%;
  max-width: 820px;
  ${(p) => (p.$side === "left" ? "justify-self:end;" : "justify-self:start;")}

  @media (max-width: 900px) {
    grid-column: 1 / -1;
    justify-self: stretch;
  }
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
  color: #2b228c;
  background: #51B3F0;
  align-items: center;
  font-family: "Times New Roman", Times, serif;
  { font-family: inherit !important; }
  border: 1px solid rgba(0,255,255,0.2);
  box-shadow: 0 24px 60px rgba(0,0,0,0.35);
  min-height: 190px;
`;

const Back = styled(Face)`
  position: absolute; inset: 0; transform: rotateY(180deg);
  background: linear-gradient(180deg, #8de3f0, #179cb0);
  font-family: "Times New Roman", Times, serif;
`;

const HeaderRow = styled(Box)`
  display: grid; grid-template-columns: 40px 1fr; gap: 12px;
  align-items: center; margin-bottom: 8px;
`;

const LogoBadge = styled("img")`
  width: 50px; height: 40px; object-fit: contain; display: block;
  border-radius: 6px; background: transparent; box-shadow: none;
`;

const Title = styled(Typography)`
  font-family: "Times New Roman", Times, serif !important;
  font-weight: 900 !important;
  color: #06134f;
  margin: 0 !important;
  font-size: 1.4rem !important;
  letter-spacing: 0.3px;
`;

const Org = styled(Typography)`
  opacity: 0.9; margin-top: 2px !important; margin-bottom: 10px !important;
  font-style: bold;
  font-family: "Times New Roman", Times, serif !important;
`;

const Tags = styled(Box)`
  display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;
`;

const Tag = styled("span")`
  display: inline-block; padding: 6px 10px; font-size: 0.78rem;
  border-radius: 999px; color: #e0ffff;
  background: #0C4E78; border: 1px solid rgba(0,200,200,0.35);
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
    <Box className="exed container black-container" id="exed" sx={{ position: "relative", maxWidth: "none" }}>
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
