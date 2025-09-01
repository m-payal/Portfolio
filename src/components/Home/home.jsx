// src/components/Home/Home.jsx
import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import PersonalImage from '../../assets/images/Personal_Image.jpeg';
import CustomButton from '../../utils/customButton';
import CV from '../../assets/CV/Payal_Resume.pdf';
import openIcon from '../../assets/icons/open.png';

/* ---------- motion helpers ---------- */
const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.55 },
  },
};

// container to stagger the three chips
// container to stagger the three chips
const rolesOnce = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
  },
};

// one-time bounce for each role
const bounceOnce = (delay = 0) => ({
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: [10, -6, 0],
    transition: {
      duration: 5,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

// separators (•) fade/slide in once
const sepOnce = (delay = 5) => ({
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay },
  },
});
const fadeUp = (delay = 0.5) => ({
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, type: 'spring', delay },
  },
});
const imageVar = {
  hidden: { opacity: 0, scale: 0.96, rotate: -2 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1, type: 'spring', delay: 1 },
  },
};

const Home = () => {
  return (
    <Box id="home" sx={{ background: 'var(--home-background)', width: '100%' }}>
      <Box
        sx={{
          maxWidth: 1220,
          mx: 'auto',
          px: { xs: 2, md: 6 },
          // full page minus sticky navbar (~84px)
          minHeight: 'calc(100vh - 84px)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'stretch', md: 'flex-start' }}
          spacing={{ xs: 6, md: 5 }}
          sx={{ width: '100%' }}
        >
          {/* -------- LEFT: animated text (no box) -------- */}
          <Box component={motion.div} variants={stagger} initial="hidden" animate="visible" sx={{ flex: { md: '0 0 58%' } }}>
            <Typography component={motion.p} variants={fadeUp()} variant="body2" sx={{ color: '#7DD3FC', mb: 1.5 }}>
              Hi there, my name is
            </Typography>

            {/* name with word-by-word entrance */}
            <Typography
              component="h1"
              className="white-text"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.6rem', sm: '3.2rem', md: '3.8rem' },
                lineHeight: 1.1,
                mb: 1.25,
                color: '#2dd4bf',
              }}
            >
              <Box component={motion.span} variants={fadeUp(0.05)} sx={{ display: 'inline-block', mr: 1 }}>
                Payal
              </Box>
              <Box component={motion.span} variants={fadeUp(0.12)} sx={{ display: 'inline-block' }}>
                Mehta
              </Box>
            </Typography>

            {/* roles (bold + different colors) */}
            <Typography
              component={motion.p}
              variants={fadeUp(0.18)}
              variant="body1"
              sx={{ fontSize: { xs: 14, md: 16 }, color: 'rgba(255,255,255,0.9)', mb: 3, fontWeight: 800 }}
            >
              <motion.span
                variants={rolesOnce}
                initial="hidden"
                animate="visible"
                style={{ display: 'inline-flex', alignItems: 'baseline', flexWrap: 'wrap' }}
              >
                <motion.span variants={bounceOnce(0)} style={{ display: 'inline-block', color: '#7CFC00' }}>
                  Software Developer
                </motion.span>

                <motion.span variants={sepOnce(0.2)} style={{ margin: '0 10px', color: 'rgba(255,255,255,0.85)' }}>
                  •
                </motion.span>

                <motion.span variants={bounceOnce(0.5)} style={{ display: 'inline-block', color: '#7DD3FC' }}>
                  UX Designer
                </motion.span>

                <motion.span variants={sepOnce(0.5)} style={{ margin: '0 10px', color: 'rgba(255,255,255,0.85)' }}>
                  •
                </motion.span>

                <motion.span variants={bounceOnce(0.7)} style={{ display: 'inline-block', color: '#FACC15' }}>
                  Data Analyst
                </motion.span>
              </motion.span>
            </Typography>


            {/* about copy */}
            <Stack spacing={2.25} sx={{ color: 'rgba(255,255,255,0.85)', fontSize: { xs: 15, md: 16 }, mb: 3.5 }}>
              <Typography component={motion.p} variants={fadeUp(0.22)}>
			  I turn ideas into things people actually want to use: AI tools that adapt, dashboards that explain themselves, and systems that move fast without breaking. My work lives somewhere between logic and design, where clean code meets clever UX.
              </Typography>
              <Typography component={motion.p} variants={fadeUp(0.26)}>
			  You’ll see a bit of everything here, APIs that talk, UIs that feel effortless, workflows that think ahead, and data that tells a story. This portfolio isn’t just a showcase, it’s a sandbox full of lessons, experiments, and wins I’m proud of.
              </Typography>
              <Typography component={motion.p} variants={fadeUp(0.3)}>
              </Typography>
            </Stack>

            {/* Resume button opens new tab */}
            <motion.a
              variants={fadeUp(0.34)}
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: 'fit-content', textDecoration: 'none', display: 'inline-block' }}
            >
              <CustomButton
                beforeWidth="100%"
                beforeBgColorHover="#A7F3D0"
                hoverColor="#0b1220"
                textColor="black"
                content={
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <img src={openIcon} alt="" aria-hidden="true" style={{ width: 22, height: 22, display: 'block' }} />
                    View my Resume
                  </span>
                }
              />
            </motion.a>
          </Box>

          {/* thin vertical divider */}
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

          {/* -------- RIGHT: animated photo + hobbies -------- */}
          <Stack spacing={3} sx={{ flex: { md: '1 1 auto' }, alignItems: 'center', textAlign: 'center' }}>
            <Box
              component={motion.div}
              variants={imageVar}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -3 }}
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

              {/* Underlined text link (no box) */}
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
                whileHover={{ x: 2 }}
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
