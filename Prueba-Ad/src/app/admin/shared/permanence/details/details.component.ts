import { TranslateService } from '@ngx-translate/core';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootAction } from '@store/root.action';
import { take, takeUntil } from 'rxjs/operators';
import { CommonDestroy } from '@shared/commons/destroy.common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PermissionsService } from '@core/services/permissions/permissions.service';
import { FormManageService } from '@core/services/form-manage/form-manage.service';
import { SharedPermanenceDetailsHttpService } from '../services/http.service';
import { DataSet, Timeline } from "vis-timeline/standalone";
import { LOADER_CONTENT } from '@shared/consts/loader';
import { IPermanenceDetails } from '@shared/models/permanence.model';
import { format } from 'date-fns';
import { add } from 'date-fns/esm';

@Component({
  selector: 'adms-permanence-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class PermanenceDetailsComponent extends CommonDestroy implements OnInit {
  loading = true;
  instance: IPermanenceDetails = {} as IPermanenceDetails;
  loaderContent = LOADER_CONTENT;


  
  timeline: Timeline
  options: {};
  dataLine: any;
  groups: any;
  startTime;
  now: Date;
  metricsAlias: any;


  constructor(public dialogRef: MatDialogRef<PermanenceDetailsComponent>,
    private dialog: MatDialog,
    private assetEficiencyHttp: SharedPermanenceDetailsHttpService,
    public store: Store<RootAction>,
    public permissionsService: PermissionsService,
    public formManageService: FormManageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  
    this.now = new Date();
    this.startTime =add(this.now,{
      hours: -8
    })
 
  }

  ngOnInit() {

  
    this.assetEficiencyHttp.details(this.data.id)
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe((res) => {

        this.instance = res;
        this.getTimelineData();
        this.getTimelineGroups();
        this.getOptions();
        setTimeout(() => {
          
          var container = document.getElementById('timeline');
          this.timeline = new Timeline(container, null, this.options);
          this.timeline.setGroups(this.groups);
          this.timeline.setItems(this.dataLine);
          this.loading = false;
        }, 0)
      },
        () => {
          this.dialogRef.close();
        });
  }

  getTimelineGroups() {
    // create groups
    this.groups = new DataSet(
      this.instance.groups
    );
  }

  getTimelineData() {
    // Create a DataSet (allows two way dataLine-binding)
    // create items
    this.dataLine = new DataSet();


    this.instance.items.forEach(item => {

      var content = document.createElement('div');
      content.style.width = '100%';
      
      var img = document.createElement('img');
      img.src = item.icono;
      img.style.width = '30px';
      img.style.height = '30px';
      img.style.marginLeft = 'auto';
      img.style.marginRight = 'auto';
      img.style.display = 'inline'
      content.appendChild(img);
      var contentName = document.createElement('p')
      contentName.style.display ='inline'
      var name = document.createTextNode(item.installation_type_nombre)
      contentName.appendChild(name)
      content.appendChild(contentName);
      var containerBar = document.createElement('div');
      containerBar.id = "progress-" + item.color;
      content.appendChild(containerBar)

      var duracionContainer = document.createElement('p');
      var duracion =document.createTextNode(item.duration.toString() +" min");
      duracionContainer.appendChild(duracion);
      content.appendChild(duracionContainer)

      var fechaEntrada =format(new Date(item.entry_time),'P')
      var horaEntrada =format(new Date(item.entry_time),'p')

      var fechaSalida =format(new Date(item.exit_time),'P')
      var horaSalida =format(new Date(item.exit_time),'p')

      this.dataLine.add({
        id: item.id,
        group: item.group,
        start: item.entry_time,
        end: item.exit_time,
        content: content,
        className: "transparent",
        title:"<b>"+(item.zona_control_nombre ?? "") +" "+item.installation_type_nombre+"</b>"+"<p>"+fechaEntrada+" "+horaEntrada+" - "+fechaSalida+" "+horaSalida+"</p>"

      });


    })

 
  }

  getOptions() {
    this.options = {
      stack: false,
      editable: false,
      orientation:"both",
      zoomKey:'ctrlKey',
      horizontalScroll:true,
      start: this.startTime,
      end: this.now,
      tooltip: {
        followMouse: true
      },
      margin:{
        item: 100,
        axis:10
      }
    };
  }
}
