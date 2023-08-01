import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  isLoading = false;

  constructor(private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageDataUrl = reader.result as string;
      // Navigate to the edit component with the imageDataUrl as a query parameter
      this.router.navigate(['edit'], { queryParams: { image: imageDataUrl } });
    };
  }

  navigateToEdit() {
    this.router.navigate(['/edit']);
  }
  
  navigateToConvert() {
    this.router.navigate(['/convert']);
  }
  
}
