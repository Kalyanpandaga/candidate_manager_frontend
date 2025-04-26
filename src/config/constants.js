export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  CANDIDATES: {
    VIEW: "/candidate/view",
    ADD: "/candidate/add",
  },
};

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/",
  SIGNUP: "/signup",
};

export const COMMON_SKILLS = [
  "JavaScript",
  "Python",
  "Java",
  "React",
  "Node.js",
  "Angular",
  "TypeScript",
  "PHP",
  "C++",
  "C#",
  "HTML",
  "CSS",
  "Next.js",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "MySQL",
  "MongoDB",
  "AWS",
];

export const IMAGE_URLS = {
  FAILURE: "https://assets.ccbp.in/frontend/react-js/failure-img.png",
  NO_RESULTS: "https://assets.ccbp.in/frontend/react-js/no-jobs-img.png",
};
