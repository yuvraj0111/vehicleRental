import { useEffect, useState } from "react";
import { getNotifications, markAsRead } from "../api/notificationApi";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const res = await getNotifications();
    setNotifications(res.data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        const userId = parseJwt(localStorage.getItem("token")).userId;

        client.subscribe(`/topic/notifications/${userId}`, (message) => {
          const notification = JSON.parse(message.body);
          setNotifications((prev) => [notification, ...prev]);
          setCount((prev) => prev + 1);
        });
      },
    });

    client.activate();
  }, []);

  const handleRead = async (id) => {
    await markAsRead(id);
    fetchNotifications();
  };

  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-2xl font-semibold">Notifications</h2>

      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 rounded-xl shadow ${
            n.read
              ? "bg-gray-100 dark:bg-gray-800"
              : "bg-blue-50 dark:bg-blue-900"
          }`}
        >
          <p>{n.message}</p>
          {!n.read && (
            <button
              onClick={() => handleRead(n.id)}
              className="text-sm text-blue-600 mt-2"
            >
              Mark as read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Notifications;
