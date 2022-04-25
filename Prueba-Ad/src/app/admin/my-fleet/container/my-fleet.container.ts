import { HeaderMessengerService } from '@admin/shared/services/header-messenger.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { STATIC_URL } from '@shared/consts/api.consts';
import { LOADER_CONTENT } from '@shared/consts/loader';
import { IFleetInfo, IInstallationsFleetInfo } from '@shared/models/my-fleet';
import { takeUntil } from 'rxjs/operators';
import { MyFleetDashboardHttpService } from '../services/http.service';



@Component({
  selector: 'adms-my-fleet',
  templateUrl: './my-fleet.container.html',
  styleUrls: ['./my-fleet.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// tslint:disable-next-line:component-class-suffix
export class MyFleetContainer extends CommonDestroy {

  InstallationSelected;
  InstallationsInfo: IInstallationsFleetInfo ;
  noImage: boolean;
  fleetInfo:IFleetInfo;
  loading = true;
  client: number;
  loaderContent = LOADER_CONTENT;
  staticUrl = STATIC_URL;
  loader = false;


  constructor(
    private headerMessengerService: HeaderMessengerService,
    private fleetHttpServices: MyFleetDashboardHttpService,
    private cdref: ChangeDetectorRef) {
    super();
    this.listenHeaderClick();
  }


  /**
   * Escuche un evento de click que venga desde el header.
   */
  private listenHeaderClick(): void {
    this.headerMessengerService.getMessageFromHeader()
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(
        (action) => {
          switch (action.key) {

            case 'client':
              if (this.client !== action.value) {
                this.client = action.value;
                this.InstallationsInfo = null;
                this.get_data();
              }
              break;

              case 'refresh':
                this.InstallationsInfo = null;
                this.get_data();

              break;

          }
        }
      );
  }

  viewSubInstallations(id: number){
    if(id){
    this.loader = true
    this.InstallationSelected = id;
    this.cdref.detectChanges();
    this.fleetHttpServices.subinstallations(id).subscribe(
      (res)=>{
        this.InstallationsInfo = res;
        this.get_data();
      },
      (err)=>{
        this.loader = false;
        this.cdref.detectChanges();
      }
    )
    this.cdref.detectChanges();
    }
  }



  public get_data(): void {
    this.loading = true;
    const params = {cliente: this.client};

    this.fleetHttpServices.fleet(params)
     .subscribe((result) => {
       this.fleetInfo = result;
        this.loading = false;
        this.loader = false;
        this.cdref.detectChanges();
      }, error => {
        this.loading = false;
        this.loader = false;
        this.cdref.detectChanges();
      });
  }
}
