export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
    linkedin?: string;
    website?: string;
  };
  experience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }[];
  skills: string[];
  languages?: string[];
  certifications?: {
    id: string;
    name: string;
    issuer: string;
    date: string;
  }[];
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    title: "Senior Software Engineer",
    summary: "Experienced software engineer with 8+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about building scalable applications and leading engineering teams.",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.dev",
  },
  experience: [
    {
      id: "1",
      company: "Tech Corp",
      position: "Senior Software Engineer",
      startDate: "2021",
      endDate: "Present",
      description: "Led a team of 5 engineers to develop microservices architecture. Improved system performance by 40%. Implemented CI/CD pipelines reducing deployment time by 60%.",
    },
    {
      id: "2",
      company: "StartupXYZ",
      position: "Software Engineer",
      startDate: "2018",
      endDate: "2021",
      description: "Built responsive web applications using React and TypeScript. Developed RESTful APIs with Node.js and Express. Collaborated with product team on feature design.",
    },
  ],
  education: [
    {
      id: "1",
      institution: "MIT",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2014",
      endDate: "2018",
    },
  ],
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL", "PostgreSQL"],
  languages: ["English", "Spanish"],
  certifications: [
    { id: "1", name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2023" },
  ],
};