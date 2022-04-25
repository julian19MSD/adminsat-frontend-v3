import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {MaterialModule} from '@material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HistoricalChangesComponent} from '@admin/shared/historical-changes/historical-changes.component';
import {SharedModule} from '@shared/shared.module';
import {AssetDetailsComponent} from '@admin/shared/assets/details/details.component';
import {AssetPreviewComponent} from '@admin/shared/assets/preview/preview.component';
import {SharedAssetHttpService} from '@admin/shared/assets/services/http.service';
import {DeviceAssociationsPreviewComponent} from '@admin/shared/devices/associations-preview/associations-preview.component';
import {DeviceDetailsComponent} from '@admin/shared/devices/details/details.component';
import {DevicePreviewComponent} from '@admin/shared/devices/preview/preview.component';
import {SharedDeviceHttpService} from '@admin/shared/devices/services/http.service';
import {RoadActorAssociationsPreviewComponent} from '@admin/shared/road-actor/associations-preview/associations-preview.component';
import {RoadActorDetailsComponent} from '@admin/shared/road-actor/details/details.component';
import {RoadActorPreviewComponent} from '@admin/shared/road-actor/preview/preview.component';
import {SharedRoadActorHttpService} from '@admin/shared/road-actor/services/http.service';
import {ControlZonesWindowsHttpService, SharedMapReportHttpService} from '@admin/shared/map-reports/services/http.service';
import {MapReportsContainer} from '@admin/shared/map-reports/container/map-reports.component';
import {SensorsDialogComponent} from '@admin/shared/map-reports/sensors/sensors.component';
import {MobileyeDialogComponent} from '@admin/shared/map-reports/mobile-eye/mobile-eye.component';
import {SendCommandDialogComponent} from '@admin/shared/map-reports/send-command/send-command.component';
import {LocationItemComponent} from './map-reports/location-item/location-item.component';
import {LocationDetailComponent} from './map-reports/location-detail/location-detail.component';
import {SharedControlZoneDetailsHttpService} from '@admin/shared/control-zones/details/services/http.service';
import {ControlZoneDetailComponent} from '@admin/shared/control-zones/details/details.component';
import {SharedShiftAssignmentDeparturesHttpService, SharedShiftAssignmentDetailsHttpService} from '@admin/shared/shift-assignment/services/http.service';
import {ShiftAssignmentDetailsComponent} from '@admin/shared/shift-assignment/details/details.component';
import {SharedHistoricalReportsHttpService} from '@admin/shared/historical-reports/services/http.service';
import {HistoricalReportsComponent} from '@admin/shared/historical-reports/historical-reports.component';
import {SharedRouteDetailsHttpService} from '@admin/shared/routes/details/services/http.service';
import {RouteDetailsComponent} from '@admin/shared/routes/details/details.component';
import { TpmsDetailsComponent } from './tpms/details/details.component';
import { SharedTpmsHttpService } from './tpms/services/http.service';
import { AssetAssociationsPreviewComponent } from './assets/associations-preview/associations-preview.component';
import { WorkdayDetailsComponent } from './workday/details/details.component';
import { SharedWorkdayDetailsHttpService } from './workday/services/http.service';
import { SendCommandPreviewComponent } from './send-command/preview/preview.component';
import { SendCommandAssociationsPreviewComponent } from './send-command/associations-preview/associations-preview.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CommandsDetailsComponent } from './commands/details/details.component';
import { EcuAlarmDetailsComponent } from './ecu-alarm/details/details.component';
import { SharedEcuAlarmDetailsHttpService } from './ecu-alarm/services/http.service';
import { ChartModule } from 'angular-highcharts';
import { WorkdayRecalculateComponent } from './workday/recalcular-jornada/recalcular-jornada.component';
import { SendCommandStatusDialogComponent } from './map-reports/send-command-status/send-command-status.component';
import { SharedZonesHttpService } from './zones/services/http.service';
import { SubzonesListComponent } from './zones/subzones-list/subzones.component';
import { SubzonesCreateComponent } from './zones/subzone-form/subzone-form.component';
import { SubinstallationsListComponent } from './installations/subinstallations-list/subinstallations.component';
import { SubinstallationsCreateComponent } from './installations/subinstallations-form/subinstallations-form.component';
import { SharedInstallationsHttpService } from './installations/services/http.service';
import { ZoneItemComponent } from './map-reports/zone-item/zone-item.component';
import { ZoneDetailComponent } from './map-reports/zone-detail/zone-detail.component';
import { ControlInstallationsCreateComponent } from './map-reports/control-installations-create/control-installations-create.component';
import { OperatingWindowsCreateComponent } from './map-reports/operating-windows/operating-windows.component';
import { PermanenceDetailsComponent } from './permanence/details/details.component';
import { SharedPermanenceDetailsHttpService } from './permanence/services/http.service';
import { ShiftAssignmentDeparturesComponent } from './shift-assignment/departures/departures.component';
import { DepartureMapComponent } from './departure-maps/departures-map.component';
import { SharedDepartureMapsHttpService } from './departure-maps/services/http.service';

