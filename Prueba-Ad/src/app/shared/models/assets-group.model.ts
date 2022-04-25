export interface GruposActivo {
    id: number;
    nombre: string;
    vehiculo_seguro: boolean;
}

export interface Result {
    id: number;
    is_active: boolean;
    nombre: string;
    cliente_nombre: string;
    cliente_id: number;
    grupos_activos: GruposActivo[];
}

export interface RootObject {
    count: number;
    next: string;
    previous?: any;
    results: Result[];
}
export interface IAssetDocument {
    activo: number;
    valor:string;
    compania: string;
    comprobante: string;
    correos_notificaciones_m2m: Array<string>;
    dias_notificacion: number;
    fecha_expedicion: string;
    id: number;
    nombre_otro: string;
    numero_documento: string;
    tipo_documento: number;
    tramites_json: any;
    vigencia_desde: string;
    vigencia_hasta: string;
    open: boolean;
  }

