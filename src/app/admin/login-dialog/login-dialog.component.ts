import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private userService: UserService,
    private router: Router
  ) {}


  loginAsAdmin(): void {
    this.userService.loginAsAdmin();
    this.dialogRef.close();
    this.router.navigate(['/admin']);
  }


  loginAsUser(): void {
    this.userService.loginAsUser();
    this.dialogRef.close();
    this.router.navigate(['/users']);
  }


  logout(): void {
    this.userService.logout();
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}