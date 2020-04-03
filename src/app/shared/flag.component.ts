import { Component, OnChanges, Input, EventEmitter, Output} from '@angular/core';

@Component(

    {
        selector: 'sm-flag',
        templateUrl: './flag.component.html',
        styleUrls: ['./flag.component.css']
    }
)
export class FlagComponent implements OnChanges {
    @Input() flagId: number;
    flagUrl: string;
    countryName: string;
    @Output() flagClicked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void {
        this.setflagproperties(this.flagId);
    }
    onClick(): void {
        this.flagClicked.emit(this.countryName);
    }
    setflagproperties(value: number): void {
        switch (value) {
            case 1: {
                this.flagUrl = 'assets/images/flags/sweden.png';
                this.countryName = 'Heja Sverige';
                break;
            }
            case 2: {
                this.flagUrl = 'assets/images/flags/norway.png';
                this.countryName = 'Heja Norge';
                break;
            }
            case 3: {
                this.flagUrl = 'assets/images/flags/finland.png';
                this.countryName = 'Heja Finland';
                break;
            }
            case 4: {
                this.flagUrl = 'assets/images/flags/denmark.png';
                this.countryName = 'Heja Danmark';
                break;
            }
        }
    }
}
