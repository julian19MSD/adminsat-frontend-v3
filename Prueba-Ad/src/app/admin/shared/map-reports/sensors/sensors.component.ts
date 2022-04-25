import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'adms-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})

export class SensorsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SensorsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  static checkSensor(item, type: number): { tooltip: string; state: boolean; valor: string } {
    switch (type) {
      case 0:
        item.tooltip = item.estado_no_deseado ? 'SENSOR_UNWANTED_STATE' : 'SENSOR_IN_NORMAL_STATE';
        if (item.umbral_variacion) {
          item.state = false;
          item.tooltip = 'SENSOR_VARIATION';
        } else if (item.umbral_max) {
          item.state = false;
          item.tooltip = 'SENSOR_ABOVE_MAXIMUM_ALLOWED_VALUE';
        } else if (item.umbral_min) {
          item.state = false;
          item.tooltip = 'SENSOR_BELOW_MINIMUM_ALLOWED_VALUE';
        } else {
          item.state = true;
          item.tooltip = 'SENSOR_VALUE_IN_ALLOWED_RANGE';
        }
        break;
      case 1:
        item.tooltip = item.estado_no_deseado ? 'SENSOR_UNWANTED_STATE' : 'SENSOR_IN_NORMAL_STATE';
        item.state = !item.estado_no_deseado;
        item.valor = item.valor === 0 ? item.estados_json.OFF : item.valor === 1 ? item.estados_json.ON : null;
        break;
    }
    return item;
  }

  ngOnInit() {
    Object.keys(this.data).forEach(key => {
      if (this.data[key] && Object.keys(this.data[key]).length === 0) {
        delete this.data[key];
      } else {
        Object.keys(this.data[key]).forEach(subkey => {
          switch (key) {

            case 'analogos':
              this.data[key][subkey] = SensorsDialogComponent.checkSensor(this.data[key][subkey], 0);
              this.data[key][subkey].valueName = 'VALUE';
              this.data[key][subkey].showCode = true;
              break;

            case 'digitales':
              this.data[key][subkey] = SensorsDialogComponent.checkSensor(this.data[key][subkey], 1);
              this.data[key][subkey].valueName = 'STATE';
              this.data[key][subkey].showCode = true;
              break;

            case 'computador':
              this.data[key][subkey] = SensorsDialogComponent.checkSensor(this.data[key][subkey], 0);
              this.data[key][subkey].valueName = 'VALUE';
              this.data[key][subkey].showCode = false;
          }
        });
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
