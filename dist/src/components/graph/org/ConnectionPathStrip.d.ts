import { type PathHop } from './connectionPath';
export interface ConnectionPathStripProps {
    path: PathHop[];
    /** Select every person on the path so the graph shows the corridor. */
    onHighlightPath: (ids: string[]) => void;
}
export declare function ConnectionPathStrip({ path, onHighlightPath }: ConnectionPathStripProps): import("react").JSX.Element;
//# sourceMappingURL=ConnectionPathStrip.d.ts.map