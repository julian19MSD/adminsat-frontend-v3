import {ActionReducerMap, createSelector} from '@ngrx/store';
import {getUserNotificationsValue, themeReducer, ThemeState} from './reducers/theme.reducer';

export interface RootAction {
  theme: ThemeState;
}

export const rootReducers: ActionReducerMap<RootAction> = {
  theme: themeReducer,
};


/**
 * Theme Reducers
 */
export const getThemeState = (state: RootAction) => state.theme;
export const getUserNotifications = createSelector(getThemeState, getUserNotificationsValue);
