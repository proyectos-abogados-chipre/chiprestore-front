import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  venta: Venta = EJ_VENTA;
  lineas: LineaVenta[] = EJ_LINEA;

  constructor() {}

  getVenta() {
    return this.venta;
  }
  getLineas() {
    return this.lineas;
  }
}

const EJ_LINEA: LineaVenta[] = [
  {idProducto: 1, detalle: 'remera hollister', cantidad: 2, costoU: 500.00 },
  {idProducto: 10, detalle: 'buzo polo', cantidad: 1, costoU: 700.00 },
  {idProducto: 14, detalle: 'pantalon penguin', cantidad: 1, costoU: 1000.00 },

];
const EJ_VENTA: Venta = {
  lineas: EJ_LINEA,
  total: 2200,
  medio: 'credito',
  cuotas: 3,
  fecha: '01/08/19',
  idUsuario: 1,
  sucursal: 1,
}
export interface LineaVenta {
  idProducto: number;
  detalle: string;
  cantidad: number;
  costoU: number;
}
export interface Venta {
  lineas: LineaVenta[];
  total: number;
  medio: string;
  cuotas: number|undefined;
  fecha: string;
  idUsuario: number;
  sucursal: number;
}
