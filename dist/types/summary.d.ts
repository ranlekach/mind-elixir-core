import type { MindElixirInstance } from '.';
/**
 * @public
 */
export interface Summary {
    id: string;
    text: string;
    /**
     * parent node id of the summary
     */
    parent: string;
    /**
     * start index of the summary
     */
    start: number;
    /**
     * end index of the summary
     */
    end: number;
}
export type SummarySvgGroup = SVGGElement & {
    children: [SVGPathElement, SVGTextElement];
    summaryObj: Summary;
};
export declare const createSummary: (this: MindElixirInstance) => void;
export declare const createSummaryFrom: (this: MindElixirInstance, summary: Omit<Summary, "id">) => void;
export declare const removeSummary: (this: MindElixirInstance, id: string) => void;
export declare const selectSummary: (this: MindElixirInstance, el: SummarySvgGroup) => void;
export declare const unselectSummary: (this: MindElixirInstance) => void;
export declare const renderSummary: (this: MindElixirInstance) => void;
export declare const editSummary: (this: MindElixirInstance, el: SummarySvgGroup) => void;
