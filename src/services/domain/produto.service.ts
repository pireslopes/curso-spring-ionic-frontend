import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {}

  getById(produtoId: string): Observable<ProdutoDTO> {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produtoId}`);
  }

  findByCategoria(idCategoria: string): Observable<ProdutoDTO[]> {
    return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos/?categorias=${idCategoria}`);
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketUrl}/prod${id}-small.jpg`;
    return this.http.get(url, {responseType: 'blob'});
  }

  getmageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketUrl}/prod${id}.jpg`;
    return this.http.get(url, {responseType: 'blob'});
  }
}