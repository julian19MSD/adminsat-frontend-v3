import {AfterViewInit, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormFieldsAssetDocument} from './documents.forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import * as cloneDeep from 'lodash/cloneDeep';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DateAdapter} from '@angular/material/core';

import {AssetDocumentsHttpService} from '@admin/assets/services/http.service';
import {CommonForm} from '@shared/commons/form.common';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {FormManageService} from '@core/services/form-manage/form-manage.service';
import {IAssetDocument} from '@shared/models/assets.model';
import {IHttpParameters} from '@shared/models/form.model';
import {API_URL} from '@shared/consts/api.consts';
import {IName} from '@shared/models/general.model';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'adms-asset-documents-create',
  templateUrl: './documents.component.html'
})
export class AssetDocumentsCreateComponent extends CommonForm implements AfterViewInit {

  formGroup = new FormGroup(cloneDeep(FormFieldsAssetDocument));
  successMessages = 'CREATED_SUCCESSFUL';
  title = 'NEW_DOCUMENT';
  instance: IAssetDocument;
  documentsTypes: IName[] = [];
  actionName = 'create';
  formFieldErrorsMap = {
    matchInclude: 'MAIL_VALIDATION_ERROR'
  }
  updateHeaderData = false;
  httpParams: { [propName: string]: IHttpParameters } = {
    create: {
      method: 'post',
      url: API_URL.asset.documents.general,
      formDataUrl: API_URL.asset.documents.instance
    },
    update: {
      method: 'patch',
      url: API_URL.asset.documents.instance
    }
  };
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    public formManageService: FormManageService,
    public cdRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<AssetDocumentsCreateComponent>,
    public adapter: DateAdapter<any>,
    public documentHttp: AssetDocumentsHttpService,
    public route: ActivatedRoute,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(
      headerMessengerService,
      notificationService,
      translateService,
      httpClient,
      formManageService,
      cdRef,
      route,
      router
    );
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    if (this.data.documentId) {
      this.instanceId = this.data.documentId;
      this.httpParams.update.params = {assetId: this.data.assetId, id: this.data.documentId};
      this.successMessages = 'UPDATE_SUCCESSFUL';
      this.title = 'EDIT_DOCUMENT';
      this.actionName = 'update';
    } else {
      this.httpParams.create.params = {assetId: this.data.assetId}
    }

    this.formGroup.get('activo').setValue(this.data.assetId);
    this.getDocumentList();
  }


  getInstance(): void {
    if (this.instanceId) {
      this.documentHttp.retrieve(this.data.assetId, this.instanceId)
        .subscribe(
          (instance) => {
            this.formGroup.patchValue(instance);
            this.instance = instance;
            this.endLoad();
          },
          () => this.endLoad()
        )
    } else {
      this.endLoad();
    }
  }

  onSuccessSubmit(instance) {
    this.dialogRef.close(true);
    return super.onSuccessSubmit(instance);
  }

  private endLoad() {
    this.loader = false
  }

  /**
   * Obtiene la lista de documentos.
   */
  private getDocumentList(): void {
    this.documentHttp.getDocumentTypesSelect()
      .subscribe(
        (res) => {
          this.documentsTypes = res;
          this.getInstance();
        },
        () => this.loader = false
      );
  }
}
