import { createAction, Action } from '@ngrx/store';

export const mostrar1 = createAction('visible');
export const ocultar1 = createAction('hidden');
export const mostrar: Action = {
    type: 'visible'
};
export const ocultar: Action = {
    type: 'hidden'
};

