import { Component, ViewChild } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';

import { Camera } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  paintButtonColor = '';
  lastPaintColor = '';
  textStyleShow: boolean = false;
  paintStyleShow: boolean = false;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': this.plt.width(),
    'canvasHeight': this.plt.height()
  };

  private imageSrc:string;
  constructor(public navCtrl: NavController, public plt: Platform) {

  }

  openGallery (): void {
    let cameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI,      
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: Camera.EncodingType.JPEG,      
      correctOrientation: true
    }

    Camera.getPicture(cameraOptions)
    .then(file_uri => this.imageSrc = file_uri, 
      err => console.log(err));   
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.changePenColor('red');
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  clearRock() {
    this.signaturePad.clear();
  }
  toggleStyleBar(toolStr) {
    if (toolStr == 'text') {
        this.paintStyleShow = false;
        this.textStyleShow = !this.textStyleShow;
        this.paintButtonColor = '';
    } else {
        this.textStyleShow = false;
        this.paintButtonColor = this.lastPaintColor;
        this.paintStyleShow = !this.paintStyleShow;
    }
  }

  changePenColor(color) {
    this.signaturePad.set('penColor', color);
    this.lastPaintColor = color;
    this.paintButtonColor = color;
  }
}
