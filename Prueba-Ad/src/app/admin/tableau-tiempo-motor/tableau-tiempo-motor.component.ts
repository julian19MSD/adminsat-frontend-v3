import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonForm } from '@shared/commons/form.common';
import { IFormHeaderState } from '@shared/models/header.model';
import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TableauTiempoMotorHttpService } from './services/http.service'
import { filter, take } from 'rxjs/operators';
import { SetSinevaCollapseState } from '@store/actions/theme.action';
import { Store } from '@ngrx/store';
import { RootAction } from '@store/root.action';

declare var tableau: any;
let self;


@Component({
  selector: 'app-tableau-tiempo-motor',
  templateUrl: './tableau-tiempo-motor.component.html',
  styleUrls: ['./tableau-tiempo-motor.component.scss']
})
export class  TableauTiempoMotorComponent extends CommonForm implements AfterViewInit, OnInit {

  formHeaderData: IFormHeaderState = {
    title: 'MOTOR_TIME',
  }

  tableauViz: any
  APItableau : string = "https://tableau.adminsat.com/views/consultamando-Dashboard/TIEMPOMOTOR?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link";
 


  constructor(
    public store: Store<RootAction>,
    public headerMessengerService: HeaderMessengerService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public httpClient: HttpClient,
    private tableauHttp: TableauTiempoMotorHttpService,
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
          this.APItableau = "https://tableau.adminsat.com/views/Flotaenuso/TIEMPOMOTOR?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link";
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
    var placeholderDiv = document.getElementById('tableauViz5');
    var url = this.APItableau;
    var options = {
      hideTabs: true,
      toolbarPosition:  "TOP",
      onFirstInteractive: function() {

      //   self.tableauViz.addEventListener(tableau.TableauEventName.VIZ_RESIZE, function (size) {
      //     console.log(size.$2.width );
      //  });
        // The viz is now ready and can be safely used.
      }
    };
    this.tableauViz = new tableau.Viz(placeholderDiv, url, options);    

 
    // this.tableauHttp.getTicketTableau().subscribe(
    //   (r) =>{
    //     console.log(r)
    //   }
    // )
  }

  


}
