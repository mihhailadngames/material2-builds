/**
 * @fileoverview added by tsickle
 * Generated from: src/material/sidenav/sidenav.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, forwardRef, Inject, Input, ViewEncapsulation, QueryList, ElementRef, NgZone, } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MAT_DRAWER_CONTAINER } from './drawer';
import { matDrawerAnimations } from './drawer-animations';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
export class MatSidenavContent extends MatDrawerContent {
    /**
     * @param {?} changeDetectorRef
     * @param {?} container
     * @param {?} elementRef
     * @param {?} scrollDispatcher
     * @param {?} ngZone
     */
    constructor(changeDetectorRef, container, elementRef, scrollDispatcher, ngZone) {
        super(changeDetectorRef, container, elementRef, scrollDispatcher, ngZone);
    }
}
MatSidenavContent.decorators = [
    { type: Component, args: [{
                selector: 'mat-sidenav-content',
                template: '<ng-content></ng-content>',
                host: {
                    'class': 'mat-drawer-content mat-sidenav-content',
                    '[style.margin-left.px]': '_container._contentMargins.left',
                    '[style.margin-right.px]': '_container._contentMargins.right',
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
MatSidenavContent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: MatSidenavContainer, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => MatSidenavContainer)),] }] },
    { type: ElementRef },
    { type: ScrollDispatcher },
    { type: NgZone }
];
export class MatSidenav extends MatDrawer {
    constructor() {
        super(...arguments);
        this._fixedInViewport = false;
        this._fixedTopGap = 0;
        this._fixedBottomGap = 0;
    }
    /**
     * Whether the sidenav is fixed in the viewport.
     * @return {?}
     */
    get fixedInViewport() { return this._fixedInViewport; }
    /**
     * @param {?} value
     * @return {?}
     */
    set fixedInViewport(value) { this._fixedInViewport = coerceBooleanProperty(value); }
    /**
     * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
     * mode.
     * @return {?}
     */
    get fixedTopGap() { return this._fixedTopGap; }
    /**
     * @param {?} value
     * @return {?}
     */
    set fixedTopGap(value) { this._fixedTopGap = coerceNumberProperty(value); }
    /**
     * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
     * fixed mode.
     * @return {?}
     */
    get fixedBottomGap() { return this._fixedBottomGap; }
    /**
     * @param {?} value
     * @return {?}
     */
    set fixedBottomGap(value) { this._fixedBottomGap = coerceNumberProperty(value); }
}
MatSidenav.decorators = [
    { type: Component, args: [{
                selector: 'mat-sidenav',
                exportAs: 'matSidenav',
                template: "<div class=\"mat-drawer-inner-container\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                animations: [matDrawerAnimations.transformDrawer],
                host: {
                    'class': 'mat-drawer mat-sidenav',
                    'tabIndex': '-1',
                    // must prevent the browser from aligning text based on value
                    '[attr.align]': 'null',
                    '[class.mat-drawer-end]': 'position === "end"',
                    '[class.mat-drawer-over]': 'mode === "over"',
                    '[class.mat-drawer-push]': 'mode === "push"',
                    '[class.mat-drawer-side]': 'mode === "side"',
                    '[class.mat-drawer-opened]': 'opened',
                    '[class.mat-sidenav-fixed]': 'fixedInViewport',
                    '[style.top.px]': 'fixedInViewport ? fixedTopGap : null',
                    '[style.bottom.px]': 'fixedInViewport ? fixedBottomGap : null',
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
MatSidenav.propDecorators = {
    fixedInViewport: [{ type: Input }],
    fixedTopGap: [{ type: Input }],
    fixedBottomGap: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MatSidenav.ngAcceptInputType_fixedInViewport;
    /** @type {?} */
    MatSidenav.ngAcceptInputType_fixedTopGap;
    /** @type {?} */
    MatSidenav.ngAcceptInputType_fixedBottomGap;
    /** @type {?} */
    MatSidenav.ngAcceptInputType_disableClose;
    /** @type {?} */
    MatSidenav.ngAcceptInputType_autoFocus;
    /** @type {?} */
    MatSidenav.ngAcceptInputType_opened;
    /**
     * @type {?}
     * @private
     */
    MatSidenav.prototype._fixedInViewport;
    /**
     * @type {?}
     * @private
     */
    MatSidenav.prototype._fixedTopGap;
    /**
     * @type {?}
     * @private
     */
    MatSidenav.prototype._fixedBottomGap;
}
export class MatSidenavContainer extends MatDrawerContainer {
}
MatSidenavContainer.decorators = [
    { type: Component, args: [{
                selector: 'mat-sidenav-container',
                exportAs: 'matSidenavContainer',
                template: "<div class=\"mat-drawer-backdrop\" (click)=\"_onBackdropClicked()\" *ngIf=\"hasBackdrop\"\n     [class.mat-drawer-shown]=\"_isShowingBackdrop()\"></div>\n\n<ng-content select=\"mat-sidenav\"></ng-content>\n\n<ng-content select=\"mat-sidenav-content\">\n</ng-content>\n<mat-sidenav-content *ngIf=\"!_content\" cdkScrollable>\n  <ng-content></ng-content>\n</mat-sidenav-content>\n",
                host: {
                    'class': 'mat-drawer-container mat-sidenav-container',
                    '[class.mat-drawer-container-explicit-backdrop]': '_backdropOverride',
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                providers: [{
                        provide: MAT_DRAWER_CONTAINER,
                        useExisting: MatSidenavContainer
                    }],
                styles: [".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer{transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}\n"]
            }] }
];
MatSidenavContainer.propDecorators = {
    _allDrawers: [{ type: ContentChildren, args: [MatSidenav, {
                    // We need to use `descendants: true`, because Ivy will no longer match
                    // indirect descendants if it's left as false.
                    descendants: true
                },] }],
    _content: [{ type: ContentChild, args: [MatSidenavContent,] }]
};
if (false) {
    /** @type {?} */
    MatSidenavContainer.ngAcceptInputType_autosize;
    /** @type {?} */
    MatSidenavContainer.ngAcceptInputType_hasBackdrop;
    /** @type {?} */
    MatSidenavContainer.prototype._allDrawers;
    /** @type {?} */
    MatSidenavContainer.prototype._content;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zaWRlbmF2L3NpZGVuYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDL0YsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUVMLHFCQUFxQixFQUNyQixvQkFBb0IsRUFFckIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQWN4RCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsZ0JBQWdCOzs7Ozs7OztJQUNyRCxZQUNJLGlCQUFvQyxFQUNXLFNBQThCLEVBQzdFLFVBQW1DLEVBQ25DLGdCQUFrQyxFQUNsQyxNQUFjO1FBQ2hCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVFLENBQUM7OztZQW5CRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSx3Q0FBd0M7b0JBQ2pELHdCQUF3QixFQUFFLGlDQUFpQztvQkFDM0QseUJBQXlCLEVBQUUsa0NBQWtDO2lCQUM5RDtnQkFDRCxlQUFl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U0FBQyxVQUFVLEVBQUU7OztvQkFHM0IsV0FBVyxFQUFFLElBQUk7aUJBQ2xCO3VCQUdBLFlBQVksU0FBQyxpQkFBaUI7Ozs7SUFFL0IsK0NBQWdEOztJQUNoRCxrREFBbUQ7O0lBVm5ELDBDQUttQzs7SUFFbkMsdUNBQTZEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFF1ZXJ5TGlzdCxcbiAgRWxlbWVudFJlZixcbiAgTmdab25lLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RHJhd2VyLCBNYXREcmF3ZXJDb250YWluZXIsIE1hdERyYXdlckNvbnRlbnQsIE1BVF9EUkFXRVJfQ09OVEFJTkVSfSBmcm9tICcuL2RyYXdlcic7XG5pbXBvcnQge21hdERyYXdlckFuaW1hdGlvbnN9IGZyb20gJy4vZHJhd2VyLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQm9vbGVhbklucHV0LFxuICBjb2VyY2VCb29sZWFuUHJvcGVydHksXG4gIGNvZXJjZU51bWJlclByb3BlcnR5LFxuICBOdW1iZXJJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtTY3JvbGxEaXNwYXRjaGVyfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2lkZW5hdi1jb250ZW50JyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtZHJhd2VyLWNvbnRlbnQgbWF0LXNpZGVuYXYtY29udGVudCcsXG4gICAgJ1tzdHlsZS5tYXJnaW4tbGVmdC5weF0nOiAnX2NvbnRhaW5lci5fY29udGVudE1hcmdpbnMubGVmdCcsXG4gICAgJ1tzdHlsZS5tYXJnaW4tcmlnaHQucHhdJzogJ19jb250YWluZXIuX2NvbnRlbnRNYXJnaW5zLnJpZ2h0JyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNpZGVuYXZDb250ZW50IGV4dGVuZHMgTWF0RHJhd2VyQ29udGVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1hdFNpZGVuYXZDb250YWluZXIpKSBjb250YWluZXI6IE1hdFNpZGVuYXZDb250YWluZXIsXG4gICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgICBuZ1pvbmU6IE5nWm9uZSkge1xuICAgIHN1cGVyKGNoYW5nZURldGVjdG9yUmVmLCBjb250YWluZXIsIGVsZW1lbnRSZWYsIHNjcm9sbERpc3BhdGNoZXIsIG5nWm9uZSk7XG4gIH1cbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2lkZW5hdicsXG4gIGV4cG9ydEFzOiAnbWF0U2lkZW5hdicsXG4gIHRlbXBsYXRlVXJsOiAnZHJhd2VyLmh0bWwnLFxuICBhbmltYXRpb25zOiBbbWF0RHJhd2VyQW5pbWF0aW9ucy50cmFuc2Zvcm1EcmF3ZXJdLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1kcmF3ZXIgbWF0LXNpZGVuYXYnLFxuICAgICd0YWJJbmRleCc6ICctMScsXG4gICAgLy8gbXVzdCBwcmV2ZW50IHRoZSBicm93c2VyIGZyb20gYWxpZ25pbmcgdGV4dCBiYXNlZCBvbiB2YWx1ZVxuICAgICdbYXR0ci5hbGlnbl0nOiAnbnVsbCcsXG4gICAgJ1tjbGFzcy5tYXQtZHJhd2VyLWVuZF0nOiAncG9zaXRpb24gPT09IFwiZW5kXCInLFxuICAgICdbY2xhc3MubWF0LWRyYXdlci1vdmVyXSc6ICdtb2RlID09PSBcIm92ZXJcIicsXG4gICAgJ1tjbGFzcy5tYXQtZHJhd2VyLXB1c2hdJzogJ21vZGUgPT09IFwicHVzaFwiJyxcbiAgICAnW2NsYXNzLm1hdC1kcmF3ZXItc2lkZV0nOiAnbW9kZSA9PT0gXCJzaWRlXCInLFxuICAgICdbY2xhc3MubWF0LWRyYXdlci1vcGVuZWRdJzogJ29wZW5lZCcsXG4gICAgJ1tjbGFzcy5tYXQtc2lkZW5hdi1maXhlZF0nOiAnZml4ZWRJblZpZXdwb3J0JyxcbiAgICAnW3N0eWxlLnRvcC5weF0nOiAnZml4ZWRJblZpZXdwb3J0ID8gZml4ZWRUb3BHYXAgOiBudWxsJyxcbiAgICAnW3N0eWxlLmJvdHRvbS5weF0nOiAnZml4ZWRJblZpZXdwb3J0ID8gZml4ZWRCb3R0b21HYXAgOiBudWxsJyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNpZGVuYXYgZXh0ZW5kcyBNYXREcmF3ZXIge1xuICAvKiogV2hldGhlciB0aGUgc2lkZW5hdiBpcyBmaXhlZCBpbiB0aGUgdmlld3BvcnQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBmaXhlZEluVmlld3BvcnQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9maXhlZEluVmlld3BvcnQ7IH1cbiAgc2V0IGZpeGVkSW5WaWV3cG9ydCh2YWx1ZSkgeyB0aGlzLl9maXhlZEluVmlld3BvcnQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gIHByaXZhdGUgX2ZpeGVkSW5WaWV3cG9ydCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgZ2FwIGJldHdlZW4gdGhlIHRvcCBvZiB0aGUgc2lkZW5hdiBhbmQgdGhlIHRvcCBvZiB0aGUgdmlld3BvcnQgd2hlbiB0aGUgc2lkZW5hdiBpcyBpbiBmaXhlZFxuICAgKiBtb2RlLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGZpeGVkVG9wR2FwKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9maXhlZFRvcEdhcDsgfVxuICBzZXQgZml4ZWRUb3BHYXAodmFsdWUpIHsgdGhpcy5fZml4ZWRUb3BHYXAgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgcHJpdmF0ZSBfZml4ZWRUb3BHYXAgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgZ2FwIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGUgc2lkZW5hdiBhbmQgdGhlIGJvdHRvbSBvZiB0aGUgdmlld3BvcnQgd2hlbiB0aGUgc2lkZW5hdiBpcyBpblxuICAgKiBmaXhlZCBtb2RlLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGZpeGVkQm90dG9tR2FwKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9maXhlZEJvdHRvbUdhcDsgfVxuICBzZXQgZml4ZWRCb3R0b21HYXAodmFsdWUpIHsgdGhpcy5fZml4ZWRCb3R0b21HYXAgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgcHJpdmF0ZSBfZml4ZWRCb3R0b21HYXAgPSAwO1xuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maXhlZEluVmlld3BvcnQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpeGVkVG9wR2FwOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpeGVkQm90dG9tR2FwOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVDbG9zZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYXV0b0ZvY3VzOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9vcGVuZWQ6IEJvb2xlYW5JbnB1dDtcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtc2lkZW5hdi1jb250YWluZXInLFxuICBleHBvcnRBczogJ21hdFNpZGVuYXZDb250YWluZXInLFxuICB0ZW1wbGF0ZVVybDogJ3NpZGVuYXYtY29udGFpbmVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZHJhd2VyLmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1kcmF3ZXItY29udGFpbmVyIG1hdC1zaWRlbmF2LWNvbnRhaW5lcicsXG4gICAgJ1tjbGFzcy5tYXQtZHJhd2VyLWNvbnRhaW5lci1leHBsaWNpdC1iYWNrZHJvcF0nOiAnX2JhY2tkcm9wT3ZlcnJpZGUnLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IE1BVF9EUkFXRVJfQ09OVEFJTkVSLFxuICAgIHVzZUV4aXN0aW5nOiBNYXRTaWRlbmF2Q29udGFpbmVyXG4gIH1dXG5cbn0pXG5leHBvcnQgY2xhc3MgTWF0U2lkZW5hdkNvbnRhaW5lciBleHRlbmRzIE1hdERyYXdlckNvbnRhaW5lciB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0U2lkZW5hdiwge1xuICAgIC8vIFdlIG5lZWQgdG8gdXNlIGBkZXNjZW5kYW50czogdHJ1ZWAsIGJlY2F1c2UgSXZ5IHdpbGwgbm8gbG9uZ2VyIG1hdGNoXG4gICAgLy8gaW5kaXJlY3QgZGVzY2VuZGFudHMgaWYgaXQncyBsZWZ0IGFzIGZhbHNlLlxuICAgIGRlc2NlbmRhbnRzOiB0cnVlXG4gIH0pXG4gIF9hbGxEcmF3ZXJzOiBRdWVyeUxpc3Q8TWF0U2lkZW5hdj47XG5cbiAgQENvbnRlbnRDaGlsZChNYXRTaWRlbmF2Q29udGVudCkgX2NvbnRlbnQ6IE1hdFNpZGVuYXZDb250ZW50O1xuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hdXRvc2l6ZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaGFzQmFja2Ryb3A6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==