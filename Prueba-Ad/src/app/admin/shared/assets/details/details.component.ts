import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {catchError, distinctUntilChanged, filter, switchMap, takeUntil} from 'rxjs/operators';

import {CommonDestroy} from '@shared/commons/destroy.common';
import {IAssetDetail, IAssetDocument} from '@shared/models/assets.model';
import {STATIC_URL} from '@shared/consts/api.consts';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {SharedAssetHttpService} from '@admin/shared/assets/services/http.service';
import {throwError} from 'rxjs';
import {IName} from '@shared/models/general.model';

@Component({
  selector: 'adms-asset-details-dialog',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AssetDetailsComponent extends CommonDestroy implements OnInit {
  id: number;
  loading = true;
  instance: IAssetDetail = {} as IAssetDetail;
  staticUrl = STATIC_URL;
  documentOptions: Array<IName> = [];
  documentFormControl: FormControl = new FormControl();
  documents: Array<IAssetDocument> = [];
  permissions = PERMISSIONS;
  noImage = true;
  selectedIndex = 0;


  constructor(
    public dialogRef: MatDialogRef<AssetDetailsComponent>,
    public permissionsService: PermissionsService,
    private assetDeviceHttp: SharedAssetHttpService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit() {
    this.assetDeviceHttp.details(this.data.id)
      .pipe(
        takeUntil(this.ngDestroyed$),
        catchError((err) => {
          this.dialogRef.close({error: err});
          return throwError(err);
        }),

        switchMap((asset) => {
          this.instance = asset;
          return this.assetDeviceHttp.documentSelect(asset.id)
            .pipe(takeUntil(this.ngDestroyed$));
        })
      )
      .subscribe(
        (docs) => {
          this.documentOptions = docs;
          this.loading = false;
          this.cdRef.detectChanges();
        },
        () => this.loading = false
      );

    this.documentFormControl.valueChanges.pipe(
      filter(e => !!e),
      takeUntil(this.ngDestroyed$),
      distinctUntilChanged(),
      switchMap((value) => {
        this.loading = true;
        return this.assetDeviceHttp.documentList(this.instance.id, {tipo_documento: value})
          .pipe(takeUntil(this.ngDestroyed$));
      })
    ).subscribe(
      (res) => {
        this.documents = res;
        this.loading = false;
        this.cdRef.detectChanges();
      },
      (err) => this.dialogRef.close({error: err}));
  }

  openAssetDetails(id: number): void {
    this.dialog.open(AssetDetailsComponent, {data: {id}, panelClass: 'full-screen'});
  }

}
