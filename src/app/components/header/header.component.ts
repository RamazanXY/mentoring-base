import { DatePipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import { YellowDirective } from '../../directives/yellow.directive';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { LoginDialogComponent } from "../admin/login-dialog/login-dialog.component";
import { selectCurrentUser, } from "../user-list/store/users.selectors";
import {UserService} from "../../service/user-service/user.service";
import {filter, map, noop} from "rxjs";
import {NoopScrollStrategy} from "@angular/cdk/overlay";

const aboutCompanyFn = (text: string) => text;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgFor, NgIf, RouterLink,
    DatePipe, YellowDirective,
    MatButtonModule, CommonModule, NgOptimizedImage,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private dialog = inject(MatDialog);
  private store = inject(Store);
  private userService = inject(UserService);
  private  router = inject(Router);
  private noopScrollStrategy = new NoopScrollStrategy();


  currentUser$ = this.store.select(selectCurrentUser);

  ngOnInit() {
    this.userService.initializeUserState();
  }

  isAdminRoute$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => (event as NavigationEnd).url.startsWith('/admin'))
  );

  getButtonText(currentUser: any): string {
    if (currentUser) {
      return currentUser.name;
    }

    // Проверяем текущий путь
    const path = window.location.pathname;
    if (path.startsWith('/admin')) {
      return 'Админ';
    } else if (path.startsWith('/users')) {
      return 'Пользователь';
    }

    return 'Войти';
  }

  openLoginDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '350px';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.scrollStrategy = new NoopScrollStrategy();

    this.dialog.open(LoginDialogComponent, dialogConfig);
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
