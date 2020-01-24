import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { HEROES } from '../../mock-hero';
import { HeroService } from "../../service/hero.service";

// 装饰器 用来标记这是一个angular类 （React.createElement(label, CSS, content)）
// The @Component() decorator identifies the class immediately below it as a component, 
// and provides the template and related component-specific metadata.
// 这个叫做 decorator function 告诉 angular 这个组件的信息
// 组件类上的装饰器为其添加了元数据（metadata），其中包括指向相关模板的指针
// 此组件的metadata为，selector，templateUrl，styleUrls
@Component({
  selector: 'app-heroes', // html 中定义的标签名称
  templateUrl: './heroes.component.html', // 模板地址
  styleUrls: ['./heroes.component.css']   // css地址
  // providers: [HeroService]  // 当前 component 所需要的 service 的数组
})

/* 组件类
 OnInit 是生命周期的钩子，
 生命周期有：ngOnOnit(), ngOnDestroy(), 
 ngOnChanges(), ngDoChack(), ngAfterView(), ngAfterContent()

 始终要 export 这个组件，以便在 AppModule 导入它
*/
export class HeroesComponent implements OnInit {
  // hero: Hero = {
  //   id: 1,
  //   name: 'windstorm'
  // }

  // 此处定义为constant （因为从mock-hero中直接取const数据）
  // heroes = HEROES;

  // 此处定义为array（因为从service中取得数据时为array）
  heroes: Hero[];

  // // 定义指定选中的hero和类型
  // selectedHero: Hero;

  // 组件与服务的联系
  // 依赖注入HeroService，往构造函数中添加一个私有的heroService，其类型为HeroService
  constructor(private heroService: HeroService) { 
  }

  // 注入HeroService后，将heroes变量初始化
  ngOnInit() {
    this.getHeroes(); 
  }

  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes();
    // 通过 Observable 访问数据
    // subscribe 函数把 hero array 传递给回调函数 Use an observer instead of a complete callback
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }
 
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
 
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
