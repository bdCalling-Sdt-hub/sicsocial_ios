import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import createAgoraRtcEngine, {
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  IRtcEngineEventHandler,
} from 'react-native-agora';
import {ActionSheet, GridList} from 'react-native-ui-lib';
import PopUpModal, {
  PopUpModalRef,
} from '../../components/common/modals/PopUpModal';
import {useContextApi, useStyles} from '../../context/ContextApi';
import {
  useGetLiveChatQuery,
  useJoinLiveMutation,
  useLeaveLiveMutation,
  usePermissionRoleMutation,
  useRequestMutation,
  useToggleMuteMutation,
} from '../../redux/apiSlices/liveSlice';
import {isSmall, isTablet, makeImage} from '../../utils/utils';

import {SvgXml} from 'react-native-svg';
import {AgoraConfig} from '../../../agora.config';
import NotifyTopComponent from '../../components/common/notify/NotifyTopComponent';
import ConversationHeader from '../../components/conversation/ConversationHeader';
import {NavigProps} from '../../interfaces/NaviProps';
import {useGetUserProfileQuery} from '../../redux/apiSlices/authSlice';
import {useGetNewsFeetQuery} from '../../redux/apiSlices/homeSlices';
import {getSocket} from '../../redux/services/socket';
import {useShearLink} from '../../utils/conentShare';
import LiveUserCard from './components/LiveUserCard';

