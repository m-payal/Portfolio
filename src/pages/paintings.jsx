// src/pages/Paintings.jsx
import React, { useMemo } from "react";
import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

/* ---------- load all images from src/assets/paintings (CRA/Webpack) ---------- */
function importAll(r) {
  return r
    .keys()
    .sort()
    .map((key) => ({ src: r(key), file: key.replace("./", "") }));
}
const usePaintingImages = () =>
  useMemo(
    () =>
      importAll(
        require.context("../assets/paintings", false, /\.(png|jpe?g|webp|svg)$/i)
      ),
    []
  );

/* ---------- your descriptions (what each piece depicts) ---------- */
/* Use the exact filename as the key. Add/edit freely. */
const CAPTIONS = {
  "IMG_6705.jpg": "Blue mandala about calm balance and inward focus.",
  // "chai-is-love.jpg": "Ink illustration celebrating small rituals—tea, warmth, pause.",
  // "bookmark-flowers.jpg": "Hand-painted bookmark with floral dotwork on MDF.",
};

/* fallback if you haven't added a caption yet */
const DEFAULT_SUB = "Acrylic • Dotwork";

export default function Paintings() {
  const images = usePaintingImages();

  return (
    <Box sx={{ minHeight: "100vh", background: "var(--home-background)" }}>
      <Container sx={{ pt: 0, pb: { xs: 5, md: 7 } }}>
        {/* Back to Home */}
        <Box sx={{ mb: 2 }}>
          <Button
            component={RouterLink}
            to="/"
            startIcon={<ArrowBackIosNewIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              color: "#93c5fd",
              border: "1px solid rgba(147,197,253,.35)",
              "&:hover": {
                borderColor: "rgba(147,197,253,.7)",
                background: "rgba(147,197,253,.08)",
              },
            }}
            aria-label="Back to Home"
          >
            Back to Home
          </Button>
        </Box>

        {/* Title + intro */}
        <Stack
          alignItems="center"
          textAlign="center"
          spacing={1.5}
          sx={{ mb: { xs: 5, md: 7 } }}
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 900,
              fontSize: { xs: 30, md: 44 },
              color: "#A7F3D0",
            }}
          >
            Paintings
          </Typography>

          <Typography
            sx={{
              maxWidth: 900,
              color: "rgba(255,255,255,0.9)",
              fontSize: { xs: 15, md: 17 },
              lineHeight: 1.75,
            }}
          >
            I paint mandalas: layered geometric patterns that grow from a single
            center using radial symmetry, repeating arcs, and dot work. Every piece
            starts with a calm breath and a tiny mark.
          </Typography>
        </Stack>

        {/* Masonry grid with hover-only overlays */}
        {images.length === 0 ? (
          <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
            No paintings found. Add images to <code>src/assets/paintings/</code>.
          </Typography>
        ) : (
          <ImageList
            variant="masonry"
            cols={3}
            gap={16}
            sx={{
              m: 0,
              "@media (max-width:900px)": { columnCount: "2 !important" },
              "@media (max-width:600px)": { columnCount: "1 !important" },
            }}
          >
            {images.map((img) => {
              const desc = CAPTIONS[img.file] || "";
              return (
                <ImageListItem key={img.src} sx={{ listStyle: "none" }}>
                  {/* card wrapper */}
                  <Box
                    tabIndex={0}
                    component={motion.div}
                    whileHover={{ y: -2 }}
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 24,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                      outline: "none",
                      // show overlay on hover OR keyboard focus
                      "&:hover .overlay, &:focus-within .overlay": {
                        opacity: 1,
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    {/* image */}
                    <Box
                      component="img"
                      src={img.src}
                      alt=""
                      loading="lazy"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />

                    {/* overlay (hidden by default) */}
                    <Box
                      className="overlay"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "flex-end",
                        p: { xs: 2, md: 3 },
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.75) 100%)",
                        opacity: 0,
                        transform: "translateY(8px)",
                        transition: "opacity .18s ease, transform .18s ease",
                      }}
                    >
                      <Box>
                        {/* Only your description; no filename or generic IMG label */}
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: { xs: 16, md: 18 },
                            lineHeight: 1.4,
                            mb: desc ? 0.5 : 0,
                          }}
                        >
                          {desc || DEFAULT_SUB}
                        </Typography>
                        {desc && (
                          <Typography
                            sx={{
                              color: "rgba(255,255,255,0.9)",
                              fontSize: { xs: 12.5, md: 14 },
                              opacity: 0.9,
                            }}
                          >
                            {DEFAULT_SUB}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </ImageListItem>
              );
            })}
          </ImageList>
        )}
      </Container>
    </Box>
  );
}