@NgModule({
  declarations: [
    DepartureMapComponent,
    ShiftAssignmentDeparturesComponent,
    PermanenceDetailsComponent,
    OperatingWindowsCreateComponent,
    ControlInstallationsCreateComponent,
    ZoneDetailComponent,
    SubinstallationsListComponent,
    SubinstallationsCreateComponent,
    SubzonesCreateComponent,
    HistoricalChangesComponent,
    CommandsDetailsComponent,
    AssetDetailsComponent,
    AssetPreviewComponent,
    DeviceAssociationsPreviewComponent,
    DeviceDetailsComponent,
    DevicePreviewComponent,
    RoadActorAssociationsPreviewComponent,
    RoadActorDetailsComponent,
    RoadActorPreviewComponent,
    MapReportsContainer,
    SensorsDialogComponent,
    MobileyeDialogComponent,
    SendCommandDialogComponent,
    SendCommandStatusDialogComponent,
    LocationItemComponent,
    ZoneItemComponent,
    LocationDetailComponent,
    ControlZoneDetailComponent,
    ShiftAssignmentDetailsComponent,
    HistoricalReportsComponent,
    RouteDetailsComponent,
    TpmsDetailsComponent,
    WorkdayDetailsComponent,
    AssetAssociationsPreviewComponent,
    SendCommandPreviewComponent,
    EcuAlarmDetailsComponent,
    SendCommandAssociationsPreviewComponent,
    WorkdayRecalculateComponent,
    SubzonesListComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    SharedModule,
    DragDropModule,
    ChartModule
  ],
  exports: [
    DepartureMapComponent,
    ShiftAssignmentDeparturesComponent,
    PermanenceDetailsComponent,
    OperatingWindowsCreateComponent,
    ControlInstallationsCreateComponent,
    ZoneDetailComponent,
    ZoneItemComponent,
    SubinstallationsListComponent,
    SubinstallationsCreateComponent,
    SubzonesCreateComponent,
    MaterialModule,
    TranslateModule,
    HistoricalChangesComponent,
    AssetDetailsComponent,
    AssetPreviewComponent,
    DeviceAssociationsPreviewComponent,
    DeviceDetailsComponent,
    DevicePreviewComponent,
    RoadActorAssociationsPreviewComponent,
    RoadActorDetailsComponent,
    RoadActorPreviewComponent,
    MapReportsContainer,
    SensorsDialogComponent,
    MobileyeDialogComponent,
    SendCommandDialogComponent,
    SendCommandStatusDialogComponent,
    ControlZoneDetailComponent,
    ShiftAssignmentDetailsComponent,
    HistoricalReportsComponent,
    RouteDetailsComponent,
    SharedModule,
    TpmsDetailsComponent,
    AssetAssociationsPreviewComponent,
    WorkdayDetailsComponent,
    SendCommandPreviewComponent,
    EcuAlarmDetailsComponent,
    SendCommandAssociationsPreviewComponent,
    WorkdayRecalculateComponent,
    SubzonesListComponent
  ],
  providers: [
    SharedDepartureMapsHttpService,
    SharedPermanenceDetailsHttpService,
    ControlZonesWindowsHttpService,
    SharedTpmsHttpService,
    SharedWorkdayDetailsHttpService,
    SharedEcuAlarmDetailsHttpService,
    SharedAssetHttpService,
    SharedDeviceHttpService,
    SharedRoadActorHttpService,
    SharedMapReportHttpService,
    SharedControlZoneDetailsHttpService,
    SharedShiftAssignmentDetailsHttpService,
    SharedHistoricalReportsHttpService,
    SharedRouteDetailsHttpService,
    SharedZonesHttpService,
    SharedInstallationsHttpService,
    SharedShiftAssignmentDeparturesHttpService
  ]
})
export class SharedAdminModule {
}
