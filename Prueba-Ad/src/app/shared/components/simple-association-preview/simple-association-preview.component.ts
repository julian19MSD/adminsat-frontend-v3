import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonAssociationsPreview } from '@shared/commons/association-preview.common';

@Component({
  selector: 'app-simple-association-preview',
  templateUrl: './simple-association-preview.component.html',
  styleUrls: ['./simple-association-preview.component.scss']
})
export class SimpleAssociationPreviewComponent extends CommonAssociationsPreview  {

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
    this.style["max-height"] = "120px"
    else
    this.style["max-height"] = (this.selected.length * 40) +"px"
  }

}
