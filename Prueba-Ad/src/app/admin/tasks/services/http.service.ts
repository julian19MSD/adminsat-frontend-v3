import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {API_URL} from '@shared/consts/api.consts';
import {ITasksList} from '@shared/models/tasks.models';

@Injectable()
export class TasksHttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  list(params: any = {}, url: string = API_URL.tasks.general): Observable<ITasksList> {
    return this.httpClient.get<ITasksList>(url, {params});
  }

}
