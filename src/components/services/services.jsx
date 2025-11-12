// src/components/services/services.jsx
import React, { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import Heading from "../../utils/heading";
import { data as servicesData } from "../../data/servicesData";


/* ---------------------------------- constants ---------------------------------- */
const CARD_RADIUS = "25px";
const GRID_GAP_Y = 30;
const GRID_GAP_X = 30;

// one visible row of 3 items
const COLS = 4;
const ROWS = 1;
const PER_PAGE = COLS * ROWS;

/* ------------------------------------- UI ------------------------------------- */
const Section = styled(Box)`
  --nav-h: 0px;
  --gy: ${GRID_GAP_Y}px;
  --gx: ${GRID_GAP_X}px;

  max-width: 90%;
  margin: 0 auto;
  padding: 8px 16px 56px;

  min-height: calc(100svh - var(--nav-h));
  display: flex;
  flex-direction: column;
  scroll-margin-top: var(--nav-h);
`;

const HeaderWrap = styled(Box)`
  margin: 4px 10px 16px; 
  line-height: 1;
  && h1, && h2, && h3 { margin: 0; }
`;

const Grid = styled(Box)`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  gap: var(--gy) var(--gx);
  align-content: start;
  margin-top: clamp(20px, 3vw, 30px);

  & > *:nth-child(n + 4) { margin-top: 5px; }

  @media (max-width: 1200px) { grid-template-columns: repeat(2, minmax(280px, 1fr)); }
  @media (max-width: 700px)  { grid-template-columns: 1fr; }
`;

const Block = styled(Box)`
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 20px;
`;


/* ------------------------------- flip card shell ------------------------------- */
const CardShell = styled(Box)`
  perspective: 1200px;
  transform-style: preserve-3d;
  height: 100%;
  cursor: pointer;
`;

const Clip = styled(Box)`
  position: relative;
  min-height: 300px; /* room for one row + labels + arrows */
  border-radius: ${CARD_RADIUS};
  overflow: hidden;
  box-shadow: 0 26px 54px rgba(0,0,0,.30);
  border: 1px solid rgba(255,255,255,.08);
  isolation: isolate;
`;

const Flipper = styled(Box)`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transition: transform .6s cubic-bezier(.2,.8,.2,1);
  will-change: transform;
  &[data-flipped="true"] { transform: rotateY(180deg) translateZ(0); }
`;

const Face = styled(Box)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

const Front = styled(Face)`
  transform: rotateY(0deg);
  background:
    linear-gradient(0deg, rgba(255,255,255,.06), rgba(255,255,255,.06)),
    ${(p) => p.$bg};
  color: #0b0b0b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* keeps items at top, not centered vertically */
  text-align: center;
  padding: 24px 20px 32px; /* less vertical padding */
  gap: 10px;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 8px;
  }

  .header img {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }

  .title {
    font-weight: 800;
    font-size: clamp(22px, 2.6vw, 28px);
    font-family: "Times New Roman", Times, serif;
    color: #0b0b0b;
  }

  .body {
    max-width: 700px;
    text-align: center;
    font-size: clamp(16px, 2vw, 22px);
    line-height: 1.4; /* tighter */
    font-family: "Times New Roman", Times, serif;
    color: #1f1780;
  }

  .cta {
  position: relative;
  text-align: center;
  font-family: "Times New Roman", Times, serif;
  font-style: italic;
  font-size: 20px;
  font-weight: 500;
  color: black;
  margin-top: 24px;
  width: 100%;
}
`;




/* ----------------------------- Back (tools carousel) -------------------------- */
const Back = styled(Face)`
  /* tighter spacing to bring arrows nearer to the corners */
  --padY: clamp(18px, 2.2vw, 26px);
  --sidePad: 6px;                          /* was 12px */
  --gutter: clamp(28px, 4vw, 48px);        /* was clamp(56px, 7vw, 84px) */
  --arrowSize: clamp(24px, 3.4vw, 34px);

  transform: rotateY(180deg);
  background: #DFDAF7;
  color: #141820;

  display: grid;
  grid-template-rows: auto 1fr;            /* title row, icons row */
  grid-template-columns: var(--gutter) 1fr var(--gutter);
  row-gap: clamp(12px, 1.6vw, 18px);
  align-items: center;
  padding: var(--padY) var(--sidePad);
`;


const ToolsTitle = styled(Typography)`
  && {
    grid-row: 1;
    grid-column: 1 / 4;
    text-align: center;

    font-family: "Fredoka", "Baloo 2", "Comic Neue", system-ui, sans-serif !important;
    font-weight: 800 !important;
    font-size: clamp(28px, 4.2vw, 45px) !important;
    line-height: 1.1;
    letter-spacing: 0.8px;
    color: #1f1780;
    text-shadow: 0 2px 0 rgba(0,0,0,0.05);
    margin: 4px 0 22px;
  }
`;

/* === THIS is the important part: exactly 4 equal columns that always fit === */
const ToolsRow = styled(Box)`
  --chip: clamp(56px, 8vw, 92px);             /* icon circle size           */
  --gap:  clamp(22px, 4vw, 44px);             /* space between tiles        */

  grid-row: 2;
  grid-column: 2;

  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: var(--gap);
  justify-items: center;
  align-items: start;
`;

const Tile = styled(motion.button)`
  all: unset;
  width: 100%;
  max-width: 180px;
  font-family: "Times New Roman", Times, serif;
  display: grid;
  grid-template-rows: var(--chip) auto;
  gap: 10px;
  justify-items: center;
  text-align: center;

  .icon {
    width: var(--chip);
    height: var(--chip);
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: rgba(255,255,255,.78);
    box-shadow: 0 10px 26px rgba(0,0,0,.22);
    overflow: hidden;
  }
  img, svg { width: 82%; height: 82%; object-fit: contain; display: block; }

  .label {
    font-weight: 800;
    font-family: "Times New Roman", Times, serif;
    font-size: clamp(13px, 1.4vw, 18px);
    color: #141820;
    line-height: 1.15;
    text-wrap: balance;
    overflow-wrap: break-word;
  }
`;

function ToolTile({ label, icon, onAnyClick }) {
  return (
    <Tile
      initial={false}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onMouseDown={onAnyClick}
      onTouchStart={onAnyClick}
      onClick={onAnyClick}
      aria-label={label}
    >
      <span className="icon">{typeof icon === "string" ? <img src={icon} alt="" /> : icon}</span>
      <span className="label">{label}</span>
    </Tile>
  );
}

/* transparent arrows, centered in gutters, equal spacing to edge & icons */
const ArrowBtn = styled.button`
  grid-column: ${(p) => (p.$dir === "prev" ? 1 : 3)};
  justify-self: center;
  align-self: center;

  width: var(--arrowSize);
  height: var(--arrowSize);
  padding: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
  display: grid;
  place-items: center;

  color: #000; /* <-- make arrows black */

  cursor: pointer;
  svg { filter: none; } /* optional: remove glow so solid black */
  &:hover { transform: scale(1.06); }
`;


function Chevron({ dir = "next", size = 22 }) {
  const rotate = dir === "prev" ? "rotate(180deg)" : "none";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: rotate }} fill="none" aria-hidden>
      <path d="M8 4l8 8-8 8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------------------------- helpers --------------------------------- */
