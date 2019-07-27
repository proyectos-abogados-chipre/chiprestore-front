import { Action, createAction } from '@ngrx/store';
import { typeMostrar, typeOcultar, typeAddproduct, typeLogin } from './ui.actions';
import { Producto } from '../components/administrar-productos/administrar-productos.component';

// Actions

// Interface
export interface Usuario {
    userID: number | undefined;
    nombre: string | undefined;
    rol: string | undefined;
    sucursal: number | undefined;
}

// State
export interface State {
    visible: boolean;
    producto: Producto | undefined;
    usuario: Usuario | undefined;
}

export const initialState: State = {
    visible: true,
    producto: undefined,
    // Momentaneo hasta desarrollar api de login
    usuario: {
        userID: 40752791,
        nombre: 'federico samaniego',
        rol: 'administrador',
        sucursal: 0
    },
};

// Selecctor

// Reducer
export function reducerUI(state = initialState, action: any /* Action */ ): State {
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
        case typeLogin: {
            return {
                ...state,
                usuario: {
                    userID: action.userID,
                    nombre: action.nombre,
                    rol: action.rol,
                    sucursal: action.sucursal
                }
            };
        }
        default: {
            return state;
        }
    }
}
