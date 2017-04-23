import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
	selector: 'comments',
	templateUrl: 'comments.html',
})
export class CommentsPage {
	constructor(public navCtrl: NavController) {

	}
}