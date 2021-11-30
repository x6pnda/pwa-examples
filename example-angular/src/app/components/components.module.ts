import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItemComponent } from './news-item/news-item.component';
import { NetworkStatusComponent } from './network-status/network-status.component';

@NgModule({
    declarations: [NewsItemComponent, NetworkStatusComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [NewsItemComponent, NetworkStatusComponent],
})
export class ComponentsModule {}
