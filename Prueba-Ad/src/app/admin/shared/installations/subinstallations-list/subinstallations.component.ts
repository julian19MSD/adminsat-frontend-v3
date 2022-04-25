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
// import { ISubinstallationsDetails } from '@shared/models/subinstallations.model';
import { NotificationService } from '@core/services/notification/notification.service';
import { SharedInstallationsHttpService } from '../services/http.service';
import { IInstallationsRetrieve } from '@shared/models/installations.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { hideLoader } from '@shared/utils/general.utils';
import { ActionConfirmComponent } from '@shared/components/action-confirm/action-confirm.component';
import { SubinstallationsCreateComponent } from '../subinstallations-form/subinstallations-form.component';


@Component({
  selector: 'adms-subinstallations-details',
  templateUrl: './subinstallations.component.html',
  styleUrls: ['./subinstallations.component.scss'],
})
export class SubinstallationsListComponent extends CommonDestroy implements OnInit {
  loading = true;
  instance: IInstallationsRetrieve;

  permissions = PERMISSIONS;
  formStatus: IGeneralObject;
  subinstallationIndex:number;
  httpMainActionMethod:any;

  subinstallationWay: boolean;

  displayedColumns: string[] = ["name"];
  formGroup = new FormGroup({
    name: new FormControl(null, [Validators.required])
  })



  constructor(public dialogRef: MatDialogRef<SubinstallationsListComponent>,
    private dialog: MatDialog,
    private installationsHttp: SharedInstallationsHttpService,
    public store: Store<RootAction>,
    public notificationService: NotificationService,
    public permissionsService: PermissionsService,
    public formManageService: FormManageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.httpMainActionMethod = this.installationsHttp.bulk_destroy;
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
    this.installationsHttp.retrieve(this.data.id)
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


  editIngressNameSubinstallation(index: number, way: boolean) {
    this.subinstallationIndex = index;
     this.subinstallationWay = way;
    this.formGroup.get('name').reset(this.instance.subinstallations[index].name);    
    
  }

  updateIngressNameSubinstallation(){
    hideLoader(false);

    const subinstallationoneId = this.instance.subinstallations[this.subinstallationIndex].id;
  
    this.installationsHttp.updateSubinstallation(subinstallationoneId, {id: subinstallationoneId, name: this.formGroup.get('name').value})
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
    this.subinstallationIndex = null;
    this.subinstallationWay = null;
    this.formGroup.get('name').reset(null);
  }




  deleteSubinstallation() {
    this.dialog
      .open(ActionConfirmComponent, {
        panelClass: 'notification',
        data: {
          items: [this.instance.subinstallations[this.subinstallationIndex].name]
        },
      })
      .afterClosed()
      .pipe(
        filter((e: any) => !!e),
        take(1),
        switchMap(() => {

          hideLoader(false);
          return this.installationsHttp.bulk_destroy([this.instance.subinstallations[this.subinstallationIndex].id], [this.instance.subinstallations[this.subinstallationIndex].name])
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
    this.dialog.open(SubinstallationsCreateComponent, {data:  this.instance,panelClass,})
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
