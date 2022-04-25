import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, } from '@angular/core';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { RootAction } from '@store/root.action';
import { take } from 'rxjs/operators';
import { ListItemsECUModel, ItemsTableECUModel, TableECUModel } from './mocks/forms';

@Component({
  selector: 'app-ecu',
  templateUrl: './ecu.component.html',
  styleUrls: ['./ecu.component.scss']
})
export class EcuComponent implements OnChanges, AfterViewInit {

  @Input() ecuItems: ListItemsECUModel[] = [];
  @Output() chargeCompleted: EventEmitter<boolean> = new EventEmitter();

  metricsAlias: any;
  selectAsset: any[] = []
    ;
  tableAsset: TableECUModel[] = [];


  displayedColumns: string[] = ['propiedad', 'valor'];
  promedios = ["presion_aceite_promedio", "refrigerante_promedio", "refrigerante_maximo", "admision_maximo", "admision_promedio", "presion_aceite_maximo", "presion_combustible_maximo", "presion_combustible_promedio"];
  itemTable: TableECUModel[] = [];
  featuresItemTable: ItemsTableECUModel;
  omitValues = [
    "desde",
    "hasta",
    "nombre",
    "placa"
  ];


  usAmount = 0;
  usAmount2 = 0;
  consumoTotal = 0;
  consumoTotal2 = 0;


  constructor(public store: Store<RootAction>,
    public translate: TranslateService,) {

    this.store.select('theme', 'metrics_alias').pipe(take(1)).subscribe(info => this.metricsAlias = info);

    this.featuresItemTable = {
      consumo: { traduccion: "CONSUMPTION_OF_THE_PERIOD", medida: this.metricsAlias.volume },
      consumo_inactivo: { traduccion: "INACTIVE_CONSUMPTION", medida: this.metricsAlias.volume },
      consumo_inactivo_total: { traduccion: "ACCUMULATED_INACTIVE_CONSUMPTION", medida: this.metricsAlias.volume },
      consumo_total: { traduccion: "ACCUMULATED_CONSUMPTION", medida: this.metricsAlias.volume },
      odometro: { traduccion: "PERIOD_DISTANCE", medida: this.metricsAlias.distance },
      odometro_total: { traduccion: "ACCUMULATED_DISTANCE_OF_THE_PERIOD", medida: this.metricsAlias.distance },
      presion_aceite_maximo: { traduccion: "MAXIMUM_OIL_PRESSURE", medida: this.metricsAlias.pressure },
      presion_aceite_promedio: { traduccion: "AVERAGE_OIL_PRESSURE", medida: this.metricsAlias.pressure },
      promedio_consumo: { traduccion: "AVERAGE_CONSUMPTION", medida: this.metricsAlias.distance + '/' + this.metricsAlias.volume },
      refrigerante_maximo: { traduccion: "MAXIMUM_REFRIGERANT_TEMPERATURE", medida: "°C" },
      refrigerante_promedio: { traduccion: "AVERAGE_REFRIGERANT_TEMPERATURE", medida: "°C" },
      admision_maximo: { traduccion: "MAXIMUM_INTAKE_AIR_TEMPERATURE", medida: "°C" },
      admision_promedio: { traduccion: "AVERAGE_INTAKE_AIR_TEMPERATURE", medida: "°C" },
      presion_combustible_maximo: { traduccion: "AVERAGE_FUEL_PRESSURE", medida: this.metricsAlias.pressure },
      presion_combustible_promedio: { traduccion: "MAXIMUM_FUEL_PRESSURE", medida: this.metricsAlias.pressure },
      costo: { traduccion: "FUEL_COST_PER_", medida: "$" },
      costo_total: { traduccion: "FUEL_COST_OF_THE_PERIOD", medida: "$" }
    };

  };

  onNgModelChange(event: any) {
    this.tableAsset = [];
    Object.keys(this.featuresItemTable).forEach((key: string) => {
      this.tableAsset.push({
        "propiedad": key,
        "valor": this.selectAsset[0][key] ?? 0,
        "medida": this.featuresItemTable[key].medida,
        "traduccion": this.featuresItemTable[key].traduccion
      });
    });

    setTimeout(() => {
      this.gotoElement();
    }, 0);

  }

  ngAfterViewInit(): void{
    // this.selectAsset[0] = this.ecuItems[0];
    // this.onNgModelChange(1);
  }


  ngOnChanges(changes: SimpleChanges): void {

    for (const propName in changes) {
      if (propName === 'ecuItems') {
        this.itemTable = [];
        this.consumoTotal = 0;

        Object.keys(this.featuresItemTable).forEach((key: string) => {

          this.itemTable.push({
            "propiedad": key,
            "valor": 0,
            "medida": this.featuresItemTable[key].medida,
            "traduccion": this.featuresItemTable[key].traduccion
          });
        });

        this.generateTable();
        this.selectAsset =[];
        this.selectAsset[0] = this.ecuItems[0];
        this.onNgModelChange(1);
      }
    }
  }


  gotoElement() {
    var el = document.getElementById('table-asset');
    el.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  updateUSAmount(event, n) {
    if (n === 1)
      this.usAmount = event.target.value;
    else
      this.usAmount2 = event.target.value;
  }



  generateTable(): void {

    this.ecuItems.forEach(item => {
      Object.keys(item).forEach((key: string) => {
        if (!this.omitValues.includes(key)) {

          var propiedadEncontrada = this.itemTable.find(item => item.propiedad === key);
          if (propiedadEncontrada) {

            item[key] = typeof item[key] === "number" ? item[key] : 0;
            propiedadEncontrada.valor += this.promedios.includes(key) ? (item[key] / this.ecuItems.length) : item[key];

            if (key === 'consumo') {
              this.consumoTotal += item[key];

            }
          };
        };
      });
    });

    setTimeout(() => this.chargeCompleted.emit(true), 100);

  }

}
