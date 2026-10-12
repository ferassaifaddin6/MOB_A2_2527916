export const STUDENT = {
  fullName: 'Feras Saifaddin Ismail Mohammed',
  regNo: '25/27916',
  appName: 'MFPortfolio',
  code: 'MOB-A2-7916',
  version: '57.0.0',
  github: 'ferassaifaddin6',
};

export type Profile = {
  headline: string; bio: string; primarySkill: string; availability: string; imageUri: string | null;
};

export const AVAILABILITY = ['Available for internship', 'Open to projects', 'Not available'];

export const DEFAULT_PROFILE: Profile = {
  headline: 'Aspiring Web Developer | Software Engineering Student | Interested in Building Modern, User-Friendly Websites',
  bio: 'I am continuously developing my technical skills through academic projects and practical software development.',
  primarySkill: 'React Native',
  availability: AVAILABILITY[0],
  imageUri: null,
};

export const SKILLS = ['HTML & CSS', 'JavaScript', 'TypeScript', 'React Native', 'Git & GitHub'];

export const EDUCATION = [
  {
    period: '2025 – Present',
    title: "Bachelor's Degree in Software Engineering",
    place: 'INES – Ruhengeri, Rwanda',
    detail: 'Studying software development, programming, databases, web design and mobile application development.',
  },
];

export type Project = {
  id: string; title: string; problem: string; contribution: string; tech: string; features: string[]; outcome: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'hotel',
    title: 'Hotel Booking Website',
    problem: 'Finding suitable hotels and accessing hotel information can be difficult when information is not organized in one place.',
    contribution: 'Designed and developed a website interface that allows users to explore hotels, view accommodation details, and navigate the booking process.',
    tech: 'HTML, CSS, JavaScript',
    features: ['Hotel listings and descriptions', 'Search and filtering interface', 'Room and accommodation details', 'Booking interface'],
    outcome: 'Created a user-friendly website concept to make finding and booking accommodation easier.',
  },
  {
    id: 'portfolio',
    title: 'MFPortfolio Mobile App',
    problem: 'A paper CV is hard to carry and update. A recruiter needs to understand a student profile quickly, even without internet.',
    contribution: 'Designed, built and packaged this Android app: screens, navigation, profile editor with validation, photo selection and local saving.',
    tech: 'React Native, Expo, TypeScript, React Navigation, AsyncStorage',
    features: ['Works offline', 'Editable profile saved on the device', 'Profile photo from camera or gallery', 'Standalone Android APK'],
    outcome: 'A portfolio a recruiter can install and read in under two minutes.',
  },
];
