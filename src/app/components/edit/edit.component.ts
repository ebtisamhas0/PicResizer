import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

 

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  template: '<img [src]="imageDataUrl">',
})
export class EditComponent implements OnInit {
  @ViewChild('image') imageElement?: ElementRef;


  showResizeSettings : boolean = true;
  showCropSettings : boolean = false;
  showRotateSettings : boolean = false;


  imageDataUrl?: string;
  imageDataUrlEdited: string = '';
  newWidth: number = 0;
  newHeight: number = 0;
  originalWidth?: number;
  originalHeight?: number;
  cropWidth: number = 0;
  cropHeight: number = 0;
  cropX : number = 0;
  cropY : number = 0; 
  currentTransform: string = '';



  constructor(private route: ActivatedRoute, private router: Router) {
    this.onResizeImage = this.onResizeImage.bind(this);
    this.onCropImage = this.onCropImage.bind(this);
   
  }

  navigateToEdit() {
    this.router.navigate(['/edit']);
  }
  navigateToConvert() {
    this.router.navigate(['/convert']);
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.imageDataUrl = params['image'];
      // Load the image
      const img = new Image();
      img.onload = () => {
        this.originalWidth = img.width;
        this.originalHeight = img.height;
        this.imageDataUrlEdited = this.imageDataUrl = this.getBase64Image(img);
      };
      img.src = this.imageDataUrl? this.imageDataUrl : '';
    });
  }

  
onResizeImage = () => {
  this.resizeImage();
}
onCropImage = () => {
  this.cropImage();
}


resizeImage() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const newWidth = this.newWidth;
  const newHeight = this.newHeight;

  canvas.width = newWidth;
  canvas.height = newHeight;

  const img = new Image();
  img.onload = () => {
    if (ctx) {
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Display the resized image
      const resizedImage = new Image();
      resizedImage.src = canvas.toDataURL();
      document.getElementById('resized-image-container')?.appendChild(resizedImage);

      // Allow the user to download the resized image
      const downloadLink = document.createElement('a');
      downloadLink.href = resizedImage.src;
      downloadLink.download = 'resized-image.png';
      downloadLink.textContent = 'Download Resized Image';
      document.getElementById('download-link-container')?.appendChild(downloadLink);

      // Hide the original image element
      const originalImage = document.getElementById('img');
      if (originalImage) {
        originalImage.style.display = 'none';
      }
    }
  };
  img.src = this.imageDataUrlEdited ? this.imageDataUrlEdited : '';
}


cropImage() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const cropWidth = this.cropWidth;
  const cropHeight = this.cropHeight;
  const cropX = this.cropX;
  const cropY = this.cropY;

  canvas.width = cropWidth;
  canvas.height = cropHeight;

  const img = new Image();
  img.onload = () => {
    if (ctx) {
      ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

      // Display the cropped image
      const croppedImage = new Image();
      croppedImage.src = canvas.toDataURL();
      document.getElementById('cropped-image-container')?.appendChild(croppedImage);

      // Allow the user to download the cropped image
      const downloadLink = document.createElement('a');
      downloadLink.href = croppedImage.src;
      downloadLink.download = 'cropped-image.png';
      downloadLink.textContent = 'Download Cropped Image';
      document.getElementById('download-link-container')?.appendChild(downloadLink);

      // Hide the original image element and the crop frame
      const originalImage = document.getElementById('img');
      if (originalImage) {
        originalImage.style.display = 'none';
      }
     
    }
  };
  img.src = this.imageDataUrlEdited ? this.imageDataUrlEdited : '';
}

reset() {
  const originalImage = document.getElementById('img');
  if (originalImage) {
    originalImage.style.display = 'block';
  }
  const croppedImage = document.getElementById('cropped-image-container');
  if (croppedImage) {
    croppedImage.style.display = 'none';
  }
}


// flip and rotate

flipHorizontally() {
  const img = document.getElementById('img');
  if (img){
  img.style.transform = 'rotateY(180deg)';
  }
  this.currentTransform = 'flipHorizontally';
}

flipVertically() {
  const img = document.getElementById('img');
  if (img){
  img.style.transform = 'rotateX(180deg)';
}
this.currentTransform = 'flipVertically';
}

rotateClockwise() {
  const img = document.getElementById('img');
  if (img){
  img.style.transform = 'rotate(90deg)';
}
  this.currentTransform = 'rotateClockwise';
 
}

rotateCounterClockwise() {
  const img = document.getElementById('img');
  if (img){
  img.style.transform = 'rotate(-90deg)';
}
  this.currentTransform = 'rotateCounterClockwise';
}


  getBase64Image(img: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    if (ctx){
    ctx.drawImage(img, 0, 0);
    }
    const dataUrl = canvas.toDataURL();
    return dataUrl;
  }

 
}

