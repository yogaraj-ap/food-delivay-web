import React from "react";
import "./NotificationPermission.css";
import { toast } from "react-toastify";
import { saveNotificationPermission } from "../Service/Api";

function NotificationPermission({ setPage }) {

  const enableNotifications = async () => {
    try {
      if (!("Notification" in window)) {
        toast.error("Notifications are not supported on this browser");
        return;
      }

      const result = await Notification.requestPermission();

      await saveNotificationPermission({
        permission: result.toUpperCase(),
      });

      if (result === "granted") {
        toast.success("Notifications enabled 🔔");
      } else {
        toast.info("Notifications not enabled");
      }

      setTimeout(() => setPage("home"), 1500);
    } catch (error) {
      toast.error("Failed to update notification preference");
    }
  };

  const skipNotifications = async () => {
    try {
      await saveNotificationPermission({ permission: "SKIPPED" });
      toast.info("You can enable notifications later");
      setTimeout(() => setPage("home"), 1500);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="notification-page">
      <div className="notification-popup">
        <div className="notification-content">
          <p>
            Allow push notifications to get real-time updates on your booking status.
          </p>

          <div className="notification-image">🔔</div>

          <button className="notify-btn" onClick={enableNotifications}>
            Turn on Notification
          </button>

          <button className="not-now" onClick={skipNotifications}>
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationPermission;
