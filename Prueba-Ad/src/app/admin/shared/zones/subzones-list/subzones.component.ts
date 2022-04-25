import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootAction } from '@store/root.action';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { IGeneralObject } from '@shared/models/general.model';
// import { ISubzonesDetails } from '@shared/models/subzones.model';
import { NotificationService } from '@core/services/notification/notification.service';
import { SharedZonesHttpService } from '../services/http.service';
import { IZonesRetrieve } from '@shared/models/zones.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { hideLoader } from '@shared/utils/general.utils';
import { ActionConfirmComponent } from '@shared/components/action-confirm/action-confirm.component';
import { SubzonesCreateComponent } from '../subzone-form/subzone-form.component';


@Component({
  selector: 'adms-subzones-details',
  templateUrl: './subzones.component.html',
  styleUrls: ['./subzones.component.scss'],
})
export class SubzonesListComponent extends CommonDestroy implements OnInit {
  loading = true;
  instance: IZonesRetrieve;

  permissions = PERMISSIONS;
  formStatus: IGeneralObject;
  subzoneIndex:number;
  httpMainActionMethod:any;

  subzoneWay: boolean;

  displayedColumns: string[] = ["name"];
  formGroup = new FormGroup({
    name: new FormControl(null, [Validators.required])
  })



  constructor(public dialogRef: MatDialogRef<SubzonesListComponent>,
    private dialog: MatDialog,
    private zonesHttp: SharedZonesHttpService,
    public store: Store<RootAction>,
    public notificationService: NotificationService,
    public permissionsService: PermissionsService,
    public formManageService: FormManageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.httpMainActionMethod = this.zonesHttp.bulk_destroy;
  }

  ngOnInit() {
    this.formManageService.getFormStatus(this.formGroup)
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe((errors) => {
      this.formStatus = errors;
    });

    this.getInstance();
  }

  getInstance(recharge: boolean = false): void {
    this.loading = true;
    this.zonesHttp.retrieve(this.data.id)
      .subscribe((res) => {

        this.instance = res;
        
        this.loading = false;
        if (recharge){
          this.notificationService.sendSuccessNotification({}, null, 'UPDATE_SUCCESSFUL');
         
        }

      },
        () => {
          this.dialogRef.close();
        });
  }


  editIngressNameSubzone(index: number, way: boolean) {
    this.subzoneIndex = index;
     this.subzoneWay = way;
    this.formGroup.get('name').reset(this.instance.subzones[index].name);    
    
  }

  updateIngressNameSubzone(){
    hideLoader(false);

    const subzoneoneId = this.instance.subzones[this.subzoneIndex].id;
  
    this.zonesHttp.updateSubzone(subzoneoneId, {id: subzoneoneId, name: this.formGroup.get('name').value})
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.getInstance(true);
          this.cancelEditingExitIndex();
        },
        (err) => {
          this.formGroup.get('name').markAsTouched();
          this.formGroup.get('name').setErrors({error: err.error.name });
          hideLoader(true);
        },
        () => hideLoader(true));


  }

  cancelEditingExitIndex() {
    this.subzoneIndex = null;
    this.subzoneWay = null;
    this.formGroup.get('name').reset(null);
  }




  deleteSubzone() {
    this.dialog
      .open(ActionConfirmComponent, {
        panelClass: 'notification',
        data: {
          items: [this.instance.subzones[this.subzoneIndex].name]
        },
      })
      .afterClosed()
      .pipe(
        filter((e: any) => !!e),
        take(1),
        switchMap(() => {

          hideLoader(false);
          return this.zonesHttp.bulk_destroy([this.instance.subzones[this.subzoneIndex].id], [this.instance.subzones[this.subzoneIndex].name])
            .pipe(
              switchMap((msg: any) => {
                this.cancelEditingExitIndex();
                this.getInstance();

                return this.notificationService.sendSuccessNotification({}, null,'DELETE_SUCCESSFUL');
              })
            )
        })
      )
      .subscribe({
        error: (err) => this.notificationService.sendErrorNotification({}, err)
      });
  }


  openFormDialog(panelClass = 'full-screen') {
    this.dialog.open(SubzonesCreateComponent, {data:  this.instance,panelClass,})
    .afterClosed()
    .pipe(
      take(1)
    )
    .subscribe((result) => {
      if (true === result) {
        this.notificationService.sendSuccessNotification({}, null, 'CREATED_SUCCESSFUL');
        this.getInstance();
      } else if (!!result?.error) {
        this.notificationService.sendErrorNotification({}, result.error);
      }
    (err) =>{ 
      this.notificationService.sendErrorNotification({}, err);}
  });
  }

}
