// src/components/nav/nav.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';

import LogoImage from '../../assets/images/Logo.png';
import { ReactComponent as GithubIcon } from '../../assets/icons/github.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/mail.svg';

/* --- Styled helpers --- */

const IconLink = styled.a.withConfig({
  shouldForwardProp: (prop) => prop !== '$size',
})`
  --icon-size: ${(p) => p.$size || 22}px;

  color: var(--nav-link, #9ccafc);
  display: inline-flex;
  align-items: center;
  padding: 6px;
  border-radius: 10px;
  transition: color 160ms ease, background 160ms ease;

  &:hover {
    color: var(--nav-link-hover, #14b8a6);
    background: rgba(125, 211, 252, 0.08);
  }

  svg { width: var(--icon-size); height: var(--icon-size); display: block; }
  svg [fill]:not([fill='none']) { fill: currentColor; }
  svg [stroke]:not([stroke='none']) { stroke: currentColor; }
`;

const Sytledlinks = styled.ul`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  list-style: none; padding: 0; margin: 0;
  > li { list-style: none; } > li::marker { content: none; }

  @media (max-width: 1280px) {
    position: absolute; left: 0; top: 0;
    width: 100%; height: 100vh; z-index: 2;
    flex-direction: column; justify-content: center; text-align: center;
    background-color: var(--nav-mobile-bg, #000);
    transform: ${(p) => (p.clicked ? 'translateX(0)' : 'translateX(-100%)')};
    transition: all 0.3s linear;
  }
`;

const SytledlinksItems = styled.a`
  color: var(--nav-link, #9ccafc);
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans';
  font-weight: 650;
  font-size: clamp(1rem, 0.85rem + 0.6vw, 1.375rem);
  letter-spacing: 0.01em;
  text-decoration: none; position: relative; transition: color 160ms ease;

  &::after {
    content: ''; position: absolute; left: 0; bottom: -6px;
    width: 100%; height: 2px; background: var(--nav-underline, #14b8a6);
    transform: scaleX(0); transform-origin: left; transition: transform 220ms ease;
  }
  &:hover { color: var(--nav-link-hover, #14b8a6); }
  &:hover::after { transform: scaleX(1); }
  &[data-active='true'] { color: var(--nav-active, #e6f0ff); }
  &[data-active='true']::after { transform: scaleX(1); }
`;

const Burger = styled.button`
  display: none;
  @media (max-width: 1280px) {
    display: inline-flex;
    flex-direction: column;
    gap: 5px;
    background: transparent;
    border: 0;
    padding: 8px;
    cursor: pointer;
  }
  span {
    width: 24px; height: 2px; border-radius: 2px;
    background: var(--nav-link, #9ccafc);
    transition: transform 200ms ease, opacity 200ms ease;
  }
  &[data-open='true'] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  &[data-open='true'] span:nth-child(2) { opacity: 0; }
  &[data-open='true'] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
`;

const navVariants = {
  hidden: { transform: 'translateY(-100%)' },
  visible: { transform: 'translateY(0%)', transition: { duration: 0.8, delay: 0.2 } },
};

/* --- Component --- */

const Nav = () => {
  const [clicked, setClicked] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const observerRef = useRef(null);

  const links = useMemo(
    () => [
      { id: 'home',     label: 'Home' },
      { id: 'skills',   label: 'Skills' },
      { id: 'exed',     label: 'Experience & Education' },
      { id: 'work', label: 'Projects' },
      { id: 'contact',  label: 'Contact Me' },
    ],
    []
  );

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setClicked(false);
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      const url = `${window.location.pathname}${window.location.search}#${id}`;
      window.history.replaceState(null, '', url);
    }
  };

  useEffect(() => {
    document.body.style.overflow = clicked ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [clicked]);

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (observerRef.current) observerRef.current.disconnect();
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: null, rootMargin: '0px 0px -50% 0px', threshold: [0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((sec) => observer.observe(sec));
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [links]);

  return (
    <Box
      component={motion.nav}
      variants={navVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="navContainer"
      sx={{
        background: '#000',
        borderBottom: '1px solid var(--nav-border, rgba(125,211,252,0.18))',
        position: 'sticky',
        top: 0, left: 0, right: 0,
        width: '100%',
        zIndex: 2000,
        boxShadow: '0 2px 14px rgba(3, 8, 20, 0.35)',
        minHeight: { xs: 68, md: 84 },
        fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', px: 0 }}>
        {/* Left: logo + hamburger */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ pl: { xs: 1, md: 1.5 } }}>
          <a href="#home" onClick={(e) => handleAnchorClick(e, 'home')} aria-label="Go to Home">
            <Box component="img" src={LogoImage} alt="Payal Mehta"
                 sx={{ height: { xs: 86, md: 86 }, display: 'block' }} />
          </a>
          <Burger aria-label="Toggle menu" data-open={clicked} onClick={() => setClicked((c) => !c)}>
            <span></span><span></span><span></span>
          </Burger>
        </Stack>

        {/* Center: links */}
        <Sytledlinks clicked={clicked}>
          {links.map(({ id, label }) => (
            <li key={id}>
              <SytledlinksItems
                href={`#${id}`}
                data-active={activeId === id}
                onClick={(e) => handleAnchorClick(e, id)}
              >
                {label}
              </SytledlinksItems>
            </li>
          ))}
        </Sytledlinks>

        {/* Right: socials */}
        <Stack direction="row" spacing={2} sx={{ pr: { xs: 4, md: 4 } }}>
          <IconLink $size={32}
            href="https://github.com/m-payal"
            target="_blank" rel="noopener noreferrer" aria-label="Open GitHub">
            <GithubIcon />
          </IconLink>

          <IconLink $size={32}
            href="https://www.linkedin.com/in/payal-mehta18"
            target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn">
            <LinkedinIcon />
          </IconLink>

          <IconLink $size={32}
            href="mailto:mehta.payal2000@gmail.com"
            aria-label="Send Email">
            <MailIcon />
          </IconLink>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Nav;
