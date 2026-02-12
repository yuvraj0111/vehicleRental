import api from "./axios";

export const getNotifications = () =>
  api.get("/api/notifications");

export const getUnreadCount = () =>
  api.get("/api/notifications/count");

export const markAsRead = (id) =>
  api.put(`/api/notifications/${id}/read`);
