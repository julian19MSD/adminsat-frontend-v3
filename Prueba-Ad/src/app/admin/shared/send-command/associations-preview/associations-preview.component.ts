import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { resultMemoize } from '@ngrx/store';
import { CommonAssociationsPreview } from '@shared/commons/association-preview.common';
import { ActionConfirmComponent } from '@shared/components/action-confirm/action-confirm.component';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'adms-send-command-associations-preview',
  templateUrl: './associations-preview.component.html',
  styleUrls: ['./associations-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SendCommandAssociationsPreviewComponent extends CommonAssociationsPreview implements OnChanges {


  @Input() commandsCustom: any[] = [];


  constructor(public dialog: MatDialog) {
    super(dialog);
  }


  drop(event: CdkDragDrop<string[]>) {


    this.selectedItems$
      .pipe(
        take(1),
      )
      .subscribe((list) => {

        moveItemInArray(list, event.previousIndex, event.currentIndex);
        var listId = list.map(v => {

          if (v.id !== 0)
            return v.id
          else if (v.id === 0)
            return v
        })

        this.selected = listId;
        this.disassociate.emit(listId);

      });

  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (['items', 'selected'].includes(propName)) {
        this.selectedItems$.next([]);
        if (this.items.length > 0 && (this.selected.length > 0 || this.commandsCustom.length > 0)) {
          var x = []
          this.selected.forEach(i => {
            if (typeof i === 'number') {
              this.items.filter((item) => {
                if (item.id == i) x.push(item)
              })
            } else {
              x.push(i);
            }
          })

          this.selectedItems$.next(x);

          this.selectedItems$
            .pipe(
              take(1),
              filter((e) => e.length === 0 && this.selected.length > 0),
            )
            .subscribe(() => {
              this.selected = [];
              this.disassociate.emit(this.selected);
            });
        }
      }

    }
    this.changeStyles();
  }


  /**
  * Desasocia un elemento de la lista.
  * @param id: El id del elemento a desasociar.
  */
  removeC(index: number): void {

    this.selected.splice(index, 1);
    this.disassociate.emit(this.selected);
    var x = [];
    this.selected.forEach(i => {
      if (typeof i === 'number') {
        this.items.filter((item) => {
          if (item.id == i) x.push(item)
        })
      } else {
        x.push(i);
      }
    })
    this.selectedItems$.next(x);
  }



}
