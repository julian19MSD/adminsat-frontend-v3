import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChange} from '@angular/core';

@Component({
  selector: 'adms-historical-changes',
  templateUrl: './historical-changes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoricalChangesComponent implements OnChanges {

  @Input() creation: any;
  @Input() changes: any;

  constructor() {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      if (propName === 'changes') {
        if (this.changes) {
          this.changes.forEach((item, index) => {
            item.cambio.forEach((change, indexChange) => {
              this.changes[index].cambio[indexChange].isOldArray = Array.isArray(change.old);
              this.changes[index].cambio[indexChange].isNewArray = Array.isArray(change.new);
            });
          });
        }
      }
    }
  }

  isString(value) {
    return (value.constructor === String);
  }

  isObject(value) {
    return (value.constructor === Object);
  }

}
