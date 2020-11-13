import React from 'react';
import { RouteProps } from 'react-router-dom';

import api from '../../../services/api';
import { Trip as ITrip, TripMock, GoogleDriveFile, FileMetadata} from '../../../models/Trips.model';
import Folders from './Folders';
import FolderFiles from './FolderFiles';
import TripInformation from './TripInformation';
import TripFiles from './TripFiles';

interface stateInterface {
    id: any;
    trip: ITrip;
    tripFiles: FileMetadata[];
    folders: GoogleDriveFile[];
    loading:boolean;
    folderFiles: GoogleDriveFile[];
    activeFolder:any;
}

const initialState:stateInterface = {
    id: null,
    trip: TripMock,
    tripFiles: [],
    folders: [],
    folderFiles: [],
    loading: false,
    activeFolder: null
};

class Trip extends React.Component<RouteProps> {
    state = {...initialState, id: this.props.match.params.id || null};

    async fetchTrip() {
        const response = await api.get(`trips/${this.state.id}`);

        if (response.data.folderId) {
            this.onFolderClick(response.data.folderId);
        }

        this.setState({
            trip: response.data, 
            tripFiles: response.data.files,
            activeFolder: response.data.folderId
        });
    }

    async fetchFolders() {
        const response = await api.get('folders/');

        this.setState({folders: response.data});
    }

    async fetchFile(fileId) {
        const response = await api.get(`file/${fileId}`);

        this.setState({tripFiles: [...this.state.tripFiles, response.data]});
    }

    onChangeHandle = ({name, value}) => this.setState({trip: {...this.state.trip, [name]:value}});

    onSaveClick = event => {
        event.preventDefault();
        this.setState({loading: true});
        api.post('trips/', {...this.state.trip})
            .then(response => {
                console.log(response.data);
            })
            .catch(err => console.log(err))
            .finally(() => this.setState({loading: false}));
    }

    onFolderClick = folderId => {
        this.setState({activeFolder: folderId, folderFiles: []});
        api.get(`folders/${folderId}`)
            .then(response => {
                this.setState({folderFiles: response.data});
                if (!response.data.length) {
                    this.setState({activeFolder: null});
                    console.log('no files!');
                }
            })
            .catch(err => {
                this.setState({activeFolder: null, folderFiles: []});
            });
    }

    onFileClick = (fileId, fetch) => {
        if (fetch) {
            this.fetchFile(fileId);
        } else {
            const tripFiles = this.state.tripFiles.filter(trip => trip.id !== fileId);
            this.setState({tripFiles: tripFiles});
        }
    }

    componentDidMount() {
        if (this.state.id) {
            this.fetchTrip();
        }

        this.fetchFolders();
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui header">
                    <h2>{ this.state.id ? this.state.trip.name : 'Create a new trip'}</h2>
                </div>

                <TripInformation
                    tripInfo={this.state.trip}
                    onChangeHandle={this.onChangeHandle}
                    onSaveClick={this.onSaveClick}
                    loading={this.state.loading}
                />

                <TripFiles
                    files={this.state.tripFiles}
                />

                <Folders
                    folders={this.state.folders}
                    activeFolder={this.state.activeFolder}
                    onFolderClick={this.onFolderClick}
                />

                { this.state.activeFolder
                    ? <FolderFiles 
                        files={this.state.folderFiles} 
                        tripFiles={this.state.tripFiles}
                        onFileClick={this.onFileClick}
                    />
                    : null
                }
            </div>
        )
    }
};

export default Trip;