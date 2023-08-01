import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditComponent } from '../../components/edit/edit.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [EditComponent],
  exports: [EditComponent]
})
export class SharedModule { }

