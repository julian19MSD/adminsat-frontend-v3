export interface IHttpParameters {
  method: string;
  url: string;
  formDataUrl?: string;
  params?: { [propName: string]: any };
  qParams?: { [param: string]: string | string[]; };
  headers?: { [header: string]: string | string[]; };
}


