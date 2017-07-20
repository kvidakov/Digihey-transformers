import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListOfTransformersComponent } from './list-of-transformers/list-of-transformers.component';
import { TransformersService } from './list-of-transformers/transformers.service';

import { AppRoutingModule } from './app-routing.module';
import { AddTransformersComponent } from './add-transformers/add-transformers.component';
import { UniquePipe } from './pipes/unique.pipe';
import { DetailsComponent } from './details/details.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
    declarations: [
        AppComponent,
        ListOfTransformersComponent,
        AddTransformersComponent,
        UniquePipe,
        DetailsComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2SearchPipeModule
    ],
    providers: [ TransformersService ],
    bootstrap: [AppComponent]
})
export class AppModule { }
