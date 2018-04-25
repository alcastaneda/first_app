import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  gifs = [];
  page = 0;

  constructor(public navCtrl: NavController, private httpClient: HttpClient) {
    this.loadGifs();
  }

  loadGifs(infiniteScroll?) {
    this.httpClient.get(`http://api.giphy.com/v1/gifs/search?q=unicorn&api_key=YOUR_API_KEY&offset=${this.page}`)
    .subscribe(res => {
    	console.log(res.data);
      this.gifs = this.gifs.concat(res.data);
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    })
  }
 
  loadMore(infiniteScroll) {
    this.page = this.page + 25;
    this.loadGifs(infiniteScroll);
 
    // if (this.page === this.maximumPages) {
    //   infiniteScroll.enable(false);
    // }
  }
}
