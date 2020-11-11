import React from 'react';
import { RouteProps } from 'react-router-dom';

import api from '../../../services/api';
import { Trip as ITrip, TripMock, Folder } from '../../../models/Trips.model';
import Folders from './Folders';
import Files from './Files';
import TripInformation from './TripInformation';

interface stateInterface {
    id: any;
    trip: ITrip;
    tripFiles: File[];
    folders: Folder[];
    loading:boolean;
    folderFiles: any;
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

        this.setState({trip: response.data});
    }

    async fetchFolders() {
        const response = await api.get('folders/');

        this.setState({folders: response.data});
    }

    async fetchFile(fileId) {
        const response = await api.get(`file/${fileId}`);

        console.log(response.data);
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

    onFileClick = (fileId) => {
        this.fetchFile(fileId);
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

                <div className="ui segment">
                    Trip Files
                </div>

                <Folders
                    folders={this.state.folders}
                    activeFolder={this.state.activeFolder}
                    onFolderClick={this.onFolderClick}
                />

                { this.state.activeFolder
                    ? <Files 
                        files={this.state.folderFiles} 
                        onFileClick={this.onFileClick}
                    />
                    : null
                }
            </div>
        )
    }
};

export default Trip;