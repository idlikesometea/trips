export interface Viewport {
    width: any;
    height: any;
    latitude: number;
    longitude: number;
    zoom: number;
    minZoom?: number; 
    maxZoom?: number; 
}

export const InitialViewPort: Viewport = {
    width: '100%',
    height: '100vh',
    latitude: 20,
    longitude: -15,
    zoom: 1
}
