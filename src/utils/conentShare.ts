import Share from 'react-native-share';

export const useShearLink = async (options: {
  title: string;
  message: string;
  url: string;
}) => {
  try {
    const result = Share.open(options);
    console.log(await result);
  } catch (error) {
    // console.log(error);
  }
};
