import { Point } from "../../common";
import * as Dataset from "../../dataset";
import * as Graphics from "../../graphics";
import { ConstraintSolver } from "../../solver";
import * as Specification from "../../specification";
import { BoundingBox, Controls, DropZones, Handles, ObjectClassMetadata, SnappingGuides, TemplateParameters } from "../common";
import { ChartStateManager } from "../state";
import { EmphasizableMarkClass } from "./emphasis";
import { NestedChartElementAttributes, NestedChartElementProperties } from "./nested_chart.attrs";
export { NestedChartElementAttributes, NestedChartElementProperties };
export declare class NestedChartElementClass extends EmphasizableMarkClass<NestedChartElementProperties, NestedChartElementAttributes> {
    static classID: string;
    static type: string;
    static metadata: ObjectClassMetadata;
    static defaultProperties: Partial<NestedChartElementProperties>;
    static defaultMappingValues: Partial<NestedChartElementAttributes>;
    attributes: import("../object").AttributeDescriptions;
    attributeNames: string[];
    initializeState(): void;
    getAttributePanelWidgets(manager: Controls.WidgetManager): Controls.Widget[];
    buildConstraints(solver: ConstraintSolver): void;
    getFilterCondition(): any;
    getDataset(glyphIndex?: number): Dataset.Dataset;
    getGraphics(cs: Graphics.CoordinateSystem, offset: Point, glyphIndex: number, manager: ChartStateManager, empasized?: boolean): Graphics.Element;
    getDropZones(): DropZones.Description[];
    getHandles(): Handles.Description[];
    getBoundingBox(): BoundingBox.Description;
    getSnappingGuides(): SnappingGuides.Description[];
    static createDefault(...args: any[]): Specification.Object;
    getTemplateParameters(): TemplateParameters;
}