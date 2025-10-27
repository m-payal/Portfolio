// src/components/nav/nav.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import { styled } from "styled-components";
import { motion, useReducedMotion } from "framer-motion";

import LogoImage from "../../assets/images/Logo.png";
import { ReactComponent as GithubIcon } from "../../assets/icons/github.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/icons/linkedin.svg";
import { ReactComponent as MailIcon } from "../../assets/icons/mail.svg";

/* ---------- Styled ---------- */
const IconLink = styled.a.withConfig({ shouldForwardProp: p => p !== "$size" })`
  --icon-size: ${(p) => p.$size || 22}px;
  color: var(--nav-link, #46bbdb);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 10px;
  transition: color 160ms ease, background 160ms ease;

  &:hover { color: var(--nav-link-hover, #14b8a6); background: rgba(125,211,252,0.08); }

  svg { width: var(--icon-size); height: var(--icon-size); display: block; }
  svg [fill]:not([fill='none']) { fill: currentColor; }
  svg [stroke]:not([stroke='none']) { stroke: currentColor; }
`;

const Sytledlinks = styled.ul`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 1280px) {
    position: fixed; inset: 0; z-index: 2001;
    width: 100vw; height: 100vh;
    flex-direction: column; justify-content: center; text-align: center;
    background-color: var(--nav-mobile-bg, #000);
    transform: ${(p) => (p.clicked ? "translateX(0)" : "translateX(-100%)")};
    transition: transform .3s linear;
  }
`;

const SytledlinksItems = styled.a`
  color: var(--nav-link, #ffffff);
  font-family: "Playfair Display", serif;
  font-style: bold;
  font-weight: 700;
  font-size: clamp(1rem, 0.85rem + 0.6vw, 1.375rem);
  letter-spacing: 0.01em;
  text-decoration: none;
  position: relative;
  transition: color 160ms ease;

  &::after {
    content: "";
    position: absolute; left: 0; bottom: -6px;
    height: 2px; width: 100%;
    background: linear-gradient(90deg,#0e5cad 0%,#60a5fa 60%,#0e5cad 100%);
    transform: scaleX(0); transform-origin: left;
    transition: transform 260ms ease;
    border-radius: 2px;
  }
  &:hover { color: var(--nav-link-hover, #14b8a6); }
  &:hover::after { transform: scaleX(1); }

  &[data-active="true"] { color: var(--nav-active, #e6f0ff); }
  &[data-active="true"]::after { transform: scaleX(1); }
`;

const Burger = styled.button`
  display: none;
  @media (max-width: 1280px) {
    display: inline-flex; flex-direction: column; gap: 5px;
    background: transparent; border: 0; padding: 8px; cursor: pointer;
  }
  span {
    width: 24px; height: 2px; border-radius: 2px;
    background: var(--nav-link, #9ccafc);
    transition: transform 200ms ease, opacity 200ms ease;
  }
  &[data-open="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  &[data-open="true"] span:nth-child(2) { opacity: 0; }
  &[data-open="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
`;

/* ---------- Component ---------- */
const Nav = () => {
  const prefersReducedMotion = useReducedMotion();
  const navVariants = {
    hidden: { transform: "translateY(-100%)" },
    visible: {
      transform: "translateY(0%)",
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }
    },
  };

  const [clicked, setClicked] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const observerRef = useRef(null);

  // match existing section IDs in your app
  const links = useMemo(
    () => [
      { id: "home",   label: "Home" },
      { id: "skills", label: "Skills" },
      { id: "exed",   label: "Experience & Education" },
      { id: "work",   label: "Projects" },
      { id: "contact",label: "Contact Me" },
    ],
    []
  );

  /* --- Handlers --- */
  const closeOnEsc = (e) => { if (e.key === "Escape") setClicked(false); };

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // graceful fallback so link still navigates
      window.location.hash = id;
    }
    setClicked(false);
    if (typeof window !== "undefined" && window.history?.replaceState) {
      const url = `${window.location.pathname}${window.location.search}#${id}`;
      window.history.replaceState(null, "", url);
    }
  };

  /* --- Body lock + Esc to close --- */
  useEffect(() => {
    document.body.style.overflow = clicked ? "hidden" : "unset";
    window.addEventListener("keydown", closeOnEsc);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", closeOnEsc);
    };
  }, [clicked]);

  /* --- Active link (IO + scroll-spy fallback) --- */
  useEffect(() => {
    const sectionEls = links.map(l => document.getElementById(l.id)).filter(Boolean);

    if (observerRef.current) observerRef.current.disconnect();
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );
    sectionEls.forEach(el => observer.observe(el));
    observerRef.current = observer;

    // scroll-spy fallback for tall sections/timelines
    const focusY = () => window.innerHeight * 0.35;
    let ticking = false;
    const computeActive = () => {
      const y = focusY();
      let current = activeId;
      for (const el of sectionEls) {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) { current = el.id; break; }
      }
      if (current && current !== activeId) setActiveId(current);
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { computeActive(); ticking = false; });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll(); // run once

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links]);

  /* --- Sync hash on load --- */
  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (hash) setActiveId(hash);
  }, []);

  return (
    <Box
      component={motion.nav}
      variants={navVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      sx={{
        position: "sticky",
        top: 0, left: 0, right: 0,
        zIndex: 2000,
        width: "100%",
        background: "#000",
        borderBottom: "1px solid var(--nav-border, rgba(125,211,252,0.18))",
        boxShadow: "0 2px 14px rgba(3,8,20,0.35)",
        minHeight: { xs: 56, md: 64 },
        overflowX: "clip",
      }}
      role="navigation"
      aria-label="Primary"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: "100%",
          pl: { xs: "var(--gutter)", md: "var(--gutter-lg)" },
          pr: { xs: "var(--gutter)", md: "var(--gutter-lg)" },
        }}
      >
        {/* Left: logo + burger */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <a href="#home" onClick={(e) => handleAnchorClick(e, "home")} aria-label="Go to Home">
            <Box component="img" src={LogoImage} alt="Payal Mehta" sx={{ height: { xs: 56, md: 64 }, display: "block" }} />
          </a>
          <Burger
            aria-label="Toggle menu"
            aria-expanded={clicked}
            aria-controls="primary-menu"
            data-open={clicked}
            onClick={() => setClicked(c => !c)}
          >
            <span></span><span></span><span></span>
          </Burger>
        </Stack>

        {/* Center: links */}
        <Sytledlinks id="primary-menu" clicked={clicked}>
          {links.map(({ id, label }) => (
            <li key={id}>
              <SytledlinksItems
                href={`#${id}`}
                data-active={activeId === id}
                aria-current={activeId === id ? "page" : undefined}
                onClick={(e) => handleAnchorClick(e, id)}
              >
                {label}
              </SytledlinksItems>
            </li>
          ))}
        </Sytledlinks>

        {/* Right: socials */}
        <Stack direction="row" spacing={2} alignItems="center">
          <IconLink $size={30} href="https://github.com/m-payal" target="_blank" rel="noopener noreferrer" aria-label="Open GitHub">
            <GithubIcon />
          </IconLink>
          <IconLink $size={30} href="https://www.linkedin.com/in/payal-mehta18" target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn">
            <LinkedinIcon />
          </IconLink>
          <IconLink $size={30} href="mailto:mehta.payal2000@gmail.com" aria-label="Send Email">
            <MailIcon />
          </IconLink>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Nav;
