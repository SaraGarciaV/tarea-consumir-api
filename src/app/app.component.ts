import { Component, OnInit } from '@angular/core';
import { UsersComponent } from './components/users/users.component';
import { PostsComponent } from './components/posts/posts.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UsersComponent, PostsComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'api-consumer-app';
  activeSection: string = 'users';
  totalUsers: number = 0;
  totalPosts: number = 0;
  loading: boolean = true;
  
  sections = [
    { id: 'users', name: 'Usuarios', icon: '👥' },
    { id: 'posts', name: 'Posts', icon: '📝' }
  ];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    // Cargar estadísticas de usuarios
    this.apiService.getUsers().subscribe({
      next: (users) => {
        this.totalUsers = users.length;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.checkLoadingComplete();
      }
    });

    // Cargar estadísticas de posts
    this.apiService.getPosts().subscribe({
      next: (posts) => {
        this.totalPosts = posts.length;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.checkLoadingComplete();
      }
    });
  }

  checkLoadingComplete(): void {
    if (this.totalUsers > 0 && this.totalPosts > 0) {
      this.loading = false;
    }
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  getActiveStats(): string {
    if (this.loading) return 'Cargando estadísticas...';
    
    if (this.activeSection === 'users') {
      return `${this.totalUsers} usuarios disponibles`;
    } else {
      return `${this.totalPosts} posts disponibles`;
    }
  }

  getAllStats(): string {
    if (this.loading) return 'Cargando...';
    return `${this.totalUsers} usuarios • ${this.totalPosts} posts`;
  }
}