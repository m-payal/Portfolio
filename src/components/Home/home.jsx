// src/components/Home/Home.jsx
import React from 'react';
import { Box, Stack, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';

import PersonalImage from '../../assets/images/Personal_Image.jpeg';
import CustomButton from '../../utils/customButton';
import CV from '../../assets/CV/Payal_Resume.pdf';
import openIcon from '../../assets/icons/open.png';

/* ---------- motion helpers (slowed + longer presence) ---------- */
const STAGGER_CHILD = 0.14;  // was 0.08
const STAGGER_DELAY = 0.9;   // was 0.55

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER_CHILD, delayChildren: STAGGER_DELAY } },
};

const rolesOnce = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.35, delayChildren: 0.7 } },
};

const bounceLoop = (delay = 0) => ({
  visible: {
    y: [0, -8, 0],   // only vertical movement
    transition: {
      duration: 2,   // slow bounce
      delay,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
});

const sepOnce = (delay = 0) => ({
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay } },
});

const fadeUp = (delay = 0.5) => ({
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, type: 'spring', delay },
  },
});

const imageVar = {
  hidden:  { opacity: 0, scale: 0.96, rotate: -2 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1.2, type: 'spring', delay: 0.8 } },
};

/* ---------- tiny helpers ---------- */
const gradientText = {
  background: 'linear-gradient(90deg, #2dd4bf 0%, #60a5fa 50%, #facc15 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const tagData = [
  { label: 'AI that adapts',                     icon: '✨', from: '#34d399', to: '#22d3ee' },
  { label: 'Dashboards that explain themselves', icon: '📊', from: '#60a5fa', to: '#a78bfa' },
  { label: 'Effortless UIs',                     icon: '🎛️', from: '#f472b6', to: '#f59e0b' },
  { label: 'Workflows that think ahead',         icon: '⚙️', from: '#22d3ee', to: '#38bdf8' },
  { label: 'Data that tells a story',            icon: '📈', from: '#f59e0b', to: '#f43f5e' },
];

const FancyTag = ({ icon, label, from, to, i = 0 }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.12 * i }} // slower stagger for tags
    whileHover={{ y: -2, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 1,
      px: 1.6,
      py: 0.8,
      borderRadius: 999,
      fontWeight: 800,
      fontSize: { xs: 13, md: 14 },
      color: '#EAF2FF',
      backgroundImage: `linear-gradient(rgba(13,23,42,.75), rgba(13,23,42,.75)), linear-gradient(90deg, ${from}, ${to})`,
      backgroundClip: 'padding-box, border-box',
      border: '2px solid transparent',
      boxShadow: '0 10px 30px rgba(0,0,0,.35)',
      backdropFilter: 'blur(3px)',
      cursor: 'default',
      whiteSpace: 'nowrap',
    }}
  >
    <span aria-hidden style={{ fontSize: 16, lineHeight: 1 }}>{icon}</span>
    {label}
  </Box>
);


