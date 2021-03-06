import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ListOfTransformersComponent } from './list-of-transformers/list-of-transformers.component';
import { AddTransformersComponent } from './add-transformers/add-transformers.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
    { path: '', redirectTo: '/transformers', pathMatch: 'full' },
    { path: 'transformers', component: ListOfTransformersComponent },
    { path: 'addTransformers', component: AddTransformersComponent },
    { path: 'details/:id', component: DetailsComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule { }
