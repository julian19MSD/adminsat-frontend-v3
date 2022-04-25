import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonForm } from '@shared/commons/form.common';
import { IFormHeaderState } from '@shared/models/header.model';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TableauFlotaTotalHttpService } from './services/http.service'
import { filter, take } from 'rxjs/operators';
import { SetSinevaCollapseState } from '@store/actions/theme.action';
import { RootAction } from '@store/root.action';
import { Store } from '@ngrx/store';

declare var tableau: any;


@Component({
  selector: 'app-tableau-flota-total',
  templateUrl: './tableau-flota-total.component.html',
  styleUrls: ['./tableau-flota-total.component.scss']
})
export class  TableauFlotaTotalComponent extends CommonForm implements AfterViewInit, OnInit {

  formHeaderData: IFormHeaderState = {
    title: 'TOTAL_FLEET',
  }

  tableauViz: any
  APItableau : string = "https://tableau.adminsat.com/views/Flotatotal/FLOTA?:showAppBanner=false&:origin=viz_share_link&:display_count=n&:showVizHome=n";


  constructor(
    public store: Store<RootAction>,
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    private tableauHttp: TableauFlotaTotalHttpService,
    public formManageService: FormManageService,
    public cdRef: ChangeDetectorRef,
    public route: ActivatedRoute,
    public router: Router
  ) {
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


    this.store.select('theme', 'cliente')
    .pipe(
      take(1)
    )
    .subscribe((cliente) => {
      setTimeout(() => this.store.dispatch(new SetSinevaCollapseState(true)), 0)
      if (cliente === 147)
          this.APItableau = "https://tableau.adminsat.com/views/FlotaTotal/FLOTA?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link";
    })

  }


  ngAfterViewInit(): void {

    if (this.updateHeaderData) {
      setTimeout(() => {
        this.headerMessengerService.sendMessageToHeader({value: this.formHeaderData});
      }, 0);
    }
    this.loader = false;
  }


  ngOnInit() {
    var placeholderDiv = document.getElementById('tableauViz3');
    var url = this.APItableau;
    var options = {
      hideTabs: true,
      toolbarPosition:  "TOP",
      onFirstInteractive: function() {
        // The viz is now ready and can be safely used.
      }
    };
    this.tableauViz = new tableau.Viz(placeholderDiv, url, options);    
  }

  


}
