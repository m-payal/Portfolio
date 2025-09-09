import talent from "../assets/icons/Talent.png";
import help from "../assets/icons/HelpThePack.png";
import mri from "../assets/icons/MRI.png";
import carify from "../assets/icons/carify.jpg"
import rail from "../assets/icons/rail.jpg"
import simplii from "../assets/simplii.png"
import mriPdf from "../assets/MRI.pdf";
import furniture from "../assets/icons/furniture.png";

export const projData = [
  {
    id: 107,
    name: "Furniture Studio: Interactive E-Commerce Site",
    tools: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Node.js"],
    points: [
      "Built a furniture e-commerce site with category pages, product cards, cart drawer, and dynamic visualizations for a smooth browsing experience.",
      "Integrated animations with Framer Motion and interactive UI components (category tabs, tiles, editorial strip) to keep navigation lively and intuitive.",
      "Handled product data and category filtering with reusable components and clean structure (`CategoryTiles`, `ProductCard`, `RoomStudio`)."
    ],
    label: "Furniture Studio",
    icon: furniture,
    link: "https://furniture-studio-seven.vercel.app/",   // live demo if you deploy
    gitLink: "https://github.com/m-payal/Furniture-Studio",
    done: false
  }, 
  {
    id: 101,
    name: "TalentThreads: Gamified Learning Platform",
    tools: ["Figma", "Prototyping", "Design System", "Motion"],
    points: [
      "Shaped a gamified learning journey in Figma with clear levels, streaks, and reward loops so learners always know what to do next and why it matters.",
      "Built interactive prototypes with state changes, progress gates, and feedback animations to validate pacing and motivation before any build.",
      "Defined a lightweight design system with tokens for badges, progress meters, and challenge cards so new modules snap into place without rework."
    ],
    icon: talent,
	link: "https://www.figma.com/proto/YH9EbDnoYyVBcPBZhof6A2/Coding-by-cooking?node-id=4-17&starting-point-node-id=4%3A17&t=Ry4SKp9gKnL5b4iP-1",
    gitLink: "#",
    done: false
  },
  {
    id: 102,
    name: "Help The Pack: Helping International Students",
    tools: ["Balsamiq", "Figma", "HTML", "CSS", "JavaScript", "Accessibility"],
    points: [
      "Reworked the information architecture so essential tasks such as housing, to-dos, and local guidance sit one tap from the start screen.",
      "Ran task-based tests with international students, then simplified labels, search behavior, and empty states so the path is obvious even on a first visit.",
      "Built hi-fi prototypes in HTML, CSS, and JavaScript to prove the flows in a browser, including mobile layouts, accessibility basics, and friendly microcopy."
    ],
    label: "Help The Pack", icon: help,
    link: "https://www.figma.com/proto/7HDriBgQVGB3wTx3lbe82v/Help-The-Pack--Prototype?node-id=59-412&starting-point-node-id=59%3A412&t=fQd3APmfEuj5BJQ4-1",
    gitLink: "#",
    done: false
  },
  {
    id: 103,
    name: "MRI Brain Tumor Detection",
    tools: ["Python","TensorFlow", "PyTorch", "Terraform", "Pytest", "CNN"],
    points: [
      "Built an end-to-end pipeline from dataset loading and preprocessing to training and evaluation, with consistent augmentation for MRI slices.",
      "Implemented CNN experiments in TensorFlow and PyTorch with checkpoints and repeatable runs, and validated core steps using Pytest fixtures.",
      "Provisioned cloud training with Terraform, containerized the workflow, and documented an inference path for batch predictions in clinical-style folders."
    ],
    label: "MRI", icon: mri,
    link: mriPdf,
    gitLink: "#",
    done: false
  },
  {
    id: 104,
    name: "Carify: Predictive Analytics on Big Data",
    tools: ["SQL","Hadoop", "Spark", "Regression", "Streamlit", "REST", "Django"],
    points: [
      "Set up ingestion on Hadoop and Spark to clean, join, and shape raw records into analysis-ready tables for modeling and exploration.",
      "Prototyped regression and classification approaches, engineered features around service history and usage signals, and exposed results through simple REST routes.",
      "Delivered a Streamlit workspace that lets teams explore trends, compare scenarios, and export clear summaries for planning and reporting."
    ],
    label: "Carify", icon: carify,
    link: "https://github.com/m-payal/Carify",
    gitLink: "#",
    done: false
  },
  {
    id: 105,
    name: "Rail Ticketing System",
    tools: ["Ruby on Rails", "MySQL", "UNIX", "CRUD"],
    points: [
      "Structured a Rails application with models, controllers, and views for routes, bookings, and users, with validations and friendly error states.",
      "Connected MySQL via migrations and seeds, and tuned queries so listings and searches stay responsive as data grows.",
      "Deployed on a UNIX host with environment configs, logs, and basic monitoring, and added role based access for staff and passengers."
    ],
    label: "Rail", icon: rail,
    link: "https://github.com/m-payal/Railway-Ticketing",
    gitLink: "#",
    done: false
  },
  {
	id: 106,
	name: "Simplii: Task Scheduler Web App",
	tools: ["Flask", "Python", "AWS RDS", "SQL", "Jinja2", "PyTest", "CI/CD"],
	points: [
	  "Built a Flask web app that schedules tasks and helps people switch work based on mood, urgency, and difficulty; defined the data model with an ER diagram and mapped the flow from signup to dashboard to task detail.",
	  "Connected to AWS RDS with SQL schemas and queries, added routes for create, view, edit, delete, and subtasks, and handled server-side validation and friendly error states.",
	  "Added engineering essentials: unit tests, CI and style checks, login sessions, email notifications, and a simple visualization view for progress and backlog."
	],
	label: "Simplii",
	icon: simplii,                            
	link: "https://github.com/m-payal/Simplii",
	gitLink: "https://github.com/m-payal/Simplii",
	done: false
  }
];
