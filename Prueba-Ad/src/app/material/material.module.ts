import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DateAdapter, MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {LayoutModule} from '@angular/cdk/layout';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {TranslateService} from '@ngx-translate/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [],
  imports: [
    MatButtonToggleModule,
    DragDropModule,
    CommonModule,
    MatRadioModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule,
    MatInputModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatRippleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDialogModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatBadgeModule,
    MatTableModule,
    MatProgressBarModule,
    MatSelectModule,
    MatGridListModule,
    NgxMatSelectSearchModule,
    ScrollingModule,
    LayoutModule,
    MatPaginatorModule
  ],
  exports: [
    MatButtonToggleModule,
    DragDropModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule,
    MatInputModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDialogModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatBadgeModule,
    MatTableModule,
    MatProgressBarModule,
    MatGridListModule,
    MatRadioModule,
    ScrollingModule,
    LayoutModule,
    NgxMatSelectSearchModule,
    MatPaginatorModule
  ],
})
export class MaterialModule {
  constructor(
    private translate: TranslateService,
    private dateAdapter: DateAdapter<any>
  ) {

    this.translate.onLangChange
      .subscribe((res) => {
        this.dateAdapter.setLocale(res.lang)
      })
    this.dateAdapter.setLocale(this.translate.currentLang)
  }


}
