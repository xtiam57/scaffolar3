import { BaseClass } from 'src/app/base/base-class';

export class File extends BaseClass {
  id: string;
  name: string;
  fileExtension: string;
  path: string;
  size: string;
  tag: any;
  isActive = true;
  isDeleted = false;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;

  constructor(data: any) {
    super();
    this.init(this, data);
  }

  get type() {
    // list of extensions taken from https://en.wikipedia.org/wiki/List_of_Microsoft_Office_filename_extensions
    if (this.fileExtension.match(/doc|docx|dot|wbk|docm|dotx|dotm|docb/gi)) {
      return ['far', 'file-word'];
    } else if (this.fileExtension.match(/xls|xlt|xlm|xlsx|xlsm|xltx|xltm/gi)) {
      return ['far', 'file-excel'];
    } else if (this.fileExtension.match(/ppt|pot|pps|pptx|pptm|potx|potm|ppam|ppsx|ppsm|sldx|sldm/gi)) {
      return ['far', 'file-powerpoint'];
    } else if (this.fileExtension.match(/jpg|png|bmp/gi)) {
      return ['far', 'file-image'];
    } else if (this.fileExtension.match(/pdf/gi)) {
      return ['far', 'file-pdf'];
    } else if (this.fileExtension.match(/txt/gi)) {
      return ['far', 'file-alt'];
    } else {
      return ['far', 'file'];
    }
  }

  payload(field, value) {
    return {
      [field]: value,
    };
  }
}
