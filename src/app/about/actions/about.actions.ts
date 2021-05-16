import { createAction, props } from '@ngrx/store';

export const toggleRow = createAction('[about] Toggle row', props<{ id: number,}>());