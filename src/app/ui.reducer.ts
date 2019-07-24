import { Action, createAction } from '@ngrx/store';

// Actions

// State
export interface State {
    visible: boolean;
}

export const initialState: State = {
    visible: true
};

// Selecctor

// Reducer
export function reducerUI(state = initialState, action: Action ): State {
    switch (action.type) {
        case 'visible': {
            return {
                ...state,
                visible: true
            };
        }
        case 'hidden': {
            return {
                ...state,
                visible: false
            };
        }
        default: {
            return state;
        }
    }
}
