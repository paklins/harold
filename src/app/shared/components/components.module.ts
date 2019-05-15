import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from './table-view/table-view.component';
import { ButtonComponent } from './button/button.component';
import { SpacerComponent } from './spacer/spacer.component';
import { DirectivesModule } from '../directives/directives.module';
import { IconComponent } from './icon/icon.component';

@NgModule({
    declarations:
    [
        SpacerComponent,
        IconComponent,
        ButtonComponent,
        TableViewComponent,
    ],
    imports:
    [
        CommonModule,
        DirectivesModule
    ],
    exports:
    [
        DirectivesModule,
        SpacerComponent,
        IconComponent,
        ButtonComponent,
        TableViewComponent
    ]
})
export class ComponentsModule { }
