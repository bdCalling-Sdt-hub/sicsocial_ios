// Import Agora SDK
import {
  AudienceLatencyLevelType,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  IRtcEngineEventHandler,
  createAgoraRtcEngine,
} from 'react-native-agora';
// Import user interface elements
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// Import components related to obtaining Android device permissions
import {PermissionsAndroid, Platform} from 'react-native';
// Import React Hooks
import React, {useEffect, useRef, useState} from 'react';

import {AgoraConfig} from './agora.config';

// Define basic information
const appId = AgoraConfig.APP_ID;
const token = AgoraConfig.TOKEN;
const channelName = AgoraConfig.CHANNEL_NAME;
const uid = 0; // Local user Uid, no need to modify

const App = () => {
  const agoraEngineRef = useRef<IRtcEngine>(); // IRtcEngine instance
  const [isJoined, setIsJoined] = useState(false); // Whether the local user has joined the channel
  const [hostId, setHostId] = useState<string>(); // User role
  const [localId, setLocalId] = useState<string>(); // Uid of the remote user
  const [message, setMessage] = useState(''); // User prompt message
  const eventHandler = useRef<IRtcEngineEventHandler>(); // Callback functions

  const [localUid, setLocalUid] = useState(0);
  const [users, setUsers] = useState<
    Array<{
      uid: string;
      isLocal: boolean;
      role: 'host' | 'audience';
      muted: boolean;
    }>
  >();
  const [role, setRole] = useState<string>();
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    // Initialize the engine when the App starts
    setupVideoSDKEngine();
    // Release memory when the App is closed
    return () => {
      agoraEngineRef.current?.unregisterEventHandler(eventHandler.current!);
      agoraEngineRef.current?.release();
    };
  }, []);

  // Define the setupVideoSDKEngine method called when the App starts
  const setupVideoSDKEngine = async () => {
    try {
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;

      eventHandler.current = {
        onJoinChannelSuccess: data => {
          // console.log('on join on channelsuccess', data);
          setLocalId(data.localUid?.toFixed());
          if (!hostId) {
            setHostId(data.localUid?.toFixed());
            setUsers([
              {
                uid: data.localUid?.toFixed(),
                isLocal: true,
                role: 'host',
                muted: false, // Initial mute state
              },
            ]);
          }
        },
        onUserJoined: (_connection, uid) => {
          setUsers(prev => [
            ...prev,
            {
              uid: uid.toFixed(),
              role: 'audience',
              isLocal: false,
              muted: false,
            },
          ]);
          console.log('User joined', uid);
        },
        onUserOffline: (_connection, uid) => {
          setUsers(prevUsers =>
            prevUsers?.filter(user => user.uid !== uid.toFixed()),
          );
          // console.log('User offline', uid);
        },
        // Adding the audio volume indication event handler
        onAudioVolumeIndication: speakers => {
          // console.log('Audio volume indication:', speakers);
          // console.log({});
          if (speakers.length > 0) {
            // Find the speaker with the highest volume
            const activeSpeaker = speakers.reduce((prev, current) =>
              prev.volume > current.volume ? prev : current,
            );

            // Update the UI to highlight the active speaker
            setUsers(prevUsers =>
              prevUsers.map(user =>
                user.uid === activeSpeaker.uid
                  ? {...user, isSpeaking: true}
                  : {...user, isSpeaking: false},
              ),
            );
          }
        },
      };

      agoraEngine.registerEventHandler(eventHandler.current);
      agoraEngine.initialize({
        appId: appId,
      });

      // Enable audio volume indication
      agoraEngine.enableAudioVolumeIndication(1000, 3, true); // Parameters: interval, smooth, reportVad
    } catch (e) {
      // console.log(e);
    }
  };

  // console.log(users);

  // Define the join method called after clicking the join channel button
  const join = async (selectRole: string) => {
    setRole(selectRole);
    setIsJoined(true);
    try {
      console.log(selectRole);
      // Join the channel as a broadcaster
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        // Set channel profile to live broadcast
        channelProfile: ChannelProfileType.ChannelProfileCommunication,
        // Set user role to broadcaster
        clientRoleType:
          selectRole === 'host'
            ? ClientRoleType.ClientRoleBroadcaster
            : ClientRoleType.ClientRoleAudience,
        // Publish audio collected by the microphone
        publishMicrophoneTrack: true,
        // Do not publish video collected by the camera
        publishMediaPlayerAudioTrack: true,
        // Automatically subscribe to all audio streams
        autoSubscribeAudio: true,
        // Automatically subscribe to all video streams
        autoSubscribeVideo: true,

        // Change the delay level of the audience to achieve fast live broadcast
        audienceLatencyLevel:
          AudienceLatencyLevelType.AudienceLatencyLevelLowLatency,
      });
      agoraEngineRef.current?.enableAudio();
      agoraEngineRef?.current?.isSpeakerphoneEnabled();
      setModalVisible(false);
    } catch (e) {
      // console.log(e);
    }
  };
  // Define the leave method called after clicking the leave channel button
  const leave = () => {
    try {
      // Call leaveChannel method to leave the channel
      agoraEngineRef.current?.leaveChannel();

      setIsJoined(false);
      setModalVisible(true);
    } catch (e) {
      // console.log(e);
    }
  };

  // Toggle mute/unmute for a specific user
  const toggleMute = item => {
    const agoraEngine = agoraEngineRef.current;

    // Mute/unmute local user
    const newMutedState = !item.muted;
    agoraEngine.muteLocalAudioStream(newMutedState);
    setUsers(prevUsers =>
      prevUsers.map(u => (u.uid === item.uid ? {...u, muted: !u.muted} : u)),
    );
  };

  const renderUserItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: item.isSpeaking ? '#d1f7c4' : 'transparent', // Highlight if user is speaking
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
      }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: item.isLocal ? '#4a90e2' : '#7b8b8e',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
        }}>
        <Text style={{color: '#fff', fontSize: 16}}>
          {item.role === 'host' ? (item.uid === localId ? 'H' : 'H') : 'A'}
        </Text>
      </View>
      <Text style={{flex: 1}}>
        {item.role === 'host'
          ? `Host (UID: ${item.uid})`
          : `Audience (UID: ${item.uid})`}
      </Text>
      {item?.uid === localId && (
        <Button
          title={item.muted ? 'Unmute' : 'Mute'}
          onPress={() => toggleMute(item)}
        />
      )}
    </View>
  );

  // Render user interface
  return (
    <View style={{flex: 1, padding: 20}}>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Join as:</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => join('host')}>
              <Text style={styles.buttonText}>Host</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => join('audience')}>
              <Text style={styles.buttonText}>Audience</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {!isJoined ? (
        <Text>Please select a role to join the channel.</Text>
      ) : (
        <>
          <Button title="Leave Channel" onPress={leave} />
          <Text style={{fontSize: 18, marginVertical: 20}}>
            {role === 'host' ? 'You are hosting' : 'You are in the audience'}
          </Text>
          <FlatList
            data={users}
            keyExtractor={item => item.uid.toString()}
            renderItem={renderUserItem}
            ListHeaderComponent={() => (
              <Text style={{fontSize: 16}}>Users in the Channel:</Text>
            )}
          />
        </>
      )}
    </View>
  );
};
// Define UI styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
const getPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
  }
};

export default App;
