import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter }
from '@angular/core';

@Component({
  selector: 'sm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('filterElement', {static: false}) filterElementRef: ElementRef;

  private _listFilter: string;
  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
if (changes['hitCount'] && !changes['hitCount'].currentValue) {
  this.hitMessage = 'Inga aktier hittades';
} else {
    this.hitMessage = 'Antal träffar: ' + this.hitCount;
  }
}
  ngAfterViewInit(): void {
    if (this.filterElementRef) {
      this.filterElementRef.nativeElement.focus();
    }
  }


  ngOnInit() {
  }

}
