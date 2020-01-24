import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Hero } from '../../hero';
import { HeroService } from "../../service/hero.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  // 通过组件元数据中的encapsulation设定组件样式的封装模式
  // encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
// @Input 装饰器 入口参数 从外部引入的hero
// @Input() hero: Hero;

  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero()
  }

  getHero(): void {
    // + 含义，给id转换为数字
    const id = +this.route.snapshot.paramMap.get('id'); 
    this.heroService.getHero(id)
      .subscribe(hero=>this.hero = hero)
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
