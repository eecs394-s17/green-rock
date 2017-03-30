import { Component, ViewChild } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  clearColor: string = 'light';
  textStyleShow: boolean = false;
  paintStyleShow: boolean = false;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': this.plt.width(),
    'canvasHeight': this.plt.height()
  };

  constructor(public navCtrl: NavController, public plt: Platform) {
    
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
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
    } else {
        this.textStyleShow = false;
        this.paintStyleShow = !this.paintStyleShow;
    }
  }

  changePenColor(color) {
    this.signaturePad.set('penColor', color);
    // this.paintStyleShow = false;
  }
}
