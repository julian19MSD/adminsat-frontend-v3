
export interface AnalysisEfficienyAssetModel {
by_asset: AnalysisEfficienyAssetModelAsset[];
total: AnalysisEfficienyAssetModelTotal[];

}

export interface AnalysisEfficienyAssetModelAsset {

  in_shift: string;
  in_shift_percentage: number;
  not_in_shift: string;
  not_in_shift_percentage: number;
  placa: string;
  total_shifts: number;
  installations :AnalysisEfficienyAssetModelAssetInstallations[];
}


export interface AnalysisEfficienyAssetModelTotal {

  in_shift: string;
  in_shift_percentage: number;
  not_in_shift: string;
  not_in_shift_percentage: number;
  total_shifts: number;
  installations :AnalysisEfficienyAssetModelAssetInstallations[];
  
}


export interface AnalysisEfficienyAssetModelAssetInstallations {
  duration: string;
  in_shift: string;
  in_shift_percentage: number;
  name: string;
  not_in_shift: string;
  not_in_shift_percentage: number;
  percentage: number;
}
