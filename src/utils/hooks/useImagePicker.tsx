import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export const useImagePicker = async ({
  option,
  selectionLimit,
}: {
  option: 'camera' | 'library';
  selectionLimit?: number;
}): Promise<Asset[] | null> => {
  try {
    if (option === 'camera') {
      const result = await launchCamera({
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
      });

      if (!result.didCancel && result.assets) {
        return result.assets; // Return selected images
      } else {
        // console.log('Camera operation canceled.');
        return null; // Handle case where user cancels
      }
    }

    if (option === 'library') {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
        selectionLimit: selectionLimit ? selectionLimit : 1, // Default to 1 if no limit provided
      });

      if (!result.didCancel && result.assets) {
        return result.assets; // Return selected images
      } else {
        // console.log('Image selection operation canceled.');
        return null; // Handle case where user cancels
      }
    }

    return null; // If the option is neither 'camera' nor 'library'
  } catch (error) {
    // console.log('Error during image picker:', error);
    return null; // Return null on error
  }
};
