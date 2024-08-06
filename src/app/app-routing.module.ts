import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/beforelog', pathMatch: 'full', outlet: 'primary' },
  { path: 'beforelog', loadChildren: () => import('./beforelog/beforelog.module').then(m => m.BeforelogModule), outlet: 'primary' },
  { path: 'afterlog', loadChildren: () => import('./afterlog/afterlog.module').then(m => m.AfterlogModule), outlet: 'primary' },
  { path: '**', redirectTo: '/beforelog', outlet: 'primary' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