const swallow = (e) => { e.preventDefault(); e.stopPropagation(); };
const chunk = (arr, size) => { const out=[]; for (let i=0;i<arr.length;i+=size) out.push(arr.slice(i,i+size)); return out; };

/* --------------------------------- component -------------------------------- */
const FlipCard = ({ item, i }) => {
  const [flipped, setFlipped] = useState(false);
  const [page, setPage] = useState(0);

  const normalized = useMemo(
    () =>
      (item.tools || []).map((t) =>
        typeof t === "string" ? { label: t, icon: null } : { label: t.label, icon: t.icon }
      ),
    [item.tools]
  );

  const pages = useMemo(() => chunk(normalized, PER_PAGE), [normalized]);
  const pageItems = pages[page] ?? [];

  return (
    <Block
      as={motion.div}
      initial={{ y: 18, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: 0.06 * i, duration: 0.45 }}
    >

      <CardShell
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        aria-label={`${item.name} card`}
        role="button"
      >
        <Clip>
          <Flipper data-flipped={flipped}>
            {/* FRONT */}
            <Front $bg={item.frontBg}>
              <Box className="header">
                <img src={item.image} alt={`${item.name} image`} />
                <Typography className="title">{item.name}</Typography>
              </Box>

              <Typography className="body">
                {item.front}
              </Typography>

              <Typography variant="body2" className="cta">Tools I Use →</Typography>
            </Front>


            {/* BACK */}
            <Back>
			<ToolsTitle component="h4">Tech Stack</ToolsTitle>

				<ToolsRow onMouseDown={swallow} onTouchStart={swallow} onClick={swallow}>
					{pageItems.map((t, idx) => (
					<ToolTile
						key={`${t.label}-${idx}`}
						label={t.label}
						icon={t.icon}
						onAnyClick={swallow}
					/>
					))}
				</ToolsRow>

				{/* centered arrows in gutters; do not flip card */}
				<ArrowBtn
					$dir="prev"
					aria-label="Previous tools"
					onMouseDown={swallow}
					onTouchStart={swallow}
					onClick={(e) => { swallow(e); setPage(p => (p - 1 + pages.length) % pages.length); }}
				>
					<Chevron dir="prev" />
				</ArrowBtn>

				<ArrowBtn
					$dir="next"
					aria-label="Next tools"
					onMouseDown={swallow}
					onTouchStart={swallow}
					onClick={(e) => { swallow(e); setPage(p => (p + 1) % pages.length); }}
				>
					<Chevron dir="next" />
				</ArrowBtn>
				</Back>
          </Flipper>
        </Clip>
      </CardShell>
    </Block>
  );
};

const SkillsHeading = styled(Heading)`
  && { margin: 0 0 12px !important; }
`;

const Services = () => (
  <Section id="skills" className="about container second-black-container">
    <HeaderWrap>
      <SkillsHeading id="skills" headerText="My Skills" />
    </HeaderWrap>

    <Grid>
      {servicesData.map((item, i) => (
        <FlipCard key={item.id} item={item} i={i} />
      ))}
    </Grid>
  </Section>
);

export default Services;