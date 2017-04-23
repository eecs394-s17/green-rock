import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
	selector: 'comments',
	templateUrl: 'comments.html',
})
export class CommentsPage {
	allComments: FirebaseListObservable<any>;
	userComment: string = '';

	constructor(public navCtrl: NavController, public af: AngularFire) {
		this.allComments = this.af.database.list('comments/rock1');
	}

	postComment() {
		console.log("Posting comment...");
		if (this.userComment != '') {
			let newKey = new Date().getTime();
			this.af.database.object(`/comments/rock1/${newKey}`).set(this.userComment);
		}
		this.userComment = '';
	}
}