import { FileUploaderComponent } from '../../../components/file-uploader.component';
import { Component } from '@angular/core'

@Component({
  selector: 'app-uploads',
  standalone: true,
  imports: [FileUploaderComponent],
  templateUrl: './uploads.component.html',
  styles: ``,
})
export class UploadsComponent {

}
