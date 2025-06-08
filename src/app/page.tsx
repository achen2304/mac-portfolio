'use client';

import React from 'react';
import { Squares } from '@/components/ui/squares-background';
import { useTheme } from '@/components/theme-provider';
import { themes } from '@/lib/themes';
import TaskbarShell from '@/components/taskbar/taskbar-shell';
import {
  WindowManagerProvider,
  useWindowManager,
} from '@/components/webpage/window-manager';
import { useAppOpener } from '@/components/webpage/app-openers';
import { desktopApps } from '@/data/apps/desktop-apps';
import { taskbarApps } from '@/data/apps/taskbar-apps';
import Image from 'next/image';

// Demo content component that uses the window manager
const DemoContent: React.FC = () => {
  const { theme } = useTheme();
  const currentTheme = themes[theme as keyof typeof themes];
  const { openAppById } = useAppOpener();
  const { windows, closeWindow } = useWindowManager();

  // Handle desktop icon click - close existing window and reopen
  const handleDesktopIconClick = (appId: string) => {
    // Find window that starts with the app ID (to handle unique window IDs)
    const openWindow = windows.find((window) => window.id.startsWith(appId));

    if (openWindow) {
      // Close the existing window first
      closeWindow(openWindow.id);
      // Small delay to ensure clean closing, then reopen
      setTimeout(() => {
        openAppById(appId);
      }, 100);
    } else {
      // If not open, just open it
      openAppById(appId);
    }
  };

  return (
    <div
      className="h-full w-full p-6"
      style={{ minHeight: 'calc(100vh - 48px)' }}
    >
      {/* Desktop Icons Grid - Vertical layout like Windows */}
      <div className="grid grid-rows-8 grid-flow-col gap-4 h-full content-start auto-cols-max">
        {desktopApps.map((app) => (
          <div
            key={app.id}
            onClick={() => handleDesktopIconClick(app.id)}
            className="flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10 active:bg-white/20 group"
            style={{
              width: '90px',
              height: '90px',
            }}
          >
            {/* App Icon */}
            <div className="mb-2 transition-transform duration-200 group-hover:scale-110">
              <Image
                src={app.icon}
                alt={app.name}
                className="w-12 h-12 object-contain drop-shadow-lg"
                width={48}
                height={48}
                style={{
                  filter:
                    theme === 'dark'
                      ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                      : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                }}
              />
            </div>

            {/* App Name */}
            <span
              className="text-xs font-medium text-center leading-tight px-1 py-0.5 rounded transition-all duration-200"
              style={{
                color: currentTheme.text.primary,
              }}
            >
              {app.name}
            </span>
          </div>
        ))}
      </div>

      {/* Desktop Context Menu Area (Right-click functionality could be added here) */}
      <div className="absolute bottom-16 right-6 text-xs opacity-30">
        <div style={{ color: currentTheme.text.muted }}>
          Right-click for context menu
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <WindowManagerProvider>
      {/* Prevent document expansion during window dragging */}
      <style jsx global>{`
        html,
        body {
          overflow: hidden;
          width: 100vw;
          height: 100vh;
          position: fixed;
        }
      `}</style>
      <HomeContent />
    </WindowManagerProvider>
  );
}

const HomeContent: React.FC = () => {
  const { theme } = useTheme();
  const currentTheme = themes[theme as keyof typeof themes];
  const { openAppById } = useAppOpener();

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: currentTheme.background }}
    >
      {/* Animated Squares Background covering entire viewport */}
      <div className="fixed inset-0">
        <Squares
          direction="diagonal"
          speed={0.3}
          squareSize={30}
          borderColor={currentTheme.squares.border}
          hoverFillColor={currentTheme.squares.hoverFill}
          backgroundColor={currentTheme.squares.background}
          className="w-full h-full"
        />
        <div
          className="absolute inset-0"
          style={{ background: currentTheme.gradient.radial }}
        />
      </div>

      {/* Main Content Area */}
      <div
        className="relative z-10 pb-12"
        style={{ minHeight: 'calc(100vh - 48px)' }}
      >
        {/* Portfolio Content */}
        <DemoContent />
      </div>

      {/* Windows Taskbar Shell - All panels managed here */}
      <TaskbarShell apps={taskbarApps} onAppClick={openAppById} />
    </div>
  );
};
