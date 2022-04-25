import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_URL} from '@shared/consts/api.consts';
import {
  IAssetChoices,
  IAssetDocument,
  IAssetListModel,
  IAssetRetrieve,
} from '@shared/models/assets.model';
import {strFormat} from '@shared/utils/general.utils';
import {IName} from '@shared/models/general.model';

@Injectable()
export class AssetHttpService {
  constructor(private httpClient: HttpClient) {
  }

  list(
    params: any = {},
    url: string = API_URL.asset.general
  ): Observable<IAssetListModel> {
    return this.httpClient.get<IAssetListModel>(url, {params});
  }

  bulk_destroy(
    ids: number[],
    names: string[],
    url: string = API_URL.asset.bulk_delete
  ): Observable<any> {
    return this.httpClient.request('delete', url, {body: {ids, names}});
  }

  select(params: any = {}): Observable<IName[]> {
    return this.httpClient.get<IName[]>(API_URL.asset.select, {
      params,
    });
  }

  download(
    params: any = {},
    url: string = API_URL.asset.download
  ): Observable<any> {
    return this.httpClient.get<any>(url, {params});
  }

  retrieve(id: number, params: any = {}): Observable<IAssetRetrieve> {
    const url = strFormat(API_URL.asset.instance, {id});
    return this.httpClient.get<IAssetRetrieve>(url, {params});
  }

  getChoices(
    params: any = {},
    url: string = API_URL.asset.choices
  ): Observable<IAssetChoices> {
    return this.httpClient.get<IAssetChoices>(url, {params});
  }

  getVehicleTypes(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.references.vehicleType.select, {
      params,
    });
  }

  getIcons(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.references.icons.select, {
      params,
    });
  }

  getDevices(params: any = {}): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.device.select, {params});
  }

  getCertificate(id: number, params: any = {}): Observable<any[]>{
    const url = strFormat(API_URL.asset.certificates, {id});
    return this.httpClient.get<any[]>(url, {params});

  }
}


@Injectable()
export class AssetDocumentsHttpService {

  constructor(private httpClient: HttpClient) {
  }


  retrieve(assetId: number, id: number): Observable<any> {
    const url = strFormat(API_URL.asset.documents.instance, {assetId, id});
    return this.httpClient.get<any>(url);
  }

  list(assetId: number, params: any = {}): Observable<IAssetDocument[]> {
    const url = strFormat(API_URL.asset.documents.general, {assetId});
    return this.httpClient.get<IAssetDocument[]>(url, {params});
  }

  select(assetId: number): Observable<IName[]> {
    const url = strFormat(API_URL.asset.documents.select, {assetId});
    return this.httpClient.get<IName[]>(url);
  }

  delete(assetId: number, id: number): Observable<any> {
    const url = strFormat(API_URL.asset.documents.instance, {assetId, id});
    return this.httpClient.delete<any>(url);
  }
  

  getDocumentTypesSelect() {
    return this.httpClient.get<any>(API_URL.references.documentType.select);
  }
}
