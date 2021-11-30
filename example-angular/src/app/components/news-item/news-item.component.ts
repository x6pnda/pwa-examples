import { Component, Input } from '@angular/core';
import { MONTHS } from 'src/app/constants/MONTHS';
import { INewsItem } from 'src/app/interfaces/INewsItem';

@Component({
  selector: 'news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent {
  @Input()
  index!: number;

  @Input()
  item!: INewsItem;

  constructor() {}

  getFormattedDate() {
    const parsedDate = new Date(this.item.webPublicationDate);
    return `${parsedDate.getDate()} ${
      MONTHS[parsedDate.getMonth()]
    } ${parsedDate.getFullYear()}`;
  }

}
