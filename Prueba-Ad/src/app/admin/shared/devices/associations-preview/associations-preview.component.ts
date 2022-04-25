import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {CommonAssociationsPreview} from '@shared/commons/association-preview.common';

@Component({
  selector: 'adms-device-associations-preview',
  templateUrl: './associations-preview.component.html',
  styleUrls: ['./associations-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceAssociationsPreviewComponent extends CommonAssociationsPreview {

  constructor(public dialog: MatDialog) {
    super(dialog);
  }

}