const Home = () => {
  return (
    <Box id="home" component="section" className="home container black-container" sx={{ width: '100%' }}>
      <Box
        sx={{
          minHeight: { xs: 'calc(100vh - var(--nav-h-xs))', md: 'calc(100vh - var(--nav-h-md))' },
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'stretch', md: 'flex-start' }}
          spacing={{ xs: 6, md: 5 }}
          sx={{ width: '100%' }}
        >
          {/* ================= LEFT : hero text ================= */}
          <Box
            component={motion.div}
            variants={stagger}
            initial="hidden"
            animate="visible"
            sx={{ flex: { md: '0 0 58%' } }}
          >
            {/* overline */}
            <Typography
              component={motion.p}
              variants={fadeUp()}
              sx={{
                color: '#7DD3FC',
                mb: 1,
                letterSpacing: 1,
                fontSize: { xs: 12, md: 13 },
                fontFamily: '"Sora", system-ui',
                textTransform: 'uppercase',
              }}
            >
              Hi there, my name is
            </Typography>

            {/* name */}
            <Typography
              component="h1"
              variants={fadeUp(0.06)}
              className="white-text"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 800,
                fontSize: { xs: '3rem', sm: '3.4rem', md: '4rem' },
                lineHeight: 1.05,
                mb: 1.25,
              }}
            >
              Payal Mehta
            </Typography>

            {/* role chips */}
            <Typography
              component={motion.p}
              variants={fadeUp(0.18)}
              variant="body1"
              sx={{ fontSize: { xs: 14, md: 16 }, color: 'rgba(255,255,255,0.9)', mb: 3, fontWeight: 800 }}
            >
             <motion.span
                style={{ display: 'inline-flex', alignItems: 'baseline', flexWrap: 'wrap' }}
              >
                <motion.span
                  variants={bounceLoop(0)}
                  initial="hidden"
                  animate="visible"
                  style={{ display: 'inline-block', color: '#7CFC00' }}
                >
                  Software Developer
                </motion.span>

                <span style={{ margin: '0 10px', color: 'rgba(255,255,255,0.85)' }}>•</span>

                <motion.span
                  variants={bounceLoop(0.7)}
                  initial="hidden"
                  animate="visible"
                  style={{ display: 'inline-block', color: '#7DD3FC' }}
                >
                  UX Designer
                </motion.span>

                <span style={{ margin: '0 10px', color: 'rgba(255,255,255,0.85)' }}>•</span>

                <motion.span
                  variants={bounceLoop(1.4)}
                  initial="hidden"
                  animate="visible"
                  style={{ display: 'inline-block', color: '#FACC15' }}
                >
                  Data Analyst
                </motion.span>
              </motion.span>
            </Typography>

            {/* lead line */}
            <Typography
              component={motion.blockquote}
              variants={fadeUp(0.18)}
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
                fontSize: { xs: 20, md: 24 },
                lineHeight: 1.4,
                color: 'rgba(255,255,255,0.95)',
                mb: 1.5,
                pl: 2,
                borderLeft: '4px solid rgba(45,212,191,0.6)',
                textWrap: 'balance',
              }}
            >
              Turning ideas into things people actually use—AI that adapts, dashboards that explain themselves, and flows that move fast without breaking.
            </Typography>

            {/* support line */}
            <Typography
              component={motion.p}
              variants={fadeUp(0.24)}
              sx={{
                fontFamily: '"Inter", system-ui',
                fontSize: { xs: 15, md: 16 },
                color: 'rgba(222,244,255,0.9)',
                mb: 2.5,
              }}
            >
              Work sits where <Box component="span" sx={{ fontWeight: 800, color: '#93c5fd' }}>logic</Box> meets{' '}
              <Box component="span" sx={{ fontWeight: 800, color: '#facc15' }}>design</Box>: clean code paired with clever UX.
            </Typography>

            {/* expressive chips */}
            <Stack
              component={motion.div}
              variants={fadeUp(0.3)}
              direction="row"
              sx={{ flexWrap: 'wrap', gap: 1.2, mb: 3.5 }}
            >
              {tagData.map((t, i) => (
                <FancyTag key={t.label} {...t} i={i} />
              ))}
            </Stack>

            {/* CTA */}
            <motion.a
              variants={fadeUp(0.36)}
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: 'fit-content', textDecoration: 'none', display: 'inline-block' }}
            >
              <CustomButton
                startFilled
                beforeBgColorHover="#BAF7E7"
                textColor="#F5897D"
                hoverColor="#0b1220"
                content={
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      fontFamily: '"Playfair Display", serif',
                      fontStyle: 'italic',
                    }}
                  >
                    View my Resume
                    <img src={openIcon} alt="" aria-hidden="true" style={{ width: 22, height: 22, display: 'block' }} />
                  </span>
                }
              />
            </motion.a>
          </Box>

          {/* ================= Divider ================= */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: '2px',
              alignSelf: 'stretch',
              bgcolor: 'rgba(255,255,255,0.18)',
              mx: 2,
              borderRadius: 1,
            }}
          />

          {/* ================= RIGHT : photo + hobbies ================= */}
          <Stack spacing={3} sx={{ flex: { md: '1 1 auto' }, alignItems: 'center', textAlign: 'center' }}>
            {/* Profile image with continuous float */}
            <Box
              component={motion.div}
              variants={imageVar}
              initial="hidden"
              animate={{ ...imageVar.visible, y: [0, -6, 0] }}
              transition={{
                ...imageVar.visible.transition,
                duration: 6,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.01 }}
              sx={{
                width: { xs: 260, sm: 300, md: 340 },
                height: { xs: 260, sm: 300, md: 340 },
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid rgba(125,211,252,0.35)',
                boxShadow: '0 18px 36px rgba(0,0,0,0.45)',
              }}
            >
              <Box
                component="img"
                src={PersonalImage}
                alt="Payal Mehta"
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  objectPosition: 'center 30%',
                }}
              />
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography
                component={motion.div}
                variants={fadeUp(0.15)}
                initial="hidden"
                animate="visible"
                sx={{
                  fontSize: { xs: 22, md: 26 },
                  color: '#FACC15',
                  fontWeight: 800,
                  fontStyle: 'italic',
                  mb: 1,
                  textShadow: '0 2px 14px rgba(0,0,0,0.35)',
                }}
              >
                My Hobbies:
              </Typography>

              <Typography
                component={motion.div}
                variants={fadeUp(0.22)}
                initial="hidden"
                animate="visible"
                variant="h5"
                sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, letterSpacing: 0.3, mb: 1.25 }}
              >
                Dancing, Drawing, Travelling
              </Typography>

              <Box
                component={motion.a}
                variants={fadeUp(0.28)}
                initial="hidden"
                animate="visible"
                href="/paintings"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontWeight: 700,
                  color: '#93c5fd',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  cursor: 'pointer',
                  '&:hover': { color: '#38bdf8' },
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
    </Box>
  );
};

export default Home;
