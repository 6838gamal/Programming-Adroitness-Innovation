
import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';
import { BarChart, BookOpenCheck, Bot, BrainCircuit, Code, Compass, GanttChartSquare, Gem, GitFork, Globe, Layers, Library, Lock, MessageSquare, Presentation, ShieldCheck, Users } from 'lucide-react';

const findImage = (id: string): ImagePlaceholder => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    return {
      id: 'placeholder',
      description: 'Placeholder Image',
      imageUrl: 'https://picsum.photos/seed/placeholder/600/400',
      imageHint: 'abstract',
    };
  }
  return image;
};

export type Course = {
  id: string;
  title: string;
  category: 'Programming' | 'AI' | 'Cybersecurity' | 'Data Science' | 'Web Development' | 'Cloud Computing';
  description: string;
  image: ImagePlaceholder;
  duration: string;
  lessons: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress?: number;
};

export const courses: Course[] = [
  {
    id: 'python-mastery',
    title: 'Python for Beginners',
    category: 'Programming',
    description: 'A comprehensive course on Python programming fundamentals.',
    image: findImage('python-mastery'),
    duration: '12 Hours',
    lessons: 45,
    level: 'Beginner',
    progress: 65,
  },
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    category: 'AI',
    description: 'Learn the basics of Artificial Intelligence and Machine Learning.',
    image: findImage('ai-fundamentals'),
    duration: '18 Hours',
    lessons: 60,
    level: 'Beginner',
    progress: 30,
  },
  {
    id: 'cybersecurity-essentials',
    title: 'Cybersecurity Essentials',
    category: 'Cybersecurity',
    description: 'Protect systems and data from modern cyber threats.',
    image: findImage('cybersecurity-essentials'),
    duration: '24 Hours',
    lessons: 75,
    level: 'Intermediate',
  },
  {
    id: 'web-development-bootcamp',
    title: 'Web Development Bootcamp',
    category: 'Web Development',
    description: 'Become a full-stack web developer from scratch.',
    image: findImage('web-development-bootcamp'),
    duration: '120 Hours',
    lessons: 350,
    level: 'Beginner',
  },
  {
    id: 'data-science-deep-dive',
    title: 'Data Science Deep Dive',
    category: 'Data Science',
    description: 'Master data analysis, visualization, and modeling with Python.',
    image: findImage('data-science-deep-dive'),
    duration: '40 Hours',
    lessons: 120,
    level: 'Advanced',
    progress: 15
  },
  {
    id: 'cloud-computing-aws',
    title: 'Cloud Computing with AWS',
    category: 'Cloud Computing',
    description: 'Learn to build and deploy scalable applications on AWS.',
    image: findImage('cloud-computing-aws'),
    duration: '30 Hours',
    lessons: 90,
    level: 'Intermediate',
  },
  {
    id: 'react-for-beginners',
    title: 'Interactive UIs with React',
    category: 'Web Development',
    description: 'A beginner-friendly guide to building modern user interfaces with React.',
    image: findImage('react-for-beginners'),
    duration: '15 Hours',
    lessons: 55,
    level: 'Beginner',
  },
  {
    id: 'ethical-hacking',
    title: 'Ethical Hacking & PenTesting',
    category: 'Cybersecurity',
    description: 'Learn to think like a hacker to secure networks and systems.',
    image: findImage('ethical-hacking'),
    duration: '35 Hours',
    lessons: 110,
    level: 'Advanced',
  },
];

export type Resource = {
    id: string;
    title: string;
    type: 'Tutorial' | 'Cheat Sheet' | 'Note' | 'Article';
    category: string;
    date: string;
    author: string;
};

export const resources: Resource[] = [
    { id: 'res-1', title: 'React Hooks Cheatsheet', type: 'Cheat Sheet', category: 'Web Development', date: '2024-05-10', author: 'Jane Doe'},
    { id: 'res-2', title: 'Understanding Python Decorators', type: 'Tutorial', category: 'Programming', date: '2024-05-08', author: 'John Smith'},
    { id: 'res-3', title: 'CSS Flexbox vs. Grid', type: 'Article', category: 'Web Development', date: '2024-05-12', author: 'Alex Ray'},
    { id: 'res-4', title: 'Introduction to Neural Networks', type: 'Note', category: 'AI', date: '2024-04-20', author: 'Emily White'},
    { id: 'res-5', title: 'SQL Injection Prevention', type: 'Cheat Sheet', category: 'Cybersecurity', date: '2024-05-15', author: 'Michael Brown'},
];

export type CommunityPost = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
};

export const communityPosts: CommunityPost[] = [
    {
        id: 'post-1',
        author: { name: 'Alice', avatar: 'https://picsum.photos/seed/avatar1/40/40' },
        title: 'Showcase: My new portfolio website built with Next.js',
        content: "Hey everyone, I've just launched my new portfolio. It's built with Next.js and Tailwind CSS. Would love to get some feedback!",
        timestamp: '2 hours ago',
        likes: 15,
        comments: 4,
    },
    {
        id: 'post-2',
        author: { name: 'Bob', avatar: 'https://picsum.photos/seed/avatar2/40/40' },
        title: 'Question about Python list comprehensions',
        content: "I'm having trouble understanding how to use conditions inside list comprehensions. Can someone explain it with a simple example?",
        timestamp: '5 hours ago',
        likes: 8,
        comments: 6,
    }
];

export const adminNavItems = [
  { href: '/admin', icon: GanttChartSquare, label: 'Dashboard' },
  { href: '/admin/users', icon: Users, label: 'Users' },
  { href: '/admin/courses', icon: BookOpenCheck, label: 'Courses' },
  { href: '/admin/settings', icon: ShieldCheck, label: 'AI Settings' },
];

export const dashboardNavItems = [
  {
    label: 'tools',
    items: [
      { href: '/assistant', icon: Bot, label: 'ai_assistant', disabled: false },
      { href: '/guidance-assistant', icon: Compass, label: 'career_guide', disabled: false },
      { href: '/resources', icon: Library, label: 'resources', disabled: true },
    ],
  },
  {
    label: 'personal',
    items: [
      { href: '/dashboard', icon: GanttChartSquare, label: 'dashboard', disabled: true },
      { href: '/courses', icon: BookOpenCheck, label: 'courses', disabled: true },
      { href: '/suggest-courses', icon: Gem, label: 'for_you', disabled: true },
    ],
  },
  {
    label: 'community',
    items: [
      { href: '/community', icon: MessageSquare, label: 'discussions', disabled: true },
      { href: '/projects', icon: Presentation, label: 'projects', disabled: true },
      { href: '/groups', icon: Users, label: 'study_groups', disabled: true },
    ],
  },
];

export const courseCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'programming', label: 'Programming', icon: Code },
    { value: 'ai', label: 'AI', icon: BrainCircuit },
    { value: 'cybersecurity', label: 'Cybersecurity', icon: Lock },
    { value: 'data-science', label: 'Data Science', icon: BarChart },
    { value: 'web-development', label: 'Web Development', icon: Globe },
    { value: 'cloud-computing', label: 'Cloud Computing', icon: Layers },
];
