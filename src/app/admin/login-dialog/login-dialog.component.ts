import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserActions } from '../../user-list/store/user.actions';

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
    private store: Store,
    private router: Router
  ) { };

  loginAsAdmin(): void {
    this.store.dispatch(UserActions.loginAsAdmin());
    this.dialogRef.close();
    this.router.navigate(['/admin']);
  }

  loginAsUser(): void {
    this.store.dispatch(UserActions.loginAsUser());
    this.dialogRef.close();
    this.router.navigate(['/users']);
  }

  logout(): void {
    this.store.dispatch(UserActions.logout());
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}