

export interface IWorkDayConfigListModel {
  count: number;
  next: string;
  previous: string;
  results: IWorkdayConfigListItem[];
}

export interface IWorkdayConfigListItem {
  id: number;
  cliente_nombre: string;
  cliente: number;
  workday_duration:number;
  workday_alert:number;
  rest_duration:number;
  rest_alert:number;
  rest_limit_speed:number;
  isSelected: boolean;
}


export interface IWorkdayConfigRetrieve {
  id: number;
  workday_duration: number;
  workday_alert: number;
  rest_duration: number;
  rest_alert: number;
  rest_limit_speed: number;
  cliente: number;
  recaptcha: number;
}
