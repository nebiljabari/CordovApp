import { Component }    from '@angular/core';
import { CamCompo }     from './imports/camera/cam.compo';
import { GeoLocCompo }  from './imports/geolocation/geoloc.compo';
import template         from './app.compo.html';

@Component({
  selector: 'app',
  template,
  directives: [CamCompo, GeoLocCompo]
})
export class AppCompo {}
