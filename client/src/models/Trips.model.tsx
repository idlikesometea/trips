export interface Trip {
    id?: any;
    name?: string;
    files?: File[];
    folderId?: string;
    startDate?: string;
    endDate?: string;
};

export interface FileMetadata {
    id: string;
    fileExtension?: string;
    webViewLink?: string;
    location?: any;
    time?: string;
    mimeType?: string;
};

export interface GoogleDriveFile {
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

export interface tripStateProps {
    state: StateProps;
}

interface StateProps {
    trips: Trip[];
    selectedTrip: Trip;
    loadingTrips: boolean;
    loadingTrip: boolean;
}

export interface TripState {
    id: any;
    mapId: any;
    trip: Trip;
    tripFiles: FileMetadata[];
    folders: GoogleDriveFile[];
    loading:boolean;
    folderFiles: GoogleDriveFile[];
    activeFolder:any;
    showError:boolean;
    errorMessage?:string;
}

export const tripInitialState:TripState = {
    id: null,
    mapId: null,
    trip: TripMock,
    tripFiles: [],
    folders: [],
    folderFiles: [],
    loading: false,
    activeFolder: null,
    showError: false
};
