import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
	selector: 'comments',
	templateUrl: 'comments.html',
})
export class CommentsPage {
	allComments: FirebaseObjectObservable<any>;
	userComment: string = '';

	constructor(public navCtrl: NavController, public af: AngularFire) {
		this.allComments = this.af.database.object('comments/rock1');
	}

	postComment() {
		console.log("Posting comment...");
		if (this.userComment != '') {
			this.allComments.update({ [new Date().getTime()]: this.userComment });
		}
		this.userComment = '';
	}
}