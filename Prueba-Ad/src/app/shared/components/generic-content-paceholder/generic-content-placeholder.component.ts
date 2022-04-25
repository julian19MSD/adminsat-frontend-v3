import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'adms-ph',
  templateUrl: './generic-content-placeholder.component.html',
  styleUrls: ['./generic-content-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericContentPlaceholderComponent {
  @Input() mode: 'tabs' | 'form' = 'tabs'
}
