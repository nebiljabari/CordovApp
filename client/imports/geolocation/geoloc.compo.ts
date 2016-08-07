import { Component, OnInit }  from '@angular/core';
import { MeteorComponent }    from 'angular2-meteor';
import { Meteor }             from 'meteor/meteor';
import { ReactiveVar }        from 'meteor/reactive-var';
import { HTTP }               from 'meteor/http';
import template               from './geoloc.compo.html';

let coords = new ReactiveVar();

@Component({
  selector: 'geoloc-compo',
  template
})
export class GeoLocCompo extends MeteorComponent implements OnInit {
  lat_long: string;
  gMaps: String = new String();

  constructor() {
    super();
  }

  ngOnInit() {
    this.autorun(() => { this.lat_long = coords.get(); });
  }

  geoloc() {
    let self = this;
    coords.set('on process');

    function onSuccess(position) {
      let rawData = [position.coords.latitude, position.coords.longitude];
      let data    = `Latitude: ${rawData[0]}, Longitude: ${rawData[1]}`;

      //after success clear the geolocoation watch loop
      navigator.geolocation.clearWatch(watchId);

      alert(data), coords.set(data), self.googleMaps(rawData.toString());

    }

    function onError(err: any) {
      let error = `Code Error: ${err.code}, Message Error : ${err.message}`;
      throw new Meteor.Error('>> ERROR:', error);
    }

    let options = { timeout: 15000, enableHighAccuracy: true };

    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
  }

  googleMaps(data: string) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data}`;

    HTTP.call('GET', url, (err, res) => {
      if (err)
        throw new Meteor.Error('>> GoogleMaps ERROR:', err);

      this.gMaps = res.data.results[0].formatted_address;
      console.log('GoogleMaps RESULT', res.data);
    });
  }
}
