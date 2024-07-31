import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { SidebarLeftComponent } from './sidebar-left/sidebar-left.component';
import { SecondNavigationComponent } from './second-navigation/second-navigation.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    TopNavigationComponent,
    SidebarLeftComponent,
    SecondNavigationComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TopNavigationComponent,
    SidebarLeftComponent,
    SecondNavigationComponent,
    FooterComponent
  ]
})
export class SharedModule { }
