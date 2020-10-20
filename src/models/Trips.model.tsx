export interface Trip {
    id?: any;
    name?: string;
    files: File[];
    startDate?: string;
    endDate?: string;
};

export interface File {
    id: string;
    fileExtension: string;
    webViewLink: string;
    location?: Coordinates;
    time: string;
};

export const TripMock:Trip = {
    id: null,
    name: '',
    files: [],
    startDate: '2010-01-01',
    endDate: ''
};