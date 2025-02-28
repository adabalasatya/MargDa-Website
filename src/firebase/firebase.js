import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyARQClAEz0JjAYo8bYDyQu60ZgKu8H2tT8",
  authDomain: "whatsapp-crm02.firebaseapp.com",
  projectId: "whatsapp-crm02",
  storageBucket: "whatsapp-crm02.appspot.com",
  messagingSenderId: "876534967971",
  appId: "1:876534967971:web:204f3449379345ff229916",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// Register Service Worker
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    let registration = await navigator.serviceWorker.getRegistration(
      "/firebase-messaging-sw.js"
    );

    if (!registration) {
      try {
        const reg = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );

        await navigator.serviceWorker.ready;
        if (reg.active) {
          // Short delay to allow the service worker to stabilize
          await new Promise((resolve) => setTimeout(resolve, 7000));
          // window.location.reload(); // Reload the page once

          const permission = await Notification.requestPermission();
          if (
            (permission === "granted" || permission === "default") &&
            registration
          ) {
            const token = await getToken(messaging, {
              vapidKey:
                "BDZG-laE_w569hLq74r8T2WeZs2RiBfngI99ZoERprek73s8wJ1mlCul4R6oshj26f1vW8Vss1lD4_LkoM4zCXQ",
            });
            return token;
          }
        } else {
          setTimeout(requestFirebaseNotificationPermission, 2000); // Retry after delay
        }
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    } else {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted" || permission === "default") {
          const token = await getToken(messaging, {
            vapidKey:
              "BDZG-laE_w569hLq74r8T2WeZs2RiBfngI99ZoERprek73s8wJ1mlCul4R6oshj26f1vW8Vss1lD4_LkoM4zCXQ",
          });
          return token;
        }
      } catch (e) {
        console.log(e);
      }
    }

    // Ensure service worker is ready before setting up message listener
    navigator.serviceWorker.ready.then(() => {
      navigator.serviceWorker.addEventListener(
        "message",
        handleServiceWorkerMessage
      );
    });
  }
};

// Handle messages from Service Worker
const handleServiceWorkerMessage = (event) => {
  console.log("Message received from service worker", event);
  if (event.data && event.data.playCustomSound) {
    playCustomNotificationSound();
  }
};

// Play custom notification sound
const playCustomNotificationSound = () => {
  // const customSound =
  //   localStorage.getItem("customNotificationSound") ||
  //   "/custom_notification/sound2.mp3";
  const customSound = "/custom_notification/sound2.mp3";
  const audio = new Audio(customSound);
  audio
    .play()
    .catch((error) => console.error("Error playing custom sound:", error));
};

const requestFirebaseNotificationPermission = async () => {
  try {
    let token = await registerServiceWorker();

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      while (token === undefined || token === null || !token) {
        token = await registerServiceWorker();
      }
      localStorage.setItem("push-notification-token", token);
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

requestFirebaseNotificationPermission();

// Listen for incoming foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      const notificationTitle =
        payload.notification.title || "New Notification";
      const notificationOptions = {
        body: payload.notification.body,
        icon: "/custom_notification/margdarshak.png",
      };

      // Display notification
      new Notification(notificationTitle, notificationOptions);

      // Play custom sound or default sound
      playCustomNotificationSound();
      resolve(payload);
    });
  });
