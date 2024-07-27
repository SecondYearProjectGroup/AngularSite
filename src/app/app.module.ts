import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarLeftComponent } from './Components/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './Components/sidebar-right/sidebar-right.component';
import { MainContentComponent } from './Components/main-content/main-content.component';
import { EnrolledStudentsComponent } from './Components/enrolled-students/enrolled-students.component';
import { NotificationPanelComponent } from './Components/notification-panel/notification-panel.component';
import { TopNavigationComponent } from './Components/top-navigation/top-navigation.component';
import { SecondNavigationComponent } from './Components/second-navigation/second-navigation.component';
import { MiddleContentComponent } from './Components/middle-content/middle-content.component';
import { FooterComponent } from './Components/footer/footer.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EnrollComponent } from './Components/enroll/enroll.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
    MainContentComponent,
    EnrolledStudentsComponent,
    NotificationPanelComponent,
    TopNavigationComponent,
    SecondNavigationComponent,
    MiddleContentComponent,
    FooterComponent,
    DashboardComponent,
    EnrollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
