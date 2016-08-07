import { Component, OnInit }  from '@angular/core';
import { MeteorComponent }    from 'angular2-meteor';
import { ReactiveVar }        from 'meteor/reactive-var';
import template               from './cam.compo.html';

let pix = new ReactiveVar();

@Component({
  selector: 'cam-compo',
  template
})
export class CamCompo extends MeteorComponent implements OnInit {
  saved: boolean = false;

  constructor() { super(); }

  ngOnInit() {
    this.autorun(() => { this.saved = pix.get(); });
  }

  camera() {
    pix.set(false);

    function onSuccess(imageData: any) {
      alert('Success', imageData), pix.set(true);
    }

    function onError(err: any) {
      alert('Error', err);
    }

    navigator.camera.getPicture(onSuccess, onError, { quality: 50,
                                                      destinationType: 2,
                                                      saveToPhotoAlbum: true
                                                    });
  }
}
