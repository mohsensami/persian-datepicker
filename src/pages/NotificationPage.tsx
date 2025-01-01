import React from "react";
import useNotification from "../hooks/useNotification";

const NotificationPage: React.FC = () => {
  const {
    permission,
    requestPermission,
    showNotification,
    showPopup,
    setShowPopup,
  } = useNotification();

  const handleNotify = () => {
    showNotification("Hello!", {
      body: "This is a sample notification.",
      icon: "path/to/icon.png", // Optional: provide a path to an icon
    });
  };

  return (
    <div>
      <h1>Notification API Example</h1>
      {permission === "granted" && (
        <>
          <button onClick={handleNotify}>Show Notification</button>
          <p>Permission granted! You can now send notifications.</p>
        </>
      )}
      {permission === "denied" && (
        <p>
          Notifications are blocked. Please enable them in your browser
          settings.
        </p>
      )}

      {/* Popup for requesting permission */}
      {showPopup && (
        <div style={popupStyle}>
          <h2>Enable Notifications</h2>
          <p>
            We would like to send you notifications. Please allow us to do so.
          </p>
          <button onClick={requestPermission}>Allow Notifications</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
