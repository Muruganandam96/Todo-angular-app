export interface ProjectDetails {
    projectName: string;
    status: string;
    id: string;
    isEdit: boolean;
    isActive: boolean;
}


export interface ProjectDetailCateogory {
    categoryName: string;
    tasks: [
        {
            status: string;
            taskName: string;
        }
    ];
    id: string;
}
