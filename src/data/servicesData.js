// Example: import icons as paths (replace with your actual files)
import figma from "../assets/icons/figma.png";
import wcag from "../assets/icons/wcag.png";
import balsamiq from "../assets/icons/balsamiq.png";
import framer from "../assets/icons/framer.png";
import sketch from "../assets/icons/sketch.png";

import react from "../assets/icons/react.svg";
import ts from "../assets/icons/typescript.png";
import next from "../assets/icons/nextjs.png";
import redux from "../assets/icons/redux.svg";
import tailwind from "../assets/icons/tailwindcss.svg";
import html from "../assets/icons/html5.png";
import css from "../assets/icons/css3-alt.svg";
import angular from "../assets/icons/angular.png";

import node from "../assets/icons/node.png";
import express from "../assets/icons/express.png";
import spring from "../assets/icons/spring.png";
import flask from "../assets/icons/flask.svg";
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
    id: "uiux_frontend",
    name: "UI/UX & Frontend",
    image: require("../assets/skills/frontend.png"),
    front:
      "I blend creative design with smooth, functional interfaces, transforming ideas into intuitive, engaging, and visually refined digital experiences.",
    tools: [
      { label: "Figma", icon: figma },
      { label: "Framer Motion", icon: framer },
      { label: "Sketch", icon: sketch },
      { label: "WCAG", icon: wcag },
      { label: "Balsamiq", icon: balsamiq },
      { label: "Angular", icon: angular },
      { label: "React", icon: react },
      { label: "TypeScript", icon: ts },
      { label: "Next.js", icon: next },
      { label: "Tailwind", icon: tailwind },
      { label: "Redux", icon: redux },
      { label: "HTML", icon: html },
      { label: "CSS", icon: css },
    ],
    frontBg: "linear-gradient(180deg,#89d6ff,#bda9ff)",
  },
  {
    id: "backend_database",
    name: "Backend & Database",
    image: require("../assets/skills/backend.png"),
    front:
      "I craft reliable backends and data models that keep systems connected, secure, and effortlessly scalable, where every request finds its right place.",
    tools: [
      { label: "Java", icon: java },
      { label: "C++", icon: cpp },
      { label: "Spring Boot", icon: spring },
      { label: "Node.js", icon: node },
      { label: "Express", icon: express },
      { label: "Kafka", icon: kafka },
      { label: "Flask", icon: flask },
      { label: "PostgreSQL", icon: postgres },
      { label: "DynamoDB", icon: dynamo },
      { label: "MongoDB", icon: mongo },
      { label: "MySQL", icon: mysql },
      { label: "Redis", icon: redis },
      { label: "Oracle", icon: oracle },
    ],
    frontBg: "linear-gradient(180deg,#ffd3b6,#ffa9a9)",
  },
  {
    id: "data_ai",
    name: "Data & AI Analytics",
    image: require("../assets/skills/data.png"),
    front:
      "I turn data into stories, analyzing, visualizing, and predicting patterns that guide smarter decisions and bring clarity to complexity.",
    tools: [
      { label: "Python", icon: python },
      { label: "R", icon: r },
      { label: "Django", icon: django },
      { label: "Pandas", icon: pandas },
      { label: "NumPy", icon: numpy },
      { label: "scikit-learn", icon: sklearn },
      { label: "Tableau", icon: tableau },
      { label: "Power BI", icon: powerbi },
      { label: "Matplotlib", icon: matplotlib },
      { label: "Plotly", icon: plotly },
      { label: "Jupyter", icon: jupyter },
    ],
    frontBg: "linear-gradient(180deg,#a4f0d4,#d5f7e5)",
  },
  {
    id: "cloud_devops",
    name: "Cloud & DevOps",
    image: require("../assets/skills/cloud.png"),
    front:
      "I bridge development and delivery, automating pipelines, scaling deployments, and keeping systems resilient across cloud environments.",
    tools: [
      { label: "Docker", icon: docker },
      { label: "Kubernetes", icon: k8 },
      { label: "AWS", icon: aws },
      { label: "OpenShift", icon: openshift },
      { label: "Postman", icon: postman },
      { label: "Jenkins", icon: jenkins },
      { label: "Git", icon: git },
      { label: "Bitbucket", icon: bitbucket },
      { label: "Jira", icon: jira },
      { label: "JUnit", icon: junit },
      { label: "Maven", icon: maven },
    ],
    frontBg: "linear-gradient(180deg,#bde8dc,#eafcf2)",
  },
];
