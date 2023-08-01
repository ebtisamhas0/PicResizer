import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';
import { MainComponent } from './components/main/main.component';
import { ConvertComponent } from './components/convert/convert.component';
const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'edit', component: EditComponent },
  { path: 'convert', component: ConvertComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