const LiveConversationScreen = ({
  navigation,
  route,
}: NavigProps<{
  live: string;
}>) => {
  // console.log(route?.params?.data?.live);
  const {
    data: live,
    refetch: refetchLive,
    isLoading: isLoadingLive,
    isFetching: isFetchingLive,
  } = useGetLiveChatQuery(route?.params?.data?.live || route?.params?.live);

  // console.log(route?.params);
  const [liveInfo, setLiveInfo] = React.useState<any>();

  const {refetch: newsFeetRefetch} = useGetNewsFeetQuery({});

  // console.log(live);
  const modalRef = React.useRef<PopUpModalRef>();
  const [ActiveUser, setActiveUser] = useState<
    Array<{
      user: any;
      role: string;
      uid: number;
      token: string;
      muted?: boolean;
      isHost?: boolean;
      volume?: number;
      volumeEffect?: number;
    }>
  >([]);

  const {height, width} = useWindowDimensions();
  const {colors, font} = useStyles();
  const {isLive, setIsLive, isDark} = useContextApi();
  const [open, setNotify] = React.useState<{
    open: boolean;
    status: 'normal' | 'error' | 'success';
  }>();
  const [showAction, setShowAction] = React.useState<boolean>(false);
  const [SelectItem, setSelectItem] = React.useState<any>();
  const [isMute, setIsMute] = React.useState(
    live?.data?.activeUsers.find(user => user.uid === uid)?.isMute,
  );
  const [localId, setLocalId] = useState<number>();
  const agoraEngineRef = useRef<IRtcEngine>(); // IRtcEngine instance

  const eventHandler = useRef<IRtcEngineEventHandler>();

  const {data: userInfo} = useGetUserProfileQuery({});

  const Captain = live?.data?.createBy === userInfo?.data?._id;
  const Host = live?.data?.activeUsers?.find(
    user => user.user._id === userInfo?.data?._id,
  );

  const uid = live?.data?.activeUsers?.find(
    user => user.user._id === userInfo?.data?._id,
  )?.uid as number;

  const token = live?.data?.activeUsers?.find(
    user => user.user._id === userInfo?.data?._id,
  )?.token;
  const role = live?.data?.activeUsers?.find(
    user => user.user._id === userInfo?.data?._id,
  )?.role;

  // console.log(userInfo?.data?._id);
  useEffect(() => {
    setupVideoSDKEngine();
    // Release memory when the App is closed
    return () => {
      const finedUser = live?.data?.activeUsers?.find(user => user.uid === uid);

      if (finedUser) {
        setActiveUser(prevUsers => prevUsers?.filter(user => user.uid !== uid));
      } else {
      }
      agoraEngineRef.current?.unregisterEventHandler(eventHandler.current!);
      agoraEngineRef.current?.release();
    };
  }, [uid, token, role]);

  // console.log(friends);

  const setupVideoSDKEngine = useCallback(async () => {
    try {
      // Check and request permissions on Android
      if (Platform.OS === 'android') {
        await getPermission();
      }

      // Clear existing instance if reinitializing
      if (agoraEngineRef.current) {
        agoraEngineRef.current.release();
        agoraEngineRef.current = null;
      }

      // Initialize Agora engine instance
      agoraEngineRef.current = createAgoraRtcEngine();

      // Initialize event handlers
      eventHandler.current = {
        onJoinChannelSuccess: (connection, uid, elapsed) => {
          // console.log('JoinChannelSuccess:', {connection, uid, elapsed});
          setLocalId(uid);
        },
        // onUserJoined: (connection, uid, elapsed) => {
        //   // console.log('UserJoined:', {connection, uid, elapsed});
        //   const finedUser = live?.data?.activeUsers?.find(
        //     user => user.uid === uid,
        //   );
        //   if (finedUser) {
        //     // check if already exists
        //     const exists = ActiveUser.find(user => user.uid === uid);

        //     if (!exists) {
        //       setActiveUser(prev => [
        //         ...prev,
        //         {
        //           user: finedUser.user,
        //           role: finedUser.role,
        //           uid: uid,
        //           isHost: finedUser?.user?._id === live?.data?.host,
        //           token: finedUser.token,
        //           muted: finedUser.role === 'host' ? false : true,
        //         },
        //       ]);
        //     }
        //   }
        // },
        // onUserOffline: (connection, uid, reason) => {
        //   // console.log('UserOffline:', {uid, reason});
        // },

        onActiveSpeaker: uid => {
          // console.log('ActiveSpeaker:', uid);
          const finedUser = live?.data?.activeUsers?.find(
            user => user.uid === uid,
          );
          if (finedUser) {
            setActiveUser(prev =>
              prev?.map(user => {
                if (user.uid === uid) {
                  return {...user, volume: 1};
                }
                return user;
              }),
            );
          }
        },

        // onUserMuteAudio(connection, remoteUid, muted) {
        //   console.log('UserMuteAudio:', {connection, remoteUid, muted, uid});

        // },
      };

      // Register event handler
      agoraEngineRef.current.registerEventHandler(eventHandler.current);

      // Initialize Agora with App ID
      agoraEngineRef.current.initialize({
        appId: AgoraConfig.APP_ID,
      });

      agoraEngineRef.current.joinChannel(
        token || '',
        live?.data?.chat || '',
        uid || 0,
        {
          // Set channel profile to live broadcast
          channelProfile: ChannelProfileType.ChannelProfileCommunication,
          // Set user role to audience
          clientRoleType:
            role == 'host'
              ? ClientRoleType.ClientRoleBroadcaster
              : ClientRoleType.ClientRoleAudience,
          // Publish audio collected by the microphone
          publishMicrophoneTrack: role == 'host' ? true : false,
          // publishMicrophoneTrack: false,
          // publishMicrophoneTrack: false,
          // Do not publish video collected by the camera
          publishMediaPlayerAudioTrack: true,
          // Automatically subscribe to all audio streams
          autoSubscribeAudio: true,
        },
      );
    } catch (e) {
      console.log('Error initializing Agora SDK:', e);
    }
  }, [live?.data?.activeUsers]);

  // console.log(ActiveUser);

  // Permission request function for Android
  const getPermission = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ];
      await PermissionsAndroid.requestMultiple(permissions);
    } catch (err) {
      console.warn('Permissions request failed:', err);
    }
  };

  const leave = () => {
    try {
      // Call leaveChannel method to leave the channel
      leaveLive({chatId: live?.data?.chat}).then(res => {
        navigation?.canGoBack()
          ? navigation.goBack()
          : navigation?.navigate('HomeRoutes');
      });
      agoraEngineRef.current?.leaveChannel();
    } catch (e) {
      console.log(e);
    }
  };

  // Toggle mute/unmute for a specific user
  const toggleMute = async () => {
    // console.log(isMute);
    // chnage local user muted
    agoraEngineRef.current.muteLocalAudioStream(isMute ? false : true);

    await ToggleMute(live?.data.chat);

    setIsMute(!isMute);

    // console.log(ActiveUser);
  };

  // console.log(ActiveUser);

  const [updateRole] = usePermissionRoleMutation();
  const [requestRoleUpdate] = useRequestMutation();
  const [leaveLive] = useLeaveLiveMutation();
  const [ToggleMute] = useToggleMuteMutation();

  const handleRequestAccess = () => {
    // setNotify(true);
    requestRoleUpdate({
      chatId: live?.data?.chat,
      userId: SelectItem?.user,
      message: 'accept',
    });
    updateRole({
      chatId: live?.data?.chat,
      role: 'host', ///[host | audience]
      userId: SelectItem?.user,
    }).then(res => {});
  };
  const handleRequest = () => {
    // setNotify(true);
    requestRoleUpdate({
      chatId: live?.data?.chat,
      userId: userInfo?.data?._id,
      message: 'request',
    });

    setNotify({
      open: false,
      status: 'normal',
    });
  };
  const handleRequestReject = () => {
    // setNotify(true);
    requestRoleUpdate({
      chatId: live?.data?.chat,
      userId: SelectItem?.user,
      message: 'reject',
    });

    setNotify({
      open: false,
      status: 'normal',
    });
  };

  const handleSocketUpdate = useCallback((data: any) => {
    // console.log(data);

    refetchLive();
    if (data?.end) {
      newsFeetRefetch();
      modalRef?.current?.open({
        content: 'Live session ended',
        title: 'Live Session',
        button: true,
        buttonColor: colors.primaryColor,
        buttonText: 'Close',
        disable: true,
        onPress() {
          modalRef?.current?.close();
          navigation?.canGoBack()
            ? navigation.goBack()
            : navigation?.navigate('HomeRoutes');
        },
      });
    }
  }, []);

  const handleSocketRequest = useCallback((data: any) => {
    // console.log('reqested', data);
    if (data?.message === 'request') {
      setSelectItem(data);
      setNotify({
        open: true,
        status: 'normal',
      });
    }
    if (data?.message === 'reject') {
      setNotify({
        open: true,
        status: 'error',
      });
    }
    if (data?.message === 'accept') {
      setNotify({
        open: true,
        status: 'success',
      });
    }
  }, []);

  const socket = getSocket();

  // console.log(live?.data?.chat);

  useEffect(() => {
    if (socket) {
      socket?.on(`live::${live?.data?.chat}`, handleSocketUpdate);
    }

    return () => {
      if (socket) {
        socket?.off(`live::${live?.data?.chat}`, handleSocketUpdate);
      }
    };
  }, [socket, live?.data]);

  useEffect(() => {
    if (socket) {
      socket?.on(
        `live::${userInfo?.data?._id?.toString()}::${live?.data?.chat}`,
        handleSocketRequest,
      );
    }

    return () => {
      if (socket) {
        socket?.off(
          `live::${userInfo?.data?._id?.toString()}::${live?.data?.chat}`,
          handleSocketRequest,
        );
        // leave();
      }
    };
  }, [socket, live?.data]);

  // Optimized version for filtering and rendering the host users

  // const [updateLive] = useUpdateLiveMutation();
  // const handleUpdateLive = React.useCallback(async () => {
  //   updateLive({
  //     name: live?.data?.name,
  //     chatId: live?.data?.chat,
  //     book: live?.data?.book._id,
  //   });
  // }, []);

  const [joinLive] = useJoinLiveMutation();
  useEffect(() => {
    if (userInfo?.data?._id && live?.data?.activeUsers) {
      // check user axist on live others wise give the popup to join the live
      if (
        live?.data?.activeUsers?.find(
          user => user.user._id === userInfo?.data?._id,
        )
      ) {
        return;
      } else {
        modalRef?.current?.open({
          content: 'Are you want to join the Room',
          title: 'Live Session',
          button: true,
          buttonColor: colors.primaryColor,
          buttonText: 'Join',
          disable: true,
          onPress() {
            joinLive({
              chatId: live?.data?.chat,
            }).then(res => {
              modalRef?.current?.close();
              // console.log(res);
            });
          },
        });
      }
    }
  }, [userInfo?.data?._id, live?.data?.activeUsers]);

  // console.log(isMuteHost, 'ismutehost');

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: colors.bg,
        width: width,
      }}>
      {/* all notification of lives start  */}
      <NotifyTopComponent
        onRejectOnPress={handleRequestReject}
        normalOnPress={handleRequestAccess}
        name={
          live?.data?.activeUsers?.find(
            user => user.user._id === SelectItem?.user,
          )?.user.fullName
        }
        variant={open?.status}
        open={open?.open || false}
        onDismiss={() => {
          setNotify({
            open: false,
            status: open?.status,
          });
        }}
      />
      {/* all notification of lives end  */}

      <View
        style={{
          height: '8%',
        }}
      />

      <ConversationHeader
        title="Room"
        icon={`<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.28534 11.0001C6.15903 10.9997 6.03756 10.9514 5.94534 10.8651C5.48875 10.4316 5.12515 9.90972 4.87668 9.33122C4.62822 8.75272 4.50009 8.1297 4.50009 7.5001C4.50009 6.8705 4.62822 6.24748 4.87668 5.66898C5.12515 5.09048 5.48875 4.5686 5.94534 4.1351C6.04374 4.05532 6.16874 4.01585 6.29511 4.02468C6.42148 4.03351 6.53978 4.08997 6.62612 4.18266C6.71246 4.27535 6.76041 4.39736 6.76026 4.52404C6.76012 4.65071 6.7119 4.77261 6.62534 4.8651C6.26992 5.20579 5.98709 5.61485 5.79388 6.06769C5.60067 6.52052 5.50107 7.00777 5.50107 7.5001C5.50107 7.99243 5.60067 8.47968 5.79388 8.93251C5.98709 9.38535 6.26992 9.79442 6.62534 10.1351C6.69845 10.2035 6.74932 10.2924 6.77136 10.3901C6.7934 10.4877 6.7856 10.5898 6.74897 10.683C6.71233 10.7762 6.64855 10.8563 6.56589 10.9128C6.48323 10.9693 6.38549 10.9998 6.28534 11.0001ZM4.28534 12.3401C4.37847 12.2464 4.43074 12.1197 4.43074 11.9876C4.43074 11.8555 4.37847 11.7288 4.28534 11.6351C3.72596 11.1014 3.28068 10.4598 2.97644 9.74905C2.67221 9.03831 2.51534 8.27322 2.51534 7.5001C2.51534 6.72698 2.67221 5.96189 2.97644 5.25115C3.28068 4.5404 3.72596 3.89878 4.28534 3.3651C4.38215 3.27161 4.43785 3.1435 4.44019 3.00894C4.44254 2.87438 4.39133 2.74441 4.29784 2.6476C4.20436 2.5508 4.07624 2.4951 3.94168 2.49275C3.80713 2.49041 3.67715 2.54161 3.58034 2.6351C2.92171 3.2627 2.39736 4.01751 2.03909 4.85377C1.68083 5.69003 1.49609 6.59033 1.49609 7.5001C1.49609 8.40987 1.68083 9.31017 2.03909 10.1464C2.39736 10.9827 2.92171 11.7375 3.58034 12.3651C3.62846 12.4104 3.68506 12.4456 3.74689 12.4689C3.80871 12.4922 3.87454 12.503 3.94056 12.5006C4.00657 12.4983 4.07148 12.4829 4.13151 12.4554C4.19155 12.4278 4.24554 12.3886 4.29034 12.3401H4.28534ZM11.0503 10.8651C11.5069 10.4316 11.8705 9.90972 12.119 9.33122C12.3675 8.75272 12.4956 8.1297 12.4956 7.5001C12.4956 6.8705 12.3675 6.24748 12.119 5.66898C11.8705 5.09048 11.5069 4.5686 11.0503 4.1351C11.0024 4.09012 10.9461 4.05503 10.8846 4.03182C10.8231 4.00861 10.7576 3.99773 10.6919 3.99982C10.6262 4.00191 10.5616 4.01692 10.5017 4.04399C10.4418 4.07107 10.3878 4.10967 10.3428 4.1576C10.2979 4.20553 10.2628 4.26186 10.2396 4.32335C10.2163 4.38485 10.2055 4.45031 10.2076 4.51601C10.2097 4.58171 10.2247 4.64635 10.2517 4.70625C10.2788 4.76615 10.3174 4.82012 10.3653 4.8651C10.7227 5.20467 11.0072 5.61338 11.2017 6.06637C11.3961 6.51935 11.4963 7.00715 11.4963 7.5001C11.4963 7.99305 11.3961 8.48085 11.2017 8.93384C11.0072 9.38682 10.7227 9.79553 10.3653 10.1351C10.2688 10.2254 10.212 10.3503 10.2073 10.4824C10.2026 10.6146 10.2505 10.7432 10.3403 10.8401C10.3875 10.891 10.4448 10.9315 10.5085 10.959C10.5722 10.9866 10.6409 11.0006 10.7103 11.0001C10.8367 10.9997 10.9581 10.9514 11.0503 10.8651ZM13.4103 12.3651C14.0709 11.7386 14.597 10.9842 14.9565 10.1478C15.316 9.31136 15.5014 8.4105 15.5014 7.5001C15.5014 6.5897 15.316 5.68884 14.9565 4.85243C14.597 4.01602 14.0709 3.26158 13.4103 2.6351C13.312 2.55532 13.1869 2.51585 13.0606 2.52468C12.9342 2.53351 12.8159 2.58997 12.7296 2.68266C12.6432 2.77535 12.5953 2.89736 12.5954 3.02404C12.5956 3.15071 12.6438 3.27261 12.7303 3.3651C13.2897 3.89878 13.735 4.5404 14.0392 5.25115C14.3435 5.96189 14.5003 6.72698 14.5003 7.5001C14.5003 8.27322 14.3435 9.03831 14.0392 9.74905C13.735 10.4598 13.2897 11.1014 12.7303 11.6351C12.6338 11.7254 12.577 11.8503 12.5723 11.9824C12.5676 12.1146 12.6155 12.2432 12.7053 12.3401C12.752 12.3904 12.8084 12.4305 12.8712 12.458C12.934 12.4856 13.0018 12.4999 13.0703 12.5001C13.1967 12.4997 13.3181 12.4514 13.4103 12.3651ZM9.50034 7.5001C9.50034 7.30232 9.4417 7.10898 9.33181 6.94453C9.22193 6.78008 9.06575 6.65191 8.88303 6.57622C8.7003 6.50053 8.49924 6.48073 8.30525 6.51932C8.11127 6.5579 7.93309 6.65314 7.79324 6.79299C7.65339 6.93285 7.55814 7.11103 7.51956 7.30501C7.48097 7.49899 7.50078 7.70006 7.57646 7.88279C7.65215 8.06551 7.78032 8.22169 7.94477 8.33157C8.10922 8.44145 8.30256 8.5001 8.50034 8.5001C8.76556 8.5001 9.01991 8.39474 9.20745 8.20721C9.39499 8.01967 9.50034 7.76532 9.50034 7.5001Z" fill="#DBB162"/>
</svg>

          `}
        button
        buttonComponent={
          <TouchableOpacity
            onPress={() => {
              leave();
            }}
            activeOpacity={0.9}
            style={{
              backgroundColor: 'rgba(241, 99, 101, 1)',
              width: isSmall()
                ? width * 0.3
                : isTablet()
                ? width * 0.1
                : width * 0.3,
              height: height * 0.04,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 8,
            }}>
            <SvgXml
              xml={`<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_691_5429)">
<path d="M5.59375 1.80081V6.35366C5.59375 7.07206 6.17616 7.65447 6.89456 7.65447H10.6019C10.7815 7.65447 10.9271 7.80006 10.9271 7.97969V9.08769C10.9271 9.36653 11.255 9.51606 11.4655 9.33322L13.2152 7.81378C13.3335 7.71103 13.4849 7.65447 13.6416 7.65447H14.6994C15.4178 7.65447 16.0002 7.07206 16.0002 6.35366V1.80081C16.0002 1.08241 15.4178 0.5 14.6994 0.5H6.89456C6.17612 0.5 5.59375 1.08241 5.59375 1.80081Z" fill="#FD8087"/>
<path d="M14.7008 0.5H13.6602C14.3786 0.5 14.961 1.08241 14.961 1.80081V6.35366C14.961 7.07206 14.3786 7.65447 13.6602 7.65447H14.7008C15.4192 7.65447 16.0016 7.07206 16.0016 6.35366V1.80081C16.0016 1.08241 15.4192 0.5 14.7008 0.5Z" fill="#FE646F"/>
<path d="M9.76859 6.42007C9.44116 6.10485 9.01044 5.93125 8.55575 5.93125C8.46422 5.93125 8.37378 5.93825 8.28503 5.95194C8.23966 5.8905 8.18997 5.83163 8.13616 5.77575C7.80725 5.43413 7.36191 5.24597 6.88219 5.24597C6.41375 5.24597 5.95584 5.43522 5.62587 5.76519L5.59375 5.79732V6.35366C5.59375 7.07207 6.17616 7.65447 6.89456 7.65447H10.2982C10.293 7.18232 10.105 6.744 9.76859 6.42007Z" fill="#FE646F"/>
<path d="M10.0261 10.9296C9.69785 10.6136 9.17554 10.6174 8.85194 10.941L9.57966 10.2132C9.91203 9.88087 9.92007 9.32884 9.58144 9.0028C9.25319 8.68677 8.73088 8.69055 8.40728 9.01415L9.135 8.28643C9.46738 7.95405 9.47541 7.40202 9.13679 7.07599C8.80854 6.75996 8.28622 6.76374 7.96263 7.08734L7.46857 7.5814C7.79216 7.2578 7.79594 6.73549 7.47991 6.40724C7.15388 6.06862 6.60185 6.07665 6.26947 6.40902L2.86441 9.81412L3.29963 9.0603C3.53466 8.65321 3.39953 8.11793 2.98807 7.89065C2.58919 7.67034 2.08569 7.80918 1.85685 8.20552L0.536691 10.4921C-0.369715 12.062 -0.108622 14.045 1.17322 15.3269C2.73738 16.891 5.27338 16.891 6.83753 15.3269L10.0243 12.1401C10.3567 11.8077 10.3647 11.2556 10.0261 10.9296Z" fill="#FED2A4"/>
<path d="M10.0247 10.9297C10.0117 10.9171 9.99825 10.9053 9.98466 10.8938L6.19381 14.6847C4.73894 16.1395 2.44344 16.2409 0.871094 14.9893C0.964281 15.1062 1.06413 15.2193 1.17178 15.3269C2.73594 16.8911 5.27194 16.8911 6.83609 15.3269L10.0229 12.1401C10.3553 11.8077 10.3633 11.2557 10.0247 10.9297Z" fill="#FFBD86"/>
<path d="M13.7759 5.14362H12.9141V4.31155H13.6951C13.8245 4.31155 13.9295 4.20662 13.9295 4.07718C13.9295 3.94774 13.8245 3.8428 13.6951 3.8428H12.9141V3.01074H13.7759C13.9053 3.01074 14.0103 2.9058 14.0103 2.77637C14.0103 2.6469 13.9053 2.54199 13.7759 2.54199H12.6797C12.5502 2.54199 12.4453 2.6469 12.4453 2.77637V5.37799C12.4453 5.50743 12.5502 5.61237 12.6797 5.61237H13.7759C13.9053 5.61237 14.0103 5.50743 14.0103 5.37799C14.0103 5.24855 13.9053 5.14362 13.7759 5.14362Z" fill="#DFF6FD"/>
<path d="M9.22106 3.89643C9.33606 3.75359 9.40513 3.57224 9.40513 3.37499C9.40513 2.91568 9.03144 2.54199 8.57212 2.54199H7.81641C7.68697 2.54199 7.58203 2.6469 7.58203 2.77637V5.37799C7.58203 5.44034 7.60687 5.50012 7.65103 5.54409C7.69497 5.5878 7.75444 5.61237 7.81641 5.61237H7.81744C7.8175 5.61237 8.5125 5.60927 8.70409 5.60927C9.21947 5.60927 9.63875 5.18999 9.63875 4.67462C9.63875 4.35027 9.47262 4.06412 9.22106 3.89643ZM8.57212 3.01074C8.77297 3.01074 8.93638 3.17415 8.93638 3.37499C8.93638 3.57584 8.77297 3.73924 8.57212 3.73924C8.51637 3.73924 8.41119 3.73955 8.29662 3.73993H8.05078V3.01074H8.57212ZM8.70409 5.14052C8.58497 5.14052 8.27153 5.14171 8.05078 5.14262V4.20968C8.12784 4.20937 8.21481 4.20902 8.29703 4.20874H8.70409C8.961 4.20874 9.17 4.41774 9.17 4.67465C9.17 4.93155 8.961 5.14052 8.70409 5.14052Z" fill="#DFF6FD"/>
<path d="M11.8378 2.58658C11.7293 2.51598 11.5841 2.54664 11.5135 2.65514L10.8854 3.61995L10.2509 2.64827C10.1802 2.53986 10.0349 2.50939 9.92657 2.58014C9.8182 2.65092 9.7877 2.79614 9.85848 2.90452L10.6512 4.11855L10.6481 5.37742C10.6478 5.50689 10.7524 5.61205 10.8819 5.61239H10.8825C11.0116 5.61239 11.1165 5.50783 11.1169 5.37861L11.1199 4.11892L11.9064 2.91086C11.9769 2.80239 11.9462 2.6572 11.8378 2.58658Z" fill="#DFF6FD"/>
<path d="M9.78752 9.33896L6.89193 12.2346L6.03765 11.3803L9.13284 8.28509C9.36612 8.05078 9.43859 7.70812 9.34287 7.41215L5.70621 11.0488L4.85193 10.1945L7.46659 7.57987C7.69902 7.34631 7.76543 7.01 7.6659 6.71765L4.52046 9.86309L4.43915 9.78178C4.34762 9.69025 4.19921 9.69025 4.10771 9.78178C4.01618 9.87331 4.01618 10.0217 4.10771 10.1132L6.97321 12.9787C7.01896 13.0245 7.07896 13.0474 7.13893 13.0474C7.1989 13.0474 7.2589 13.0245 7.30465 12.9787C7.39618 12.8872 7.39618 12.7388 7.30465 12.6473L7.22334 12.566L9.57762 10.2117C9.8108 9.97743 9.88321 9.63484 9.78752 9.33896Z" fill="#FFBD86"/>
<path d="M2.86329 9.81357L2.86276 9.8141L3.29798 9.06026C3.44692 8.80232 3.44704 8.49295 3.32257 8.24304L2.49479 9.5192L2.34467 9.75704C2.19526 9.99376 2.18214 10.2954 2.31045 10.5442L2.74914 11.3947C3.03798 11.9547 2.93267 12.6304 2.48707 13.0759L2.38432 13.1787C2.29279 13.2702 2.29282 13.4186 2.38435 13.5101C2.4301 13.5559 2.49007 13.5788 2.55007 13.5788C2.61007 13.5788 2.67004 13.5559 2.71582 13.5101L2.81857 13.4074C3.40895 12.817 3.54845 11.9218 3.16576 11.1798L2.72707 10.3293C2.67457 10.2275 2.67995 10.1041 2.74107 10.0072L2.86329 9.81357Z" fill="#FFBD86"/>
</g>
<defs>
<clipPath id="clip0_691_5429">
<rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
</clipPath>
</defs>
</svg>
            `}
            />
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 13,
                color: colors.textColor.white,
              }}>
              Leave
            </Text>
          </TouchableOpacity>
        }
        navigation={navigation}
      />

      <View
        style={{
          height: 100,
        }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={[1]}
          style={{
            borderBottomColor: colors.gray.variantTwo,
            borderBottomWidth: 1,
          }}
          contentContainerStyle={{
            // gap: 10,
            paddingVertical: 5,
          }}
          ListFooterComponent={() => (
            <View style={{height: 100, justifyContent: 'center'}}>
              <View
                style={{
                  padding: 10,
                  marginRight: 10,
                  width: width * 0.95,
                  height: 70,
                  backgroundColor: colors.secondaryColor,
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: font.Poppins,
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                    }}>
                    {live?.data?.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.PoppinsSemiBold,
                      fontSize: 14,
                      color: colors.textColor.secondaryColor,
                    }}>
                    {
                      live?.data?.activeUsers?.find(
                        u => u.user._id === live?.data?.createBy,
                      )?.user?.fullName
                    }{' '}
                    calling live
                  </Text>
                </View>
              </View>
            </View>
          )}
          renderItem={({item, index}) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation?.navigate('BookShare', {
                      data: live?.data?.book,
                    });
                  }}
                  style={{
                    width: width,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      paddingVertical: 10,
                      marginHorizontal: 5,
                      width: width * 0.95,
                      backgroundColor: colors.secondaryColor,
                    }}>
                    {live?.data?.book?.bookImage && (
                      <View style={{paddingLeft: 10}}>
                        <Image
                          source={{
                            uri: makeImage(live?.data?.book?.bookImage),
                          }}
                          style={{
                            height: 60,
                            aspectRatio: 1,
                            borderRadius: 10,
                          }}
                          resizeMethod="scale"
                          resizeMode="cover"
                        />
                      </View>
                    )}
                    <View
                      style={{
                        flex: 1,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 15,
                          color: colors?.neutralColor,

                          fontFamily: font.PoppinsMedium,
                        }}>
                        {live?.data?.book?.name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 12,
                          color: colors?.textColor.gray,

                          fontFamily: font.Poppins,
                        }}>
                        {live?.data?.book?.publisher}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 10,
                          color: colors?.textColor.gray,

                          fontFamily: font.Poppins,
                        }}>
                        {live?.data?.book?.bookUrl}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>

      <GridList
        showsVerticalScrollIndicator={false}
        containerWidth={width * 0.9}
        style={{
          flex: 1,
        }}
        numColumns={isTablet() ? 10 : 4}
        contentContainerStyle={{
          // alignItems: 'center',
          // alignSelf: 'center',
          paddingHorizontal: '4%',
          paddingVertical: 10,
        }}
        data={live?.data?.activeUsers?.filter(item => item.role === 'host')}
        renderItem={item => {
          return (
            <LiveUserCard
              onPress={() => {
                if (item?.item?.user?._id !== userInfo?.data?._id) {
                  setShowAction(!showAction);
                  setSelectItem(item?.item);
                }
              }}
              sound
              host={item?.item?.user?._id === live?.data?.createBy}
              item={item?.item}
            />
          );
        }}
      />

      <View
        style={{
          paddingVertical: 9,
          // height: 120,
          // gap: 5,
          borderTopColor: colors.gray.variantTwo,
          borderTopWidth: 1,
        }}>
        <View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: font.Poppins,
              color: colors.textColor.neutralColor,
              paddingHorizontal: '4%',
              marginVertical: 5,
            }}>
            Others in room
          </Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          horizontal
          contentContainerStyle={{
            gap: 15,
            paddingHorizontal: '4%',
          }}
          data={live?.data?.activeUsers?.filter(
            item => item.role === 'audience',
          )}
          renderItem={item => (
            <LiveUserCard
              item={item?.item}
              onPress={() => {
                if (item?.item?.user?._id !== userInfo?.data?._id) {
                  setShowAction(!showAction);
                  setSelectItem(item?.item);
                }
              }}
            />
          )}
        />
      </View>
      <View
        style={{
          paddingVertical: 9,
          // height: '8%',
          borderTopColor: colors.gray.variantTwo,
          borderTopWidth: 1,
        }}>
        <View
          style={{
            marginBottom: 10,
            marginTop: 20,
            marginHorizontal: '4%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: height * 0.055,
          }}>
          <View
            style={{
              width: '60%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* ==================live group message start ===================*/}

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{}}
                onPress={() => {
                  navigation?.navigate('LiveMessage', {
                    data: live?.data,
                  });
                }}>
                <View
                  style={{
                    backgroundColor: colors.secondaryColor,
                    paddingVertical: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    borderRadius: 50,
                    paddingHorizontal: 15,
                    gap: 8,
                  }}>
                  <SvgXml
                    xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_691_4737)">
