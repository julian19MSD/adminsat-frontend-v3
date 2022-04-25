import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SharedMapReportHttpService} from '@admin/shared/map-reports/services/http.service';

@Component({
  selector: 'adms-mobile-eye',
  templateUrl: './mobile-eye.component.html',
  styleUrls:['./mobile-eye.component.scss']
})
export class MobileyeDialogComponent implements OnInit {

  loading = true;
  info: any = [];

  constructor(public dialogRef: MatDialogRef<MobileyeDialogComponent>,
              private events: SharedMapReportHttpService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.events.getEventsName({id__in: Object.keys(this.data.count).toString()}).subscribe(res => {
      res.forEach(item => {
        item.count = this.data.count[item.id];
        this.info.push(item);
      });
      this.loading = false;
    }, () => this.dialogRef.close());
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
