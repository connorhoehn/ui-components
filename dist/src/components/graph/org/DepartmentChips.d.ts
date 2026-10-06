import type { GraphDepartment, GraphPerson } from './types';
export interface DepartmentChipsProps {
    departments: GraphDepartment[];
    people: GraphPerson[];
    activeDepartment: string | null;
    /** `name` is null when the active chip is toggled off. */
    onToggle: (name: string | null, memberIds: string[]) => void;
    className?: string;
}
export declare function DepartmentChips({ departments, people, activeDepartment, onToggle, className }: DepartmentChipsProps): import("react").JSX.Element;
//# sourceMappingURL=DepartmentChips.d.ts.map