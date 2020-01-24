import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { HeroService } from "../../service/hero.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  // 要用到 heroService 的查询
  constructor(private heroService: HeroService) { }

  // 生命周期，初始化的时候就调用 getHeroes 列表信息
  ngOnInit() {
    this.getHeroes()
  }

  getHeroes(): void{
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5))
  }

}
