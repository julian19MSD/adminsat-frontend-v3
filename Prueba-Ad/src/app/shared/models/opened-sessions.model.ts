export interface ISessionList {
  count: number;
  next: string;
  previous: string;
  results: ISession[];
}


export interface ISession {
  id: number;
  created_at: string;
  details: ISessionDetail;
}

export interface ISessionDetail {
  ciudad: string;
  pais: string;
  continente: string;
  ip: string;
  agente: string;
  nombre: string;
}
