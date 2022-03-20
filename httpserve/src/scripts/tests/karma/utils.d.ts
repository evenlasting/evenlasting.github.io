import { Prototypes } from "../../core";
import { Chart } from "../../core/specification";
export declare function closeStartMenuPanel(): void;
export declare function getChartCanvas(): SVGRectElement;
export declare function findElementsByClassID(chart: Chart, classID: string): Generator<Prototypes.ObjectItem, void, unknown>;
export declare function clickOnToolbarButton(buttonName: string): Promise<unknown>;
export declare function clickOnButtonByTitle(buttonName: string): Promise<unknown>;
export declare function getLinkTypePanel(): Element;
export declare const longTimeOut = 1000000;
export declare const mediumTimeOut = 100000;
export declare const shortTimeOut = 3000;
export declare const pathPrefix = "tests/unit/charts";
