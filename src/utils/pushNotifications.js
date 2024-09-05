import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { set } from 'date-fns';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('oldfcmtoken', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log("newfcmtoken",fcmToken)
        await AsyncStorage.setItem('fcmToken');
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const  NotificationServices=()=>{
    messaging().onNotificationOpenedApp(remoteMessage=>{
        console.log("notification coused app to open from background",remoteMessage.notification)
    })
// forground
    messaging().onMessage(async remoteMessage => {
      console.log("notification in forground",remoteMessage.notification)
      });
  


    messaging().getInitialNotification().then(remoteMessage=>{
if(remoteMessage){
    console.log("notification coused app to open from quite state",remoteMessage.notification)
}

    })
}
