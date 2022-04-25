import {Component, Inject, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ShiftAssignmentHttpService} from '@admin/shift-assignment/services/http.service';
import {IShiftAssignmentAlarms} from '@shared/models/shift-assignment';
import {CommonDestroy} from '@shared/commons/destroy.common';

@Component({
  selector: 'adms-alarms-details',
  templateUrl: './shift-assignment-alarms-details.component.html',
  styleUrls: ['./shift-assignment-alarms-details.component.scss']
})
export class ShiftAssignmentAlarmsDetailsComponent extends CommonDestroy implements OnInit {
  loading = true;
  alarms: IShiftAssignmentAlarms[] = [];

  constructor(public dialogRef: MatDialogRef<ShiftAssignmentAlarmsDetailsComponent>,
              private shiftAssignmentHttp: ShiftAssignmentHttpService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  ngOnInit() {
    this.shiftAssignmentHttp.alarmas(this.data.id)
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(
        res => {
          this.alarms = res;
          this.loading = false
        },
        (err) => this.dialogRef.close({error: err})
      );
  }
}
