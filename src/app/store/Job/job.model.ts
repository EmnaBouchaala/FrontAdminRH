export interface jobListModel {
    id: number;
    title: string;
    name: string;
    location: string;
    experience: string;
    position: any;
    type: any;
    type_color: any;
    posted_date: any;
    last_date: any;
    status: any;
    status_color: any;
}

export interface jobGridModel {
    id: any;
    image: string;
    title: string;
    year: string;
    company: string;
    location: any;
    price: any;
}


export interface jobApplyModel {
    id: any;
    title: string;
    company: string;
    type: string;
    date: string;
    status: any;
}
