import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MONTHS } from 'src/app/constants/MONTHS';
import { INewsItem } from 'src/app/interfaces/INewsItem';
import { NetworkService } from 'src/app/providers/network-service/network-service.service';

@Component({
    selector: 'network-status',
    templateUrl: './network-status.component.html',
    styleUrls: ['./network-status.component.scss'],
})
export class NetworkStatusComponent {
    public hasInternetConnection$: Subscription;
    public userOnline?: boolean;

    @Input()
    index!: number;

    @Input()
    item!: INewsItem;

    constructor(private networkService: NetworkService) {
        this.hasInternetConnection$ = this.networkService.hasInternetConnection.subscribe((hasConnection) => (this.userOnline = hasConnection));
    }

    getFormattedDate() {
        const parsedDate = new Date(this.item.webPublicationDate);
        return `${parsedDate.getDate()} ${MONTHS[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`;
    }
}
