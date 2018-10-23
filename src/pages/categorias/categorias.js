var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { API_CONFIG } from '../../config/api.config';
/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CategoriasPage = /** @class */ (function () {
    function CategoriasPage(navCtrl, navParams, categoriaService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.categoriaService = categoriaService;
        this.bucketUrl = API_CONFIG.bucketUrl;
    }
    CategoriasPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.categoriaService.findAll()
            .subscribe(function (success) {
            _this.items = success;
        }, function (error) {
            console.log(error);
        });
    };
    CategoriasPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-categorias',
            templateUrl: 'categorias.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            CategoriaService])
    ], CategoriasPage);
    return CategoriasPage;
}());
export { CategoriasPage };
//# sourceMappingURL=categorias.js.map