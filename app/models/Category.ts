export class Category {
    id: number;
    name: string;
    ordering: number;
    is_enabled: boolean;
    children: Category[];
    parent: Category;
}