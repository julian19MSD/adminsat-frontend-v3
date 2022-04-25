import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ITasksDetail} from '@shared/models/tasks.models';

@Component({
  selector: 'adms-task-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ITasksDetail) {
  }
}