<path d="M20.2587 4.35977C19.1146 3.12092 17.7062 2.15563 16.138 1.53552C14.5699 0.91542 12.8822 0.656429 11.2002 0.77777C8.33274 1.01978 5.66261 2.33637 3.72478 4.46376C1.78696 6.59115 0.724568 9.37222 0.750462 12.2498V22.5C0.750425 22.6483 0.794369 22.7934 0.876736 22.9167C0.959104 23.0401 1.0762 23.1362 1.21321 23.193C1.30421 23.231 1.40187 23.2503 1.50046 23.25C1.69936 23.25 1.89009 23.1709 2.03071 23.0303L3.80371 21.258C4.02001 21.0467 4.30474 20.9196 4.6065 20.8998C4.90825 20.88 5.20715 20.9688 5.44921 21.15C7.71476 22.778 10.5044 23.5061 13.2766 23.1931C16.0488 22.88 18.6057 21.5481 20.4512 19.4558C22.2966 17.3636 23.2988 14.6603 23.2632 11.8707C23.2276 9.08115 22.1569 6.40429 20.2587 4.35977ZM21.6402 13.4895C21.3862 15.1363 20.7144 16.6906 19.6888 18.0039C18.6633 19.3172 17.3183 20.3458 15.7822 20.9915C14.2461 21.6371 12.5702 21.8784 10.9143 21.6921C9.25847 21.5058 7.67799 20.8983 6.32371 19.9275C5.84556 19.5822 5.27105 19.3956 4.68121 19.3943C4.32116 19.3937 3.96456 19.4644 3.63195 19.6023C3.29934 19.7401 2.99729 19.9424 2.74321 20.1975L2.25046 20.6895V12.2498C2.22364 9.75179 3.14168 7.33592 4.82066 5.48614C6.49964 3.63637 8.81556 2.48931 11.3045 2.27477C12.7658 2.17081 14.2319 2.3973 15.5937 2.93743C16.9556 3.47755 18.1784 4.31744 19.1713 5.39476C20.1641 6.47208 20.9017 7.75918 21.3291 9.16051C21.7565 10.5619 21.8628 12.0415 21.6402 13.4895Z" fill="${colors.textColor.normal}"/>
<rect x="7" y="9" width="2" height="5" rx="1" fill="${colors.textColor.normal}"/>
<rect x="11" y="6" width="2" height="11" rx="1" fill="${colors.textColor.normal}"/>
<rect x="15" y="8" width="2" height="7" rx="1" fill="${colors.textColor.normal}"/>
</g>
<defs>
<clipPath id="clip0_691_4737">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
                   `}
                  />
                  {/* <Text
                    style={{
                      fontSize: 14,
                      fontFamily: font.Poppins,
                      color: colors.textColor.secondaryColor,
                    }}>
                    10
                  </Text> */}
                </View>
              </TouchableOpacity>
              {/*==================== live group message end =======================*/}
              {/*===================== live link shear start ======================*/}
              <TouchableOpacity
                onPress={() => {
                  useShearLink({
                    title: 'Share Link',
                    message: 'Shear live line your friends',
                    url: `https://sic.org/conversation/${live?.data?._id}`,
                  });
                }}
                activeOpacity={0.9}
                style={{}}>
                <View
                  style={{
                    backgroundColor: colors.secondaryColor,
                    paddingVertical: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    borderRadius: 50,
                    paddingHorizontal: 15,
                    gap: 8,
                  }}>
                  <SvgXml
                    xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5074 16.1435C17.3575 16.1435 16.3214 16.64 15.6024 17.43L9.13493 13.4243C9.3076 12.9823 9.40337 12.5022 9.40337 12C9.40337 11.4975 9.3076 11.0174 9.13493 10.5756L15.6024 6.56981C16.3214 7.35973 17.3575 7.85649 18.5074 7.85649C20.6735 7.85649 22.4357 6.09429 22.4357 3.92815C22.4357 1.76202 20.6735 0 18.5074 0C16.3412 0 14.579 1.7622 14.579 3.92834C14.579 4.43059 14.675 4.9107 14.8474 5.35271L8.38017 9.35832C7.66112 8.5684 6.62511 8.07164 5.47521 8.07164C3.30908 8.07164 1.54688 9.83403 1.54688 12C1.54688 14.1661 3.30908 15.9283 5.47521 15.9283C6.62511 15.9283 7.66112 15.4317 8.38017 14.6416L14.8474 18.6472C14.675 19.0893 14.579 19.5694 14.579 20.0718C14.579 22.2377 16.3412 24 18.5074 24C20.6735 24 22.4357 22.2377 22.4357 20.0718C22.4357 17.9057 20.6735 16.1435 18.5074 16.1435ZM16.0114 3.92834C16.0114 2.55212 17.1311 1.43243 18.5074 1.43243C19.8836 1.43243 21.0033 2.55212 21.0033 3.92834C21.0033 5.30455 19.8836 6.42424 18.5074 6.42424C17.1311 6.42424 16.0114 5.30455 16.0114 3.92834ZM5.47521 14.4959C4.09881 14.4959 2.97912 13.3762 2.97912 12C2.97912 10.6238 4.09881 9.50407 5.47521 9.50407C6.85143 9.50407 7.97093 10.6238 7.97093 12C7.97093 13.3762 6.85143 14.4959 5.47521 14.4959ZM16.0114 20.0716C16.0114 18.6954 17.1311 17.5757 18.5074 17.5757C19.8836 17.5757 21.0033 18.6954 21.0033 20.0716C21.0033 21.4478 19.8836 22.5675 18.5074 22.5675C17.1311 22.5675 16.0114 21.4478 16.0114 20.0716Z" fill="${colors.textColor.normal}"/>
