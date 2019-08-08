import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  URL = 'https://chiprestore19.firebaseio.com/ventas.json';
  constructor(private http: HttpClient) {}

  getVentaAll() {
    return null;
  }
  postVenta(body: any) {
    return this.http.post(this.URL, body);

  }
}


export interface LineaVenta {
  idProducto: number;
  detalle: string;
  talle: string;
  cantidad: number;
  costoU: number;
}
export interface Venta {
  lineas: LineaVenta[];
  montoNeto: number;
  medioPago: string;
  montoFinal: number;
    intereses: number;
    valorCuota: number;
    nroCuotas: number|undefined;
  fecha: string;
  idUsuario: number;
  sucursal: number;
}
