import { createReducer, on } from '@ngrx/store';
import { LayoutActions } from '@vk-homepage/core/actions';
import { Path } from '@vk-homepage/core/models/path';
import { tap } from 'rxjs/operators';

export const layoutFeatureKey = 'layout';

export interface State {
    loaded: boolean;
    loading: boolean;
    showLoadingScreen: boolean;
    paths: {[id: number] : Path},
    currentPath: Path;
    currentPathId: number;
    showMenu: boolean;
    prevRouteDataId: number;
    nextRouteDataId: number;
}

const initialState: State = {
    loaded: false,
    loading: false,
    showLoadingScreen: true,
    paths: null,
    currentPathId: 0,
    currentPath: null,
    showMenu: false,
    prevRouteDataId: null,
    nextRouteDataId: null,
};

export const reducer = createReducer(
  initialState,
  
  on(LayoutActions.getPaths, state => ({
    ...state,
    loading: true,
  })),

  on(LayoutActions.getPathsSuccess, (state, { paths }) => ({
    ...state,
    loaded: true,
    loading: false,
    paths: paths,
  })),

  on(LayoutActions.hideLoadingScreen, state => ({
    ...state,
    showLoadingScreen: false,
  })),

  on(LayoutActions.setCurrentPath, (state, { id }) => ({
    ...state,
    currentPathId: id,
    showMenu: false
  })),

  on(LayoutActions.setRouteInfo, (state, { prevDataId, nextDataId }) => ({
    ...state,
    prevRouteDataId: prevDataId,
    nextRouteDataId: nextDataId
  })),

  on(LayoutActions.closeMenu, state => ({...state, showMenu: false })),
  on(LayoutActions.openMenu, state => ({...state, showMenu: true })),

);

export const selectPaths = (state: State) => state.paths;
export const selectLoaded = (state: State) => state.loaded;
export const selectShowLoadingScreen = (state: State) => state.showLoadingScreen;
export const selectShowMenu = (state: State) => state.showMenu;

export const selectSelectedPathId = (state: State) => state.currentPathId;

