import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { YellowDirective } from '../directives/yellow.directive';

const aboutCompanyFn = (text: string) => text;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, DatePipe, YellowDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
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
}
