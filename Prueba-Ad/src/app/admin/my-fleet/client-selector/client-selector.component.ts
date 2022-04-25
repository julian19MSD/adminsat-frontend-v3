import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormControl} from '@angular/forms';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'adms-client-selector',
  templateUrl: './client-selector.component.html',
  styleUrls: ['./client-selector.component.scss']
})
export class ClientSelectorComponent extends CommonDestroy implements OnInit {

  clientCrtl = new FormControl();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ClientSelectorComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    super();
  }

  ngOnInit(): void {
    this.data.ctrl.valueChanges
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((res) => {
        this.bottomSheetRef.dismiss(res);
      });
  }
}
