package com.yuvraj.bikerental.service;

import com.yuvraj.bikerental.entity.Notification;
import com.yuvraj.bikerental.entity.User;
import com.yuvraj.bikerental.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public void createNotification(User user, String message) {

        Notification notification = Notification.builder()
                .user(user)
                .message(message)
                .read(false)
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);

        messagingTemplate.convertAndSend(
                "/topic/notifications/" + user.getId(),
                notification);
    }

}
