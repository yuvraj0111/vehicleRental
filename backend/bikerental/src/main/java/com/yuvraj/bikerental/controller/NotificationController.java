package com.yuvraj.bikerental.controller;

import com.yuvraj.bikerental.entity.Notification;
import com.yuvraj.bikerental.entity.User;
import com.yuvraj.bikerental.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepository notificationRepository;

    @GetMapping
    public List<Notification> getNotifications() {

        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    @GetMapping("/count")
    public long getUnreadCount() {

        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        return notificationRepository.countByUserIdAndReadFalse(user.getId());
    }

    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable UUID id) {

        Notification notification = notificationRepository.findById(id)
                .orElseThrow();

        notification.setRead(true);
        notificationRepository.save(notification);
    }
}
