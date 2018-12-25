import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'meeting-list', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signature', loadChildren: './signature/signature.module#SignaturePageModule' },
  { path: 'personal-info', loadChildren: './personal-info/personal-info.module#PersonalInfoPageModule' },
  { path: 'meeting-list', loadChildren: './meeting-list/meeting-list.module#MeetingListPageModule' },
  { path: 'meeting-detail', loadChildren: './meeting-detail/meeting-detail.module#MeetingDetailPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
