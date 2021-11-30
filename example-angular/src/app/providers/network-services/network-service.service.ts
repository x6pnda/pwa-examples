import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  public hasInternetConnection: BehaviorSubject<boolean>;
  constructor() {
    this.hasInternetConnection = new BehaviorSubject(navigator.onLine);
    fromEvent(window, 'online').subscribe(() =>
      this.hasInternetConnection.next(true)
    );
    fromEvent(window, 'offline').subscribe(() =>
      this.hasInternetConnection.next(false)
    );
  }
}
