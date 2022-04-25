import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {environment} from '../../environments/environment';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {rootReducers} from '@store/root.action';
import {EffectsModule} from '@ngrx/effects';
import {ThemeEffects} from '@store/effects/theme.effect';


export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (!environment.production && action.type !== '[WebSocket] Set Message') {
      console.log('state', state);
      console.log('action', action);
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(rootReducers, {metaReducers}),
    EffectsModule.forRoot([ThemeEffects]),
  ],
  exports: [
    StoreModule,
    EffectsModule
  ]
})
export class ReduxModule {
}
