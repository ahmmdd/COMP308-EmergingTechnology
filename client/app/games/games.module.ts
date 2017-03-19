// Angular requirements
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Games Module requirements
import { GamesRoutes } from './games.routes';
import { GamesComponent } from './games.component';

// Sub Components
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule.forChild(GamesRoutes)
  ],
  declarations: [
    GamesComponent,
    ListComponent
  ],
  exports: [
    GamesComponent,
    ListComponent
  ]
})
export class GamesModule {}
