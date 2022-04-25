import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IListItems} from '@shared/models/tracking.models';

@Component({
  selector: 'adms-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss']
})
export class LocationItemComponent {

  @Input('mode') mode: string;
  @Input() location: IListItems;
  @Input() metricsAlias: any;
  @Input() disabled: boolean;

  @Output() onClick: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  setDetail(id: number) {
    if (!this.disabled) {
      this.onClick.emit(id)
    }
  }
}
