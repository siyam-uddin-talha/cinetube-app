import { Audio, Video, AVPlaybackStatusToSet } from "expo-av";

// play audio
export const play = async (
  playbackObj: Video,
  uri: string,
  play: boolean,
  lastPosition?: number
) => {
  try {
    if (!lastPosition)
      return await playbackObj.loadAsync(
        {
          uri,
        },
        {
          shouldPlay: play,
        }
      );

    // but if there is lastPosition then we will play audio from the lastPosition
    await playbackObj.loadAsync(
      { uri },
      { progressUpdateIntervalMillis: 1000 }
    );

    return await playbackObj.playFromPositionAsync(lastPosition);
  } catch (error: any) {
    console.log("error inside play helper method", error.message);
  }
};

export const pause = async (playbackObj: Video) => {
  try {
    return await playbackObj.setStatusAsync({
      shouldPlay: false,
    });
  } catch (error: any) {
    console.log("error inside pause helper method", error.message);
  }
};

// resume audio
export const resume = async (playbackObj: Video) => {
  try {
    return await playbackObj.playAsync();
  } catch (error: any) {
    console.log("error inside resume helper method", error.message);
  }
};
// reply the song
export const replay = async (playbackObj: Video, uri: string) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    return await play(playbackObj, uri, true);
  } catch (error: any) {
    console.log("error inside replay helper method", error.message);
  }
};

// select another audio
export const playNext = async (playbackObj: Video, uri: string) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    return await play(playbackObj, uri, true);
  } catch (error: any) {
    console.log("error inside playNext helper method", error.message);
  }
};
