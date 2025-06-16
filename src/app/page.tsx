'use client';

import React, { useEffect } from 'react';
import { Squares } from '@/components/ui/squares-background';
import { useTheme } from '@/components/theme-provider';
import { themes } from '@/lib/themes';
import TaskbarShell from '@/components/taskbar/taskbar-shell';
import {
  WindowManagerProvider,
  useWindowManager,
} from '@/components/webpage/window-manager';
import { useAppOpener } from '@/components/webpage/app-openers';
import { desktopApps } from '@/components/webpage/apps/desktop-apps';
import { taskbarApps } from '@/components/webpage/apps/taskbar-apps';
import Image from 'next/image';

// Demo content component that uses the window manager
const DemoContent: React.FC = () => {
  const { theme } = useTheme();
  const currentTheme = themes[theme as keyof typeof themes];
  const { openAppById } = useAppOpener();
  const { windows, focusAndRestoreWindow, focusWindow } = useWindowManager();

  useEffect(() => {
    const storedWindows =
      typeof window !== 'undefined'
        ? localStorage.getItem('windowStates')
        : null;

    if (windows.length === 0 && !storedWindows) {
      const timer = setTimeout(() => {
        openAppById('text-editor');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [windows.length, openAppById]);

  const handleDesktopIconClick = (appId: string) => {
    const openWindow = windows.find((window) => window.id === appId);

    if (openWindow) {
      if (openWindow.isMinimized) {
        focusAndRestoreWindow(appId);
      } else {
        focusWindow(appId);
      }
    } else {
      openAppById(appId);
    }
  };

  return (
    <div
      className="h-full w-full p-6 relative"
      style={{ minHeight: 'calc(100vh - 48px)' }}
    >
      {/* Desktop Icons - Vertical flexbox layout with fixed positioning */}
      <div className="flex flex-col flex-wrap fixed top-6 left-6 h-[calc(100vh-65px)] gap-4 content-start z-0">
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
                src={
                  theme === 'dark' && app.iconLight !== undefined
                    ? app.icon || '/app icons/quick links/default.svg'
                    : app.iconLight ||
                      app.icon ||
                      '/app icons/quick links/default.svg'
                }
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

      {/* Copyright notice - Fixed to bottom right, accounting for taskbar */}
      <div className="fixed bottom-0 right-0 mb-[56px] mr-3 text-xs opacity-30 z-10">
        <div style={{ color: currentTheme.text.muted }}>
          @{new Date().getFullYear()} Cai Chen. All rights reserved.
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
  const [fadeIn, setFadeIn] = React.useState(true);

  // Handle fade-in animation
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: currentTheme.background }}
    >
      {/* CSS for fade-in animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .fade-in-overlay {
          animation: fadeIn 2s ease-out forwards;
        }
      `}</style>

      {/* Black overlay with fade-in animation */}
      {fadeIn && (
        <div
          className="fixed inset-0 pointer-events-none z-[1000]"
          style={{
            backgroundColor: 'black',
            animation: 'fadeIn 2s ease-out forwards',
          }}
        />
      )}

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
