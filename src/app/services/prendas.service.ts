import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PrendasService {
  prendas: Object = {
    prenda1: {
      nombre: 'remera',
      marca: 'abercombrie & fitch ',
      color: 'azul',

      codigo: '1',
      img: `/assets/img/img1.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
      prenda2: {
      nombre: 'camisa',
      marca: 'polo',
      color: 'salmon',

      codigo: '2',
      img: `/assets/img/img2.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda3: {
      nombre: 'remera',
      marca: 'tommy hilfiger',
      color: 'blanca',

      codigo: '3',
      img: `/assets/img/img3.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda4: {
      nombre: 'sueter',
      marca: 'abercombrie & fitch',
      color: 'naranja',

      codigo: '4',
      img: `/assets/img/img4.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda5  : {
      nombre: 'remera',
      marca: 'abercombrie & fitch',
      color: 'roja',

      codigo: '5',
      img: `/assets/img/img5.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda6  : {
      nombre: 'buzo femenino',
      marca: 'adidas',
      color: 'amarillo',

      codigo: '6',
      img: `/assets/img/img6.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda7  : {
      nombre: 'sueter',
      marca: 'abercombrie & fitch',
      color: 'celeste',

      codigo: '7',
      img: `/assets/img/img7.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda8  : {
      nombre: 'remera bordado rojo',
      marca: 'abercombrie & fitch',
      color: 'gris',

      codigo: '8',
      img: `/assets/img/img8.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda9  : {
      nombre: 'remera a rayas',
      marca: 'lacoste',
      color: 'gris blanco rojo negro',

      codigo: '9',
      img: `/assets/img/img9.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda10  : {
      nombre: 'remera bordada',
      marca: 'abercombrie & fitch',
      color: 'rosa',

      codigo: '10',
      img: `/assets/img/img10.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda11  : {
      nombre: 'remera',
      marca: 'tommy hilgifer',
      color: 'roja',

      codigo: '11',
      img: `/assets/img/img11.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda12  : {
      nombre: 'short verano',
      marca: 'polo',
      color: 'rosado',

      codigo: '12',
      img: `/assets/img/img12.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda13  : {
      nombre: 'remera',
      marca: 'polo',
      color: 'azul',

      codigo: '13',
      img: `/assets/img/img13.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda14  : {
      nombre: 'camisa pintadas',
      marca: 'tommy hilfiger',
      color: 'blanca',

      codigo: '14',
      img: `/assets/img/img14.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda15  : {
      nombre: 'camisa jeans',
      marca: 'polo',
      color: 'azul',

      codigo: '15',
      img: `/assets/img/img15.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 'm', cant: 2},
      ]
    },
    prenda16  : {
      nombre: 'short verano',
      marca: 'lacoste',
      color: 'negro',

      codigo: '16',
      img: `/assets/img/img16.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 'm', cant: 2},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda17  : {
      nombre: 'remera lisa',
      marca: 'polo',
      color: 'negro',

      codigo: '17',
      img: `/assets/img/img17.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda18  : {
      nombre: 'short bermuda',
      marca: 'penguin',
      color: 'marron',

      codigo: '18',
      img: `/assets/img/img18.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 'xxl', cant: 1}
      ]
    },
    prenda19  : {
      nombre: 'remera estampa indio',
      marca: 'abercombrie & fitch',
      color: 'gris',

      codigo: '19',
      img: `/assets/img/img19.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 'm', cant: 2},
      ]
    },
    prenda20  : {
      nombre: 'remera estampada',
      marca: 'abercombrie & fitch',
      color: 'azul',

      codigo: '20',
      img: `/assets/img/img20.png`,
      pCosto: 300.00,
      pVenta: 500.00,
      disp: [
        {talle: 's', cant: 3},
        {talle: 'm', cant: 2},
      ]
    },
  };
  URL = 'https://chiprestore19.firebaseio.com';
  constructor(private http: HttpClient ) {}

  getPrendasEj() {
    return this.prendas;
  }
  getPrendas() {
    return this.http.get(`${this.URL}/prendas.json`);
  }

  postNuevaPrenda(prenda) {
    return this.http.post(`${this.URL}/prendas.json`, prenda);
  }

  postImagen(file: File) {
    const url = '';
    const form = new FormData();
    form.append('imagen', file);
    return this.http.post(url, form);
  }

  searchPrendas(filtro) {
    console.log('entra a buscar');
    const result: Array<object> = [];
// Declaracion de las coincidencias a verificar
    for (const prenda of Object.values(this.prendas)) {
// Por cada palabra de la categoria prenda del filtro busca coincidencias en el objeto prenda, devuelve true en al menos una coincidencia
      result.push(prenda);
      let matchCodigo = true;
      let matchNombre = true;
      let matchMarca = true;
      let matchColor = true;
      if (filtro.codigo !== undefined && filtro.codigo !== '' && filtro.codigo !== prenda.codigo) {
        matchCodigo = false;
      }
      if (filtro.prenda !== undefined && filtro.prenda !== '' && filtro.prenda !== prenda.nombre) {
        const arrMatchNombre = filtro.prenda.split(' ');
        matchNombre = false;
        // tslint:disable-next-line: forin
        for (const str of arrMatchNombre) {
          const exp = new RegExp(str);
          if (exp.test(prenda.nombre)) {
            matchNombre = true;
            break;
          }
        }
      }
      if (filtro.marca !== undefined && filtro.marca !== '' && filtro.marca !== prenda.marca) {
        matchMarca = false;
      }
      if (filtro.color !== undefined && filtro.color !== '' && filtro.color !== prenda.color) {
        matchColor = false;
      }
      if (!(matchCodigo && matchNombre && matchMarca && matchColor)) {
        result.pop();
      }
    }
    return result;
  }
}
