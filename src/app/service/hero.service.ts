import { HttpHeaders } from '@angular/common/http';
import { HEROES } from '../mock-hero';
import { from } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from '../hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// injectable 依赖注入，从外部接受数据。告诉Angular这是个可以依赖注入的服务
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'; // base URL to web api

  // private messageService: MessageService;
  // constructor(messageService: MessageService) {
  //   this.messageService = messageService;
  // }
  // 上下两个 constructor 方法等价
  // 加载的模块

  // 把service注入到constructor中，dependency injection
  constructor(private http: HttpClient, // 通讯HTTP服务请求
    private messageService: MessageService) { }

  // HeroService.getHeroes() 的函数签名是同步的，它所隐含的假设是 HeroService 总是能同步获取英雄列表数据。 而 HeroesComponent 也同样假设能同步取到 getHeroes() 的结果。
  // 这在真实的应用中几乎是不可能的。 现在能这么做，只是因为目前该服务返回的是模拟数据。 不过很快，该应用就要从远端服务器获取英雄数据了，而那天生就是异步操作。
  // HeroService 必须等服务器给出响应， 而 getHeroes() 不能立即返回英雄数据， 浏览器也不会在该服务等待期间停止响应。
  // HeroService.getHeroes() 必须具有某种形式的异步函数签名。
  // 它可以使用回调函数，可以返回 Promise（承诺），也可以返回 Observable（可观察对象）。
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }
  // 你使用 RxJS 的 of() 方法返回了一个模拟英雄数据的可观察对象 (Observable<Hero[]>)。
  // You used RxJS of() to return an observable of mock heroes (Observable<Hero[]>).
  // getHeroes(): Observable<Hero[]> {
  //   // this.log("fatched heroes");
  //   // return of(HEROES);
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       tap(_ => this.log('fetched heroes')),
  //       catchError(this.handleError('getHeroes', []))
  //     );
  // }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    // 获取list，通过 http get 请求获取 base url
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        // 通过pipe，进行信息处理。 
        // 1. 记 log；2. catch error
        tap(_ => this.log('fetched heroes')), catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  getHero(id: number): Observable<Hero> {
    // this.log(`fetched hero id=${id}`);
    // return of(HEROES.find(hero=>hero.id===id));
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(tap(_ => this.log(`fetched hero id=${id}`)), catchError(this.handleError<Hero>(`getHero id=${id}`)));
  }

  // REST API的写法，get post put delete
  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)), catchError(this.handleError<Hero>('addHero')));
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, httpOptions).pipe(tap(_ => this.log(`deleted hero id=${id}`)), catchError(this.handleError<Hero>('deleteHero')));
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(tap(_ => this.log(`updated hero id=${hero.id}`)), catchError(this.handleError<any>('updateHero')));
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(tap(_ => this.log(`found heroes matching "${term}"`)), catchError(this.handleError<Hero[]>('searchHeroes', [])));
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    // baseURL拼接上id，ES6语法，反引号
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          // 判断如果有内容就fetched， 没有内容报异常（异常在console中）
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }), catchError(this.handleError<Hero>(`getHero id=${id}`)));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
