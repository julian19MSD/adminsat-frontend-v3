import {Action} from '@ngrx/store';
import {ThemeScreenSizesState, ThemeState} from '../reducers/theme.reducer';

export enum ThemeActionTypes {
  LoadPublicTheme = '[Theme] Load Public Theme',
  LoadProfile = '[Theme] Load Profile',
  SetPublicTheme = '[Theme] Set Public Theme',
  SetColorScheme = '[Theme] Set Color Scheme',
  RestoreSinevaCollapseState = '[Theme] Reset Sidenav Collapse State',
  SetSinevaCollapseState = '[Theme] Set Sidenav Collapse State',
  ToggleSinevaCollapseState = '[Theme] Toggle Sidenav Collapse State',
}

export class SetPublicTheme implements Action {
  readonly type = ThemeActionTypes.SetPublicTheme;

  constructor(
    public payload: ThemeState
  ) {
  }
}

export class LoadPublicTheme implements Action {
  readonly type = ThemeActionTypes.LoadPublicTheme;
}

export class LoadProfile implements Action {
  readonly type = ThemeActionTypes.LoadProfile;
}

export class SetColorScheme implements Action {
  readonly type = ThemeActionTypes.SetColorScheme;

  constructor(
    public payload: 'dark' | 'light'
  ) {
  }
}


export class RestoreSinevaCollapseState implements Action {
  readonly type = ThemeActionTypes.RestoreSinevaCollapseState;
}

export class ToggleSinevaCollapseState implements Action {
  readonly type = ThemeActionTypes.ToggleSinevaCollapseState;

  constructor(
    public payload: boolean
  ) {
  }
}

export class SetSinevaCollapseState implements Action {
  readonly type = ThemeActionTypes.SetSinevaCollapseState;

  constructor(
    public payload: boolean
  ) {
  }
}


export type ThemeActions
  = SetPublicTheme
  | LoadPublicTheme
  | LoadProfile
  | SetColorScheme
  | SetSinevaCollapseState
  | ToggleSinevaCollapseState
  | RestoreSinevaCollapseState;
