import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { YellowDirective } from '../directives/yellow.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../admin/login-dialog/login-dialog.component';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { selectCurrentUser, selectIsAdmin, selectIsLoggedIn } from '../user-list/store/users.selectors';

const aboutCompanyFn = (text: string) => text;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, DatePipe, YellowDirective, MatButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private dialog = inject(MatDialog);
  private store = inject(Store);

  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  isAdmin$ = this.store.select(selectIsAdmin);
  currentUser$ = this.store.select(selectCurrentUser);

  
  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '300px'
    });
  }

  today: number = Date.now();

  isShowCatalog: boolean = true;

  readonly headerItem1 = 'Главная';
  readonly aboutCompany = aboutCompanyFn('О компании');
  readonly headerItem2 = 'Каталог';

  isUpperCase: boolean = true;

  menuItems: string[] = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда'];

  ChangeMenuText(): void {
    this.menuItems = this.menuItems.map(
      (item: string) => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    )

    this.isUpperCase = !this.isUpperCase;

    
  }
}
