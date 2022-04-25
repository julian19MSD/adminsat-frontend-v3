import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IName } from '@shared/models/general.model';
import { Observable } from 'rxjs/internal/Observable';
import { API_URL, TABLEAUTH } from '@shared/consts/api.consts';

@Injectable()
export class TableauEnturnamientoHttpService {

  constructor(private httpClient: HttpClient) {
  }

  getTicketTableau(params: any = {}): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Content-Disposition": "form-data",
      "X-Content-Type-Options": "nosniff",
      "X-Tableau":"Tableau Server",
      "Server": "Tableau",
      "Keep-Alive": "timeout=8, max=100"

    });
    let options = { headers: headers };
    return this.httpClient.post<any>(TABLEAUTH + "/trusted", {
      username: 'admin'
    }, options);
  }
}
