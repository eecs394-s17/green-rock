import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Autosize } from 'angular2-autosize';
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
  zText: number = 3;
  zPaint: number = 2;
  textPositionX: string;
  textPositionY: string;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': this.plt.width(),
    'canvasHeight': this.plt.height() * 0.85
  };

  private imageSrc: string = '';

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
    // this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.changePaintColor('red');
    this.paintButtonColor = '';
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
        //activate text
        this.zText = 3;
        this.zPaint = 2;
        this.paintStyleShow = false;
        this.textStyleShow = !this.textStyleShow;
        this.paintButtonColor = '';
    } else {
        //activate pen
        this.zText = 2;
        this.zPaint = 3;
        this.textStyleShow = false;
        this.paintButtonColor = this.lastPaintColor;
        this.paintStyleShow = !this.paintStyleShow;
    }
  }

  changePaintColor(color) {
    this.signaturePad.set('penColor', color);
    this.lastPaintColor = color;
    this.paintButtonColor = color;
  }

  canvasTapped(event) {
    this.textPositionX = event.srcEvent.offsetX + 'px';
    this.textPositionY = event.srcEvent.offsetY + 'px';
    //Focus as soon as you click(?)
    //Draggable?
  }

  editTextPosition() {
    this.textPositionX = 0 + 'px';
    this.textPositionY = 0 + 'px';
  }
}
