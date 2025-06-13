import { TaskbarApp } from '@/components/taskbar/taskbar-types';

export const taskbarApps: TaskbarApp[] = [
  {
    id: 'text-editor',
    name: '.txt',
    icon: '/app icons/textlight.svg',
    iconLight: '/app icons/textdark.svg',
  },
  {
    id: 'about-me',
    name: 'About',
    icon: '/app icons/slack.webp',
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: '/app icons/steam.webp',
  },
  {
    id: 'contact-me',
    name: 'Contact',
    icon: '/app icons/outlook.svg',
  },
];
