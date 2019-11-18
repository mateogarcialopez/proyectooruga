import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core';
import {MdbAutoCompleterComponent} from '../components/mdb-auto-completer.component';
import {DOCUMENT} from '@angular/platform-browser';
import {ISelectedOption} from '../interfaces/selected-option.interface';

import {PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Directive({
  selector: 'input[mdbAutoCompleter], textarea[mdbAutoCompleter]',
  host: {
    '(input)': '_handleInput($event)',
    '(keydown)': '_handleKeyDown($event)',
    '(focusin)': '_handleFocusIn()',
    '(blur)': '_handleBlurIn()',
    '(mousedown)': '_handleMouseDown()'
  },
  exportAs: 'mdbAutoCompleterTrigger',
})
export class MdbAutoCompleterDirective implements AfterViewInit, OnDestroy {
  @Input() mdbAutoCompleter: MdbAutoCompleterComponent;
  @Output() ngModelChange = new EventEmitter<any>();

  private _autocompleterInputChanges: MutationObserver;
  private _clearButton: any;
  isBrowser: boolean;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(PLATFORM_ID) platformId: string,
    @Inject(DOCUMENT) private document: any) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private _getClosestEl(el: any, selector: string) {
    for (; el && el !== document; el = el.parentNode) {
      if (el.matches && el.matches(selector)) {
        return el;
      }
    }
    return null;
  }

  private _renderClearButton() {
    const el = this.renderer.createElement('button');

    this._setStyles(el, {
      position: 'absolute',
      top: '25%',
      right: '0',
      visibility: 'hidden'
    });


    this._addClass(el, ['mdb-autocomplete-clear', 'fa', 'fa-times']);

    this.renderer.setAttribute(el, 'type', 'button');
    this.renderer.setAttribute(el, 'tabindex', this.mdbAutoCompleter.clearButtonTabIndex.toString());

    if (this.isBrowser) {
      const parent = this._getClosestEl(this.el.nativeElement, '.md-form') || this.el.nativeElement;
      this.renderer.appendChild(parent, el);
    }
  }

  private _setStyles(target: ElementRef, styles: any) {
    Object.keys(styles).forEach((prop: any) => {
      this.renderer.setStyle(target, prop, styles[prop]);
    });
    return this;
  }

  private _addClass(target: ElementRef, name: string[]) {
    name.forEach((el: string) => {
      this.renderer.addClass(target, el);
    });
  }

  private _clearInput() {
    this.el.nativeElement.value = '';
    this.ngModelChange.emit('');
    const clearButton = this.el.nativeElement.parentElement.lastElementChild;
    this._setStyles(clearButton, {visibility: 'hidden'});
  }


  protected _handleInput(event: any) {
    if (!this._isOpen()) {
      this._show();
    }

    this.mdbAutoCompleter.removeHighlight(0);
    this.mdbAutoCompleter.highlightRow(0);

    const clearButtonVisibility = event.target.value.length > 0 ? 'visible' : 'hidden';
    const clearButton = this.el.nativeElement.parentElement.lastElementChild;

    this._setStyles(clearButton, {visibility: clearButtonVisibility});
  }

  protected _handleKeyDown(event: any) {
    this.mdbAutoCompleter.navigateUsingKeyboard(event);
  }

  protected _handleFocusIn() {
    this._show();
  }

  protected _handleBlurIn() {
    this._hide();
  }

  protected _handleMouseDown() {
    this.mdbAutoCompleter.highlightRow(0);
  }

  getCoords(elem: any): any {
    if (this.isBrowser) {
      const box: ClientRect = elem.getBoundingClientRect();
      const body: any = document.body;
      const docEl: any = document.documentElement;

      const scrollTop: number = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      const scrollLeft: number = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

      const clientTop: number = docEl.clientTop || body.clientTop || 0;
      const clientLeft: number = docEl.clientLeft || body.clientLeft || 0;

      const top: number = box.top + scrollTop - clientTop;
      const left: number = box.left + scrollLeft - clientLeft;

      return {top: Math.round(top), left: Math.round(left)};
    }
  }


  private _isOpen() {
    return this.mdbAutoCompleter.isOpen();
  }

  private _show() {
    this.mdbAutoCompleter.show();
    this._appendDropdownToInput();

    if (this.mdbAutoCompleter.appendToBody) {
      if (this._getClosestEl(this.el.nativeElement, '.modal-body')) {
        setTimeout(() => {
          this.renderer.setStyle(this.mdbAutoCompleter.dropdown.nativeElement, 'z-index', '1100');
        }, 0);
      }
    }
  }

  private _hide() {
    this.mdbAutoCompleter.hide();
  }

  private _appendDropdownToInput() {
    const position: ClientRect = this.el.nativeElement.getBoundingClientRect();
    const el = this.el.nativeElement;
    const style = window.getComputedStyle(this.el.nativeElement);
    const height = ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom']
      .map((key) => parseInt(style.getPropertyValue(key), 10))
      .reduce((prev, cur) => prev + cur);

    this.mdbAutoCompleter.parameters = {
      left: this.getCoords(el).left,
      top: this.getCoords(el).top + height,
      width: position.width,
      bottom: window.innerHeight - height - this.getCoords(el).top,
      inputHeight: height
    };

    this.mdbAutoCompleter.appendDropdown({
      left: this.getCoords(el).left,
      top: this.getCoords(el).top + height,
      width: position.width,
      bottom: window.innerHeight - height - this.getCoords(el).top
    });

  }

  ngAfterViewInit() {
    this.mdbAutoCompleter.selectedItemChanged().subscribe((item: ISelectedOption) => {
      this.el.nativeElement.value = item.text;
      const clearButtonVisibility = this.el.nativeElement.value.length > 0 ? 'visible' : 'hidden';
      const clearButton = this.el.nativeElement.parentElement.lastElementChild;
      this._setStyles(clearButton, {visibility: clearButtonVisibility});
    });

    this.mdbAutoCompleter.isDropdownOpen().subscribe((state: boolean) => {
      if (state) {
        this._appendDropdownToInput();
      }
    });


    if (this.mdbAutoCompleter.clearButton && this.isBrowser) {

      this._renderClearButton();
      const clearButton = this.el.nativeElement.parentElement.querySelectorAll('.mdb-autocomplete-clear')[0];

      this._clearButton = this.document.querySelector('.mdb-autocomplete-clear');

      this.renderer.listen(clearButton, 'focus', () => {
        ['click', 'keydown:space', 'keydown:enter'].forEach(event => this.renderer.listen(clearButton, event, () => {
          this._clearInput();
        }));

        this._setStyles(clearButton, {
          transform: 'scale(1.2, 1.2)',
          transition: '200ms'
        });
      });

      this.renderer.listen(clearButton, 'mouseenter', () => {
        this._setStyles(clearButton, {
          transform: 'scale(1.2, 1.2)',
          transition: '200ms'
        });
      });

      this.renderer.listen(clearButton, 'mouseleave', () => {
        this._setStyles(clearButton, {
          transform: 'scale(1.0, 1.0)',
          transition: '200ms'
        });
      });

      this.renderer.listen(clearButton, 'blur', () => {
        this._setStyles(clearButton, {
          transform: 'scale(1.0, 1.0)',
          transition: '200ms'
        });
      });

      if (this.el.nativeElement.disabled) {
        this.renderer.setAttribute(clearButton, 'disabled', 'true');
      }

      this._autocompleterInputChanges = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => {
          if (mutation.attributeName === 'disabled') {
            this.renderer.setAttribute(this._clearButton, 'disabled', 'true');
          }
        });
      });

      this._autocompleterInputChanges.observe(this.el.nativeElement, {
        attributes: true,
        childList: true,
        characterData: true
      });

    }
  }

  ngOnDestroy() {
    if (this._autocompleterInputChanges) {
      this._autocompleterInputChanges.disconnect();
    }
  }

}
