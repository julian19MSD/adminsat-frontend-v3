import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { PermanenceHttpService } from '@admin/permanence/services/http.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '@core/services/notification/notification.service';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { CommonList } from '@shared/commons/list.common';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { IClientOption } from '@shared/models/client.model';
import { IListHeaderState } from '@shared/models/header.model';
import { IPermanenceListItem } from '@shared/models/permanence.model';
import { RootAction } from '@store/root.action';
import { BehaviorSubject } from 'rxjs';
import { PermanenceFilterComponent } from '../filter/filter.component';
import { PermanenceSortComponent } from '../sort/sort.component';
import { take } from 'rxjs/operators';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'adms-permanence-list',
  templateUrl: './list.container.html',
  styleUrls: ['./list.container.scss']
})
export class PermanenceContainerComponent extends CommonList implements OnInit {

  listHeaderState = {
    title: 'PERMANENCE',
    downloadList: false,
  } as IListHeaderState;



  clients: IClientOption[] = [];

  permissions = PERMISSIONS;


  filterComponent = PermanenceFilterComponent;
  sortComponent = PermanenceSortComponent

  listItems$: BehaviorSubject<IPermanenceListItem[]> = new BehaviorSubject<IPermanenceListItem[]>([]);


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
    private assetEfficiencyHttp: PermanenceHttpService,
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

    this.httpListMethod = this.assetEfficiencyHttp.list;
    //this.httpDownloadMethod = this.assetEfficiencyHttp.download;

  }



  /**
   * Sincroniza el scroll lateral del virtualscroller con el del header.
   * headerScroll: El elemento del header
   * event: El evento de scroll del virtualscroller.
   */
  updateScroll(headerScroll: HTMLElement, event) {
    headerScroll.scrollLeft = event.target.scrollLeft;
    this.scrollEnd(event);
  }


  performGetListData() {
    const listItems = this.listItems$.getValue()
    var newListItem = [];
    listItems.forEach(a => {

      var asset = cloneDeep(a)

      if (asset.permanences.length > 0) {
        asset.permanences.forEach(permanence => {
          var assetN = cloneDeep(a)

          assetN.permanence = permanence;
          newListItem.push(assetN);
        })
      }
      else {
        asset.permanence = null;
        newListItem.push(asset);

      }
    })
    this.listItems$.next(newListItem);


  }



  /**
  * Pide la siguiente pagina a la API.
  */
  fetchMore() {
    if (!this.fetching && this.nextPage) {
      this.fetching = true;
      this.cdRef.detectChanges();
      this.httpListMethod({}, this.nextPage)
        .pipe(take(1))
        .subscribe((res) => {
          this.fetch(res);

          this.performGetListData();
        }
        );
    }
  }




}
