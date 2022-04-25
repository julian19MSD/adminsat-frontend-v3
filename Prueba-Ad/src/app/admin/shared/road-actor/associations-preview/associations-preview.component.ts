import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CommonAssociationsPreview} from '@shared/commons/association-preview.common';

@Component({
  selector: 'adms-road-actor-associations-preview',
  templateUrl: './associations-preview.component.html',
  styleUrls: ['./associations-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoadActorAssociationsPreviewComponent extends CommonAssociationsPreview {

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
    this.style["max-height"] = (this.selected.length * 60) +"px"
  }

}
