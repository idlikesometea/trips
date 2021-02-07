import { Trip } from "./Trips.model";

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
    zoom: 2
}

export interface mapStateProps {
    state: StateProps;
}

interface StateProps {
    loading: boolean;
    countries: string[];
    trips: Trip[];
    selectedTrip: Trip;
    errorMessage: string;
}

export const exampleCountries = ["BRA", "GRC", "JPN", "AUS", "TUR", "BGR", "ZAF", "CRI", "PRT", "VNM", "MAR", "NOR"];
