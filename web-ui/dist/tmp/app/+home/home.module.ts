import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [HomeComponent],
    exports: [HomeComponent],
    providers: [] // services go here
})

export class HomeModule { }
