import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { ICommandsDetail, ICommandsListItem } from '@shared/models/commands.model';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { STATIC_URL } from '@shared/consts/api.consts';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { SharedAssetHttpService } from '@admin/shared/assets/services/http.service';
import { SharedCommandsHttpService } from '../services/http.service';

@Component({
  selector: 'adms-commands-details-dialog',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsDetailsComponent extends CommonDestroy implements OnInit {

  id: number;
  loading = true;
  instance: ICommandsListItem = {} as ICommandsListItem;
  staticUrl = STATIC_URL;
  permissions = PERMISSIONS;
  selectedIndex = 0;
  noImage = true;

  constructor(
    public dialogRef: MatDialogRef<CommandsDetailsComponent>,
    public permissionsService: PermissionsService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit() {
    this.instance = this.data.instance;

    this.loading = false;

  }
}
