import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '@shared/consts/api.consts';
import {strFormat} from '@shared/utils/general.utils';
import { IWorkdayDetails } from '@shared/models/workday.model';

@Injectable()
export class SharedWorkdayDetailsHttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  details(id: number, params: any = {}): Observable<IWorkdayDetails> {
    const url = strFormat(API_URL.routes.workday.details, {id});

    return this.httpClient.get<IWorkdayDetails>(url, {params});
  }



}
