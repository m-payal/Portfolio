import talent from "../assets/icons/Talent.png";
import help from "../assets/icons/HelpThePack.png";
import carify from "../assets/icons/carify.jpg"
import rail from "../assets/icons/rail.jpg"
import simplii from "../assets/simplii.png"
import furniture from "../assets/icons/furniture.png";

export const projData = [
  {
    id: 104,
    name: "Carify",
    tools: ["SQL","Hadoop", "Spark", "Regression", "Streamlit", "REST", "Django"],
    category: "Automobile",
    points: [
      "A big data analytics solution using Hadoop, Spark, and Streamlit to predict car maintenance trends and visualize insights."
    ],
    label: "Carify", icon: carify,
    link: "https://github.com/m-payal/Carify",
    gitLink: "#",
    done: false
  },
  {
    id: 107,
    name: "Furniture Studio",
    tools: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Node.js"],
    points: [
      "A dynamic furniture e-commerce site with product categories, animated interactions, and reusable React components for smooth browsing."
    ],
    label: "Furniture Studio",
    category: "E-Commerce",
    icon: furniture,
    link: "https://furniture-studio-seven.vercel.app/",   // live demo if you deploy
    gitLink: "https://github.com/m-payal/Furniture-Studio",
    done: false
  }, 
  {
    id: 101,
    name: "TalentThreads",
    tools: ["Figma", "Prototyping", "Design System", "Motion"],
    category: "Educational",
    points: [
      "A gamified learning experience designed in Figma with progress streaks, badges, and reward loops that keep learners motivated."
    ],
    icon: talent,
	link: "https://www.figma.com/proto/YH9EbDnoYyVBcPBZhof6A2/Coding-by-cooking?node-id=4-17&starting-point-node-id=4%3A17&t=Ry4SKp9gKnL5b4iP-1",
  caseStudyLink: "/case-studies/TalentThreads",
    gitLink: "#",
    done: false
  },
  {
    id: 102,
    name: "Help The Pack",
    tools: ["Balsamiq", "Figma", "HTML", "CSS", "JavaScript", "Accessibility"],
    category: "Local Recommendation",
    points: [
      "A web and mobile prototype built to simplify onboarding for international students with clear guidance, local info, and task flows."
    ],
    label: "Help The Pack", icon: help,
    link: "https://www.figma.com/proto/7HDriBgQVGB3wTx3lbe82v/Help-The-Pack--Prototype?node-id=59-412&starting-point-node-id=59%3A412&t=fQd3APmfEuj5BJQ4-1",
    gitLink: "#",
    done: false
  },
 
  {
    id: 105,
    name: "Rail Ticketing System",
    tools: ["Ruby on Rails", "MySQL", "UNIX", "CRUD"],
    category: "Transportation",
    points: [
      "A full-stack Rails application for managing train routes, bookings, and user access with clean CRUD operations and validations."
    ],
    label: "Rail", icon: rail,
    link: "https://github.com/m-payal/Railway-Ticketing",
    gitLink: "#",
    done: false
  },
  {
	id: 106,
	name: "Simplii",
	tools: ["Flask", "Python", "AWS RDS", "SQL", "Jinja2", "PyTest", "CI/CD"],
  category: "Productivity",
	points: [
    "A Flask-based productivity app that organizes and tracks tasks using mood, urgency, and progress visualization."
  ],
	label: "Simplii",
	icon: simplii,                            
	link: "https://github.com/m-payal/Simplii",
	gitLink: "https://github.com/m-payal/Simplii",
	done: false
  }
];
