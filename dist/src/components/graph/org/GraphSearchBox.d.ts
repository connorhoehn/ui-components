import type { GraphPerson } from './types';
export interface GraphSearchBoxProps {
    people: GraphPerson[];
    /** Single-person pick — select + focus + open detail. */
    onPickPerson: (id: string) => void;
    /** Skill pick — select everyone holding the skill. */
    onPickSkill: (skill: string, personIds: string[]) => void;
    placeholder?: string;
    className?: string;
}
export declare function GraphSearchBox({ people, onPickPerson, onPickSkill, placeholder, className, }: GraphSearchBoxProps): import("react").JSX.Element;
//# sourceMappingURL=GraphSearchBox.d.ts.map