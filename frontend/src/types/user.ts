export interface User {
    UserId: string;
    Name: string;
    IsActive: boolean;
    Economy: UserEconomy;
}

export interface UserEconomy {
    Resources: Record<string, number>;
    UnlockedFlows: string[];
}