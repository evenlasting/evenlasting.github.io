"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelRadioControl = void 0;
var React = require("react");
var utils_1 = require("../../utils");
var react_1 = require("@fluentui/react");
var PanelRadioControl = /** @class */ (function (_super) {
    __extends(PanelRadioControl, _super);
    function PanelRadioControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelRadioControl.prototype.render = function () {
        var _this = this;
        var mainClass = this.props.asList
            ? "charticulator-panel-list-view"
            : "charticulator-panel-list-view is-inline";
        return (React.createElement("span", { className: mainClass }, this.props.options.map(function (option, index) {
            return (React.createElement(react_1.DefaultButton, { className: utils_1.classNames("el-item", [
                    "is-active",
                    _this.props.value == option,
                ]), title: _this.props.labels[index], key: option, onClick: function () {
                    if (_this.props) {
                        _this.props.onChange(option);
                    }
                }, iconProps: _this.props.icons
                    ? {
                        iconName: _this.props.icons[index],
                    }
                    : null, text: _this.props.labels && _this.props.showText
                    ? _this.props.labels[index]
                    : null }));
        })));
    };
    return PanelRadioControl;
}(React.Component));
exports.PanelRadioControl = PanelRadioControl;
//# sourceMappingURL=radio_control.js.map