// Initialize Firebase in the service worker
importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyARQClAEz0JjAYo8bYDyQu60ZgKu8H2tT8",
  authDomain: "whatsapp-crm02.firebaseapp.com",
  projectId: "whatsapp-crm02",
  storageBucket: "whatsapp-crm02.appspot.com",
  messagingSenderId: "876534967971",
  appId: "1:876534967971:web:204f3449379345ff229916",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(async (payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.image, // Customize with your logo
    sound: "/custom_notification/sound2.mp3", // Add the sound parameter
    vibrate: [200, 100, 200, 100, 200, 100, 200],
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
  // Play custom sound
  // const sound = new Audio("/custom_notification/sound2.mp3"); // Update the path to your sound file
  // sound.play().catch((error) => {
  //   console.error("Error playing sound: ", error);
  // });
  self.clients
    .matchAll({ type: "window", includeUncontrolled: true })
    .then((clients) => {
      if (clients && clients.length) {
        clients[0].postMessage({ playCustomSound: true });
      }
    });
});
