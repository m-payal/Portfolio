// src/components/work/Work.jsx
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import Heading from "../../utils/heading";
import CustomButton from "../../utils/customButton";
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
const Section = styled(Box)`
  position: relative;
`;

const Stage = styled(Box)`
  --gutter: clamp(22px, 3.6vw, 40px);
  --arrow-gap: clamp(10px, 2vw, 20px);
  --padY: clamp(10px, 1.6vw, 16px);

  position: relative;
  display: grid;
  grid-template-columns: var(--gutter) minmax(0, 1fr) var(--gutter);
  column-gap: var(--arrow-gap);
  align-items: stretch;

  background: var(--second-black-background);
  border-radius: 28px;

  /* let content decide height; keep a small floor so it never collapses */
  min-height: 420px;
  height: auto;

  padding: var(--padY) 0;
  overflow: visible;

  max-width: 1500px;     /* tweak: 960 / 1040 / 1120 */
  width: 100%;
  margin: 0 auto;

`;

/* Panel: let it auto-size (remove height: 100%) */
const Panel = styled(Box)`
  grid-column: 2;
  border-radius: 26px;
  background: #77e6e0;
  padding: clamp(8px, 1vw, 12px);
  overflow: hidden; /* keeps rounded look */
`;

/* Inner padding & gaps trimmed down */
const PanelInner = styled(Box)`
  --contentX: clamp(16px, 3vw, 30px);
  --contentY: clamp(6px, 1vw, 12px);
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--contentY) var(--contentX);

  display: grid;
  grid-template-rows: auto auto auto;  /* title, pills, body */
  row-gap: clamp(4px, 1vw, 10px);
`;

/* Titles: tighter spacing */
const TitleGroup = styled(Box)`
  display: grid;
  row-gap: clamp(2px, .6vw, 8px);
  justify-items: center;
  text-align: center;
  margin: 0;  /* remove extra margin under title block */
`;


const TitleLine1 = styled(Typography)`
  font-family: "Playfair Display","Merriweather",Georgia,serif !important;
  font-weight: 800 !important;
  color: #0e2b3a !important;
  font-size: clamp(24px, 3.2vw, 46px) !important;
  line-height: 1.02;                          /* tighter line-height */
`;

const TitleLine2 = styled(Typography)`
  font-family: "Playfair Display","Merriweather",Georgia,serif !important;
  font-weight: 800 !important;
  color: green !important;
  font-size: clamp(18px, 2.4vw, 32px) !important;
  line-height: 1.02;
`;

const PillsRow = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-bottom: clamp(4px, .8vw, 8px);       /* pull content up */
`;

const Pill = styled(Box)`
  background: #143b6a;
  color: #e9f1ff;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  line-height: 1;
  white-space: nowrap;

  svg, img { width: 18px; height: 18px; display: inline-block; }
`;

const Content = styled(Box)`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;   /* text a touch wider than image */
  column-gap: clamp(12px, 2vw, 24px);
  align-items: center;                  /* center text & image on the row */
  min-height: 0;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    row-gap: clamp(12px, 3vw, 20px);
  }
`;

/* Bullets: keep readable, no giant block */
const Bullets = styled.ul`
  margin: 0;
  padding-left: 22px;
  color: #07233a;
  font-size: clamp(13px, 1.1vw, 17px);
  font-weight: 500;
  line-height: 1.5;
  max-width: 740px;  /* keeps lines from getting too long */
  li { margin: 8px 0; }
`;

const GoLiveRow = styled(Box)`
  display: flex;
  justify-content: center;       /* centers under the text column */
  margin-top: clamp(8px, 1vw, 12px);
`;

const GoLiveLink = styled.a`
  display: inline-block;
  font-family: "Playfair Display", serif;
  font-style: italic;
  color: #8C3EC7;
  font-size: clamp(16px, 2vw, 24px);
  text-decoration: none;
  transition: transform .15s ease, opacity .15s ease, color .15s ease;

  &:hover {
    transform: translateX(2px);
    opacity: .95;
    text-decoration: underline;
  }

  &[aria-disabled="true"] {
    color: #0b6b3a80;            /* lighter */
    pointer-events: none;
    text-decoration: none;
    cursor: default;
  }
`;
const Shot = styled(Box)`
  max-width: clamp(300px, 40vw, 480px);   /* flexible but not forced square */
  border-radius: 12px;                   /* optional: soft rounded rectangle */
  overflow: hidden;
  background: #fff;
  box-shadow: 0 18px 42px rgba(7, 35, 58, 0.25);

  img {
    width: 100%;
    height: auto;      /* keep aspect ratio */
    object-fit: contain;  /* prevent cropping */
    border-radius: 0;  /* no forced shape */
  }
