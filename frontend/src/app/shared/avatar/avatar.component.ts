// src/app/components/avatar/avatar.component.ts
import { Component, Input, inject } from '@angular/core';
import { AvatarService } from '../../services/avatar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (!imageUrl) {
      <div class="avatar-initials"
           [style.width.px]="size"
           [style.height.px]="size"
           [style.line-height.px]="size"
           [style.font-size]="fontSize"
           [style.background-color]="color"
           [style.border-radius]="rounded ? '50%' : '0'">
        {{ initials }}
      </div>
    }
    @if (imageUrl) {
      <img [src]="imageUrl" 
           class="avatar-image"
           [style.width.px]="size"
           [style.height.px]="size"
           [style.border-radius]="rounded ? '50%' : '0'"
           [alt]="name + ' profile picture'">
    }
  `,
  styles: `
    .avatar-initials {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      text-align: center;
      user-select: none;
    }

    .avatar-image {
      object-fit: cover;
    }
  `
})
export class AvatarComponent {
  private avatarService = inject(AvatarService);

  @Input() name = '';
  @Input() size = 40;
  @Input() rounded = true;
  @Input() imageUrl?: string;

  get initials(): string {
    return this.avatarService.getInitials(this.name);
  }

  get color(): string {
    return this.avatarService.getColor(this.name);
  }

  get fontSize(): string {
    return this.avatarService.getFontSize(this.size);
  }
}