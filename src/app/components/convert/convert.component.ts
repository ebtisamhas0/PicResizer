import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css']
})
export class ConvertComponent {
  selectedFormat?: string;
  imageSrc?: string;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // Create a progress bar
    const progressBar = document.createElement('progress');
    progressBar.value = 0;
    progressBar.max = 100;
    document.body.appendChild(progressBar);

    reader.onprogress = (event: ProgressEvent) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        progressBar.value = progress;
      }
    };

    reader.onload = () => {
      const imageUrl = reader.result as string;
      progressBar.remove();
      const uploadImg = document.getElementById("uploadImg");
      if(uploadImg){
      uploadImg.style.display = 'none';
      }
      // Store the image source
      this.imageSrc = imageUrl;

      // Display the file info, format select, and convert button
      const imageInfoContainer = document.getElementById('imageInfoContainer') as HTMLDivElement;
      imageInfoContainer.style.display = 'block';

      // Display the file name and size
      const imageInfo = document.getElementById('imageInfo') as HTMLParagraphElement;
      imageInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;

      // Display the format select and convert button
      const formatSelect = document.getElementById('formatSelect') as HTMLSelectElement;
      formatSelect.style.display = 'block';
      const convertButton = document.getElementById('convertButton') as HTMLButtonElement;
      convertButton.style.display = 'block';
    };
  }

  async convertImageFormat() {
    if (!this.imageSrc) {
      console.error('Image source missing');
      alert('Image source missing')
      return;
    }
    if (!this.selectedFormat) {
      console.error('Image format missing');
      alert('Image format missing')

      return;
    }

    const img = await this.convertImage(this.imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    if (ctx) {
      ctx.drawImage(img, 0, 0);
    }
    const dataUrl = canvas.toDataURL(`image/${this.selectedFormat}`);

    // Create a download link
  const downloadLink = document.createElement('a');
  downloadLink.href = dataUrl;
  downloadLink.download = `new-image.${this.selectedFormat}`;
  downloadLink.textContent = `Download new image (${this.selectedFormat.toUpperCase()})`;

  // Add the download link to the DOM
  const downloadContainer = document.getElementById('downloadContainer') as HTMLDivElement;
  downloadContainer.innerHTML = '';
  downloadContainer.appendChild(downloadLink);
}


  async onConvertButtonClicked() {
    await this.convertImageFormat();
  }

  convertFormatChanged(event: any) {
    this.selectedFormat = event.target.value;
  }

  convertButtonEnabled(): boolean {
    return !!this.selectedFormat && !!this.imageSrc;
  }

  navigateToConvert() {
    this.router.navigate(['/convert']);
  }

  navigateToEdit() {
    this.router.navigate(['/edit']);
  }

  convertImage(imageUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (error) => {
        reject(error);
        console.log("an error occured");
      };
      img.src = imageUrl;
    });
  }
}