</svg>

                    `}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: font.Poppins,
                      color: colors.textColor.secondaryColor,
                    }}>
                    {/* 12 */}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* =================live link shear end ======================*/}
            {/*====================== live add more member start==================== */}
            {/* <TouchableOpacity
              onPress={() => {
                navigation?.navigate('LiveAddFriends');
              }}
              activeOpacity={0.9}
              style={{}}>
              <View
                style={{
                  backgroundColor: colors.secondaryColor,
                  paddingVertical: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  borderRadius: 50,
                  paddingHorizontal: 15,
                  gap: 8,
                }}>
                <SvgXml
                  xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.009 10.75C11.8496 10.75 12.6713 10.5007 13.3702 10.0337C14.0691 9.56675 14.6138 8.90299 14.9355 8.12641C15.2572 7.34982 15.3413 6.49529 15.1773 5.67087C15.0134 4.84645 14.6086 4.08917 14.0142 3.4948C13.4198 2.90042 12.6626 2.49565 11.8381 2.33166C11.0137 2.16768 10.1592 2.25184 9.3826 2.57351C8.60601 2.89519 7.94225 3.43992 7.47525 4.13883C7.00826 4.83774 6.759 5.65943 6.759 6.5C6.76032 7.62677 7.20851 8.707 8.00526 9.50375C8.802 10.3005 9.88224 10.7487 11.009 10.75ZM11.009 3.75C11.5529 3.75 12.0846 3.91129 12.5368 4.21346C12.9891 4.51563 13.3415 4.94513 13.5497 5.44762C13.7578 5.95012 13.8123 6.50305 13.7062 7.0365C13.6 7.56995 13.3381 8.05995 12.9535 8.44455C12.5689 8.82914 12.0789 9.09105 11.5455 9.19716C11.0121 9.30327 10.4591 9.24881 9.95662 9.04067C9.45412 8.83253 9.02463 8.48006 8.72246 8.02782C8.42028 7.57558 8.259 7.0439 8.259 6.5C8.25979 5.7709 8.54978 5.07189 9.06533 4.55634C9.58089 4.04078 10.2799 3.7508 11.009 3.75ZM4.75 18.02C4.75 19.583 5.423 20.25 7 20.25H14C14.1989 20.25 14.3897 20.329 14.5303 20.4697C14.671 20.6103 14.75 20.8011 14.75 21C14.75 21.1989 14.671 21.3897 14.5303 21.5303C14.3897 21.671 14.1989 21.75 14 21.75H7C4.582 21.75 3.25 20.425 3.25 18.02C3.25 15.358 4.756 12.25 9 12.25H13C14.3402 12.196 15.6579 12.6077 16.729 13.415C16.8085 13.4757 16.875 13.5516 16.9247 13.6384C16.9744 13.7252 17.0062 13.821 17.0183 13.9202C17.0304 14.0195 17.0226 14.1202 16.9952 14.2163C16.9678 14.3125 16.9215 14.4022 16.859 14.4802C16.7964 14.5582 16.7189 14.6229 16.631 14.6706C16.5431 14.7182 16.4466 14.7477 16.3471 14.7575C16.2476 14.7673 16.1471 14.757 16.0516 14.7274C15.9561 14.6978 15.8675 14.6494 15.791 14.585C14.984 13.9948 13.9986 13.7 13 13.75H9C8.42893 13.706 7.85512 13.7864 7.31816 13.9857C6.7812 14.185 6.29388 14.4985 5.88983 14.9044C5.48578 15.3104 5.17462 15.7992 4.97783 16.3371C4.78105 16.875 4.70331 17.4492 4.75 18.02ZM21.75 19C21.75 19.1989 21.671 19.3897 21.5303 19.5303C21.3897 19.671 21.1989 19.75 21 19.75H19.75V21C19.75 21.1989 19.671 21.3897 19.5303 21.5303C19.3897 21.671 19.1989 21.75 19 21.75C18.8011 21.75 18.6103 21.671 18.4697 21.5303C18.329 21.3897 18.25 21.1989 18.25 21V19.75H17C16.8011 19.75 16.6103 19.671 16.4697 19.5303C16.329 19.3897 16.25 19.1989 16.25 19C16.25 18.8011 16.329 18.6103 16.4697 18.4697C16.6103 18.329 16.8011 18.25 17 18.25H18.25V17C18.25 16.8011 18.329 16.6103 18.4697 16.4697C18.6103 16.329 18.8011 16.25 19 16.25C19.1989 16.25 19.3897 16.329 19.5303 16.4697C19.671 16.6103 19.75 16.8011 19.75 17V18.25H21C21.1989 18.25 21.3897 18.329 21.5303 18.4697C21.671 18.6103 21.75 18.8011 21.75 19Z" fill="${colors.textColor.normal}"/>
</svg>


                     `}
                />
              </View>
            </TouchableOpacity> */}
            {/* live add more member end */}
          </View>
          {/* ===============live joined and knock and voice run on or off start============ */}
          <TouchableOpacity
            style={{}}
            onPress={() => {
              // setRunOnVoice(!runOnVoice);

              if (role === 'host') {
                toggleMute();
              } else {
                handleRequest();
              }
            }}>
            <View
              style={{
                // backgroundColor: runOnVoice
                //   ? colors.primaryColor
                //   : colors.secondaryColor,
                backgroundColor: colors.primaryColor,

                paddingVertical: 12,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                borderRadius: 50,
                paddingHorizontal: 14,
                gap: 8,
              }}>
              {role === 'host' ? (
                <SvgXml
                  xml={
                    !live?.data?.activeUsers.find(user => user.uid === uid)
                      ?.isMute
                      ? `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_691_4364)">
  <path d="M11 18C9.14413 17.9979 7.36487 17.2597 6.05257 15.9474C4.74026 14.6351 4.0021 12.8559 4.00001 11V7.49999C4.00001 5.64348 4.73751 3.863 6.05026 2.55025C7.36302 1.2375 9.14349 0.5 11 0.5C12.8565 0.5 14.637 1.2375 15.9497 2.55025C17.2625 3.863 18 5.64348 18 7.49999V11C17.9979 12.8559 17.2597 14.6351 15.9474 15.9474C14.6351 17.2597 12.8559 17.9979 11 18ZM11 2.25C9.76053 2.2523 8.56175 2.69263 7.61548 3.49319C6.66922 4.29376 6.03637 5.40302 5.82876 6.62499H8.37501C8.60707 6.62499 8.82963 6.71718 8.99373 6.88127C9.15782 7.04537 9.25001 7.26793 9.25001 7.49999C9.25001 7.73206 9.15782 7.95462 8.99373 8.11871C8.82963 8.2828 8.60707 8.37499 8.37501 8.37499H5.75001V10.125H8.37501C8.60707 10.125 8.82963 10.2172 8.99373 10.3813C9.15782 10.5454 9.25001 10.7679 9.25001 11C9.25001 11.2321 9.15782 11.4546 8.99373 11.6187C8.82963 11.7828 8.60707 11.875 8.37501 11.875H5.82876C6.03442 13.0978 6.66673 14.2082 7.61345 15.009C8.56017 15.8097 9.76003 16.2491 11 16.2491C12.24 16.2491 13.4398 15.8097 14.3866 15.009C15.3333 14.2082 15.9656 13.0978 16.1713 11.875H13.625C13.3929 11.875 13.1704 11.7828 13.0063 11.6187C12.8422 11.4546 12.75 11.2321 12.75 11C12.75 10.7679 12.8422 10.5454 13.0063 10.3813C13.1704 10.2172 13.3929 10.125 13.625 10.125H16.25V8.37499H13.625C13.3929 8.37499 13.1704 8.2828 13.0063 8.11871C12.8422 7.95462 12.75 7.73206 12.75 7.49999C12.75 7.26793 12.8422 7.04537 13.0063 6.88127C13.1704 6.71718 13.3929 6.62499 13.625 6.62499H16.1713C15.9636 5.40302 15.3308 4.29376 14.3845 3.49319C13.4383 2.69263 12.2395 2.2523 11 2.25Z" fill="#F4F4F4"/>
  <path d="M1.37502 11C1.60708 11 1.82965 11.0922 1.99374 11.2563C2.15783 11.4204 2.25002 11.6429 2.25002 11.875C2.25234 13.9629 3.08276 15.9646 4.55911 17.4409C6.03545 18.9172 8.03714 19.7477 10.125 19.75H11.875C13.9628 19.7474 15.9644 18.9169 17.4407 17.4406C18.917 15.9644 19.7475 13.9628 19.75 11.875C19.75 11.6429 19.8422 11.4204 20.0063 11.2563C20.1704 11.0922 20.3929 11 20.625 11C20.8571 11 21.0796 11.0922 21.2437 11.2563C21.4078 11.4204 21.5 11.6429 21.5 11.875C21.497 14.4268 20.482 16.8732 18.6776 18.6776C16.8732 20.482 14.4268 21.497 11.875 21.5H10.125C7.57323 21.497 5.12683 20.482 3.32244 18.6776C1.51806 16.8732 0.503033 14.4268 0.500021 11.875C0.500021 11.6429 0.592209 11.4204 0.756302 11.2563C0.920397 11.0922 1.14296 11 1.37502 11Z" fill="#F4F4F4"/>
  </g>
  <defs>
  <clipPath id="clip0_691_4364">
  <rect width="21" height="21" fill="white" transform="matrix(-1 0 0 1 21.5 0.5)"/>
  </clipPath>
  </defs>
  </svg>
  
  `
                      : `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_1609_1031)">
  <path d="M13.5 18.5C11.6441 18.4979 9.86487 17.7597 8.55257 16.4474C7.24026 15.1351 6.5021 13.3559 6.50001 11.5V7.99999C6.50001 6.14348 7.23751 4.363 8.55026 3.05025C9.86302 1.7375 11.6435 1 13.5 1C15.3565 1 17.137 1.7375 18.4497 3.05025C19.7625 4.363 20.5 6.14348 20.5 7.99999V11.5C20.4979 13.3559 19.7597 15.1351 18.4474 16.4474C17.1351 17.7597 15.3559 18.4979 13.5 18.5ZM13.5 2.75C12.2605 2.7523 11.0617 3.19263 10.1155 3.99319C9.16922 4.79376 8.53637 5.90302 8.32876 7.12499H10.875C11.1071 7.12499 11.3296 7.21718 11.4937 7.38127C11.6578 7.54537 11.75 7.76793 11.75 7.99999C11.75 8.23206 11.6578 8.45462 11.4937 8.61871C11.3296 8.7828 11.1071 8.87499 10.875 8.87499H8.25001V10.625H10.875C11.1071 10.625 11.3296 10.7172 11.4937 10.8813C11.6578 11.0454 11.75 11.2679 11.75 11.5C11.75 11.7321 11.6578 11.9546 11.4937 12.1187C11.3296 12.2828 11.1071 12.375 10.875 12.375H8.32876C8.53442 13.5978 9.16673 14.7082 10.1135 15.509C11.0602 16.3097 12.26 16.7491 13.5 16.7491C14.74 16.7491 15.9398 16.3097 16.8866 15.509C17.8333 14.7082 18.4656 13.5978 18.6713 12.375H16.125C15.8929 12.375 15.6704 12.2828 15.5063 12.1187C15.3422 11.9546 15.25 11.7321 15.25 11.5C15.25 11.2679 15.3422 11.0454 15.5063 10.8813C15.6704 10.7172 15.8929 10.625 16.125 10.625H18.75V8.87499H16.125C15.8929 8.87499 15.6704 8.7828 15.5063 8.61871C15.3422 8.45462 15.25 8.23206 15.25 7.99999C15.25 7.76793 15.3422 7.54537 15.5063 7.38127C15.6704 7.21718 15.8929 7.12499 16.125 7.12499H18.6713C18.4636 5.90302 17.8308 4.79376 16.8845 3.99319C15.9383 3.19263 14.7395 2.7523 13.5 2.75Z" fill="#F4F4F4"/>
  <path d="M3.87502 11.5C4.10708 11.5 4.32965 11.5922 4.49374 11.7563C4.65783 11.9204 4.75002 12.1429 4.75002 12.375C4.75234 14.4629 5.58276 16.4646 7.05911 17.9409C8.53545 19.4172 10.5371 20.2477 12.625 20.25H14.375C16.4628 20.2474 18.4644 19.4169 19.9407 17.9406C21.417 16.4644 22.2475 14.4628 22.25 12.375C22.25 12.1429 22.3422 11.9204 22.5063 11.7563C22.6704 11.5922 22.8929 11.5 23.125 11.5C23.3571 11.5 23.5796 11.5922 23.7437 11.7563C23.9078 11.9204 24 12.1429 24 12.375C23.997 14.9268 22.982 17.3732 21.1776 19.1776C19.3732 20.982 16.9268 21.997 14.375 22H12.625C10.0732 21.997 7.62683 20.982 5.82244 19.1776C4.01806 17.3732 3.00303 14.9268 3.00002 12.375C3.00002 12.1429 3.09221 11.9204 3.2563 11.7563C3.4204 11.5922 3.64296 11.5 3.87502 11.5Z" fill="#F4F4F4"/>
  </g>
  <line x1="1.06066" y1="1" x2="24" y2="23.9393" stroke="#F4F4F4" stroke-width="1.5" stroke-linecap="round"/>
  <defs>
  <clipPath id="clip0_1609_1031">
  <rect width="21" height="21" fill="white" transform="matrix(-1 0 0 1 24 1)"/>
  </clipPath>
  </defs>
  </svg>
  `
                  }
                />
              ) : (
                <SvgXml
                  xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_691_4337)">
<path d="M7.74006 9.51886C7.7041 8.85163 8.21819 8.28189 8.88646 8.24455C9.42785 8.21689 9.90529 8.54774 10.0871 9.03313C10.0778 8.97851 10.075 8.92561 10.075 8.87099C10.075 8.13219 10.6745 7.53133 11.4147 7.53133C11.907 7.53133 12.336 7.79926 12.568 8.19511C12.5659 8.16745 12.5639 8.14256 12.5639 8.1156C12.5639 7.37611 13.1633 6.77802 13.9028 6.77802C14.6423 6.77802 15.2404 7.37611 15.2404 8.1156" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5664 8.19531V9.71267" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5703 8.17419V9.49725" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.2411 7.94167C15.164 7.27305 14.5977 6.75655 13.9101 6.75586C13.1692 6.75655 12.569 7.35464 12.569 8.0969C12.569 8.12179 12.5718 8.14737 12.5732 8.17468C12.3398 7.77953 11.9108 7.51229 11.4192 7.51229C10.6776 7.51229 10.0781 8.11176 10.0781 8.85194V8.87027C10.0788 8.9197 10.0823 8.96603 10.0888 9.01409L10.1117 9.51918" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5938 12.0635C12.5938 12.7698 13.186 13.3437 13.9165 13.3437C14.2203 13.3437 14.5 13.2444 14.7234 13.0775" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.64453 12.1264L7.65317 12.4444C7.69086 13.046 8.26682 13.512 8.9382 13.483C9.54874 13.4588 10.03 13.0325 10.0829 12.5025L10.1105 11.7962" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.1094 9.41538V9.61382V12.0636C10.1094 12.7699 10.6598 13.3438 11.3384 13.3438C12.0157 13.3438 12.566 12.7699 12.566 12.0636V8.11548" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.719 13.0718C14.7609 12.8471 14.9458 12.1204 15.0122 11.8981L14.3633 11.5848" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.722 13.0717C13.2952 14.0549 12.3594 15.6999 12.3594 17.5633V18.4694V19.8509" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.73908 9.49969C7.59527 11.89 7.59941 14.2319 7.81549 16.6374L7.84245 16.6225C7.96484 17.8792 8.52455 19.0062 9.36707 19.8508H16.372C17.2626 18.6477 17.7901 17.1584 17.7901 15.5463L17.7995 14.3646L17.8074 11.8122" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.2383 9.06445V7.45064C15.2383 6.7478 15.8087 6.17737 16.5133 6.17737C17.2179 6.17737 17.7886 6.74746 17.7886 7.45064V10.2164L17.807 12.6506" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.4607 9.92121L15.021 8.98052L14.3105 8.70291C14.1418 8.63687 13.9562 8.60576 13.7622 8.61786C13.0594 8.66315 12.5232 9.27299 12.5692 9.9786C12.5996 10.4512 12.8865 10.8477 13.2841 11.042L13.6658 11.2474L14.3645 11.5851" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.07372 3.55195L5.6136 4.62886L4.53738 7.09002L3.46116 4.62886L1 3.55195L3.46116 2.47642L4.53738 0.0152588L5.6136 2.47642L8.07372 3.55195Z" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.66016 19.8512H17.8083V23.9998H7.66016V19.8512Z" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.2512 4.96883L12.6016 1.81762L15.3141 3.54655L16.6395 0.615906L17.8143 3.60982L20.6118 2.02228L19.8015 5.13616L23 5.48879L20.5147 7.53302L22.8922 9.70101L19.6808 9.88977" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_691_4337">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`}
                />
              )}
            </View>
          </TouchableOpacity>
          {/*=============== live joined and knock and voice run on or off end================ */}
        </View>
      </View>

      <ActionSheet
        containerStyle={{
          paddingVertical: 10,
        }}
        dialogStyle={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
        cancelButtonIndex={4}
        visible={showAction}
        onDismiss={() => setShowAction(false)}
        destructiveButtonIndex={0}
        options={
          Captain
            ? [
                SelectItem?.role === 'host'
                  ? {
                      label: 'Kick',
                      onPress: () => {
                        updateRole({
                          chatId: live?.data?.chat,
                          role: 'audience', ///[host | audience]
                          userId: SelectItem?.user?._id,
                        }).then(res => {
                          setActiveUser(prev =>
                            prev?.map(user => {
                              if (user.uid === SelectItem?.uid) {
                                return {...user, role: 'audience'};
                              }
                              return user;
                            }),
                          );
                        });
                      },
                    }
                  : {
                      label: 'Add',
                      onPress: () => {
                        updateRole({
                          chatId: live?.data?.chat,
                          role: 'host', ///[host | audience]
                          userId: SelectItem?.user?._id,
                        }).then(res => {
                          setActiveUser(prev =>
                            prev?.map(user => {
                              if (user.uid === SelectItem?.uid) {
                                return {...user, role: 'host'};
                              }
                              return user;
                            }),
                          );
                        });
                      },
                    },

                {
                  label: 'View Profile',

                  onPress: () => {
                    setShowAction(false);
                    if (SelectItem?.user?._id === userInfo?.data?._id) {
                      navigation?.navigate('UserProfile');
                    } else {
                      navigation?.navigate('FriendsProfile', {
                        data: {id: SelectItem?.user?._id},
                      });
                    }
                  },
                },
                {label: 'Cancel', onPress: () => console.log('cancel')},
              ]
            : Host
            ? [
                // {

                //   label: "Add", onPress: () => {}

                // },

                {
                  label: 'View Profile',
                  onPress: () => {
                    setShowAction(false);
                    if (SelectItem?.user?._id === userInfo?.data?._id) {
                      navigation?.navigate('UserProfile');
                    } else {
                      navigation?.navigate('FriendsProfile', {
                        data: {id: SelectItem?.user?._id},
                      });
                    }
                  },
                },
                {label: 'Cancel', onPress: () => console.log('cancel')},
              ]
            : [
                {
                  label: 'View Profile',
                  onPress: () => {
                    setShowAction(false);
                    if (SelectItem?.user?._id === userInfo?.data?._id) {
                      navigation?.navigate('UserProfile');
                    } else {
                      navigation?.navigate('FriendsProfile', {
                        data: {id: SelectItem?.user?._id},
                      });
                    }
                  },
                },
                {label: 'Cancel', onPress: () => console.log('cancel')},
              ]
        }
      />
      <PopUpModal ref={modalRef} />
    </SafeAreaView>
  );
};

export default LiveConversationScreen;

const styles = StyleSheet.create({});
