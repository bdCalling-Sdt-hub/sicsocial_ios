import {Button, PermissionsAndroid, Text, View} from 'react-native';
import React, {useState} from 'react';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Voice from '@react-native-voice/voice';

const audioRecorderPlayer = new AudioRecorderPlayer();

const AudioVoiceComponent = () => {
  const [recordOn, setRecordOn] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [audioPath, setAudioPath] = useState('');

  // Request necessary permissions for audio recording
  const requestPermissions = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  const recodingOn = async () => {
    if (!recordOn) {
      await requestPermissions(); // Request permissions
      setRecordOn(true);
      const path = await audioRecorderPlayer.startRecorder(); // Start recording
      setAudioPath(path); // Save audio path
      console.log('Recording started, audio file path:', path);

      // Start listening for speech recognition
      startListening();
    } else {
      setRecordOn(false);
      const path = await audioRecorderPlayer.stopRecorder(); // Stop recording
      console.log('Recording stopped, audio file path:', path);
      setAudioPath(path); // Save audio path

      // Stop listening for speech recognition
      stopListening();
    }
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US'); // Change to your desired language
      Voice.onSpeechResults = onSpeechResults; // Set results handler
      console.log('Listening started...');
    } catch (error) {
      console.log('Error starting speech recognition: ', error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop(); // Stop listening
      console.log('Listening stopped.');
    } catch (error) {
      console.log('Error stopping speech recognition: ', error);
    }
  };

  const onSpeechResults = event => {
    console.log('Speech results: ', event.value);
    if (event.value && event.value.length > 0) {
      setRecognizedText(event.value[0]); // Set recognized text
      console.log('Recognized Text:', event.value[0]);
    }
  };

  return (
    <View style={{padding: 20}}>
      <Button
        title={recordOn ? 'Stop Recording' : 'Start Recording'}
        onPress={recodingOn}
      />
      <Text>Recognized Text: {recognizedText}</Text>
      <Text>Audio Path: {audioPath}</Text>
    </View>
  );
};

export default AudioVoiceComponent;
