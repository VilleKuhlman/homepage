import {createSelector, createFeatureSelector, Action, combineReducers} from '@ngrx/store';
  
  /**
   * Every reducer module's default export is the reducer function itself. In
   * addition, each module should export a type or interface that describes
   * the state of the reducer plus any selector functions. The `* as`
   * notation packages up all of the exports into a single object.
   */
  
  import * as fromAbout from '@vk-homepage/about/reducers/about.reducer';
  import * as fromRoot from '@vk-homepage/reducers';

  export const aboutFeatureKey = 'about';
  
  export interface AboutState {
    [fromAbout.cvFeatureKey]: fromAbout.State;
  }

  export interface State extends fromRoot.State {
    [aboutFeatureKey]: AboutState;
  }

  
  export function reducers(state: AboutState | undefined, action: Action) {
    return combineReducers({
      [fromAbout.cvFeatureKey]: fromAbout.reducer,
    })(state, action);
  }

  /**
   * About Reducers
   */
  export const selectAboutState = createFeatureSelector<State, AboutState>(
    aboutFeatureKey
  );
  
  export const selectCVState = createSelector(
    selectAboutState,
    state => state.cv
  );

  export const selectToggledRow = createSelector(
    selectCVState,
    fromAbout.getToggledRowId
  );