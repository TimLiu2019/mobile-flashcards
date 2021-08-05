import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";

const NOTIFICATION_KEY = "Flashcards:notifications";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}


export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          console.log(status);
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();

            Notifications.scheduleLocalNotificationAsync(
              {
                title: "Take a quiz!",
                body: "👋 don't forget to take a quiz for today!",
                ios: {
                  sound: true
                },
         
              },
              {
                time: tomorrow.getTime() + 6000, // almost every minute it should show the notification
                repeat: "minute"
              }
            );

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
