// src/components/contact/ContactForm.jsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "styled-components";

const Wrap = styled(Box)`
  --card-radius: 26px;
  max-width: 980px;
  margin: 0 auto;
  border-radius: var(--card-radius);
  background: #0b1220;
  padding: clamp(14px, 2.4vw, 22px);
  box-shadow: 0 26px 64px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.04);
`;

const Panel = styled(Box)`
  border-radius: calc(var(--card-radius) - 6px);
  background: #fab9ca;            /* teal panel */
  padding: clamp(18px, 2.8vw, 30px);
`;

const Title = styled(Typography)`
  font-family: "Playfair Display","Merriweather",serif !important;
  font-weight: 800 !important;
  color: #000 !important;          /* black */
  text-align: center;
  font-size: clamp(22px, 3.4vw, 42px) !important;
  line-height: 1.05;
  margin-bottom: 6px !important;
`;

const Sub = styled(Typography)`
  text-align: center;
  color: #000 !important;          /* black */
  opacity: .85;
  margin-bottom: clamp(12px, 1.6vw, 18px) !important;
`;

const Counter = styled(Typography)`
  font-size: 12px !important;
  color: rgba(0,0,0,.65) !important;  /* black-ish */
  text-align: right;
  margin-top: 6px !important;
`;

const SendBtn = styled(Button)`
  && {
    min-width: 120px;
    border-radius: 999px;
    font-weight: 700;
    text-transform: none;
    background: #0b6b3a;
    color: #fff;
  }
  &&:disabled {
    background: #801E13;
    color: #fff;
  }
`;

/* Reusable black-styled TextField */
const TextFieldBlack = (props) => (
  <TextField
    {...props}
    sx={{
      "& .MuiOutlinedInput-root": {
        color: "#000",                                 // input text black
        "& fieldset": { borderColor: "rgba(0,0,0,.35)" },
        "&:hover fieldset": { borderColor: "rgba(0,0,0,.6)" },
        "&.Mui-focused fieldset": { borderColor: "#000" },
        backgroundColor: "rgba(255,255,255,.35)",      // subtle contrast on teal
      },
      "& .MuiInputBase-input::placeholder": { color: "#000", opacity: 0.6 },
    }}
    InputLabelProps={{
      sx: {
        color: "#000",                                  // label black
        "&.Mui-focused": { color: "#000" },
      },
    }}
    FormHelperTextProps={{
      sx: { color: "#000", opacity: 0.8 },              // helper text black
    }}
  />
);

const emailValid = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());

export default function ContactForm({ formspreeId, recipientEmail }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState({ open: false, kind: "success", text: "" });

  const chars = message.length;
  const maxChars = 2000;

  const valid = useMemo(() => {
    return (
      first.trim().length > 0 &&
      last.trim().length > 0 &&
      emailValid(email) &&
      message.trim().length > 0 &&
      message.length <= maxChars
    );
  }, [first, last, email, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid || busy) return;
    setBusy(true);

    try {
      if (formspreeId) {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            first_name: first,
            last_name: last,
            email,
            message,
          }),
        });
        if (!res.ok) throw new Error("Formspree error");
        setToast({ open: true, kind: "success", text: "Thanks! Your message was sent." });
      } else if (recipientEmail) {
        const subject = encodeURIComponent(`Portfolio Contact — ${first} ${last}`);
        const body = encodeURIComponent(`Name: ${first} ${last}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
        setToast({ open: true, kind: "success", text: "Your email client has been opened." });
      } else {
        throw new Error("No submission method configured");
      }

      setFirst("");
      setLast("");
      setEmail("");
      setMessage("");
    } catch {
      setToast({
        open: true,
        kind: "error",
        text: "Sorry, something went wrong. Please try again.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Wrap>
        <Panel component="form" onSubmit={handleSubmit} noValidate>
          <Title component="h2">Contact Me</Title>
          <Sub variant="body1">I usually reply within a business day.</Sub>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextFieldBlack
                fullWidth
                label="First name *"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                inputProps={{ maxLength: 80 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldBlack
                fullWidth
                label="Last name *"
                value={last}
                onChange={(e) => setLast(e.target.value)}
                inputProps={{ maxLength: 80 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextFieldBlack
                fullWidth
                label="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={email.length > 0 && !emailValid(email)}
                helperText={
                  email.length > 0 && !emailValid(email) ? "Enter a valid email" : " "
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextFieldBlack
                fullWidth
                multiline
                minRows={6}
                label="Message *"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                inputProps={{ maxLength: maxChars }}
              />
              <Counter>{chars}/{maxChars}</Counter>
            </Grid>

            <Grid item xs={12} sx={{ display: "grid", placeItems: "center", mt: 1 }}>
              <SendBtn type="submit" variant="contained" disabled={!valid || busy}>
                {busy ? "Sending..." : "Send"}
              </SendBtn>
            </Grid>
          </Grid>
        </Panel>
      </Wrap>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.kind === "success" ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.text}
        </Alert>
      </Snackbar>
    </>
  );
}
