import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { DescriptionComponent } from './description/description.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
	declarations: [
		AppComponent,
		DescriptionComponent,
		UserComponent,
		DashboardComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		ApolloModule,
		HttpLinkModule
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule { 
	constructor(
		apollo: Apollo,
		httpLink: HttpLink) 
	{
		apollo.create({
			link: httpLink.create({
				uri: 'http://localhost:4000/graph'
			}),
			cache: new InMemoryCache()
		});
	}
}
