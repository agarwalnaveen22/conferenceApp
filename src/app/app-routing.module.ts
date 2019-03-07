import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signature', loadChildren: './signature/signature.module#SignaturePageModule' },
  { path: 'personal-info', loadChildren: './personal-info/personal-info.module#PersonalInfoPageModule' },
  { path: 'meeting-list', loadChildren: './meeting-list/meeting-list.module#MeetingListPageModule' },
  { path: 'meeting-detail/:id', loadChildren: './meeting-detail/meeting-detail.module#MeetingDetailPageModule' },
  { path: 'chat-users-list/:id', loadChildren: './chat-users-list/chat-users-list.module#ChatUsersListPageModule' },
  { path: 'chat/:id/:name/:eventId', loadChildren: './chat/chat.module#ChatPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
