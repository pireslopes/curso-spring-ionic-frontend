import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoriaId = this.navParams.get('categoriaId');
    this.produtoService.findByCategoria(categoriaId)
      .subscribe(success => {
        this.items = success['content'];
        this.loadImagesUrl();
      }, error => {});
  }

  loadImagesUrl() {
    this.items.forEach(item => {
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(success => {
          item.imageUrl = `${API_CONFIG.bucketUrl}/prod${item.id}-small.jpg`;
        }, 
        error => {});
    });
  }

}
