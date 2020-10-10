export default interface Trip {
    id?: number;
    name?: string;
    files: File[]
}

export interface File {
    id: string;
    fileExtension: string;
    webViewLink: string;
    location?: Coordinates;
    time: string;
}