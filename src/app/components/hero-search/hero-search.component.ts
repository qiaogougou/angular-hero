import { Component, OnInit } from '@angular/core';
 
import { Observable, Subject } from 'rxjs';
 
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 
import { Hero } from '../../hero';
import { HeroService } from "../../service/hero.service";
 
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  // heroes$是一个命名习惯，表示这个变量是一个Observable，而不是数组
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
 
  constructor(private heroService: HeroService) {}
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 设定发起请求的 delay时间
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // 过滤条件发生变化的时候才发送请求
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // 根据新的搜索条件进行搜索
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}