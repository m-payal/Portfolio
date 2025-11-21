// src/components/About/About.jsx
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import Heading from '../../utils/heading';
import CustomButton from '../../utils/customButton';
import { styled } from 'styled-components';
import { data } from '../../data/aboutData';
import CV from '../../assets/CV/Resume.pdf';
import { motion } from 'framer-motion';
import openIcon from '../../assets/icons/open.png';

const CustomizeStack = styled(Stack)`
  position: relative;
  margin-right: 2rem;
  &::before {
    content: '';
    position: absolute;
    left: -5rem;
    top: -12.5%;
    width: 1px;
    height: 125%;
    background-color: var(--white-text);
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const infoVariant = {
  hidden: { transform: 'translateX(100%)' },
  visible: {
    transform: 'translateX(0%)',
    transition: { delay: 1.5, type: 'spring', duration: 1 },
  },
};

const buttonVariant = {
  hidden: { transform: 'translateY(100%)' },
  visible: {
    transform: 'translateY(0%)',
    transition: { delay: 1.5, type: 'spring', duration: 1 },
  },
};

const sideVariant = {
  hidden: { transform: 'scale(0)' },
  visible: {
    transform: 'scale(1)',
    transition: { duration: 1, type: 'spring', delay: 1 },
  },
};

const handVariants = {
  hidden: { rotate: 8 },
  visible: {
    rotate: -8,
    transition: { repeat: 8, repeatType: 'reverse', duration: 3, type: 'spring', stiffness: 500 },
  },
};

const About = () => {
  return (
    <Box className="about container black-container">
      <Heading headerText="About me" id="about" />

      <Stack sx={{ flexDirection: { xs: 'column', lg: 'row' } }} justifyContent="space-between" marginY={3}>
        {/* Left: intro + CV */}
        <Stack
          spacing={5}
          justifyContent="space-between"
          sx={{ width: { xs: '100%', lg: '60%' }, alignItems: { xs: 'center', sm: 'flex-start' }, overflow: 'hidden' }}
        >
          <Typography
            component={motion.p}
            variants={infoVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variant="body1"
            sx={{ fontSize: { xs: '16px', lg: '20px' } }}
            className="gray-text"
          >
            <h3>
              Hey, I’m Payal
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: '5px',
                  paddingBottom: '5px',
                  transform: 'translateY(-5px)',
                }}
              >
                <motion.span
                  style={{ display: 'inline-block', transformOrigin: ' bottom right ' }}
                  variants={handVariants}
                  whileInView="visible"
                >
                  👋
                </motion.span>
              </span>
            </h3>

            <p>
              I’m a software engineer who enjoys building reliable systems end-to-end, from Spring Boot/Kafka services and
              data pipelines to React/Angular frontends people actually like using.
            </p>

            <p>
              I’ve worked across Java, Python, and JavaScript; shipped on Docker/Kubernetes/OpenShift; and used AWS/Azure,
              PostgreSQL/MongoDB, and Jenkins CI. I care about clean APIs, measurable impact, and small UX touches that
              remove friction.
            </p>

            <p>
              Recently, I focused on onboarding workflows, HR automation with Power Platform, and analytics with Power BI.
              Before that, I scaled microservices at Citibank and prototyped research ideas at NCSU.
            </p>
          </Typography>

          {/* CV / Resume button */}
          <motion.a
  href={CV}
  variants={buttonVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    width: 'fit-content',
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none'
  }}
>
  <CustomButton
    // keep your existing props
    beforeWidth="100%"
    // set the hover fill to light teal
    beforeBgColorHover="#A7F3D0"          // <- light teal
    hoverColor="#0b1220"                  // text color when hovered (deep slate)
    textColor="black"                     // normal text color
    content={
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          lineHeight: 1
        }}
      >
        <motion.img
          src={openIcon}
          alt=""
          aria-hidden="true"
          style={{
            width: '2.1em',
            height: '2.1em',
            objectFit: 'contain',
            transform: 'translateY(1px)',
            display: 'block'
          }}
          whileHover={{ rotate: 12, scale: 1.06 }}
          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        />
        <span>View my Resume</span>
      </span>
    }
  />
</motion.a>
        </Stack>

        {/* Right: quick facts list from aboutData */}
        <CustomizeStack
          as={motion.div}
          variants={sideVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          sx={{ display: { xs: 'none', lg: 'flex' }, transformOrigin: 'center' }}
          justifyContent="center"
        >
          <Stack spacing={7} overflow="hidden" sx={{ display: { xs: 'none', lg: 'flex' } }}>
            {data.map((el, index) => {
              let delay = index;
              delay += 2.5;
              return (
                <Stack
                  component={motion.div}
                  initial={{ transform: 'translateX(-120%)' }}
                  whileInView={{ transform: 'translateX(0%)' }}
                  transition={{ duration: 0.8, type: 'spring', delay: delay }}
                  viewport={{ once: true }}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  key={el.id}
                >
                  <Typography variant="body1" fontSize="1rem" className="white-text" fontWeight="bold">
                    {el.name}:
                  </Typography>
                  <Typography variant="body2" fontSize="1rem" className="gray-text" lineHeight="0">
                    {el.value}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </CustomizeStack>
      </Stack>
    </Box>
  );
};

export default About;
