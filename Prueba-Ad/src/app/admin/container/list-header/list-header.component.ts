import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material/dialog';

import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {RootAction} from '@store/root.action';
import {CommonHeader} from '@shared/commons/header.common';
import {IListHeaderState} from '@shared/models/header.model';
import {STATIC_URL} from '@shared/consts/api.consts';
import {filter, takeUntil} from 'rxjs/operators';
import {InviasTwitterDialogComponent} from '@admin/container/invias-twitter/invias-twitter.component';


@Component({
  selector: 'adms-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListHeaderComponent extends CommonHeader implements AfterViewInit {
  crudHeaderState: IListHeaderState;
  searchMode = false;
  search: string;
  pageSize: string;
  assetsUrl = STATIC_URL;

  constructor(public headerMessengerService: HeaderMessengerService,
              private cdRef: ChangeDetectorRef,
              private store: Store<RootAction>,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) {
    super(headerMessengerService);
    this.search = this.route.snapshot.queryParamMap.get('search');
    this.pageSize = this.route.snapshot.queryParamMap.get('page_size');
  }

  ngAfterViewInit(): void {
    this.headerMessengerService.getMessageFromComponent()
      .pipe(
        filter((e) => !!e && !!e.value),
        takeUntil(this.ngDestroyed$)
      )
      .subscribe((state) => {
        this.crudHeaderState = state.value;
        this.cdRef.detectChanges();
      });
  }

  changeSearhcMode() {
    if (!this.searchMode) {
      this.searchMode = true;
      this.cdRef.detectChanges();
    } else {
      this.onSearch();
    }
  }

  /**
   * Agrega/actualiza en los query params la clave page_size para que el crud haga la peticion a la API con el tamaño de pagina deseado.
   * @param size: El tamaño de la pagina.
   */
  setPageSize(size: string) {
    this.pageSize = size;
    this.router.navigate([], {relativeTo: this.route, queryParamsHandling: 'merge', queryParams: {page_size: size}});
  }

  /**
   * Abre un dialogo con los twits del #767.
   */
  openTweetDialog(): void {
    this.dialog.open(InviasTwitterDialogComponent, {panelClass: 'full-screen'});
  }

  /**
   * Agrega/actualiza en los query params la clave search para que el crud haga la peticion a la API con el parametro de busqueda.
   */
  onSearch() {
    const qp = this.route.snapshot.queryParamMap.get('search');
    if (!(!qp && !Boolean(this.search)) || qp !== this.search) {
      this.search = Boolean(this.search) ? this.search : null;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {search: this.search}
      });
    }
  }
}
