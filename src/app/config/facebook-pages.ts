// Configure your Facebook public pages here
// Replace these URLs with your actual Facebook page URLs

export const facebookPagesConfig = [
  {
    id: 'main',
    url: 'https://www.facebook.com/YourCSCMainPage',
    title: 'Central Student Council Main Page',
    description: 'Main announcements and updates from Central Student Council',
  },
  {
    id: 'events',
    url: 'https://www.facebook.com/YourCSCEventsPage',
    title: 'Central Student Council Events',
    description: 'Upcoming events and activities',
  },
  {
    id: 'academics',
    url: 'https://www.facebook.com/YourCSCAcademicsPage',
    title: 'Central Student Council Academics',
    description: 'Academic resources and announcements',
  },
  {
    id: 'projects',
    url: 'https://www.facebook.com/YourCSCProjectsPage',
    title: 'Central Student Council Projects',
    description: 'Student projects and collaborations',
  },
];

// Official Faculty Pages Configuration
export const officialPagesConfig = [
  {
    id: 'academic',
    url: 'https://www.facebook.com/PUPSTBACAD',
    title: 'PUP STC Academic Head Office',
    description: 'Official academic office page',
  },
  {
    id: 'student-affairs',
    url: 'https://www.facebook.com/PUPSTCStudentAffairsandServicesSection',
    title: 'PUP STC Student Affairs and Services',
    description: 'Student affairs and services',
  },
  {
    id: 'admission',
    url: 'https://www.facebook.com/profile.php?id=100092626801335',
    title: 'PUP STC Admission Services',
    description: 'Admission and enrollment services',
  },
  {
    id: 'csc-page',
    url: 'https://www.facebook.com/PUPSTBcsc',
    title: 'PUP STC Central Student Council',
    description: 'Official Central Student Council page',
  },
];

// In production, you would fetch announcements from Facebook Graph API
// For now, this is sample data structure for announcements
export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  source: string;
  type: 'announcement' | 'urgent' | 'event';
}
