import {TranslateService} from '@ngx-translate/core';
import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootAction } from '@store/root.action';
import { take, takeUntil } from 'rxjs/operators';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { PERMISSIONS } from '@shared/consts/permissions.consts';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { IGeneralObject } from '@shared/models/general.model';
import { SharedEcuAlarmDetailsHttpService } from '../services/http.service';
import { Chart } from 'angular-highcharts';
import { IEcuAlarmDetails } from '@shared/models/ecu-alarm.model';
import { Options } from 'highcharts';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);
let self;

@Component({
  selector: 'adms-ecu-alarm-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class EcuAlarmDetailsComponent extends CommonDestroy implements OnInit {
  loading = true;
  instance: IEcuAlarmDetails = {} as IEcuAlarmDetails;
  permissions = PERMISSIONS;
  formStatus: IGeneralObject;
  areaSplineChart: any;

  areaChartOptions: any;
  metricsAlias: any;
  traduccion = {limiteExcedido : ""}


  constructor(public dialogRef: MatDialogRef<EcuAlarmDetailsComponent>,
    private dialog: MatDialog,
    private ecuHttp: SharedEcuAlarmDetailsHttpService,
    public store: Store<RootAction>,
    private translate: TranslateService,
    public permissionsService: PermissionsService,
    public formManageService: FormManageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    self = this;

    this.translate.get(['LIMIT_EXCEEDED'])
    .pipe(take(1))
    .subscribe(
      (res) => {this.traduccion.limiteExcedido = res.LIMIT_EXCEEDED });

    this.store
      .select('theme', 'metrics_alias')
      .pipe(take(1))
      .subscribe((info) => {
        this.metricsAlias = info
      });
  }

  ngOnInit() {


    this.ecuHttp.details(this.data.id)
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe((res) => {
        this.instance = res;
        this.instance.data.map((elem) => {
          elem[0] = (new Date(elem[0])).getTime();
          return elem;
        });

        this.areaChartOptions =
        {
          chart: {
            type: 'line'
          },
          credits: {
            enabled: false
          },
          title: {
            text: this.instance.value_name
          },
          subtitle: {
            text: null
          },
          xAxis: {
            type: 'datetime',
            labels: {
              format: '{value:%H:%M}'
            }

          },
          yAxis: {
            title: {
              text: this.metricsAlias[this.instance.magnitude]
            },
            plotBands: [{
              
              from: this.instance.alarm_value, // Start of the plot band`
              to: this.instance.alarm_value+100, // Start of the plot band

              label: {
                text: this.traduccion.limiteExcedido,
              }
            }],
          },
          tooltip: {
            formatter: function() {
              
              return '<b>' + this.y +" "+self.metricsAlias[self.instance.magnitude]+'</b><br/>' +
                Highcharts.dateFormat('%e/%m/%y %l:%M %p',
                  this.x);
            }
        
          },
          plotOptions: {
            line: {
              marker: {
                enabled: false
              }
            }
          },
          series: [{
            data: this.instance.data,
            color: 'green',
            showInLegend: false,
          }]
        }


        this.areaSplineChart = new Chart(this.areaChartOptions)

        this.loading = false;

      },
        () => {
          this.dialogRef.close();
        });
  }



}
