import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { DescriptionComponent } from './description/description.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
{
	path:'game/:id', component: DescriptionComponent;
},
{
	path:'user/:id', component: UserComponent;
},
{
	path:'', redirectTo:'/dashboard', pathMatch: 'full';
},
{
	path:'dashboard', component: DashboardComponent;
}];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
	],
	exports: [
		RouterModule
	],
	declarations: []
});
export class AppRoutingModule {}
