import { createReducer, on } from '@ngrx/store';
import { AboutActions } from '@vk-homepage/about/actions';

export const cvFeatureKey = 'cv';

export interface State {
  toggledRowId: number;
}

export const initialState: State = {
  toggledRowId: 0
};

export const reducer = createReducer(
  initialState,

  on(AboutActions.toggleRow, (state, { id }) => ({
    ...state,
    toggledRowId: id,
  })),
);


export const getToggledRowId = (state: State) => state.toggledRowId;

