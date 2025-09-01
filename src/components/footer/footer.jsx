import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LogoImage from '../../assets/images/Logo.png';
import Linkedin from '../../assets/icons/linkedin.svg';
import Github from '../../assets/icons/github2.svg';

const Footer = () => {
	const [year, setYear] = useState();

	useEffect(() => {
		setYear(new Date().getFullYear());
	}, []);
	return (
		<Box
			component="footer"
			id="contact"
			className="footer black-container"
			textAlign="center">
			<Stack
				justifyContent="center"
				alignItems="center"
				padding="2rem 0 0.5rem"
				gap="1rem">
				<Box>
					<a href="/">
						<img
							width="55px"
							src={LogoImage}
							alt="Payal Mehta"
						/>
					</a>
				</Box>
				<Stack
					direction="row"
					alignItems="center"
					gap="1rem">
					<a
						href="https://www.linkedin.com/payal-mehta18/"
						target="_blank"
						rel="noreferrer">
						<img
							src={Linkedin}
							alt="LinkedIn"
						/>
					</a>
					<a
						href="https://github.com/m-payal"
						target="_blank"
						rel="noreferrer">
						<img
							src={Github}
							alt="GitHub"
						/>
					</a>
				</Stack>
			</Stack>
			<Typography
				variant="overline"
				color="var(--white-text)">
				© Copyright {year} - Payal Mehta
			</Typography>
		</Box>
	);
};

export default Footer;
