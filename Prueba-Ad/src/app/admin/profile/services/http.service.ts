import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '@shared/consts/api.consts';
import {IProfileChoices, IProfile} from '@shared/models/profile.model';
import {IEvents} from '@shared/models/events.model';

@Injectable()

export class ProfileHttpService {

  constructor(private http: HttpClient) {
  }

  details(params: any = {}, url: string = API_URL.profile.general): Observable<IProfile> {
    return this.http.get<IProfile>(url, {params});
  }

  update(info: any = {}, params: any = {}): Observable<any> {
    return this.http.patch<any>(API_URL.profile.change, info);
  }

  choices(params: any = {}, url: string = API_URL.profile.choices): Observable<IProfileChoices> {
    return this.http.get<IProfileChoices>(url, {params});
  }

  referencesSelect(params: any = {}): Observable<IEvents[]> {
    return this.http.get<IEvents[]>(API_URL.references.events.select, {params});
  }

  validateMail(body: { correo: string; recaptcha: string; }, params: any = {}): Observable<any> {
    return this.http.post(API_URL.users.resendValidateMail, body, {params});
  }
}
