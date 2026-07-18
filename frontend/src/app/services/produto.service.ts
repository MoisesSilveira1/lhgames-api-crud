import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Produto {
  id?: number;
    nome: string;
      categoria: string;
        preco: number;
          quantidade: number;
          }

          @Injectable({
            providedIn: 'root',
            })
            export class ProdutoService {
              private apiUrl = environment.apiUrl + '/produtos';

                constructor(private http: HttpClient) {}

                // ----- READ (GET) - listar todos os produtos -----
                  listar(): Observable<Produto[]> {
                      return this.http.get<Produto[]>(this.apiUrl);
                        }

                          // ----- CREATE (POST) - cadastrar um novo produto -----
                            criar(produto: Produto): Observable<Produto> {
                                return this.http.post<Produto>(this.apiUrl, produto);
                                  }

                                    // ----- UPDATE (PUT) - atualizar um produto existente -----
                                      atualizar(id: number, produto: Partial<Produto>): Observable<Produto> {
                                          return this.http.put<Produto>(this.apiUrl + '/' + id, produto);
                                            }

                                              // ----- DELETE (DESTROY) - remover um produto -----
                                                remover(id: number): Observable<any> {
                                                    return this.http.delete(this.apiUrl + '/' + id);
                                                      }
                                                      }
                                                      
