import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  items: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    this.items = this.cartService.getCart().items;
    this.loadImagesUrl();   
  }

  loadImagesUrl() {
    this.items.forEach(item => {
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(success => {
          item.produto.imageUrl = `${API_CONFIG.bucketUrl}/prod${item.produto.id}-small.jpg`;
        }, 
        error => {});
    });
  }

}
