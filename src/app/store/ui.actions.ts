import { createAction, Action, props } from '@ngrx/store';
import { Producto } from '../components/administrar-productos/administrar-productos.component';

export const typeMostrar = '[navbar toggle-sidebar] visible';
export const typeOcultar = '[sidebar toggle-sidebar] hidden';
export const typeAddproduct = '[administrar registrar] agregar';

export const mostrar: Action = {
    type: typeMostrar
};
export const ocultar: Action = {
    type: typeOcultar
};
export const addProducto = createAction(
    typeAddproduct,
    props<Producto>()
)

