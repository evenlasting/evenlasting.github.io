"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputImageProperty = exports.ImageUploader = exports.ImageChooser = exports.InputImage = void 0;
var React = require("react");
var R = require("../../../../resources");
var globals = require("../../../../globals");
var context_component_1 = require("../../../../context_component");
var popup_controller_1 = require("../../../../controllers/popup_controller");
var utils_1 = require("../../../../utils");
var strings_1 = require("../../../../../strings");
var react_1 = require("@fluentui/react");
var fluentui_customized_components_1 = require("./fluentui_customized_components");
var styles_1 = require("./styles");
var InputImage = /** @class */ (function (_super) {
    __extends(InputImage, _super);
    function InputImage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { dragOver: false };
        _this.startChooseImage = function () {
            globals.popupController.popupAt(function (context) {
                return (React.createElement(popup_controller_1.PopupView, { context: context },
                    React.createElement(ImageChooser, { value: _this.props.value, onChoose: function (image) {
                            context.close();
                            if (_this.props.onChange) {
                                _this.props.onChange(image);
                            }
                        } })));
            }, { anchor: _this.element });
        };
        _this.handleDragEnter = function () {
            _this.setState({ dragOver: true });
        };
        _this.handleDragLeave = function () {
            _this.setState({ dragOver: false });
        };
        _this.handleDragOver = function (e) {
            e.preventDefault();
        };
        _this.handleDrop = function (e) {
            e.preventDefault();
            _this.setState({ dragOver: false });
            if (e.dataTransfer.types.indexOf("text/uri-list") >= 0) {
                var uriList = e.dataTransfer.getData("text/uri-list");
                var uris = uriList
                    .replace(/\r/g, "")
                    .split("\n")
                    .map(function (x) { return x.trim(); })
                    .filter(function (x) { return !x.startsWith("#"); });
                ImageUploader.ParseURIs(uris)
                    .then(function (r) {
                    _this.emitOnChange(r);
                })
                    .catch(function () { });
            }
            if (e.dataTransfer.files.length > 0) {
                ImageUploader.ParseFiles(e.dataTransfer.files).then(function (r) {
                    _this.emitOnChange(r);
                });
            }
        };
        return _this;
    }
    InputImage.prototype.resolveImage = function (value) {
        return value;
    };
    InputImage.prototype.emitOnChange = function (images) {
        if (images.length == 1) {
            this.props.onChange({
                src: images[0].dataURL,
                width: images[0].width,
                height: images[0].height,
            });
        }
    };
    InputImage.prototype.render = function () {
        var _this = this;
        var isNone = this.props.value == null;
        var image = isNone ? null : this.resolveImage(this.props.value);
        var imageDisplayURL = image ? image.src : null;
        if (imageDisplayURL) {
            if (imageDisplayURL.startsWith("data:")) {
                imageDisplayURL = "(data url)";
            }
        }
        return (React.createElement("span", { className: utils_1.classNames("charticulator__widget-control-input-image", ["is-none", isNone], ["is-drag-over", this.state.dragOver]), ref: function (e) { return (_this.element = e); }, onDragEnter: this.handleDragEnter, onDragLeave: this.handleDragLeave, onDragOver: this.handleDragOver, onDrop: this.handleDrop, onClick: this.startChooseImage }, this.state.dragOver ? (React.createElement("div", { style: { width: "100%" } },
            this.props.label ? (React.createElement(react_1.Label, { styles: fluentui_customized_components_1.defaultLabelStyle, style: { padding: 0 } }, this.props.label)) : null,
            React.createElement("span", { className: "el-drag-over-attrubutes" }, strings_1.strings.objects.image.dropImage))) : (React.createElement("div", { style: { width: "100%" } },
            this.props.label ? (React.createElement(react_1.Label, { styles: fluentui_customized_components_1.defaultLabelStyle, style: { padding: 0 } }, this.props.label)) : null,
            React.createElement(fluentui_customized_components_1.FluentActionButton, { style: { width: "100%", height: fluentui_customized_components_1.defultBindButtonSize.height } },
                React.createElement(react_1.ActionButton, { styles: {
                        root: {
                            height: fluentui_customized_components_1.defultBindButtonSize.height,
                        },
                    }, text: isNone ? strings_1.strings.core.none : imageDisplayURL, iconProps: {
                        imageProps: {
                            src: isNone ? R.getSVGIcon("FileImage") : image.src,
                            style: {
                                height: "16px",
                                width: "16px",
                            },
                        },
                    } }))))));
    };
    return InputImage;
}(context_component_1.ContextedComponent));
exports.InputImage = InputImage;
var ImageChooser = /** @class */ (function (_super) {
    __extends(ImageChooser, _super);
    function ImageChooser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageChooser.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "charticulator__image-chooser" },
            React.createElement(ImageUploader, { focusOnMount: true, onUpload: function (images) {
                    if (images.length == 1) {
                        _this.props.onChoose({
                            src: images[0].dataURL,
                            width: images[0].width,
                            height: images[0].height,
                        });
                    }
                } })));
    };
    return ImageChooser;
}(context_component_1.ContextedComponent));
exports.ImageChooser = ImageChooser;
var ImageUploader = /** @class */ (function (_super) {
    __extends(ImageUploader, _super);
    function ImageUploader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { dragOver: false };
        _this.handleDragEnter = function () {
            _this.setState({ dragOver: true });
        };
        _this.handleDragLeave = function () {
            _this.setState({ dragOver: false });
        };
        _this.handleDragOver = function (e) {
            e.preventDefault();
        };
        _this.handleDrop = function (e) {
            e.preventDefault();
            _this.setState({ dragOver: false });
            if (e.dataTransfer.types.indexOf("text/uri-list") >= 0) {
                var uriList = e.dataTransfer.getData("text/uri-list");
                var uris = uriList
                    .replace(/\r/g, "")
                    .split("\n")
                    .map(function (x) { return x.trim(); })
                    .filter(function (x) { return !x.startsWith("#"); });
                ImageUploader.ParseURIs(uris)
                    .then(function (r) {
                    _this.emitOnUpload(r);
                })
                    .catch(function (e) {
                    _this.showError(e);
                });
            }
            if (e.dataTransfer.files.length > 0) {
                ImageUploader.ParseFiles(e.dataTransfer.files).then(function (r) {
                    _this.emitOnUpload(r);
                });
            }
        };
        _this.handlePaste = function (e) {
            if (e.clipboardData.files.length > 0) {
                e.preventDefault();
                ImageUploader.ParseFiles(e.clipboardData.files)
                    .then(function (r) {
                    _this.emitOnUpload(r);
                })
                    .catch(function (e) {
                    _this.showError(e);
                });
            }
        };
        _this.handleOpenFile = function () {
            var inputFile = document.createElement("input");
            inputFile.setAttribute("type", "file");
            inputFile.onchange = function () {
                if (inputFile.files.length > 0) {
                    ImageUploader.ParseFiles(inputFile.files).then(function (r) {
                        _this.emitOnUpload(r);
                    });
                }
            };
            inputFile.click();
        };
        _this.handleClearFile = function () {
            if (_this.props.onClear) {
                _this.props.onClear();
            }
        };
        return _this;
    }
    ImageUploader.ReadFileAsImage = function (name, file) {
        return new Promise(function (resolve) {
            var reader = new FileReader();
            reader.onload = function () {
                var img = new Image();
                img.onload = function () {
                    resolve({
                        name: name,
                        width: img.width,
                        height: img.height,
                        dataURL: reader.result,
                    });
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        });
    };
    ImageUploader.ParseFiles = function (files) {
        var _this = this;
        var result = [];
        var readFile = function (file) {
            result.push(_this.ReadFileAsImage(file.name, file));
        };
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            readFile(file);
        }
        return Promise.all(result);
    };
    ImageUploader.ParseURIs = function (uris) {
        var _this = this;
        return Promise.all(uris.map(function (uri) {
            return fetch(uri)
                .then(function (result) { return result.blob(); })
                .then(function (blob) {
                return new Promise(function (resolve, reject) {
                    if (!blob.type.startsWith("image/")) {
                        reject(new Error("not an image"));
                    }
                    else {
                        // TODO check changes
                        resolve(_this.ReadFileAsImage("blob", blob));
                    }
                });
            });
        }));
    };
    ImageUploader.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "charticulator__image-uploader", ref: function (e) { return (_this.refContainer = e); }, onDragEnter: this.handleDragEnter, onDragLeave: this.handleDragLeave, onDragOver: this.handleDragOver, onDrop: this.handleDrop, style: {
                marginRight: 5,
            } }, this.state.dragOver ? (React.createElement(styles_1.ImageMappingDragStateWrapper, null, strings_1.strings.objects.image.dropImage)) : (React.createElement("span", { style: {
                width: "100%",
                display: "flex",
            } },
            React.createElement(react_1.TooltipHost, { content: this.props.placeholder ||
                    strings_1.strings.objects.image.defaultPlaceholder, styles: styles_1.ToolTipHostStyles },
                React.createElement(react_1.TextField, { value: this.props.placeholder ||
                        strings_1.strings.objects.image.defaultPlaceholder, disabled: true, styles: styles_1.ImageMappingTextFieldStyles })),
            React.createElement(fluentui_customized_components_1.FluentButton, { marginTop: "0px" },
                React.createElement(react_1.DefaultButton, { styles: {
                        root: __assign({ minWidth: "unset" }, fluentui_customized_components_1.defultBindButtonSize),
                    }, iconProps: {
                        iconName: "OpenFolderHorizontal",
                    }, onClick: this.handleOpenFile }))))));
    };
    // eslint-disable-next-line
    ImageUploader.prototype.showError = function (error) {
        // FIXME: ignore error for now
    };
    ImageUploader.prototype.emitOnUpload = function (result) {
        if (this.props.onUpload) {
            this.props.onUpload(result);
        }
    };
    return ImageUploader;
}(React.Component));
exports.ImageUploader = ImageUploader;
var InputImageProperty = /** @class */ (function (_super) {
    __extends(InputImageProperty, _super);
    function InputImageProperty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputImageProperty.prototype.render = function () {
        var _this = this;
        var isNone = this.props.value == null;
        var image = isNone ? null : this.resolveImage(this.props.value);
        var imageDisplayURL = image ? image.name : null;
        if (imageDisplayURL) {
            if (imageDisplayURL.startsWith("data:")) {
                imageDisplayURL = "(data url)";
            }
        }
        return (React.createElement("span", { className: utils_1.classNames("charticulator__widget-control-input-image", ["is-none", isNone], ["is-drag-over", this.state.dragOver]), ref: function (e) { return (_this.element = e); }, onDragEnter: this.handleDragEnter, onDragLeave: this.handleDragLeave, onDragOver: this.handleDragOver, onDrop: this.handleDrop, style: {
                marginRight: 5,
                marginLeft: 5,
            } }, this.state.dragOver ? (React.createElement(styles_1.ImageMappingDragStateWrapper, null, strings_1.strings.objects.image.dropImage)) : ([
            React.createElement(react_1.Image, { key: "image", src: isNone ? R.getSVGIcon("FileImage") : image.src, width: 24, height: 24 }),
            React.createElement(ImageUploader, { key: 0, placeholder: isNone ? strings_1.strings.core.none : imageDisplayURL, focusOnMount: true, onUpload: function (images) {
                    if (images.length == 1) {
                        if (_this.props.onChange) {
                            _this.props.onChange({
                                src: images[0].dataURL,
                                width: images[0].width,
                                height: images[0].height,
                                name: images[0].name,
                            });
                        }
                    }
                } }),
        ])));
    };
    return InputImageProperty;
}(InputImage));
exports.InputImageProperty = InputImageProperty;
//# sourceMappingURL=fluentui_image_2.js.map