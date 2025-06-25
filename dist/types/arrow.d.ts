import type { CustomSvg, Topic } from './types/dom';
import type { MindElixirInstance, Uid } from './index';
export interface Arrow {
    id: string;
    /**
     * label of arrow
     */
    label: string;
    /**
     * id of start node
     */
    from: Uid;
    /**
     * id of end node
     */
    to: Uid;
    /**
     *  offset of control point from start point
     */
    delta1: {
        x: number;
        y: number;
    };
    /**
     * offset of control point from end point
     */
    delta2: {
        x: number;
        y: number;
    };
    /**
     * whether the arrow is bidirectional
     */
    bidirectional?: boolean;
}
export type DivData = {
    cx: number;
    cy: number;
    w: number;
    h: number;
    ctrlX: number;
    ctrlY: number;
};
export type ArrowOptions = {
    bidirectional?: boolean;
};
export declare const createArrow: (this: MindElixirInstance, from: Topic, to: Topic, options?: ArrowOptions) => void;
export declare const removeArrow: (this: MindElixirInstance, linkSvg?: CustomSvg) => void;
export declare const selectArrow: (this: MindElixirInstance, link: CustomSvg) => void;
export declare const unselectArrow: (this: MindElixirInstance) => void;
export declare function renderArrow(this: MindElixirInstance): void;
export declare function editArrowLabel(this: MindElixirInstance, el: CustomSvg): void;
export declare function tidyArrow(this: MindElixirInstance): void;
