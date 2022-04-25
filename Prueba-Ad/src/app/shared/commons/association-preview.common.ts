import {
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { filter, take } from 'rxjs/operators';
import { ActionConfirmComponent } from '@shared/components/action-confirm/action-confirm.component';

export abstract class CommonAssociationsPreview implements OnChanges {
  @Input() selected: number[] = [];
  @Input() items: any[] = [];
  @Input() confirmDisassociation = true;
  @Output() disassociate: EventEmitter<number[]> = new EventEmitter();

  selectedItems$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  protected constructor(
    public dialog: MatDialog
  ) { }

  changeStyles() {

  }

  ngOnChanges(changes: SimpleChanges): void {

    for (const propName in changes) {
      if (['items', 'selected'].includes(propName)) {
        this.selectedItems$.next([]);

        if (this.items.length > 0 && this.selected.length > 0) {
          var x = []
          this.selected.forEach(id => this.items.filter((item) => {if(item.id == id) x.push(item)    }))
          this.selectedItems$.next(
            x
            
            // this.items.filter((item) => this.selected.includes(item.id))
          );
       


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


  

  remove(id: number) {
    if (this.confirmDisassociation) {
      this.dialog
        .open(ActionConfirmComponent, {
          panelClass: 'notification',
          data: {
            actionMessage: 'DO_YOU_WANT_DISASSOCIATE',
            mainButtonMessage: 'ACCEPT',
          },
        })
        .afterClosed()
        .pipe(
          filter((e: any) => !!e),
          take(1)
        )
        .subscribe(() => {
          this.disassociateItem(id);

        });
    } else {
      this.disassociateItem(id);

    }

  }

  /**
   * Desasocia un elemento de la lista.
   * @param id: El id del elemento a desasociar.
   */
  private disassociateItem(id: number): void {
    this.changeStyles();
    const index = this.selected.indexOf(id);
    this.selected.splice(index, 1);
    this.disassociate.emit(this.selected);
    this.selectedItems$.next(
      this.items.filter((item) => this.selected.includes(item.id))
    );
  }
}
