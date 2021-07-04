import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UploadS3Service } from './upload-s3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 's3-img-upload';
  files: File[] = [];

  renderImages: any = [];
  constructor(
    private uploadS3Service: UploadS3Service,
    private toaster: ToastrService
  ) {}

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  async onImageUpdate() {
    console.log(this.files);
    if (this.files.length < 1) {
      this.toaster.error('Please Select Drop your Image first');
      return;
    }

    for (let i = 0; i < this.files.length; i += 1) {
      let file = this.files[i];

      let filePath =
        'images/' + Math.random() * 10000000000000000 + '_' + file.name; // to create unique name for avoiding being replaced
      try {
        let response = await this.uploadS3Service.uploadFile(file, filePath);
        console.log(response);

        this.toaster.success(file.name + 'uploaded Successfully :)');
        const url = (response as any).Location;
        this.renderImages.push(url);
      } catch (error) {
        this.toaster.error('Something went wrong! ');
      }
    }
    this.files = [];
  }
}
