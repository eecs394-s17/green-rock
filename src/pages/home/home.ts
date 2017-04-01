import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, Content } from 'ionic-angular';
import { Autosize } from 'angular2-autosize';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

import { Camera } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @ViewChild(Content) canvas: Content;

  canvasHeight: string;
  colors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];
  paintButtonColor = '';
  lastPaintColor = '';
  textButtonColor = '';
  lastTextColor = '';
  textColor = '';
  textPlaceholder: string = 'Hold to start entering text...';
  textValue: string = "";
  textReadOnly: boolean = true;
  textStyleShow: boolean = false;
  paintStyleShow: boolean = false;
  zText: number = 3;
  zPaint: number = 2;
  textPositionX: string;
  textPositionY: string;
  lastTextPositionX: string;
  lastTextPositionY: string;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': this.plt.width(),
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

  ionViewDidEnter() {
    console.log(this.canvas.contentHeight);
    this.canvasHeight = this.canvas.contentHeight + 'px';
    this.signaturePad.set('canvasHeight', this.canvas.contentHeight);
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    // can set szimek/signature_pad options at runtime here
    this.changeTextColor('red');
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
    this.textValue = "";
  }
  toggleStyleBar(toolStr) {
    if (toolStr == 'text') {
        this.zText = 3;
        this.zPaint = 2;
        this.textStyleShow = !this.textStyleShow;
        this.textButtonColor = this.lastTextColor;
        this.paintStyleShow = false;
        this.paintButtonColor = '';
        this.textPlaceholder = 'Hold to start entering text...';
        this.textReadOnly = false;
    } else if (toolStr == 'paint') {
        this.zText = 2;
        this.zPaint = 3;
        this.paintStyleShow = !this.paintStyleShow;
        this.paintButtonColor = this.lastPaintColor;
        this.textStyleShow = false;
        this.textButtonColor = '';
        this.textPlaceholder = '';
        this.textReadOnly = true;
    }
  }

  changeColorFromToolbar(color) {
    if (this.textStyleShow) {
      this.changeTextColor(color);
    } else if (this.paintStyleShow) {
      this.changePaintColor(color);
    }
  }

  changePaintColor(color) {
    this.signaturePad.set('penColor', color);
    this.lastPaintColor = color;
    this.paintButtonColor = color;
  }

  changeTextColor(color){
    this.textColor = color;
    this.lastTextColor = color;
    this.textButtonColor = color;
  }

  canvasTapped(event) {
    // this.textPositionX = event.srcEvent.offsetX + 'px';
    this.textPositionY = event.srcEvent.offsetY + 'px';
    this.textReadOnly = true;
    //Focus as soon as you click(?)
    //Draggable?
  }

  editTextPosition() {
    // this.textPositionX = 0 + 'px';
    // this.textPositionY = 0 + 'px';
  }

  editText() {
    console.log("Allowing text to be editable...");
    this.textReadOnly = false;
  }
}
