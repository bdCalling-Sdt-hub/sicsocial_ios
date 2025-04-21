import {useRef} from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const useAudioPlayer = () => {
  const isPlayingRef = useRef(false); // Track playback state directly
  const currentLinkRef = useRef<string | null>(null); // Store the current audio link directly

  const playAudio = async (audioUrl: string) => {
    try {
      await audioRecorderPlayer.startPlayer(audioUrl);

      isPlayingRef.current = true;
      currentLinkRef.current = audioUrl; // Update the ref to reflect the currently playing link

      // Listener to handle playback completion
      audioRecorderPlayer.addPlayBackListener(e => {
        if (e?.current_position >= e.duration) {
          stopAudio(); // Stop playback when audio completes
        }
      });
    } catch (error) {
      // console.log('Error starting audio playback:', error);
    }
  };

  const stopAudio = async () => {
    try {
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();

      isPlayingRef.current = false;
      currentLinkRef.current = null; // Clear the current link after stopping
    } catch (error) {
      // console.log('Error stopping audio:', error);
    }
  };

  // Toggle function to start or stop audio based on the link
  const toggleAudioPlayback = async (audioUrl: string) => {
    if (isPlayingRef.current) {
      if (currentLinkRef.current === audioUrl) {
        // If the same audio is playing, just stop it
        await stopAudio();
      } else {
        // If a different audio is requested, stop the current and play the new
        await stopAudio();
        setTimeout(async () => {
          // Start the new audio only after the previous one has stopped
          await playAudio(audioUrl);
        }, 100); // Delay to ensure previous stop action completes
      }
    } else {
      // If nothing is playing, start the requested audio
      await playAudio(audioUrl);
    }
  };

  return {
    isPlaying: isPlayingRef.current,
    toggleAudioPlayback,
    currentLink: currentLinkRef.current, // Expose current link as a read-only value if needed in the UI
  };
};
