"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelHeader = exports.CustomCollapsiblePanel = void 0;
var React = require("react");
var react_1 = require("react");
var react_2 = require("@fluentui/react");
var fluentui_customized_components_1 = require("./fluentui_customized_components");
//Needs to handle tab index in plot segment
exports.CustomCollapsiblePanel = function (_a) {
    var widgets = _a.widgets, header = _a.header, styles = _a.styles;
    var _b = __read(react_1.useState(false), 2), collapsed = _b[0], setCollapsed = _b[1];
    var renderAttributes = react_1.useMemo(function () {
        return !collapsed
            ? widgets.map(function (widget, idx) {
                if (Array.isArray(widget)) {
                    return widget.map(function (item, innerIdx) { return (React.createElement("div", { key: "inner-widget-" + innerIdx }, item)); });
                }
                return React.createElement("div", { key: "widget-" + idx }, widget);
            })
            : null;
    }, [widgets, collapsed]);
    var panelHeader = header !== null && header !== void 0 ? header : "";
    return (React.createElement("div", { key: "panel-" + panelHeader },
        React.createElement(exports.PanelHeader, { header: panelHeader, setCollapsed: setCollapsed, collapsed: collapsed, key: "panelHeader-" + panelHeader }),
        React.createElement("div", { style: styles, key: "panelWidgets-" + panelHeader }, renderAttributes)));
};
exports.PanelHeader = function (_a) {
    var header = _a.header, setCollapsed = _a.setCollapsed, collapsed = _a.collapsed;
    return (React.createElement("div", { onClick: function () { return setCollapsed(!collapsed); } },
        React.createElement(react_2.DefaultButton, { iconProps: {
                iconName: collapsed ? "ChevronRight" : "ChevronDown",
                styles: {
                    root: {
                        fontSize: "unset",
                        height: 12,
                    },
                },
            }, styles: fluentui_customized_components_1.PanelHeaderStyles, onClick: function () {
                setCollapsed(!collapsed);
            } }),
        React.createElement(react_2.Label, { styles: {
                root: {
                    display: "inline-block",
                    cursor: "pointer",
                },
            } }, header)));
};
//# sourceMappingURL=custom_collapsible_panel.js.map