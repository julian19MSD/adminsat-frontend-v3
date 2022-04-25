export interface IDashBoardGridItem {
  location: IDashBoardGridItemDetail;
}

export interface IDashBoardGridItemDetail {
  permission: string;
  available: boolean;
}


export interface IFleetInfoOverview {
  client: string;
  icon: string;
  id: string;
  in_shift: number;
  in_shift_percentage: number;
  m_0_60: number;
  m_60_120: number;
  m_120_180: number;
  m_180: number;
  name: string;
  not_in_shift: number;
  not_in_shift_percentage: number;

}


export interface IFleetInfo {
  total_assets: number;
  safe: number;
  unsafe: number;
  safe_percentage: number;
  unsafe_percentage: number,
  in_shift: number;
  not_in_shift: number;
  in_shift_percentage: number;
  not_in_shift_percentage: number;
  by_zone: Array<IZonesItemInstallationsFleetInfo>;
  overview: Array<IFleetInfoOverview>;
};

export interface IInstallationsFleetInfo {
  in_shift: number;
  in_shift_percentage: number;
  not_in_shift: number;
  not_in_shift_percentage: number;
  safe: number;
  safe_percentage: number;
  total_assets: number;
  unsafe: number;
  unsafe_percentage: number;
  overview: Array<IFleetInfoOverview>;
  by_zone: Array<IZonesItemInstallationsFleetInfo>;
}

export interface IZonesItemInstallationsFleetInfo {
  icon: string;
  id: number;
  in_shift: number;
  in_shift_percentage: number;
  m_0_60: number;
  m_60_120: number;
  m_120_180: number;
  m_180: number;
  name: string
  not_in_shift: number
  not_in_shift_percentage: number;
  total: number;
}

