import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { YellowDirective } from '../directives/yellow.directive';
import { UserService } from '../service/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../admin/login-dialog/login-dialog.component';

const aboutCompanyFn = (text: string) => text;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, DatePipe, YellowDirective, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userService = inject(UserService);
  private dialog = inject(MatDialog);
  
  today: number = Date.now();

  isShowCatalog: boolean = false;

  readonly headerItem1 = 'Главная';
  readonly aboutCompany = aboutCompanyFn('О компании');
  readonly headerItem2 = 'Каталог';

  isUpperCase: boolean = true;

  menuItems: string[] = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда']

  ChangeMenuText(): void {
    this.menuItems = this.menuItems.map(
      (item: string) => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    )

    this.isUpperCase = !this.isUpperCase;
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '300px'
    });
  }
}
