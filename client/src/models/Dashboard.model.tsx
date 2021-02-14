import { Auth } from "./Auth.model";

export interface Props {
    auth: Auth;
    dashboard: Dashboard;
    fetchGenerals;
    fetchMaps;
    fetchStats;
}

interface Dashboard {
    generals: Generals;
    maps: Map[];
    stats: Stats;
    loading: { generals: boolean, maps: boolean, stats: boolean };
    errorMessage: { generals: string, maps: string, stats: string };
}

interface Generals {

}

interface Map {
    id: string;
    name: string;
    createdAt: number;
}

interface Stats {
    maps: number;
    countries: number;
    photos: number;
    videos: number;
}

export interface MapsProps {
    maps: Map[];
    loading: boolean;
    errorMsg: string;
}

export interface StatsProps {
    stats: Stats;
    loading: boolean;
    errorMsg: string;
}