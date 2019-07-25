import { Action, createAction } from '@ngrx/store';
import { typeMostrar, typeOcultar, typeAddproduct } from './ui.actions';
import { Producto } from '../components/administrar-productos/administrar-productos.component';

// Actions

// State
export interface State {
    visible: boolean;
    producto: Producto|undefined;
}

export const initialState: State = {
    visible: true,
    producto: undefined,
};

// Selecctor

// Reducer
export function reducerUI(state = initialState, action: Action ): State {
    switch (action.type) {
        case typeMostrar: {
            return {
                ...state,
                visible: true
            };
        }
        case typeOcultar: {
            return {
                ...state,
                visible: false
            };
        }
        case typeAddproduct: {
            console.log('in action: ', action);
            return {
                ...state,
                producto: {
                    codigo: action['codigo'],
                    prenda: action['prenda'],
                    marca: action['marca'],
                    color: action['color'],
                    pCosto: action['pCosto'],
                    pVenta: action['pVenta'],
                    disp: action['disp'],
                }
            };
        }
        default: {
            return state;
        }
    }
}
