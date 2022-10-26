import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css'],
})
export class EndComponent implements OnInit {
  constructor(private _route: ActivatedRoute) {}

  powerradiator = 1000;
  consoradiator = 0;
  percentconsoradiator = 0;
  temperaturerefradiator = 25;

  consodrytowel = 0;

  minutes = 45;
  minuterie = 45;

  conso: number = 600.78;
  priceperkwh: number = 0.17;
  priceHT = 0;

  tempmin = 19;
  tempmax = 35;
  tempaverage = 0;

  ////

  reducConsoRadiator = 0;
  newConsoAfterReduc = 0;
  reducPercentage = 0;

  reducConsoDrytowel = 0;
  newConsoDryTowelAfterReduc = 0;
  reducPercentageDryTowel = 0;

  ngOnInit() {
    console.log(JSON.parse(this._route.snapshot.params.name));

    if (
      this._route.snapshot.params.temperaturerefradiator == undefined ||
      this._route.snapshot.params.temperaturerefradiator == 0
    ) {
      this.tempaverage = 23;
    } else {
      this.tempaverage = Math.round(
        this._route.snapshot.params.temperaturerefradiator
      );
    }

    console.log(this._route.snapshot.params);
    // conso
    if (this._route.snapshot.params.conso != undefined) {
      this.conso =
        Math.round(parseFloat(this._route.snapshot.params.conso) * 100) / 100;
    }

    // powerradiator
    if (this._route.snapshot.params.powerradiator != undefined) {
      this.powerradiator = this._route.snapshot.params.conso;
    }
    // powerradiator
    if (this._route.snapshot.params.temperaturerefradiator != undefined) {
      this.temperaturerefradiator =
        this._route.snapshot.params.temperaturerefradiator;
    }
    // consoradiator
    if (this._route.snapshot.params.consoradiator != undefined) {
      this.consoradiator =
        Math.round(
          parseFloat(this._route.snapshot.params.consoradiator) * 100
        ) / 100;
      this.newConsoAfterReduc = this.consoradiator;
    }

    // consodrytowel
    if (this._route.snapshot.params.consodrytowel != undefined) {
      this.consodrytowel =
        Math.round(
          parseFloat(this._route.snapshot.params.consodrytowel) * 100
        ) / 100;
      //this.newConsoAfterReduc = this.consoradiator;
    }

    // percentconsoradiator
    if (this._route.snapshot.params.consoradiator != undefined) {
      let consoradia = parseFloat(this._route.snapshot.params.consoradiator);
      let conso = parseFloat(this._route.snapshot.params.conso);
      console.log('*****************');
      console.log(consoradia);
      console.log(conso);
      console.log((consoradia / conso) * 100);
      console.log('*****************');
      this.percentconsoradiator = Math.round((consoradia / conso) * 100);
    }
    //pricekwh
    if (this._route.snapshot.params.pricekwh != undefined) {
      this.priceperkwh = parseFloat(this._route.snapshot.params.pricekwh);
    }

    this.priceHT = Math.round(this.conso * this.priceperkwh * 100) / 100;
  }

  onSlideChange(event) {
    console.log('slider values send to component', event);
    this.tempaverage = (event.value1 + event.value2) / 2;
    let oldTemp = parseInt(this._route.snapshot.params.temperaturerefradiator);

    let diffTemperature = this.tempaverage - oldTemp;
    console.log('diff Temp', diffTemperature);

    this.reducConsoRadiator = Math.round(
      this.consoradiator * ((diffTemperature * 8.5) / 100)
    );
    console.log('reduc: ', this.reducConsoRadiator);

    this.newConsoAfterReduc = this.consoradiator + this.reducConsoRadiator;
    console.log('nouvelle conso: ', this.newConsoAfterReduc);

    this.reducPercentage = Math.round(
      (this.reducConsoRadiator / this.consoradiator) * 100
    );
  }

  onSlideMinuterieChange(event) {
    let diff = event - 4; // duréé sélectionnée moins durée reference (4heures)
    let actualconsoPerDay = this.consodrytowel / 30;
    let newConsoPerDay = actualconsoPerDay + diff;

    // nouvelle consommation drytowel par mois
    this.newConsoDryTowelAfterReduc = Math.round(newConsoPerDay * 30 * 10) / 10;

    // reduction en kW/h
    this.reducConsoDrytowel =
      this.newConsoDryTowelAfterReduc - this.consodrytowel;

    // pourcentage de réduction
    this.reducPercentageDryTowel = Math.round(
      (this.reducConsoDrytowel / this.consodrytowel) * 100
    );
  }

  changeMinuterie(event, minutes) {
    //console.log(tempmin);
    this.minutes = parseInt(minutes);
  }

  changeTempMin(event, tempmin) {
    //console.log(tempmin);
    this.tempmin = parseInt(tempmin);
    let averageTemp = this.computeAverageTemp(this.tempmin, this.tempmax);
    let newConso = this.computeConsoRadiator(
      this.temperaturerefradiator,
      averageTemp
    );
    console.log('temp moyenne:', averageTemp);
    console.log('nlle conso:', newConso);
  }

  changeTempMax(event, tempmax) {
    //console.log(tempmax);
    this.tempmax = parseInt(tempmax);
    let averageTemp = this.computeAverageTemp(this.tempmin, this.tempmax);
    let newConso = this.computeConsoRadiator(
      this.temperaturerefradiator,
      averageTemp
    );
    console.log('temp moyenne:', averageTemp);
    console.log('nlle conso:', newConso);
  }

  computeAverageTemp(min, max) {
    return (parseInt(min) + parseInt(max)) / 2;
  }

  computeConsoRadiator(temperatureRef, averageTemperature) {
    let temp = parseInt(temperatureRef);
    console.log('temp', temp);
    let tempReference = averageTemperature;
    let consoref = this.getConsoPerMonthFromPower(this.powerradiator);
    console.log('consoREF', consoref);

    let diff = temp - tempReference;

    let newConso = consoref + (consoref * (diff * 8.5)) / 100;

    return newConso;
  }

  getConsoPerMonthFromPower(power) {
    let conso = 600;
    switch (power) {
      case 500:
        conso = 300;
        break;
      case 750:
        conso = 450;
        break;
      case 1000:
        conso = 600;
        break;
      case 1250:
        conso = 750;
        break;
      case 1500:
        conso = 900;
        break;
      case 2000:
        conso = 1200;
        break;
    }
    return conso;
  }
}
