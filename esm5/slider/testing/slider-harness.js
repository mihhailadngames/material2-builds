/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
/**
 * Harness for interacting with a standard mat-slider in tests.
 * @dynamic
 */
var MatSliderHarness = /** @class */ (function (_super) {
    tslib_1.__extends(MatSliderHarness, _super);
    function MatSliderHarness() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._textLabel = _this.locatorFor('.mat-slider-thumb-label-text');
        _this._wrapper = _this.locatorFor('.mat-slider-wrapper');
        return _this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a mat-slider with
     * specific attributes.
     * @param options Options for narrowing the search:
     *   - `selector` finds a slider whose host element matches the given selector.
     *   - `id` finds a slider with specific id.
     * @return a `HarnessPredicate` configured with the given options.
     */
    MatSliderHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatSliderHarness, options);
    };
    /** Gets the slider's id. */
    MatSliderHarness.prototype.getId = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var id;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, (_a.sent()).getAttribute('id')];
                    case 2:
                        id = _a.sent();
                        // In case no id has been specified, the "id" property always returns
                        // an empty string. To make this method more explicit, we return null.
                        return [2 /*return*/, id !== '' ? id : null];
                }
            });
        });
    };
    /** Gets the current display value of the slider. */
    MatSliderHarness.prototype.getDisplayValue = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._textLabel()];
                    case 1: return [2 /*return*/, (_a.sent()).text()];
                }
            });
        });
    };
    /** Gets the current percentage value of the slider. */
    MatSliderHarness.prototype.getPercentage = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._calculatePercentage;
                        return [4 /*yield*/, this.getValue()];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    /** Gets the current value of the slider. */
    MatSliderHarness.prototype.getValue = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = coerceNumberProperty;
                        return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, (_b.sent()).getAttribute('aria-valuenow')];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    /** Gets the maximum value of the slider. */
    MatSliderHarness.prototype.getMaxValue = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = coerceNumberProperty;
                        return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, (_b.sent()).getAttribute('aria-valuemax')];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    /** Gets the minimum value of the slider. */
    MatSliderHarness.prototype.getMinValue = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = coerceNumberProperty;
                        return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, (_b.sent()).getAttribute('aria-valuemin')];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    /** Whether the slider is disabled. */
    MatSliderHarness.prototype.isDisabled = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var disabled, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1:
                        disabled = (_b.sent()).getAttribute('aria-disabled');
                        _a = coerceBooleanProperty;
                        return [4 /*yield*/, disabled];
                    case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    /** Gets the orientation of the slider. */
    MatSliderHarness.prototype.getOrientation = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: 
                    // "aria-orientation" will always be set to either "horizontal" or "vertical".
                    return [2 /*return*/, (_a.sent()).getAttribute('aria-orientation')];
                }
            });
        });
    };
    /**
     * Sets the value of the slider by clicking on the slider track.
     *
     * Note that in rare cases the value cannot be set to the exact specified value. This
     * can happen if not every value of the slider maps to a single pixel that could be
     * clicked using mouse interaction. In such cases consider using the keyboard to
     * select the given value or expand the slider's size for a better user experience.
     */
    MatSliderHarness.prototype.setValue = function (value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, sliderEl, wrapperEl, orientation, percentage, _b, height, width, isVertical, relativeX, relativeY;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, Promise.all([this.host(), this._wrapper(), this.getOrientation()])];
                    case 1:
                        _a = tslib_1.__read.apply(void 0, [_c.sent(), 3]), sliderEl = _a[0], wrapperEl = _a[1], orientation = _a[2];
                        return [4 /*yield*/, this._calculatePercentage(value)];
                    case 2:
                        percentage = _c.sent();
                        return [4 /*yield*/, wrapperEl.getDimensions()];
                    case 3:
                        _b = _c.sent(), height = _b.height, width = _b.width;
                        isVertical = orientation === 'vertical';
                        return [4 /*yield*/, sliderEl.hasClass('mat-slider-invert-mouse-coords')];
                    case 4:
                        // In case the slider is inverted in LTR mode or not inverted in RTL mode,
                        // we need to invert the percentage so that the proper value is set.
                        if (_c.sent()) {
                            percentage = 1 - percentage;
                        }
                        relativeX = isVertical ? 0 : Math.round(width * percentage);
                        relativeY = isVertical ? Math.round(height * percentage) : 0;
                        return [4 /*yield*/, wrapperEl.click(relativeX, relativeY)];
                    case 5:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Focuses the slider and returns a void promise that indicates when the
     * action is complete.
     */
    MatSliderHarness.prototype.focus = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).focus()];
                }
            });
        });
    };
    /**
     * Blurs the slider and returns a void promise that indicates when the
     * action is complete.
     */
    MatSliderHarness.prototype.blur = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).blur()];
                }
            });
        });
    };
    /** Calculates the percentage of the given value. */
    MatSliderHarness.prototype._calculatePercentage = function (value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, min, max;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([this.getMinValue(), this.getMaxValue()])];
                    case 1:
                        _a = tslib_1.__read.apply(void 0, [_b.sent(), 2]), min = _a[0], max = _a[1];
                        return [2 /*return*/, (value - min) / (max - min)];
                }
            });
        });
    };
    MatSliderHarness.hostSelector = 'mat-slider';
    return MatSliderHarness;
}(ComponentHarness));
export { MatSliderHarness };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc2xpZGVyL3Rlc3Rpbmcvc2xpZGVyLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBR2xGOzs7R0FHRztBQUNIO0lBQXNDLDRDQUFnQjtJQUF0RDtRQUFBLHFFQWlIQztRQWxHUyxnQkFBVSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM3RCxjQUFRLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDOztJQWlHNUQsQ0FBQztJQTlHQzs7Ozs7OztPQU9HO0lBQ0kscUJBQUksR0FBWCxVQUFZLE9BQWtDO1FBQWxDLHdCQUFBLEVBQUEsWUFBa0M7UUFDNUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFLRCw0QkFBNEI7SUFDdEIsZ0NBQUssR0FBWDs7Ozs7NEJBQ29CLHFCQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQTs0QkFBeEIscUJBQU0sQ0FBQyxTQUFpQixDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBakQsRUFBRSxHQUFHLFNBQTRDO3dCQUN2RCxxRUFBcUU7d0JBQ3JFLHNFQUFzRTt3QkFDdEUsc0JBQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUM7Ozs7S0FDOUI7SUFFRCxvREFBb0Q7SUFDOUMsMENBQWUsR0FBckI7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QXNDLGdCQUFnQixHQWlIckQ7U0FqSFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50SGFybmVzcywgSGFybmVzc1ByZWRpY2F0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtTbGlkZXJIYXJuZXNzRmlsdGVyc30gZnJvbSAnLi9zbGlkZXItaGFybmVzcy1maWx0ZXJzJztcblxuLyoqXG4gKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgc3RhbmRhcmQgbWF0LXNsaWRlciBpbiB0ZXN0cy5cbiAqIEBkeW5hbWljXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXJIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnbWF0LXNsaWRlcic7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgbWF0LXNsaWRlciB3aXRoXG4gICAqIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIG5hcnJvd2luZyB0aGUgc2VhcmNoOlxuICAgKiAgIC0gYHNlbGVjdG9yYCBmaW5kcyBhIHNsaWRlciB3aG9zZSBob3N0IGVsZW1lbnQgbWF0Y2hlcyB0aGUgZ2l2ZW4gc2VsZWN0b3IuXG4gICAqICAgLSBgaWRgIGZpbmRzIGEgc2xpZGVyIHdpdGggc3BlY2lmaWMgaWQuXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGgob3B0aW9uczogU2xpZGVySGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8TWF0U2xpZGVySGFybmVzcz4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZShNYXRTbGlkZXJIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RleHRMYWJlbCA9IHRoaXMubG9jYXRvckZvcignLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtdGV4dCcpO1xuICBwcml2YXRlIF93cmFwcGVyID0gdGhpcy5sb2NhdG9yRm9yKCcubWF0LXNsaWRlci13cmFwcGVyJyk7XG5cbiAgLyoqIEdldHMgdGhlIHNsaWRlcidzIGlkLiAqL1xuICBhc3luYyBnZXRJZCgpOiBQcm9taXNlPHN0cmluZ3xudWxsPiB7XG4gICAgY29uc3QgaWQgPSBhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAvLyBJbiBjYXNlIG5vIGlkIGhhcyBiZWVuIHNwZWNpZmllZCwgdGhlIFwiaWRcIiBwcm9wZXJ0eSBhbHdheXMgcmV0dXJuc1xuICAgIC8vIGFuIGVtcHR5IHN0cmluZy4gVG8gbWFrZSB0aGlzIG1ldGhvZCBtb3JlIGV4cGxpY2l0LCB3ZSByZXR1cm4gbnVsbC5cbiAgICByZXR1cm4gaWQgIT09ICcnID8gaWQgOiBudWxsO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGN1cnJlbnQgZGlzcGxheSB2YWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXREaXNwbGF5VmFsdWUoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX3RleHRMYWJlbCgpKS50ZXh0KCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgY3VycmVudCBwZXJjZW50YWdlIHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldFBlcmNlbnRhZ2UoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY2FsY3VsYXRlUGVyY2VudGFnZShhd2FpdCB0aGlzLmdldFZhbHVlKCkpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIHNsaWRlci4gKi9cbiAgYXN5bmMgZ2V0VmFsdWUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gY29lcmNlTnVtYmVyUHJvcGVydHkoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnKSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbWF4aW11bSB2YWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRNYXhWYWx1ZSgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiBjb2VyY2VOdW1iZXJQcm9wZXJ0eShhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW1heCcpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBtaW5pbXVtIHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldE1pblZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbWluJykpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlciBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJyk7XG4gICAgcmV0dXJuIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShhd2FpdCBkaXNhYmxlZCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgb3JpZW50YXRpb24gb2YgdGhlIHNsaWRlci4gKi9cbiAgYXN5bmMgZ2V0T3JpZW50YXRpb24oKTogUHJvbWlzZTwnaG9yaXpvbnRhbCd8J3ZlcnRpY2FsJz4ge1xuICAgIC8vIFwiYXJpYS1vcmllbnRhdGlvblwiIHdpbGwgYWx3YXlzIGJlIHNldCB0byBlaXRoZXIgXCJob3Jpem9udGFsXCIgb3IgXCJ2ZXJ0aWNhbFwiLlxuICAgIHJldHVybiAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldEF0dHJpYnV0ZSgnYXJpYS1vcmllbnRhdGlvbicpIGFzIGFueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgc2xpZGVyIGJ5IGNsaWNraW5nIG9uIHRoZSBzbGlkZXIgdHJhY2suXG4gICAqXG4gICAqIE5vdGUgdGhhdCBpbiByYXJlIGNhc2VzIHRoZSB2YWx1ZSBjYW5ub3QgYmUgc2V0IHRvIHRoZSBleGFjdCBzcGVjaWZpZWQgdmFsdWUuIFRoaXNcbiAgICogY2FuIGhhcHBlbiBpZiBub3QgZXZlcnkgdmFsdWUgb2YgdGhlIHNsaWRlciBtYXBzIHRvIGEgc2luZ2xlIHBpeGVsIHRoYXQgY291bGQgYmVcbiAgICogY2xpY2tlZCB1c2luZyBtb3VzZSBpbnRlcmFjdGlvbi4gSW4gc3VjaCBjYXNlcyBjb25zaWRlciB1c2luZyB0aGUga2V5Ym9hcmQgdG9cbiAgICogc2VsZWN0IHRoZSBnaXZlbiB2YWx1ZSBvciBleHBhbmQgdGhlIHNsaWRlcidzIHNpemUgZm9yIGEgYmV0dGVyIHVzZXIgZXhwZXJpZW5jZS5cbiAgICovXG4gIGFzeW5jIHNldFZhbHVlKHZhbHVlOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBbc2xpZGVyRWwsIHdyYXBwZXJFbCwgb3JpZW50YXRpb25dID1cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW3RoaXMuaG9zdCgpLCB0aGlzLl93cmFwcGVyKCksIHRoaXMuZ2V0T3JpZW50YXRpb24oKV0pO1xuICAgIGxldCBwZXJjZW50YWdlID0gYXdhaXQgdGhpcy5fY2FsY3VsYXRlUGVyY2VudGFnZSh2YWx1ZSk7XG4gICAgY29uc3Qge2hlaWdodCwgd2lkdGh9ID0gYXdhaXQgd3JhcHBlckVsLmdldERpbWVuc2lvbnMoKTtcbiAgICBjb25zdCBpc1ZlcnRpY2FsID0gb3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCc7XG5cbiAgICAvLyBJbiBjYXNlIHRoZSBzbGlkZXIgaXMgaW52ZXJ0ZWQgaW4gTFRSIG1vZGUgb3Igbm90IGludmVydGVkIGluIFJUTCBtb2RlLFxuICAgIC8vIHdlIG5lZWQgdG8gaW52ZXJ0IHRoZSBwZXJjZW50YWdlIHNvIHRoYXQgdGhlIHByb3BlciB2YWx1ZSBpcyBzZXQuXG4gICAgaWYgKGF3YWl0IHNsaWRlckVsLmhhc0NsYXNzKCdtYXQtc2xpZGVyLWludmVydC1tb3VzZS1jb29yZHMnKSkge1xuICAgICAgcGVyY2VudGFnZSA9IDEgLSBwZXJjZW50YWdlO1xuICAgIH1cblxuICAgIC8vIFdlIG5lZWQgdG8gcm91bmQgdGhlIG5ldyBjb29yZGluYXRlcyBiZWNhdXNlIGNyZWF0aW5nIGZha2UgRE9NXG4gICAgLy8gZXZlbnRzIHdpbGwgY2F1c2UgdGhlIGNvb3JkaW5hdGVzIHRvIGJlIHJvdW5kZWQgZG93bi5cbiAgICBjb25zdCByZWxhdGl2ZVggPSBpc1ZlcnRpY2FsID8gMCA6IE1hdGgucm91bmQod2lkdGggKiBwZXJjZW50YWdlKTtcbiAgICBjb25zdCByZWxhdGl2ZVkgPSBpc1ZlcnRpY2FsID8gTWF0aC5yb3VuZChoZWlnaHQgKiBwZXJjZW50YWdlKSA6IDA7XG5cbiAgICBhd2FpdCB3cmFwcGVyRWwuY2xpY2socmVsYXRpdmVYLCByZWxhdGl2ZVkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgdGhlIHNsaWRlciBhbmQgcmV0dXJucyBhIHZvaWQgcHJvbWlzZSB0aGF0IGluZGljYXRlcyB3aGVuIHRoZVxuICAgKiBhY3Rpb24gaXMgY29tcGxldGUuXG4gICAqL1xuICBhc3luYyBmb2N1cygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJsdXJzIHRoZSBzbGlkZXIgYW5kIHJldHVybnMgYSB2b2lkIHByb21pc2UgdGhhdCBpbmRpY2F0ZXMgd2hlbiB0aGVcbiAgICogYWN0aW9uIGlzIGNvbXBsZXRlLlxuICAgKi9cbiAgYXN5bmMgYmx1cigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5ibHVyKCk7XG4gIH1cblxuICAvKiogQ2FsY3VsYXRlcyB0aGUgcGVyY2VudGFnZSBvZiB0aGUgZ2l2ZW4gdmFsdWUuICovXG4gIHByaXZhdGUgYXN5bmMgX2NhbGN1bGF0ZVBlcmNlbnRhZ2UodmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IFttaW4sIG1heF0gPSBhd2FpdCBQcm9taXNlLmFsbChbdGhpcy5nZXRNaW5WYWx1ZSgpLCB0aGlzLmdldE1heFZhbHVlKCldKTtcbiAgICByZXR1cm4gKHZhbHVlIC0gbWluKSAvIChtYXggLSBtaW4pO1xuICB9XG59XG4iXX0=