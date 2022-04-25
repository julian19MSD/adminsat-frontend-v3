import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {strFormat} from '@shared/utils/general.utils';
import {API_URL} from '@shared/consts/api.consts';
import {IAssetDetail, IAssetDocument} from '@shared/models/assets.model';
import {IName} from '@shared/models/general.model';

@Injectable()
export class SharedAssetHttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  details(id: number, params: any = {}): Observable<IAssetDetail> {
    const url = strFormat(API_URL.asset.details, {id});
    return this.httpClient.get<IAssetDetail>(url, {params});
  }

  documentSelect(assetId: number): Observable<IName[]> {
    const url = strFormat(API_URL.asset.documents.select, {assetId});
    return this.httpClient.get<IName[]>(url);
  }

  documentList(assetId: number, params: any = {}): Observable<IAssetDocument[]> {
    const url = strFormat(API_URL.asset.documents.general, {assetId});
    return this.httpClient.get<IAssetDocument[]>(url, {params});
  }

}
