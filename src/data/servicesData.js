// Example: import icons as paths (replace with your actual files)
import figma from "../assets/icons/figma.png";
import wcag from "../assets/icons/wcag.png";
import balsamiq from "../assets/icons/balsamiq.png";
import prototyping from "../assets/icons/prototyping.png";
import framer from "../assets/icons/framer.png";
import mui from "../assets/icons/mui.svg";
import sketch from "../assets/icons/sketch.png";
import adobe from "../assets/icons/adobe.png";

import react from "../assets/icons/react.svg";
import ts from "../assets/icons/typescript.png";
import next from "../assets/icons/nextjs.png";
import redux from "../assets/icons/redux.svg";
import tailwind from "../assets/icons/tailwindcss.svg";
import html from "../assets/icons/html5.png";
import css from "../assets/icons/css3-alt.svg";
import angualar from "../assets/icons/angular.png";
import bootstrap from "../assets/icons/bootstrap.png";


import node from "../assets/icons/node.png";
import express from "../assets/icons/express.png";
import spring from "../assets/icons/spring.png";
import flask from "../assets/icons/flask.svg";
import jwt from "../assets/icons/jwt.png";
import kafka from "../assets/icons/kafka.svg";
import postman from "../assets/icons/postman.svg";
import django from "../assets/icons/django.svg";
import java from "../assets/icons/java.png";
import cpp from "../assets/icons/c++.png";


import python from "../assets/icons/python.png";
import r from "../assets/icons/r.png";
import pandas from "../assets/icons/pandas.png";
import numpy from "../assets/icons/numpy.png";
import sklearn from "../assets/icons/sklearn.png";
import matplotlib from "../assets/icons/matplotlib.png";
import powerbi from "../assets/icons/powerbi.png";
import tableau from "../assets/icons/tableau.png";
import plotly from "../assets/icons/plotly.png";
import jupyter from "../assets/icons/jupyter.png";

import postgres from "../assets/icons/postgresql.png";
import mysql from "../assets/icons/mysql.png";
import oracle from "../assets/icons/oracle.png";
import mongo from "../assets/icons/mongodb.png";
import dynamo from "../assets/icons/dyanamo.png";
import redis from "../assets/icons/redis.png";

import docker from "../assets/icons/docker.png";
import k8 from "../assets/icons/k8.png";
import openshift from "../assets/icons/openshift.png";
import aws from "../assets/icons/aws.png";
import jenkins from "../assets/icons/jenkins.png";
import jira from "../assets/icons/jira.png";
import bitbucket from "../assets/icons/bitbucket.png";
import maven from "../assets/icons/maven.png";
import git from "../assets/icons/git.png";
import junit from "../assets/icons/junit.png";

export const data = [
  {
    id: "uiux",
    name: "UI/UX Design",
    icon: "🖌️",
    front:
      "I design accessible, intuitive flows and turn Figma concepts into real interfaces. I build responsive React/MUI components with clear states, clean typography, and thoughtful micro-interactions.",
    tools: [
      { label: "Figma", icon: figma },
      { label: "WCAG", icon: wcag },
      { label: "Balsamiq", icon: balsamiq },
      { label: "Prototyping", icon: prototyping },
      { label: "Framer Motion", icon: framer },
      { label: "MUI", icon: mui },
	  { label: "Sketch", icon: sketch },
	  { label: "Adobe", icon: adobe },
    ],
    frontBg: "linear-gradient(180deg,#74d2ff,#57a8ff)",
  },
  {
    id: "frontend",
    name: "Frontend Development",
    icon: "⚛️",
    front:
      "I build interactive, performant UIs in React and TypeScript. I structure components, manage state, test thoughtfully, and keep bundles lean.",
    tools: [
      { label: "React", icon: react },
      { label: "TypeScript", icon: ts },
      { label: "Next.js", icon: next },
      { label: "Redux", icon: redux },
      { label: "MUI", icon: mui },
      { label: "Tailwind", icon: tailwind },
	  { label: "HTML", icon: html },
	  { label: "CSS", icon: css },
	  { label: "Angular", icon: angualar },
	  { label: "Bootstrap", icon: bootstrap },

    ],
    frontBg: "linear-gradient(180deg,#c7a9ff,#9b86ff)",
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: "🧩",
    front:
      "I design and ship APIs with Node/Express or Spring Boot. I handle auth, validation, caching, logging, and integrations.",
    tools: [
		{ label: "Java", icon: java },
		{ label: "C++", icon: cpp },
      { label: "Node.js", icon: node },
      { label: "Express", icon: express },
      { label: "Spring Boot", icon: spring },
	  { label: "Kafka", icon: kafka },
      { label: "Flask", icon: flask },
	  { label: "Django", icon: django },
      { label: "JWT", icon: jwt },
      { label: "Postman", icon: postman },
    ],
    frontBg: "linear-gradient(180deg,#ffc2a6,#ff9b9b)",
  },
  {
    id: "ml",
    name: "ML & Data Analytics",
    icon: "📊",
    front:
      "I explore data with Python/R/SQL and turn it into clear, decision-ready visuals. I prototype notebooks and pipelines and document results clearly.",
    tools: [
      { label: "Python", icon: python },
      { label: "R", icon: r },
      { label: "Pandas", icon: pandas },
      { label: "NumPy", icon: numpy },
	  { label: "Matplotlib", icon: matplotlib },
      { label: "scikit-learn", icon: sklearn },
      { label: "Power BI", icon: powerbi },
	  { label: "Tableau", icon: tableau },
      { label: "Plotly", icon: plotly },
      { label: "Jupyter", icon: jupyter },
    ],
    frontBg: "linear-gradient(180deg,#8be8cc,#c6f5d9)",
  },
  {
    id: "database",
    name: "Database",
    icon: "🗄️",
    front:
      "I design schemas and write reliable queries for transactional and analytical workloads. I tune indexes, plan migrations, and automate backups.",
    tools: [
      { label: "PostgreSQL", icon: postgres },
      { label: "MySQL", icon: mysql },
      { label: "Oracle", icon: oracle },
      { label: "MongoDB", icon: mongo },
      { label: "DynamoDB", icon: dynamo },
      { label: "Redis", icon: redis },
    ],
    frontBg: "linear-gradient(180deg,#98e7ff,#8db6ff)",
  },
  {
    id: "devops",
    name: "DevOps",
    icon: "☁️",
    front:
      "I package and deploy with containers and CI/CD. I run apps in the cloud and keep an eye on them with sensible monitoring.",
    tools: [
      { label: "Docker", icon: docker },
      { label: "Kubernetes", icon: k8 },
      { label: "OpenShift", icon: openshift },
      { label: "AWS", icon: aws },
	  { label: "Git", icon: git },
	  { label: "Bitbucket", icon: bitbucket },
	  { label: "JUnit", icon: junit },
	  { label: "Jira", icon: jira },
	  { label: "Maven", icon: maven },
      { label: "Jenkins", icon: jenkins },
    ],
    frontBg: "linear-gradient(180deg,#bfead8,#e2f7ec)",
  },
];
