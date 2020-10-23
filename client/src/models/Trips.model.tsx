export interface Trip {
    id?: any;
    name?: string;
    files: File[];
    folderId?: string;
    startDate?: string;
    endDate?: string;
};

export interface File {
    id: string;
    fileExtension: string;
    webViewLink: string;
    location?: Coordinates;
    time?: string;
    mimeType?: string;
};

export interface Folder {
    kind: string;
    id: string;
    name: string;
    mimeType: string;
};

export const TripMock:Trip = {
    id: null,
    name: '',
    folderId: '',
    files: [],
    startDate: '2020-01-01',
    endDate: '2020-01-01'
};