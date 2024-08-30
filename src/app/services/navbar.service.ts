import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private pageTitleSubject = new BehaviorSubject<string>('Dashboard');
  private menuItemsSubject = new BehaviorSubject<{ label: string, action: () => void, class?: string }[]>([]);

  pageTitle$ = this.pageTitleSubject.asObservable();
  menuItems$ = this.menuItemsSubject.asObservable();

  setPageTitle(title: string) {
    this.pageTitleSubject.next(title);
  }

  setMenuItems(items: { label: string, action: () => void, class?: string }[]) {
    this.menuItemsSubject.next(items);
  }
}