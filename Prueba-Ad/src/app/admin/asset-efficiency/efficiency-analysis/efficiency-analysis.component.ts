import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, } from '@angular/core';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { RootAction } from '@store/root.action';
import { take } from 'rxjs/operators';
import { AnalysisEfficienyAssetModel, AnalysisEfficienyAssetModelAsset } from '../../../shared/models/asset-efficiency.models';


@Component({
  selector: 'app-efficiency-analysis',
  templateUrl: './efficiency-analysis.component.html',
  styleUrls: ['./efficiency-analysis.component.scss']
})
export class AnalysisEfficiencyComponent implements  AfterViewInit {

  @Input() analysisEfficiency: AnalysisEfficienyAssetModel;

  selectAsset: any[] = []
    



  constructor() {
  };

  onNgModelChange(event: any) {


    setTimeout(() => {
      this.gotoElement();
    }, 0);

  }

  ngAfterViewInit(): void{
    this.selectAsset[0] = this.analysisEfficiency.by_asset[0];


  }



  gotoElement() {
    var el = document.getElementById('table-asset');
    el.scrollIntoView({ block: "start", behavior: "smooth" });
  }

 

}
