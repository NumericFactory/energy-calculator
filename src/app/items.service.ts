import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor() {}
  matos = [
    {
      name: 'Radiateur',
      checked: false,
      items: [
        {
        nb: 1,
        power: 500,
        temp: 23,
        usePerDay: [4, 4, 4, 4, 3, 1, 0, 0, 1, 3, 4, 4],
        conso: 1
        }
      ]
     
      // si 1° en + => (+6 à 11% en conso) 8,5% de consommation en +
    },
    {
      name: 'Sèche-serviette',
      checked: false,
      nb: 1,
      power: 500,
      temp: 23,
      usePerDay: [2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
      conso: 44.15,
    },
    {
      name: 'Clim réversible',
      checked: false,
      nb: 1,
      conso: 1,
    },
    {
      name: 'Luminaires (9w)',
      checked: false,
      nb: 1,
      conso: 1.095,
    },
    {
      name: 'TV',
      checked: false,
      nb: 1,
      conso: 12.5,
    },

    {
      name: 'Bouilloire',
      checked: false,
      nb: 1,
      conso: 5.83, // ok
    },
    {
      name: 'Cafetière',
      checked: false,
      nb: 1,
      conso: 2.75,
    }, //ok
    {
      name: 'Grille pain',
      checked: false,
      nb: 1,
      conso: 2.16,
    }, //ok
    {
      name: 'Four Micro-onde (1000W)',
      checked: false,
      nb: 1,
      conso: 3.33,
    }, //ok
    {
      name: 'Four électrique (300w)',
      checked: false,
      nb: 1,
      conso: 25,
    }, //ok
    {
      name: 'Plaques de cuisson',
      checked: false,
      nb: 1,
      conso: 54.75,
    }, //ok
    {
      name: 'Hotte aspirante',
      checked: false,
      nb: 1,
      conso: 2.91,
    }, //ok
    {
      name: 'VMC',
      checked: false,
      nb: 1,
      conso: 21.83,
    }, //ok
    {
      name: 'Sèche cheveux',
      checked: false,
      nb: 1,
      conso: 1,
    }, // ok

    {
      name: 'Box Internet',
      checked: false,
      nb: 1,
      conso: 18,
    },
    {
      name: 'Ventilateur',
      checked: false,
      nb: 1,
      conso: 4.5,
    },

    {
      name: 'Réfrigérateur / Congélateur',
      checked: false,
      nb: 1,
      conso: 25,
    },

    {
      name: 'Chargeur',
      checked: false,
      nb: 1,
      conso: 1,
    }, //ok
    {
      name: 'Ordinateur',
      checked: false,
      nb: 1,
      conso: 7,
    }, //ok
  ];
}
