import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {STATIC_URL} from '@shared/consts/api.consts';

@Component({
  selector: 'adms-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss']
})
export class DropZoneComponent implements OnChanges {

  // @Input() fileUrl: string | ArrayBuffer | null;
  @Input() fileUrl: any;
  @Input() model: string;
  @Input() id: string;
  @Input() resetFiles: boolean;
  @Input() document: boolean | false;
  @Input() defaultImage = STATIC_URL + '/images/user-not-available.png';
  @Output() fileResult: EventEmitter<FileReader> = new EventEmitter();
  @Output() dropZoneFileSelect: EventEmitter<FormDataEntryValue> = new EventEmitter();
  fileName: string = null;
  draging: boolean;
  @ViewChild('fileInput', {static: false}) private fileInput: ElementRef;
  private formData = new FormData();


  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if ('resetFiles' === propName && this.resetFiles) {
        this.fileName = null;
        this.fileInput.nativeElement.value = '';
        this.formData.set(this.model, '');
      }
    }
  }

  public fileUpload(e): void {

    const reader = new FileReader();
    reader.onloadend = () => {
      this.fileUrl = reader.result;
      this.fileResult.emit(this.fileUrl)
    };
    
    reader.readAsDataURL(e.target.files[0]);
    this.fileName = e.target.files[0].name;
    this.formData.set(this.model, e.target.files[0], e.target.files[0].name);
    this.dropZoneFileSelect.emit(this.formData.get(this.model));

  }

  // public fileUpload(e): void {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     this.fileUrl = reader.result;
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  //   this.fileName = e.target.files[0].name;
  //   this.formData.set(this.model, e.target.files[0], e.target.files[0].name);
  //   this.dropZoneFileSelect.emit(this.formData.get(this.model));
  // }

  public delete_image(): void {
    this.fileUrl = null;
    this.fileName = null;
    this.fileInput.nativeElement.value = '';
    this.formData.set(this.model, '');
    this.fileResult.emit(null);
    this.dropZoneFileSelect.emit(this.formData.get(this.model));
  }

}
