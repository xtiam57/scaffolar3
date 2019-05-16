import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import * as $ from 'jquery';

let counter = 0;
const modes = { iframe: 'iframe', popup: 'popup' };
const standards = { strict: 'strict', loose: 'loose', html5: 'html5' };
const defaults = {
  mode: modes.iframe,
  standard: standards.html5,
  popHt: 500,
  popWd: 400,
  popX: 200,
  popY: 200,
  popTitle: '',
  popClose: false,
  extraCss: '',
  extraHead: '',
  retainAttr: [
    'class',
    'id',
    'style',
    'on',
  ]
};

const settings: any = {}; // global settings

const PrintAreaService = {
  print: function(PAWindow: any) {
    const paWindow = PAWindow.win;

    $(PAWindow.doc).ready(function() {
      paWindow.focus();
      paWindow.print();

      if (settings.mode === modes.popup && settings.popClose) {
        setTimeout(function() {
          paWindow.close();
        }, 2000);
      }
    });
  },

  write: function(PADocument, $ele) {
    PADocument.open();
    PADocument.write(this.docType() + '<html>' + this.getHead() + this.getBody($ele) + '</html>');
    PADocument.close();
  },

  docType: function() {
    if (settings.mode === modes.iframe) {
      return '';
    }

    if (settings.standard === standards.html5) {
      return '<!DOCTYPE html>';
    }

    const transitional = settings.standard === standards.loose ? ' Transitional' : '';
    const dtd = settings.standard === standards.loose ? 'loose' : 'strict';

    return '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01' + transitional + '//EN" "http://www.w3.org/TR/html4/' + dtd + '.dtd">';
  },

  getHead: function() {
    let extraHead = '';
    let links = '';
    let styles = '';

    if (settings.extraHead) {
      settings.extraHead.replace(/([^,]+)/g, function(m) {
        extraHead += m;
      });
    }

    $(document).find('style')
      .each(function () {
        styles += '<style type="text/css">' + $(this)[0].innerText + '</style>';
      });

    $(document).find('link')
      .filter(function() { // Requirement: <link> element MUST have rel="stylesheet" to be considered in print document
        const relAttr = $(this).attr('rel');
        return ($.type(relAttr) === 'undefined') === false && relAttr.toLowerCase() === 'stylesheet';
      })
      .filter(function() { // Include if media is undefined, empty, print or all
        const mediaAttr = $(this).attr('media');
        return $.type(mediaAttr) === 'undefined' || mediaAttr === '' || mediaAttr.toLowerCase() === 'print' || mediaAttr.toLowerCase() === 'all';
      })
      .each(function() {
        links += '<link type="text/css" rel="stylesheet" href="' + $(this).attr('href') + '" >';
      });

    if (settings.extraCss) {
      settings.extraCss.replace(/([^,\s]+)/g, function(m) {
        links += '<link type="text/css" rel="stylesheet" href="' + m + '">';
      });
    }

    return '<head><title>' + settings.popTitle + '</title>' + extraHead + styles + links + '</head>';
  },

  getBody: function (elements) {
    let html = '';
    const attrs = settings.retainAttr;
    const getBodyScope = this;
    elements.each(function ($scope, index) {
      const ele = getBodyScope.getFormData($(this));

      let attributes = '';

      for (let x = 0; x < attrs.length; x++) {
        const eleAttr = $(ele).attr(attrs[x]);
        if (eleAttr) {
          attributes += (attributes.length > 0 ? ' ' : '') + attrs[x] + '=\'' + eleAttr + '\'';
        }
      }

      html += '<div ' + attributes + '>' + $(ele).html() + '</div>';
    });

    return '<body>' + html + '</body>';
  },

  getFormData: function(ele) {
    const copy = ele.clone();
    const copiedInputs = $('input,select,textarea', copy);

    $('input,select,textarea', ele).each(function (i) {
      let typeInput = $(this).attr('type');

      if ($.type(typeInput) === 'undefined') {
        typeInput = $(this).is('select') ? 'select' : $(this).is('textarea') ? 'textarea' : '';
      }

      const copiedInput = copiedInputs.eq(i);

      if (typeInput === 'radio' || typeInput === 'checkbox') {
        copiedInput.attr('checked', $(this).is(':checked'));
      } else if (typeInput === 'text') {
        copiedInput.attr('value', $(this).val());
      } else if (typeInput === 'select') {
        // tslint:disable-next-line:no-shadowed-variable
        $(this).find('option').each(function(i: any) {
          if ($(this).is(':selected')) {
            $('option', copiedInput).eq(i).attr('selected', true);
          }
        });
      } else if (typeInput === 'textarea') {
        copiedInput.text($(this).val());
      }
    });

    return copy;
  },

  getPrintWindow: function() {
    switch (settings.mode) {
      case modes.iframe:
        const f = this.iframe();
        return { win: f.contentWindow || f, doc: f.doc };
      case modes.popup:
        const p: any = this.popup();
        return { win: p, doc: p.doc };
    }
  },

  iframe: function() {
    const frameId = settings.id;
    const iframeStyle = 'border:0;position:absolute;width:0px;height:0px;right:0px;top:0px;';
    let iframe;

    try {
      iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      $(iframe).attr({ style: iframeStyle, id: frameId, src: '#' + new Date().getTime() });
      iframe.doc = null;
      iframe.doc = iframe.contentDocument ? iframe.contentDocument : (iframe.contentWindow ? iframe.contentWindow.document : iframe.document);

    } catch (e) {
      throw new Error(e + '. iframes may not be supported in this browser.');
    }

    if (iframe.doc === null) {
      throw new Error('Cannot find document.');
    }

    return iframe;
  },

  popup: function() {
    let windowAttr = 'location=yes,statusbar=no,directories=no,menubar=no,titlebar=no,toolbar=no,dependent=no';
    windowAttr += ',width=' + settings.popWd + ',height=' + settings.popHt;
    windowAttr += ',resizable=yes,screenX=' + settings.popX + ',screenY=' + settings.popY + ',personalbar=no,scrollbars=yes';

    const newWin: any = window.open('', '_blank', windowAttr);

    newWin.doc = newWin.document;

    return newWin;
  },
};

$.fn.printArea = function(options) {
  $.extend(settings, defaults, options);

  counter++;
  const idPrefix = 'printArea_';
  $('[id^=\'' + idPrefix + ']').remove();

  settings.id = idPrefix + counter;

  const $printSource = $(this);

  const PrintAreaWindow = PrintAreaService.getPrintWindow();
  PrintAreaService.write(PrintAreaWindow.doc, $printSource);

  setTimeout(function() {
    PrintAreaService.print(PrintAreaWindow);
  }, 1000);
};

@Directive({
  selector: '[appPrintArea]'
})
export class PrintAreaDirective {
  @Input() appPrintArea: string;

  constructor(private el: ElementRef) { }

  @HostListener('click') onClick() {
    const options = {
      mode: 'iframe',
      popClose: false,
      extraCss: '',
      extraHead: '<meta charset="utf-8" />,<meta http-equiv="X-UA-Compatible" content="IE=edge"/>'
    };

    $(`div#${this.appPrintArea}`).printArea(options);
  }
}
