'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { Howl } from 'howler';
import { sounds } from '@/data/sounds';

// Context to track if sounds are enabled
interface ClickSoundContextProps {
  soundEnabled: boolean;
  toggleSound: () => void;
  setVolume: (volume: number) => void;
  volume: number;
  playTestSound: () => void;
  playSoundById: (soundUrl: string) => void;
  sounds: typeof sounds;
}

const ClickSoundContext = createContext<ClickSoundContextProps>({
  soundEnabled: true,
  toggleSound: () => {},
  setVolume: () => {},
  volume: 0.3,
  playTestSound: () => {},
  playSoundById: () => {},
  sounds: sounds,
});

// Create audio instance - keep it outside the component to ensure a single instance
const clickSound = new Howl({
  src: ['/sounds/click.mp3'],
  volume: 0.3,
  preload: true,
});

// Track volume globally to ensure it's consistent across all clicks
let globalVolume = 0.3;

/**
 * Provider component that sets up global click sounds
 * This provider automatically attaches click sounds to all interactive elements
 */
export function ClickSoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const documentRef = useRef<Document | null>(null);

  // Set the volume for the click sound
  const setVolume = (volumeLevel: number) => {
    try {
      // Convert 0-100 scale to 0-1 scale for Howler
      const normalizedVolume = Math.max(0, Math.min(100, volumeLevel)) / 100;

      // Update global volume
      globalVolume = normalizedVolume;

      // Set the volume on the Howl instance
      clickSound.volume(normalizedVolume);
    } catch (error) {
      console.error('Error setting click sound volume:', error);
    }
  };

  // Play a sound by URL
  const playSoundById = (soundUrl: string) => {
    if (!soundEnabled) return;

    try {
      const sound = new Howl({
        src: [soundUrl],
        volume: globalVolume,
      });
      sound.play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  // Global click handler wrapped in useCallback
  const handleGlobalClick = useCallback(
    (e: MouseEvent) => {
      // Skip if sounds are disabled
      if (!soundEnabled) return;

      // Get the clicked element
      const target = e.target as HTMLElement;

      // Check if the clicked element is interactive (button, link, or has interactive class/attribute)
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.getAttribute('role') === 'button' ||
        target.getAttribute('aria-role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        // Don't use invalid CSS selectors with pseudo-classes
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        target.closest('button') ||
        target.closest('a');

      // Play sound if the element is interactive
      if (isInteractive) {
        try {
          // Ensure we're using the latest global volume
          clickSound.volume(globalVolume);

          // Play the click sound
          clickSound.play();
        } catch (error) {
          console.error('Error playing click sound:', error);
        }
      }
    },
    [soundEnabled]
  );

  // Function to play a test click sound
  const playTestSound = () => {
    if (soundEnabled) {
      try {
        // Make sure the sound uses the current global volume
        clickSound.volume(globalVolume);

        // Play the click sound
        clickSound.play();
        return true;
      } catch (error) {
        console.error('Error playing test click sound:', error);
      }
    }
    return null;
  };

  // Toggle sound on/off
  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  // Set up event listener
  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      documentRef.current = document;
      document.addEventListener('click', handleGlobalClick);

      return () => {
        document.removeEventListener('click', handleGlobalClick);
      };
    }
  }, [soundEnabled, handleGlobalClick]);

  // Keep the context updated with current values
  useEffect(() => {
    // This effect doesn't need to depend on globalVolume since it's a module-level variable
  }, []);

  return (
    <ClickSoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        setVolume,
        volume: globalVolume, // Always use the global volume here
        playTestSound,
        playSoundById,
        sounds,
      }}
    >
      {children}
    </ClickSoundContext.Provider>
  );
}

// Hook to access sound settings
export function useClickSound() {
  return useContext(ClickSoundContext);
}
