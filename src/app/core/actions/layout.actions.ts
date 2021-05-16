import { createAction, props } from '@ngrx/store';
import { Path } from '@vk-homepage/core/models/path';

export const getPaths = createAction('[layout] Get Paths');

export const getPathsSuccess = createAction(
    '[layout] Get Paths Success',
    props<{ paths: {[id: number] : Path} }>()
);

export const hideLoadingScreen = createAction('[layout] Hide Loading Screen');

export const setCurrentPath = createAction('[layout] Set Current Path', props<{ id: number }>());

export const setRouteInfo = createAction('[layout] Set Route Data Information', props<{ prevDataId: number, nextDataId: number}>());

export const openMenu = createAction('[layout] Open Menu');
export const closeMenu = createAction('[layout] Close Menu');

export const navigateDataObject = createAction('[layout] Navigate Path', props<{ objectID: number, }>());
export const navigateNextPath = createAction('[layout] Navigate Next Path');
export const navigatePreviousPath = createAction('[layout] Navigate Previous Path');