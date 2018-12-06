import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ExporterService {
  constructor(private datePipe: DatePipe) {}

  saveAs(fileName: string = 'document', fileExtension: string = 'txt', content: any = '\n', type: string = 'text/plain'): void {
    const file = new Blob([content], { type });
    const downloadLink = document.createElement('a');
    const date = this.datePipe.transform(new Date(), 'yyyy-MM-dd@HH.mm.ss');
    downloadLink.download = `${fileName}_${date}.${fileExtension}`;
    downloadLink.innerHTML = 'Download File';

    if (!window.URL) {
      // Chrome allows the link to be clicked
      // without actually adding it to the DOM.
      downloadLink.href = window.URL.createObjectURL(file);
    } else {
      // Firefox requires the link to be added to the DOM
      // before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(file);
      downloadLink.onclick = (e: any) => {
        document.body.removeChild(e.target);
      };
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
    }
    downloadLink.click();
  }

  saveAsExcel(fileName, content) {
    this.saveAs(fileName, 'xlsx', content, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

  saveAsCSV(fileName, content) {
    this.saveAs(fileName, 'csv', content);
  }
}
