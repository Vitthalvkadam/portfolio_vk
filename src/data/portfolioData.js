// Single source of truth for all portfolio content.
// Edit this file to update the site — components stay presentation-only.

export const profile = {
  name: "Vitthal Kadam",
  role: "Java Full Stack Developer",
  headline: "Building scalable backend systems and beautiful frontend experiences.",
  about:
    "I'm a passionate Java Full Stack Developer focused on Java, Spring Boot, React, REST APIs and MySQL. Currently preparing for Software Development Engineer roles while mastering Data Structures & Algorithms.",
  location: "India",
  email: "vitthalvkadam@gmail.com",
  resumeUrl: "#",
  typingRoles: [
    "Java Full Stack Developer",
    "Spring Boot Engineer",
    "React Developer",
    "DSA Practitioner",
  ],
};

export const socials = {
  github: "https://github.com/Vitthalvkadam",
  linkedin: "https://linkedin.com/in/Vitthalvkadam",
  email: "mailto:vitthalvkadam@gmail.com",
};

export const stats = [
  { label: "Years Learning", value: 2, suffix: "+" },
  { label: "Projects Completed", value: 6, suffix: "+" },
  { label: "Technologies", value: 16, suffix: "+" },
  { label: "DSA Problems Solved", value: 250, suffix: "+" },
];

export const timeline = [
  {
    year: "2024 — Present",
    title: "Java Full Stack Development",
    description:
      "Deepened expertise in Spring Boot, REST APIs, and React while shipping full-stack projects end to end.",
  },
  {
    year: "2023 — 2024",
    title: "Core Java & DSA Foundations",
    description:
      "Built a strong foundation in Java, OOP, and Data Structures & Algorithms through consistent practice.",
  },
  {
    year: "2023",
    title: "Web Development Fundamentals",
    description:
      "Learned HTML, CSS, JavaScript and version control, laying the groundwork for full-stack work.",
  },
];

export const skillCategories = [
  {
    category: "Backend",
    skills: [
      { name: "Java", level: 90, icon: "java" },
      { name: "Spring Boot", level: 85, icon: "springboot" },
      { name: "Spring MVC", level: 80, icon: "spring" },
      { name: "Spring Security", level: 70, icon: "springsecurity" },
      { name: "Hibernate", level: 75, icon: "hibernate" },
      { name: "JPA", level: 75, icon: "jpa" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 85, icon: "react" },
      { name: "JavaScript", level: 85, icon: "javascript" },
      { name: "Tailwind CSS", level: 80, icon: "tailwind" },
      { name: "HTML", level: 90, icon: "html" },
      { name: "CSS", level: 85, icon: "css" },
    ],
  },
  {
    category: "Database & Tools",
    skills: [
      { name: "MySQL", level: 80, icon: "mysql" },
      { name: "Git", level: 85, icon: "git" },
      { name: "GitHub", level: 85, icon: "github" },
      { name: "Postman", level: 80, icon: "postman" },
      { name: "REST APIs", level: 85, icon: "restapi" },
    ],
  },
];

export const projects = [
  {
    id: "smart-tourism-portal",
    title: "Smart Tourism Portal",
    description:
      "Smart tourism platform featuring destination recommendations, hotel booking, maps and trip planning.",
    stack: ["Spring Boot", "React", "MySQL"],
    liveUrl: "#",
    githubUrl: "https://github.com/Vitthalvkadam",
    featured: true,
  },
  {
    id: "employee-management-system",
    title: "Employee Management System",
    description:
      "A full-stack system to manage employee records, departments, and roles with secure authentication.",
    stack: ["Spring Boot", "React", "MySQL"],
    liveUrl: "#",
    githubUrl: "https://github.com/Vitthalvkadam",
    featured: false,
  },
  {
    id: "student-management-system",
    title: "Student Management System",
    description:
      "A desktop-style CRUD application for managing student records with JDBC-backed persistence.",
    stack: ["Java", "JDBC", "MySQL"],
    liveUrl: "#",
    githubUrl: "https://github.com/Vitthalvkadam",
    featured: false,
  },
];

export const certificates = [
  {
    title: "Java Programming Certification",
    issuer: "Self-Paced Program",
    date: "2024",
  },
  {
    title: "Spring Boot & REST APIs",
    issuer: "Online Course",
    date: "2024",
  },
  {
    title: "Data Structures & Algorithms",
    issuer: "In Progress",
    date: "2025",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];
