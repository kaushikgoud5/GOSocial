import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="avatar">
      <img *ngIf="photoURL; else initialsBlock" [src]="photoURL" alt="User Avatar" />
      <ng-template #initialsBlock>
        <div class="avatar-initials">{{ initials }}</div>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: black;
        color: white;
        font-size: 1.2rem;
        font-weight: bold;
        text-transform: uppercase;
        margin-right: 1rem;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      .avatar-initials {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class AvatarComponent {
  photoURL?: string;
  displayName: string = '';

  constructor(private userService: PostService) {
    this.userService.user$.subscribe(user => {
      this.photoURL = user.photoURL || undefined;
      this.displayName = user.displayName || 'Kaushik Nakka';
    });
  }

  get initials(): string {
    if (!this.displayName) return '?';
    const names = this.displayName.split(' ');
    return names.length > 1
      ? names[0][0] + names[1][0]
      : names[0][0]; // First letter of first and last name
  }
}
