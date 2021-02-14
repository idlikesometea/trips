import Map from "../components/Map/Map";
import { User } from "./Auth.model";
import { Trip } from "./Trips.model";

export interface Props {
    userLogged: boolean;
    user: User;
    location;
    history;
    match;
};

export const creatorState: CreatorState = {
    countryOptions: [],
    selectedCountries: [],
    map: { name: '', countries: [], createdAt: 0 },
    loadingMap: false,
    loadingTrips: false,
    trips: []
}

interface CreatorState {
    countryOptions: CountryOption[];
    selectedCountries: string[];
    map: Map;
    loadingMap: boolean;
    loadingTrips: boolean;
    trips: Trip[]
}

export interface Map {
    countries: string[];
    name: string;
    createdAt: number;
}


interface CountryOption {
    key: string;
    value: string;
    flag: string;
    text: string;
}