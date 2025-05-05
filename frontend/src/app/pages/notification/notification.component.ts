import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { ContextService } from '../../services/context.service';

interface Notification {
  id: number
  type: "like" | "comment" | "follow" | "mention" | "tag"
  user: {
    id: number
    name: string
    avatar: string
  }
  content: string
  timestamp: Date
  isRead: boolean
  postId?: number
  postImage?: string
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = []
  unreadCount = 0
userid:string=""
  constructor(private notificationService : NotificationsService, private context : ContextService) {}

  ngOnInit(): void {
    this.context.getUser().subscribe(user => {
      this.userid = user.id
    })
    // Simulate fetching notifications from an API
    this.fetchNotifications()
    this.calculateUnreadCount()
  }

  fetchNotifications(): void {
    // This would typically be an API call
    this.notificationService.getNotifications(this.userid).subscribe({
      next:(data:any)=>{
        this.notifications=data
      }
    })
  }

  calculateUnreadCount(): void {
    this.unreadCount = this.notifications.filter((notification) => !notification.isRead).length
  }

  markAsRead(notification: Notification): void {
    notification.isRead = true
    this.calculateUnreadCount()
    // In a real app, you would call an API to update the notification status
  }

  markAllAsRead(): void {
    this.notifications.forEach((notification) => {
      notification.isRead = true
    })
    this.unreadCount = 0
    // In a real app, you would call an API to update all notifications
  }

  getTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    let interval = Math.floor(seconds / 31536000)
    if (interval >= 1) {
      return interval === 1 ? "1y" : `${interval}y`
    }

    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) {
      return interval === 1 ? "1m" : `${interval}m`
    }

    interval = Math.floor(seconds / 86400)
    if (interval >= 1) {
      return interval === 1 ? "1d" : `${interval}d`
    }

    interval = Math.floor(seconds / 3600)
    if (interval >= 1) {
      return interval === 1 ? "1h" : `${interval}h`
    }

    interval = Math.floor(seconds / 60)
    if (interval >= 1) {
      return interval === 1 ? "1m" : `${interval}m`
    }

    return "now"
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case "like":
        return "heart"
      case "comment":
        return "message-circle"
      case "follow":
        return "user-plus"
      case "mention":
        return "at-sign"
      case "tag":
        return "tag"
      default:
        return "bell"
    }
  }
}
