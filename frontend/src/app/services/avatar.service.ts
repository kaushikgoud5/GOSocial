// src/app/services/avatar.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AvatarService {
  private colors = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC'
  ];

  getInitials(name: string): string {
    if (!name?.trim()) return '?';

    const names = name.trim().split(/\s+/);
    let initials = names[0][0].toUpperCase();
    
    if (names.length > 1) {
      initials += names[names.length - 1][0].toUpperCase();
    }
    
    return initials;
  }

  getColor(name: string): string {
    if (!name?.trim()) return '#CCCCCC';

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return this.colors[Math.abs(hash) % this.colors.length];
  }

  getFontSize(size: number): string {
    return `${Math.max(12, Math.floor(size / 2.5))}px`;
  }
}