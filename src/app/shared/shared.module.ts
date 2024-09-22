import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { SidebarLeftComponent } from './sidebar-left/sidebar-left.component';
import { SecondNavigationComponent } from './second-navigation/second-navigation.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';
import { RouterModule } from '@angular/router';
import { PasswordChangeComponent } from './password-change/password-change.component';



@NgModule({
  declarations: [
    TopNavigationComponent,
    SidebarLeftComponent,
    SecondNavigationComponent,
    FooterComponent,
    NotificationPanelComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    TopNavigationComponent,
    SidebarLeftComponent,
    SecondNavigationComponent,
    FooterComponent,
    PasswordChangeComponent
  ]
})
export class SharedModule { }
