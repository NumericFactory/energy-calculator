import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ItemsService } from './../items.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PriceKwhDialogComponent } from './../price-kwh-dialog/price-kwh-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  name = 'Reactive Forms avec Angular';
  consoForm: FormGroup;
  items: FormArray;

  consoradiator = 0;
  consodrytowel = 0;
  percentconsoradiator = 0;
  tempradia = 23;

  pricePerKWH: number = 0.15;
  pricePerCounterLocationPerMonth = 9.3;
  // pricePerCounterLocation = [
  //   {id: '6kva', price: 9.23},
  //   {id: '9kva', price: 12.00},
  //   {id: '12kva', price: 15.00},
  // ]

  choosePricePerKWHIsOpened = false;

  animatestyle = 'animate__slideInUp';

  tvItems = [
    { id: 'tv', fr: 'TV' },
    { id: 'internetbox', fr: 'Box internet' },
    { id: 'charger', fr: 'Chargeur' },
    { id: 'computer', fr: 'Ordinateur' },
  ];

  cuisineItems = [
    { id: 'fridge', fr: 'Réfrigérateur / Congélateur' },
    { id: 'dishwasher', fr: 'Lave vaisselle' },
    { id: 'hotplates', fr: 'Plaques de cuisson' },
    { id: 'microwaveoven', fr: 'Four Micro-onde (1000W)' },
    { id: 'electricaloven', fr: 'Four électrique (3000W)' },
    { id: 'kettle', fr: 'Bouilloire' },
    { id: 'coffeemaker', fr: 'Cafetière' },
    { id: 'toaster', fr: 'Grille pain' },
    { id: 'extractorhood', fr: 'Hotte aspirante' },
  ];

  sdbItems = [
    { id: 'hotwatertank', fr: 'Chauffe-eau électrique' },
    // { id: 'drytowel', fr: 'Sèche-serviette' },
    { id: 'washingmachine', fr: 'Machine à laver' },
    { id: 'hairdryer', fr: 'Sèche-cheveux' },
  ];

  accessoiresItems = [
    { id: 'fan', fr: 'Ventilateur' },
    { id: 'vmchood', fr: 'VMC' },
    { id: 'iron', fr: 'Fer à repasser' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    itemSv: ItemsService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    // on définit le dernier prix configuré
    if (localStorage.getItem('dataPrice') != null) {
      let dataPrice = JSON.parse(localStorage.getItem('dataPrice'));
      if (dataPrice.pricekwh != undefined) {
        this.pricePerKWH = dataPrice.pricekwh;
      }
      if (dataPrice.priceLocation != undefined) {
        this.pricePerCounterLocationPerMonth = dataPrice.priceLocation;
      }
    }

    // on définit un formulaire global
    this.consoForm = this.formBuilder.group({
      email: 'fred@formation-angular.com',

      // CHAUFFAGE
      radiator: new FormGroup({
        checked: new FormControl(false),
        items: this.formBuilder.array([]),
      }),

      drytowel: new FormGroup({
        checked: new FormControl(false),
        items: this.formBuilder.array([]),
      }),

      // LUMINAIURES
      light: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(1.095),
      }),

      // TV / INTERNET / TELEPHONE
      tv: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(12.5),
      }),

      internetbox: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(18),
      }),

      charger: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(1),
      }),

      computer: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(7),
      }),

      // CUISINE
      fridge: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(25),
      }),

      dishwasher: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(20),
      }),

      hotplates: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(2.91),
      }),

      microwaveoven: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(3.33),
      }),

      electricaloven: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(25),
      }),

      kettle: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(5.83),
      }),

      coffeemaker: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(2.75),
      }),

      toaster: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(2.16),
      }),

      extractorhood: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(1.25),
      }),

      // SALLE DE BAIN
      hotwatertank: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(328.5),
      }),

      // drytowel: new FormGroup({
      //   checked: new FormControl(false),
      //   items: this.formBuilder.array([]),
      // }),

      washingmachine: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(15),
      }),

      hairdryer: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(1),
      }),

      // Accessoires
      fan: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(1.2),
      }),

      vmchood: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(21.83),
      }),

      iron: new FormGroup({
        checked: new FormControl(false),
        number: new FormControl(1),
        conso: new FormControl(21.5),
      }),

      // airconditioner: new FormGroup({
      //   checked: new FormControl(false),
      //   number: new FormControl(1),
      //   conso: new FormControl(4.5),
      // }),
    });

    console.log(this.consoForm);
  }

  openDialog(e): void {
    e.preventDefault();
    const dialogRef = this.dialog.open(PriceKwhDialogComponent, {
      maxWidth: '552px',
      data: {
        pricekwh: this.pricePerKWH,
        priceLocation: this.pricePerCounterLocationPerMonth,
      },
      position: {
        top: '5px',
      },
      panelClass: 'mydial',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result != undefined || result != null) {
        this.pricePerKWH = result.pricekwh;
        this.pricePerCounterLocationPerMonth = result.priceLocation;
      }
    });
  }

  openCloseChoosePricePerKWH() {
    this.choosePricePerKWHIsOpened = !this.choosePricePerKWHIsOpened;
  }

  choosePricePerKWH(val) {
    this.pricePerKWH = parseFloat(val);
    this.choosePricePerKWHIsOpened = !this.choosePricePerKWHIsOpened;
  }
  pressEnterToSavePricePerKWH(e, val) {
    e.preventDefault();
    if (e.keyCode == 13) {
      this.pricePerKWH = parseFloat(val);
      this.choosePricePerKWHIsOpened = !this.choosePricePerKWHIsOpened;
    }
  }

  computeConso() {
    let totalConso = 0;
    let consoradiator = 0;
    let consodrytowel = 0;
    //console.log(this.consoForm.value);
    //let keys = Object.keys(this.consoForm.value); // ['radiator', 'light', 'tv', .......]
    //console.log(keys);
    let items = [];
    for (const property in this.consoForm.value) {
      if (this.consoForm.value[property].checked) {
        this.consoForm.value[property].name = property;
        items.push(this.consoForm.value[property]);
      }
    }
    //console.log(items);

    for (let item of items) {
      if (item.name == 'radiator') {
        for (let radiatorItem of item.items) {
          totalConso =
            totalConso +
            radiatorItem.radiatornumber * radiatorItem.radiatorconso;
          consoradiator =
            consoradiator +
            radiatorItem.radiatornumber * radiatorItem.radiatorconso;
        }
      } else if (item.name == 'drytowel') {
        for (let drytowelItem of item.items) {
          totalConso =
            totalConso +
            drytowelItem.drytowelnumber * drytowelItem.drytowelconso;
          consodrytowel =
            consodrytowel +
            drytowelItem.drytowelnumber * drytowelItem.drytowelconso;
        }
      } else {
        totalConso = totalConso + item.number * item.conso;
      }
    }
    this.consoradiator = consoradiator;
    this.consodrytowel = consodrytowel;

    // compute % conso per item /  global conso
    for (let item of items) {
      let percent;
      if (item.name == 'radiator') {
        for (let radiatorItem of item.items) {
          percent =
            percent +
            ((radiatorItem.radiatornumber * radiatorItem.radiatorconso) /
              totalConso) *
              100;
          console.log(item.name, percent + '%');
          this.percentconsoradiator = percent;
        }
      } else if (item.name == 'drytowel') {
        for (let drytowelItem of item.items) {
          percent =
            ((drytowelItem.drytowelnumber * drytowelItem.drytowelconso) /
              totalConso) *
            100;
          console.log(item.name, percent + '%');
        }
      } else {
        percent = ((item.number * item.conso) / totalConso) * 100;
        console.log(item.name, percent + '%');
      }
    }
    return totalConso;
  }

  computeConsoTotal() {
    let consoHT = this.computeConso() * this.pricePerKWH;
    console.log(' consoHT : ' + consoHT);
    let priceLocationcounterHT = this.pricePerCounterLocationPerMonth;

    let priceLocationcounterTTC =
      priceLocationcounterHT + (priceLocationcounterHT * 5.5) / 100;
    console.log('compteur TTC : ' + priceLocationcounterTTC);

    let consoPlusTaxes = consoHT + (13.55 * consoHT) / 100;
    console.log('consoPlusTaxes  : ' + consoPlusTaxes);

    let consoTTC = consoPlusTaxes + (consoPlusTaxes * 20) / 100;
    console.log(' consoTTC  : ' + consoTTC);

    console.log(' consoTTC TOTALE  : ' + consoTTC + priceLocationcounterTTC);
    return consoTTC + priceLocationcounterTTC;
  }

  /*********************
   * RADIATOR
   *********************/
  // Permet de récupérer formData dans la vue qui est une instance de FormArray
  get radiatorItems() {
    return <FormArray>this.consoForm.get(`radiator.items`);
  }
  // Permet de créer un reactiveForm à la volée
  createItemRadiator(): FormGroup {
    return this.formBuilder.group({
      radiatornumber: 1,
      radiatorpower: 1000,
      radiatortemp: 23,
      usePerDayInHours: 10,
      radiatorconso: [{ value: 300, disabled: false }],
      radiatorconsoglobal: [{ value: 300, disabled: false }],
      surfaceOfRoom: 10,
    });
  }

  // Au clic de l'utilisateur sur le bouton "Ajouter une ligne"
  addItemRadiator(event): void {
    event.preventDefault();
    this.items = this.consoForm.get('radiator.items') as FormArray;
    this.items.push(this.createItemRadiator());
  }
  // Au clic de l'utilisateur sur le bouton "X" pour supprimer une ligne
  deleteItemRadiatorLine(e, i): void {
    e.preventDefault();
    this.items = this.consoForm.get('radiator.items') as FormArray;
    console.log(this.items);
    this.items.removeAt(i);
    this.computeConso();
  }
  // supprimer toutes les lignes
  deleteAllItemRadiatorLines(): void {
    this.items = this.consoForm.get('radiator.items') as FormArray;
    while (this.items.length !== 0) {
      this.items.removeAt(0);
    }
  }
  // checkbox
  radiatorCheckedChange(ev) {
    if (this.consoForm.get('radiator.checked').value === false) {
      this.deleteAllItemRadiatorLines();
    } else {
      this.addItemRadiator(ev);
    }
  }

  radiatorDecrement(e, i) {
    e.preventDefault();
    this.items = this.consoForm.get('radiator.items') as FormArray;
    let number = this.items.at(i).value.radiatornumber;
    number = parseInt(number) - 1;

    let power = parseInt(this.items.at(i).value.radiatorpower);
    let temp = parseInt(this.items.at(i).value.radiatortemp);
    let conso = this.getConsoFromTemp(power, temp);

    if (number > 0) {
      this.items.at(i).patchValue({ radiatornumber: number });
      this.items.at(i).patchValue({ radiatorconso: conso });
      this.items.at(i).patchValue({ radiatorconsoglobal: number * conso });
    }
  }

  radiatorIncrement(e, i) {
    e.preventDefault();
    this.items = this.consoForm.get('radiator.items') as FormArray;
    let number = this.items.at(i).value.radiatornumber;
    number = parseInt(number) + 1;

    let power = parseInt(this.items.at(i).value.radiatorpower);
    let temp = parseInt(this.items.at(i).value.radiatortemp);
    let conso = this.getConsoFromTemp(power, temp);
    //conso = parseInt(conso);
    console.log(conso);
    this.items.at(i).patchValue({ radiatornumber: number });
    this.items.at(i).patchValue({ radiatorconso: conso });
    this.items.at(i).patchValue({ radiatorconsoglobal: number * conso });
  }

  radiatortempChange(e, i, temperature) {
    e.preventDefault();
    this.tempradia = temperature;
    this.items = this.consoForm.get('radiator.items') as FormArray;
    let number = this.items.at(i).value.radiatornumber;
    this.items.at(i).patchValue({ radiatortemp: temperature });
    let temp = temperature;

    let tempReference = 23;
    let power = parseInt(this.items.at(i).value.radiatorpower);
    let consoref = this.getConsoFromPower(power);
    console.log('consoref: ', consoref);

    let diff = temp - tempReference;
    if (diff < -4) {
      diff = -4;
    }
    console.log(temp);
    console.log(diff);

    let newConso = consoref + (consoref * (diff * 8.5)) / 100;
    // console.log(newConso);
    this.items.at(i).patchValue({ radiatorconso: newConso });
    this.items.at(i).patchValue({ radiatorconsoglobal: number * newConso });
  }

  radiatorconsoChange(e, i) {
    e.preventDefault();
    this.items = this.consoForm.get('radiator.items') as FormArray;
    let number = this.items.at(i).value.radiatornumber;
    let conso = this.items.at(i).value.radiatorconso;
    this.items.at(i).patchValue({ radiatorconsoglobal: number * conso });
  }

  radiatorpowerChange(e, i) {
    e.preventDefault();
    this.items = this.consoForm.get('radiator.items') as FormArray;
    let power = this.items.at(i).value.radiatorpower;
    power = parseInt(power);
    let number = this.items.at(i).value.radiatornumber;
    let temp = this.items.at(i).value.radiatortemp;
    console.log(parseInt(temp));

    let newConso = this.getConsoFromTemp(power, temp);

    this.items.at(i).patchValue({ radiatorconso: newConso });
    this.items.at(i).patchValue({ radiatorconsoglobal: number * newConso });
  }

  getConsoFromPower(power) {
    let conso = 25;
    switch (power) {
      case 500:
        conso = 150;
        break;
      case 750:
        conso = 225;
        break;
      case 1000:
        conso = 300;
        break;
      case 1250:
        conso = 375;
        break;
      case 1500:
        conso = 450;
        break;
      case 2000:
        conso = 600;
        break;
    }
    return conso;
  }

  getConsoFromTemp(power, temp) {
    let conso = 25;
    switch (power) {
      case 500:
        conso = 150;
        break;
      case 750:
        conso = 225;
        break;
      case 1000:
        conso = 300;
        break;
      case 1250:
        conso = 375;
        break;
      case 1500:
        conso = 450;
        break;
      case 2000:
        conso = 600;
        break;
    }
    let diff = temp - 23;
    if (diff < -4) {
      diff = -4;
    }
    let newConso = conso + (conso * (diff * 8.5)) / 100;
    return newConso;
  }

  getConsoDrytowelFromTemp(power, temp) {
    let conso = 25;
    switch (power) {
      case 750:
        conso = 90;
        break;
      case 1000:
        conso = 120;
        break;
    }
    let diff = temp - 23;
    if (diff < -4) {
      diff = -4;
    }
    let newConso = conso + (conso * (diff * 8.5)) / 100;
    return newConso;
  }

  getConsoDrytowelFromPower(power) {
    let conso = 25;
    switch (power) {
      case 750:
        conso = 45;
        break;
      case 1000:
        conso = 60;
        break;
    }
    return conso;
  }

  /***************************
   * DRYTOWEL (seche serviette)
   ***************************/
  // Permet de récupérer formData dans la vue qui est une instance de FormArray
  get drytowelItems() {
    return <FormArray>this.consoForm.get(`drytowel.items`);
  }
  // Permet de créer un reactiveForm à la volée
  createItemDrytowel(): FormGroup {
    return this.formBuilder.group({
      drytowelnumber: 1,
      drytowelpower: 1000,
      drytoweltemp: 23,
      usePerDayInHours: 4,
      drytowelconso: [{ value: 120, disabled: false }],
      drytowelconsoglobal: [{ value: 120, disabled: false }],
    });
  }

  // Au clic de l'utilisateur sur le bouton "Ajouter une ligne"
  addItemDrytowel(event): void {
    event.preventDefault();
    this.items = this.consoForm.get('drytowel.items') as FormArray;
    this.items.push(this.createItemDrytowel());
  }
  // Au clic de l'utilisateur sur le bouton "X" pour supprimer une ligne
  deleteItemDrytowelLine(e, i): void {
    e.preventDefault();
    this.items = this.consoForm.get('drytowel.items') as FormArray;
    console.log(this.items);
    this.items.removeAt(i);
  }
  // supprimer toutes les lignes
  deleteAllItemDrytowelLines(): void {
    this.items = this.consoForm.get('drytowel.items') as FormArray;
    while (this.items.length !== 0) {
      this.items.removeAt(0);
    }
  }
  // checkbox
  drytowelCheckedChange(ev) {
    if (this.consoForm.get('drytowel.checked').value === false) {
      this.deleteAllItemDrytowelLines();
    } else {
      this.addItemDrytowel(ev);
    }
  }

  drytowelDecrement(e, i) {
    e.preventDefault();
    this.items = this.consoForm.get('drytowel.items') as FormArray;
    let number = this.items.at(i).value.drytowelnumber;
    number = parseInt(number) - 1;

    let power = parseInt(this.items.at(i).value.drytowelpower);
    let temp = parseInt(this.items.at(i).value.drytoweltemp);
    let conso = this.getConsoDrytowelFromTemp(power, temp);

    if (number > 0) {
      this.items.at(i).patchValue({ drytowelnumber: number });
      this.items.at(i).patchValue({ drytowelconso: conso });
      this.items.at(i).patchValue({ drytowelconsoglobal: number * conso });
    }
  }

  drytowelIncrement(e, i) {
    e.preventDefault();
    this.items = this.consoForm.get('drytowel.items') as FormArray;
    let number = this.items.at(i).value.drytowelnumber;
    number = parseInt(number) + 1;

    let power = parseInt(this.items.at(i).value.drytowelpower);
    let temp = parseInt(this.items.at(i).value.drytoweltemp);
    let conso = this.getConsoDrytowelFromTemp(power, temp);
    //conso = parseInt(conso);
    console.log(conso);
    this.items.at(i).patchValue({ drytowelnumber: number });
    this.items.at(i).patchValue({ drytowelconso: conso });
    this.items.at(i).patchValue({ drytowelconsoglobal: number * conso });
  }

  drytowelpowerChange(e, i) {
    e.preventDefault();
    this.items = this.consoForm.get('drytowel.items') as FormArray;
    let power = this.items.at(i).value.drytowelpower;
    power = parseInt(power);
    let number = this.items.at(i).value.drytowelnumber;
    let temp = this.items.at(i).value.drytoweltemp;

    console.log('power', power);
    console.log('number', number);
    console.log('temp', temp);

    let newConso = this.getConsoDrytowelFromTemp(power, temp);
    console.log('newConso', newConso);

    this.items.at(i).patchValue({ drytowelconso: newConso });
    this.items.at(i).patchValue({ drytowelconsoglobal: number * newConso });
  }

  drytoweltempChange(e, i, temperature) {
    e.preventDefault();
    this.items = this.consoForm.get('drytowel.items') as FormArray;
    let number = this.items.at(i).value.drytowelnumber;
    this.items.at(i).patchValue({ drytoweltemp: temperature });
    let temp = temperature;

    let tempReference = 23;
    let power = parseInt(this.items.at(i).value.drytowelpower);
    let consoref = this.getConsoDrytowelFromTemp(power, temperature);
    console.log('powerref: ', power);
    console.log('tempref', temperature);
    console.log('consoref: ', consoref);

    // let diff = temp - tempReference;
    // if (diff < -4) {
    //   diff = -4;
    // }
    console.log(temp);
    //console.log(diff);

    // let newConso = consoref + (consoref * (diff * 8.5)) / 100;
    // console.log(newConso);
    this.items.at(i).patchValue({ drytowelconso: consoref });
    this.items.at(i).patchValue({ drytowelconsoglobal: number * consoref });
  }

  drytoweldurationPerDayChange(e, i, durationInHours) {
    e.preventDefault();
    this.items = this.consoForm.get('drytowel.items') as FormArray;
    let number = this.items.at(i).value.drytowelnumber;
    this.items.at(i).patchValue({ usePerDayInHours: durationInHours });
    let durationPerDay = durationInHours;

    let durationReference = 4;

    //power
    let power = parseInt(this.items.at(i).value.drytowelpower);
    //temp
    let temp = this.items.at(i).value.drytoweltemp;
    //conso
    let conso = this.items.at(i).value.drytowelconso;

    let diffDuration = durationPerDay - durationReference;

    let newConso = conso + diffDuration * 30;
    console.log('newCONSO : ', newConso);
    this.items.at(i).patchValue({ drytowelconso: newConso });
    this.items.at(i).patchValue({ drytowelconsoglobal: number * newConso });

    // power / 1000 *
  }

  drytowelconsoChange(e, i) {
    e.preventDefault();
    this.items = this.consoForm.get('drytowel.items') as FormArray;
    let number = this.items.at(i).value.drytowelnumber;
    let conso = this.items.at(i).value.drytowelconso;
    this.items.at(i).patchValue({ drytowelconsoglobal: number * conso });
  }

  /*********************
   * ALL
   *********************/
  incrementNumber(e, itemName) {
    e.preventDefault();
    let num = this.consoForm.get(`${itemName}.number`).value;
    this.consoForm.get(itemName).patchValue({ number: num + 1 });
  }
  decrementNumber(e, itemName) {
    e.preventDefault();
    let num = this.consoForm.get(`${itemName}.number`).value;
    if (num > 1) {
      this.consoForm.get(itemName).patchValue({ number: num - 1 });
    }
  }

  /*********************
   * LIGHT
   *********************/
  // Permet de récupérer formData dans la vue qui est une instance de FormArray
  get lightItems() {
    return <FormArray>this.consoForm.get(`light.items`);
  }

  lightDecrement(e) {
    e.preventDefault();
    let num = this.consoForm.get('light.number').value;
    if (num > 1) {
      this.consoForm.get('light').patchValue({ number: num - 1 });
    }
  }

  lightIncrement(e) {
    e.preventDefault();
    let num = this.consoForm.get('light.number').value;
    this.consoForm.get('light').patchValue({ number: num + 1 });
  }

  /****************************** */
  // CHECK ALL ITEMS BY CATEGRORY
  /******************************* */
  checkAllItems(checkbox: any, category: string) {
    this[category].map((item) => {
      this.consoForm.get(item.id).patchValue({ checked: checkbox.checked });
    });
  }
  verifyAllItemsChecked(category: string): boolean {
    let allItemsChecked = true;
    this[category].map((item) => {
      if (this.consoForm.get(item.id).value.checked == false) {
        allItemsChecked = false;
      }
    });
    return allItemsChecked;
  }

  // A la soumission du formulaire
  submitForm(formdata) {
    //event.preventDefault();
    console.log(formdata);
    alert(
      "MESSAGE : Ouvrez la console du navigateur pour voir l'objet orderForm"
    );
  }

  navigateToEndPage() {
    let conso = this.computeConso();
    let pricekwh = this.pricePerKWH;
    this.router.navigate([
      'end',
      {
        conso: conso,
        pricekwh: pricekwh,
        consoradiator: this.consoradiator,
        // powerradiator: 1000,
        temperaturerefradiator: this.tempradia,
        consodrytowel: this.consodrytowel,
        name: JSON.stringify({ first: 'fred', last: 'lo' }),
      },
    ]);
  }

  // [nombre d'heures d'utilisation / j]  x [nombre jours d'utilisation] x ([puissance appareil en watts] / 1000) = nombre kWh
  // prix  =  nombre kWh * prix au kwh (0.11-0.14)
}
