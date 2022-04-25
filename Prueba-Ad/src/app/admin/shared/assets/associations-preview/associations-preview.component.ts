import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonAssociationsPreview } from '@shared/commons/association-preview.common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'adms-asset-associations-preview',
  templateUrl: './associations-preview.component.html',
  styleUrls: ['./associations-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetAssociationsPreviewComponent  extends CommonAssociationsPreview {

  style= {
    "max-height": "0px",
    "width": "100%",
    "height": "100vh",
    "border": "1px solid lightgray"
  }

  constructor(public dialog: MatDialog) {
    super(dialog);
  }

  changeStyles(){
    if (this.selected.length > 3)
    this.style["max-height"] = "180px"
    else
    this.style["max-height"] = (this.selected.length * 80) +"px"
  }

}
