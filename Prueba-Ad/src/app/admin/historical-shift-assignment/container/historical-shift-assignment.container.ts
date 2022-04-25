import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {RootAction} from '@store/root.action';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {CommonList} from '@shared/commons/list.common';
import {IClientOption} from '@shared/models/client.model';
import {PermissionsService} from '@core/services/permissions/permissions.service';
import {HistoricalShiftAssignmentHttpService} from '@admin/historical-shift-assignment/services/http.service';
import {NotificationService} from '@core/services/notification/notification.service';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {IListHeaderState} from '@shared/models/header.model';
import {PERMISSIONS} from '@shared/consts/permissions.consts';
import {filter, switchMap, take} from 'rxjs/operators';
import {HistoricalShiftAssignmentSortComponent} from '@admin/historical-shift-assignment/sort/sort.component';
import {HistoricalShiftAssignmentFilterComponent} from '@admin/historical-shift-assignment/filter/filter.component';
import {hideLoader} from '@shared/utils/general.utils';
import {ActionConfirmComponent} from '@shared/components/action-confirm/action-confirm.component';

@Component({
  selector: 'adms-historical-shift-assignment',
  templateUrl: './historical-shift-assignment.container.html',
  styleUrls: ['./historical-shift-assignment.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
export class HistoricalShiftAssignmentContainer extends CommonList {
  listHeaderState = {
    title: 'HISTORICAL_SHIFT_ASSIGNMENTS',
    defaultActionText: 'RESTORE_SHIFT_ASSIGNMENTS',
    defaultActionTooltip: 'RESTORE_SHIFT_ASSIGNMENTS_TOOLTIP'
  } as IListHeaderState;

  actionsPermissions = {
    default: PERMISSIONS.rutas.enturnamientos.editar,
  };

  mainActionButtonMessage = 'RESTORE_SHIFT_ASSIGNMENTS';
  mainActionVerificationMessage = 'RESTORE_SHIFT_ASSIGNMENTS_CONFIRM';
  mainActionSuccessMessage = 'RESTORED_SUCCESSFUL';
  secondActionButtonMessage = 'YES_RESET_SHIFT_ASSIGNMENTS';
  secondActionSuccessMessage = 'RESTORED_SUCCESSFUL';

  clients: IClientOption[] = [];
  sortComponent = HistoricalShiftAssignmentSortComponent;
  filterComponent = HistoricalShiftAssignmentFilterComponent;

  constructor(
    public store: Store<RootAction>,
    public route: ActivatedRoute,
    public httpClient: HttpClient,
    public translate: TranslateService,
    public bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    public cdRef: ChangeDetectorRef,
    public notificationService: NotificationService,
    public headerMessengerService: HeaderMessengerService,
    public permissionsService: PermissionsService,
    private historicalShitfHttp: HistoricalShiftAssignmentHttpService
  ) {
    super(
      store,
      route,
      httpClient,
      translate,
      bottomSheet,
      dialog,
      cdRef,
      notificationService,
      headerMessengerService,
      permissionsService
    );
    this.httpListMethod = this.historicalShitfHttp.list;
  }

  /**
   * Obtiene los choices del modulo
   */
  initialContent(): void {
    this.historicalShitfHttp.getChoices()
      .subscribe(res => {
        this.choices = res;
        super.initialContent();
      });
  }


  mainAction() {
    this.dialog.open(ActionConfirmComponent, {
      panelClass: 'notification',
      data: {
        actionMessage: this.mainActionVerificationMessage,
        mainButtonMessage: this.mainActionButtonMessage,
        secondButtonMessage: this.secondActionButtonMessage,
        items: this.selectedNames
      }
    })
      .afterClosed()
      .pipe(
        filter((e: any) => !!e),
        take(1),
        switchMap((result) => {
          hideLoader(false);
          return this.historicalShitfHttp.restore(this.selectedItems, 'second' === result)
            .pipe(
              switchMap(() => {
                const msg = 'second' === result ? this.secondActionSuccessMessage : this.mainActionSuccessMessage;
                this.getListData()
                return this.notificationService.sendSuccessNotification({}, null, msg)
              })
            )
        })
      )
      .subscribe({
        error: (err) => this.notificationService.sendErrorNotification({}, err)
      });
  }
}