`;

const Arrow = styled.button`
grid-column: ${p => (p.$dir === "prev" ? 1 : 3)};
justify-self: center;
align-self: center;

/* bigger clickable area */
width: clamp(44px, 6vw, 64px);
height: clamp(44px, 6vw, 64px);

border: 0;
background: transparent;               /* keep transparent */
display: grid;
place-items: center;
cursor: pointer;

color: #fff;
filter: drop-shadow(0 2px 10px rgba(0,0,0,.55));
transition: transform .15s ease, opacity .15s ease;
opacity: .98;

&:hover { transform: scale(1.08); }
&:active { transform: scale(1.02); }
touch-action: manipulation;
`;

const Chevron = ({ dir = "next", size = 60 }) => {
const rotate = dir === "prev" ? "rotate(180deg)" : "none";
return (
  <svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	style={{ transform: rotate }}
	fill="none"
	aria-hidden
  >
	<path
	  d="M8 4l8 8-8 8"
	  stroke="currentColor"
	  strokeWidth="3.2"
	  strokeLinecap="round"
	  strokeLinejoin="round"
	/>
  </svg>
);
};

/* --------------------------------- helpers ---------------------------------- */
const normalize = (p) => {
  const pills = Array.isArray(p.tools) ? p.tools
              : Array.isArray(p.languages) ? p.languages : [];
  const bullets = Array.isArray(p.points) && p.points.length
    ? p.points
    : (p.describtion ? p.describtion.split(". ").filter(Boolean).slice(0, 2) : []);
  return { ...p, pills, bullets };
};
const splitTitle = (name) => {
  if (!name) return ["", ""];
  const [top, ...rest] = name.split(":");
  return [top.trim(), rest.join(":").trim()];
};

/* -------------------------------- component --------------------------------- */
const Work = () => {
  const projects = useMemo(() => rawProjects.map(normalize), []);
  const [idx, setIdx] = useState(0);

  const prev = useCallback(() => setIdx((i) => (i - 1 + projects.length) % projects.length), [projects.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % projects.length), [projects.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const p = projects[idx];
  const imgSrc = getProjectImg(p);
  const [topTitle, subTitle] = splitTitle(p.name);

  return (
    <Section id="work" className="work container second-black-container">
      <Heading headerText="My Work" />

      <Stage
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Arrow aria-label="Previous project" $dir="prev" onClick={prev}>
          <Chevron dir="prev" />
        </Arrow>

        <Panel>
          <PanelInner>
            <TitleGroup>
              <TitleLine1 component="h2">{topTitle}</TitleLine1>
              {subTitle && <TitleLine2 component="h3">{subTitle}</TitleLine2>}
            </TitleGroup>

            <PillsRow>
              {p.pills.map((chip, i) => <Pill key={i}>{chip}</Pill>)}
            </PillsRow>

            <Content>
						<Box sx={{ minWidth: 0 }}>
							<Bullets>
							{p.bullets.map((b, i) => <li key={i}>{b}</li>)}
							</Bullets>

							<Box sx={{ minWidth: 0 }}>
			

			<GoLiveRow>
				<GoLiveLink
				href={p.link || "#"}
				target="_blank"
				rel="noreferrer"
				aria-label={`Open ${p.name} live site`}
				data-disabled={!p.link || p.link === "#" ? "true" : undefined}
				>
				View Project &gt;
				</GoLiveLink>
			</GoLiveRow>

			{p.gitLink && p.gitLink !== "#" && (
				<Box sx={{ mt: 1.25, display: "flex", justifyContent: "center" }}>
				<a href={p.gitLink} target="_blank" rel="noreferrer">
					<CustomButton
					beforeWidth="0%"
					beforeBgColorHover="var(--red-text)"
					hoverColor="black"
					textColor="var(--white-text)"
					/>
				</a>
				</Box>
			)}
			</Box>
              </Box>

              <Shot>
                {imgSrc && <img src={imgSrc} alt={p.name} loading="eager" />}
              </Shot>
            </Content>
          </PanelInner>
        </Panel>

        <Arrow aria-label="Next project" $dir="next" onClick={next}>
          <Chevron dir="next" />
        </Arrow>
      </Stage>
    </Section>
  );
};

export default Work;
