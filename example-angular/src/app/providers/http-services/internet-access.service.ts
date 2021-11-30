import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class InternetAccessService {

  public hasInternetConnection: BehaviorSubject<boolean>;

  private onOnline = fromEvent(window, 'online').subscribe(() => this.hasInternetConnection.next(true));

  private onOffline = fromEvent(window, 'offline').subscribe(() => this.hasInternetConnection.next(false));

  constructor(private network: Network) {
    this.hasInternetConnection = new BehaviorSubject(this.network.type !== this.network.Connection.NONE);
    this.network.onConnect().subscribe(() => this.hasInternetConnection.next(true));
    this.network.onDisconnect().subscribe(() => this.hasInternetConnection.next(false));
  }

}
