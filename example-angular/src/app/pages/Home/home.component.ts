import { Component, OnInit } from '@angular/core';
import { IGuardianResponse } from 'src/app/interfaces/IGuardianResponse';
import { INewsItem } from 'src/app/interfaces/INewsItem';
import { GuardianService } from 'src/app/providers/guardian-service/guardian-service.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public headlines?: IGuardianResponse = undefined;
    public headlineError?: string = undefined;
    public loadingHeadlines: boolean = false;

    constructor(private guardianService: GuardianService) {}
    ngOnInit() {
        this.loadHeadlines();
    }

    async loadHeadlines() {
        this.loadingHeadlines = true;
        const headlines = await this.guardianService.fetchGamesHeadlines();
        if (!headlines.data) {
            this.headlineError = headlines.message;
        } else {
            this.headlines = headlines.data;
            console.log(this.headlines);
        }
        this.loadingHeadlines = false;
    }
}
