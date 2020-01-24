import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MessageComponent } from './components/message/message.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';

// The basic building blocks of an Angular application are NgModules, 
// which provide a compilation context for components. 
// NgModules collect related code into functional sets; 
@NgModule({
  declarations: [
    // router 对component进行分发，转向到不同的 component 中
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessageComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  // 把所有要可以依赖注入的service写到provider里
  // need to register all the dependencies that conponents in this module are dipendent upon.
  // for example our hero component is dependent upon hero service.
  // so we need to register hero service as a provider in this module.
  // (这个是特例，用了in memory web API)
  
  providers: [],
  bootstrap: [AppComponent] // bootstrap 引导程序：应用程序起来的时候，给AppComponent放进去，开启整个程序
})
export class AppModule { }
