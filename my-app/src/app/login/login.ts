import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
    username: string = '';
    password: string = '';
    message: string = '';
    isSuccess: boolean = false;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        // Read cookies from server to pre-fill login form
        this.http.get<any>('http://localhost:3002/get-login-cookie', { withCredentials: true })
            .subscribe({
                next: (data: any) => {
                    this.username = data.username || '';
                    this.password = data.password || '';
                },
                error: (err: any) => {
                    console.log('No saved cookies found');
                }
            });
    }

    onLogin(): void {
        const loginData = {
            username: this.username,
            password: this.password
        };
        this.http.post<any>('http://localhost:3002/login', loginData, { withCredentials: true })
            .subscribe({
                next: (data: any) => {
                    this.message = data.message;
                    this.isSuccess = data.success;
                },
                error: (err: any) => {
                    this.message = 'Error connecting to server';
                    this.isSuccess = false;
                }
            });
    }
}
