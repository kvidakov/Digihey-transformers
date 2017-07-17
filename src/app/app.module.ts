import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListOfTransformersComponent } from './list-of-transformers/list-of-transformers.component';
import { TransformersService } from './list-of-transformers/transformers.service';

@NgModule({
  declarations: [
    AppComponent,
    ListOfTransformersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ TransformersService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
