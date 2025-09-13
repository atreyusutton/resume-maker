import { v4 as uuidv4 } from 'uuid';

export const initialResumeData = {
  personal: {
    id: 'personal',
    type: 'personal',
    enabled: true,
    order: 0,
    data: {
      name: 'Atreyu Sutton',
      location: 'Boulder, CO',
      email: 'me@atreyusutton.com',
      phone: '(303) 990-2525',
      linkedin: 'https://linkedin.com/in/atreyusutton',
      github: 'https://github.com/atreyusutton',
      personalSite: 'https://atreyusutton.com'
    }
  },
  objective: {
    id: 'objective',
    type: 'objective',
    enabled: true,
    order: 1,
    data: {
      activeIndex: 0,
      objectives: [
        {
          id: uuidv4(),
          jobTitle: 'Full Stack Developer',
          content: 'Passionate software engineer with expertise in web development and creative technology, seeking to leverage my technical skills and innovative mindset to create impactful digital solutions that bridge the gap between engineering and design.'
        }
      ]
    }
  },
  experience: {
    id: 'experience',
    type: 'experience',
    enabled: true,
    order: 2,
    data: [
      {
        id: uuidv4(),
        enabled: true,
        job: 'Founder & Lead Developer',
        company: 'Sutton Web Solutions',
        link: 'https://suttonwebsolutions.com',
        startDate: 'January 2023',
        endDate: 'Present',
        location: 'Boulder, CO',
        bullets: [
          { id: uuidv4(), enabled: true, text: 'Developed custom web applications for <a href="https://fuelfed.com">FuelFed</a> automotive marketplace' },
          { id: uuidv4(), enabled: true, text: 'Built vacation rental management system for Ute Pass Vacation Rentals' },
          { id: uuidv4(), enabled: true, text: 'Created real estate collaboration platform for The Real Estate Collaborative' },
          { id: uuidv4(), enabled: true, text: 'Designed and implemented Nest Messages communication platform' }
        ]
      },
      {
        id: uuidv4(),
        enabled: true,
        job: 'Video/Photography Technician',
        company: 'Film Gear South Africa',
        link: '',
        startDate: 'June 2022',
        endDate: 'December 2022',
        location: 'Cape Town, South Africa',
        bullets: [
          { id: uuidv4(), enabled: true, text: 'Managed technical equipment for film and photography productions' },
          { id: uuidv4(), enabled: true, text: 'Collaborated with international production teams on commercial projects' }
        ]
      },
      {
        id: uuidv4(),
        enabled: true,
        job: 'Sustainable Engineer',
        company: 'Yestermorrow',
        link: 'https://yestermorrow.org',
        startDate: 'May 2021',
        endDate: 'August 2021',
        location: 'Waitsfield, VT',
        bullets: [
          { id: uuidv4(), enabled: true, text: 'Designed and implemented sustainable building solutions' },
          { id: uuidv4(), enabled: true, text: 'Taught sustainable engineering principles to students' }
        ]
      }
    ]
  },
  skills: {
    id: 'skills',
    type: 'skills',
    enabled: true,
    order: 3,
    data: [
      {
        id: uuidv4(),
        enabled: true,
        category: 'Technical',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS']
      },
      {
        id: uuidv4(),
        enabled: true,
        category: 'Creative',
        skills: ['UI/UX Design', 'Adobe Creative Suite', 'Figma', 'Photography', 'Video Editing']
      },
      {
        id: uuidv4(),
        enabled: true,
        category: 'Engineering',
        skills: ['CAD Design', '3D Modeling', 'Sustainable Design', 'Project Management']
      },
      {
        id: uuidv4(),
        enabled: true,
        category: 'Professional',
        skills: ['Communication', 'Leadership', 'Problem Solving', 'Team Collaboration']
      },
      {
        id: uuidv4(),
        enabled: true,
        category: 'Automotive',
        skills: ['Engine Diagnostics', 'Performance Tuning', 'Restoration', 'Racing']
      }
    ]
  },
  education: {
    id: 'education',
    type: 'education',
    enabled: true,
    order: 4,
    data: [
      {
        id: uuidv4(),
        enabled: true,
        school: 'University of Colorado Boulder',
        degree: 'M.S. Engineering Creative Technology and Design',
        startDate: 'August 2025',
        endDate: 'May 2027',
        gpa: '',
        location: 'Boulder, CO'
      },
      {
        id: uuidv4(),
        enabled: true,
        school: 'University of Colorado Boulder',
        degree: 'M.S. Engineering Software Engineering',
        startDate: 'August 2025',
        endDate: 'May 2027',
        gpa: '',
        location: 'Boulder, CO'
      },
      {
        id: uuidv4(),
        enabled: true,
        school: 'Rollins College',
        degree: 'B.A. Computer Science — 4.0 GPA',
        startDate: 'August 2020',
        endDate: 'May 2023',
        gpa: '',
        location: 'Winter Park, FL'
      },
      {
        id: uuidv4(),
        enabled: true,
        school: 'University of Central Florida',
        degree: 'Object Oriented Programming',
        startDate: 'August 2022',
        endDate: 'December 2022',
        gpa: '',
        location: 'Orlando, FL'
      },
      {
        id: uuidv4(),
        enabled: true,
        school: 'University of Colorado Boulder',
        degree: 'Software Development',
        startDate: 'May 2022',
        endDate: 'August 2022',
        gpa: '',
        location: 'Boulder, CO'
      },
      {
        id: uuidv4(),
        enabled: true,
        school: 'Radford Racing',
        degree: 'Driving School',
        startDate: 'May 2021',
        endDate: 'June 2021',
        gpa: '',
        location: ''
      },
      {
        id: uuidv4(),
        enabled: true,
        school: 'Rhode Island School of Design',
        degree: 'Industrial Design Sketching & Rendering',
        startDate: 'June 2019',
        endDate: 'August 2019',
        gpa: '',
        location: 'Providence, RI'
      },
      {
        id: uuidv4(),
        enabled: true,
        school: 'University of Massachusetts Amherst',
        degree: 'Sustainable Engineering & Architecture',
        startDate: 'August 2019',
        endDate: 'December 2019',
        gpa: '',
        location: 'Amherst, MA'
      },
      {
        id: uuidv4(),
        enabled: true,
        school: 'Brown University',
        degree: 'Economics',
        startDate: 'May 2018',
        endDate: 'August 2018',
        gpa: '',
        location: 'Providence, RI'
      }
    ]
  },
  projects: {
    id: 'projects',
    type: 'projects',
    enabled: true,
    order: 5,
    data: [
      {
        id: uuidv4(),
        enabled: true,
        title: 'Car Restoration',
        skillsUsed: ['Mechanical Engineering', 'Project Management', 'Problem Solving'],
        description: 'Complete restoration of a classic vehicle, involving engine rebuild, bodywork, and electrical system overhaul. Managed timeline and budget while learning advanced automotive repair techniques.'
      }
    ]
  },
  other: {
    id: 'other',
    type: 'other',
    enabled: true,
    order: 6,
    data: [
      {
        id: uuidv4(),
        enabled: true,
        title: 'Racing Experience',
        content: 'Completed professional driving school at Radford Racing, developing high-performance driving skills and understanding of vehicle dynamics.'
      }
    ]
  }
};

export const sectionTypes = {
  personal: 'Personal Information',
  objective: 'Objective',
  experience: 'Experience',
  skills: 'Skills',
  education: 'Education',
  projects: 'Projects',
  other: 'Other'
};
