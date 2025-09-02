// src/components/full/FullPage.jsx
import React from "react";
import { Box } from "@mui/material";
import Home from "../Home/home";
import Services from "../services/services";
import Exed from "../exed/exed";
import Work from "../work/work";
import ContactForm from "../contact/contact";
import Footer from "../footer/footer";

const FullPage = () => {
  return (
    <Box className="fullcontainer">
      <Home />
      <Services />
      <Exed />
      <Work />

      {/* Contact section */}
      <Box id="contact" sx={{ scrollMarginTop: "100px", my: { xs: 4, md: 6 } }}>
        <ContactForm recipientEmail="mehta.payal2000@gmail.com" />
      </Box>

      <Footer />
    </Box>
  );
};

export default FullPage;
