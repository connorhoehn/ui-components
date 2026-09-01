export interface DirectoryUser {
    userId: string;
    displayName: string;
    email: string;
    color: string;
    avatar?: string;
}
export interface UserGroup {
    id: string;
    name: string;
    handle: string;
    memberIds: string[];
    color: string;
}
export declare const DEV_USERS: DirectoryUser[];
export declare const DEV_GROUPS: UserGroup[];
export declare function findUserByName(query: string): DirectoryUser[];
export declare function findGroupByHandle(query: string): UserGroup[];
//# sourceMappingURL=userDirectory.d.ts.map