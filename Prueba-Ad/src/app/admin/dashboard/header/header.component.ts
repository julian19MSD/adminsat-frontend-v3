import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {distinctUntilChanged, filter, take, takeUntil} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {RootAction} from '@store/root.action';

import {DashboardHttpService} from '@admin/dashboard/services/http.service';
import {HeaderMessengerService} from '@admin/shared/services/header-messenger.service';
import {IDashboardHeader} from '@shared/models/dashboard.model';
import {CommonHeader} from '@shared/commons/header.common';
import {IClientOption} from '@shared/models/client.model';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ClientSelectorComponent} from '@admin/dashboard/client-selector/client-selector.component';

@Component({
  selector: 'adms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent extends CommonHeader implements OnInit, AfterViewInit {
  selectClientsOptions: IClientOption[] = [];
  clientCrtl = new FormControl();
  isEditing: boolean;
  headerState: IDashboardHeader;

  constructor(
    public headerMessengerService: HeaderMessengerService,
    private cdRef: ChangeDetectorRef,
    private store: Store<RootAction>,
    private httpService: DashboardHttpService,
    private bottomSheet: MatBottomSheet
  ) {
    super(headerMessengerService);
  }

  ngOnInit() {
    this.httpService.selectClients()
      .subscribe((clientsOptions) => {
        this.headerMessengerService.sendMessageToComponent({key: 'ready'});
        this.selectClientsOptions = clientsOptions;
        this.cdRef.detectChanges();
      });
  }

  ngAfterViewInit(): void {
    this.headerMessengerService.getMessageFromComponent()
      .pipe(
        filter((e) => !!e && !!e.value),
        takeUntil(this.ngDestroyed$),
      ).subscribe(state => {
      this.headerState = state.value;
      this.cdRef.detectChanges();
    });

    this.clientCrtl.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.ngDestroyed$)
      )
      .subscribe((client: number) => {
        this.sendHeaderClick('client', client);
      });

    this.store.select('theme', 'cliente')
      .pipe(
        filter((e) => undefined !== e),
        take(1),
      )
      .subscribe((client: number) => {
        this.clientCrtl.patchValue(client);
      });
  }

  /**
   * Notifica el evento de click en el boton editar.
   */
  editClick() {
    this.isEditing = !this.isEditing;
    this.sendHeaderClick('edit', this.isEditing);
  }

  openClientSelectorForMobile() {
    this.bottomSheet.open(ClientSelectorComponent, {
      data: {
        clients: this.selectClientsOptions,
        ctrl: this.clientCrtl
      }
    })
      .afterDismissed()
      .pipe(
        filter(e => !!e),
        take(1)
      )
      .subscribe((client) => this.clientCrtl.patchValue(client));
  }
}

