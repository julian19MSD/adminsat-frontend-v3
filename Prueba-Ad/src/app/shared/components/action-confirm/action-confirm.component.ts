import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'adms-action-confirm',
  templateUrl: './action-confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionConfirmComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }


}
