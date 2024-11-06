import RNFS from 'react-native-fs';
export async function speechToText(audioFile: {
  name: string;
  type: string;
  uri: string;
}): Promise<void> {
  const apiKey: string = 'AIzaSyDeHrXtr8_FdAKF2Cpw472_OqI-uPAVuB8'; // Replace with your API key
  const url: string = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;

  // Determine the encoding type based on the file type
  let encoding: string;
  switch (audioFile.type) {
    case 'audio/mp4':
    case 'audio/m4a':
      encoding = 'AAC'; // Use AAC encoding for MP4 and M4A
      break;
    // ... other cases
    default:
      console.error('Unsupported audio format:', audioFile.type);
      return; // Exit if unsupported format
  }

  try {
    const audioBytes: string = await getAudioBytes(audioFile.uri);

    const requestBody = {
      config: {
        encoding: encoding,
        sampleRateHertz: 16000, // Change as necessary
        languageCode: 'en-US',
      },
      audio: {
        content: audioBytes,
      },
    };

    console.log('Request Body:', JSON.stringify(requestBody, null, 2));

    const response: Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      throw new Error(
        `Network response was not ok: ${errorData.error.message}`,
      );
    }

    const data = await response.json();
    console.log('Full response data:', data);

    // Handle response
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getAudioBytes(uri: string): Promise<string> {
  // Read the file at the specified URI and convert it to base64
  const base64String = await RNFS.readFile(uri, 'base64');
  return base64String;
}
