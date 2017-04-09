import { Component, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { NavController, Platform, Content, AlertController, LoadingController} from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable, FirebaseApp } from 'angularfire2';
import { Autosize } from 'angular2-autosize';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

import { Camera, Keyboard, Screenshot, Toast } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
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
  textPlaceholder: string = '';
  textValue: string = "";
  textReadOnly: boolean = true;
  toolbarShow: boolean = false;
  textStyleShow: boolean = false;
  paintStyleShow: boolean = false;
  published: boolean = false;
  zText: number = 3;
  zPaint: number = 2;
  textPositionX: string;
  textPositionY: string = '25%';
  lastTextPositionX: string;
  lastTextPositionY: string;
  reservationTime = 3; // Minutes
  showRefresh: boolean = true;


  rock: FirebaseObjectObservable<any[]>;
  storageRef;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': this.plt.width(),
  };

  private imageSrc: string = '';

  constructor(@Inject(FirebaseApp) firebaseApp: any, public navCtrl: NavController, public plt: Platform, private chRef: ChangeDetectorRef, af: AngularFire, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.rock = af.database.object('/rock1', { preserveSnapshot: true});

    this.rock.subscribe(snapshot => {
      //Need the line below to get rid of TypeScript compiler complaining about an error.
      var snap: any = snapshot;
      console.log(snap.val());
      var t = this;
      this.storageRef = firebaseApp.storage().ref().child(snap.val().image);
      
      // grab the time when the current rock was published
      var publishTime = snap.val().timestamp;
      // get current time
      var currentTime = (new Date().getTime());
      // convert milliseconds to minutes
      var timeDiff = ((currentTime - publishTime)/1000)/60
      console.log(Math.floor(timeDiff));

      var title = 'Rock Status:';
      var subTitle;
      var buttons;

      if (Math.floor(timeDiff) <= 1) {
        subTitle = 'This rock was just painted.'
        buttons = ['Ok']
        // Hide toolbar, etc
        this.published = true;
      }
      else if (timeDiff < this.reservationTime) {
        // Hide toolbar, etc
        this.published = true;

        subTitle = 'This rock was painted ' + Math.floor(timeDiff) + ' minutes ago.'
        buttons = ['Ok']
      } else {
        subTitle = 'This rock can be painted!'
        buttons = ['Ok']
      }

      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: buttons
      })
      alert.present();

      this.storageRef.getDownloadURL().then(function(url) {
        console.log(url);
        t.imageSrc = url;
        t.chRef.detectChanges();
      }).catch(function(error) {
        console.log(error);
      });
    });

    Keyboard.onKeyboardShow().subscribe(data => { 
      this.lastTextPositionY = this.textPositionY;
      this.lastTextPositionX = this.textPositionX;
      this.textPositionX = '';
      this.textPositionY = '50%';
      chRef.detectChanges();
    });

    Keyboard.onKeyboardHide().subscribe(data => {
      this.textPositionX = this.lastTextPositionX;
      this.textPositionY = this.lastTextPositionY;
    });
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
    this.imageSrc = '';
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
    this.textPlaceholder = 'Hold to start entering text...';
    // this.textPositionX = event.srcEvent.offsetX + 'px';
    this.textPositionY = event.srcEvent.offsetY + 'px';
    this.textReadOnly = true;
    //Focus as soon as you click(?)
    //Draggable?
  }

  editTextPosition() {
    console.log("tapped");
    // this.textPositionX = 0 + 'px';
    // this.textPositionY = 0 + 'px';
  }

  editText() {
    console.log("Allowing text to be editable...");
    this.textReadOnly = false;
  }

  refreshApp() {
    location.reload();
  }

  publishRock() {
    this.published = true;
    this.showRefresh = false;
    if (this.textValue) {
      this.textPlaceholder = '';
    }
    this.chRef.detectChanges();
    
    var t = this;
    //Timeout guarantees that toolbar and placeholder disappear before screenshot
    setTimeout(function() {
      Screenshot.URI(100).then(res => {
      console.log(res);
      //Upload image using uri to firebase storage
      t.storageRef.putString(res.URI, 'data_url').then(function(snapshot) {
        Toast.show('Rock painted!', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          });
        console.log('Uploaded a data_url string!');
        //Update database with image path and timestamp
        var time = (new Date().getTime());
        console.log(time);
        t.rock.set({ latitude: 1, longitude: 1, image: 'rock1.png', timestamp: time });
        t.published = false;

        location.reload();
      });
      
    })
    .catch(err => { console.error(err); });
    }, 100);
  }
}
