import { Stack, Typography } from '@mui/material';
import React from 'react';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';

const StyledHeading = styled(Typography)`
	&& {
		position: relative;
		font-weight: 800;
		letter-spacing: 3px;
		padding-top: 1.8rem;         /* ↓ reduced from 3.4rem */
		margin-bottom: 3rem;         /* ↓ reduced from 5rem */
		text-align: center;
		background: linear-gradient(90deg, #0d9488, #2dd4bf); /* teal gradient */
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		font-family: 'Playfair Display', serif;

		@media (max-width: 992px) {
			font-size: 2.4rem;
			margin-bottom: 2.4rem;
		}

		@media (max-width: 576px) {
			font-size: ${(props) => (props.exed ? '1.4rem' : '2.2rem')};
			padding-top: 1rem;
		}
	}
`;

const StyledSpan = styled.span`
	${(props) => (props.exed ? 'display: none;' : 'display: block;')}
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: -6px;
	height: 4px;
	border-radius: 2px;
	background: linear-gradient(90deg, #0f766e, #2dd4bf, #0f766e);
`;

const headingVariant = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, type: 'spring', delay: 0.2 },
	},
};

const barVariant = {
	hidden: { transform: 'translateX(-50%) scale(0)' },
	visible: {
		transform: 'translateX(-50%) scale(1)',
		origin: 'center',
		transition: { duration: 0.5, type: 'tween', delay: 0.8 },
	},
};

const Heading = ({ headerText, id, justify, exed, restprops }) => {
	return (
		<Stack
			className="heading"
			justifyContent={!justify ? 'center' : justify}
			direction="row"
			{...restprops}
			id={id}>
			<StyledHeading
				component={motion.h2}
				variants={headingVariant}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				exed={exed}
				variant="h2">
				{headerText}
				<StyledSpan
					as={motion.span}
					variants={barVariant}
					exed={exed}></StyledSpan>
			</StyledHeading>
		</Stack>
	);
};

export default Heading;
