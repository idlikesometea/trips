import React from 'react';
import { RouteProps } from 'react-router-dom';

import googleDrive from '../../../services/googleDrive';
import { authedApi } from '../../../services/api';
import { tripInitialState } from '../../../models/Trips.model';
import Folders from './Folders';
import FolderFiles from './FolderFiles';
import TripInformation from './TripInformation';
import TripFiles from './TripFiles';


class Trip extends React.Component<RouteProps> {
    state = {...tripInitialState, id: this.props.match.params.id || null};

    componentDidMount() {
        if (this.state.id) {
            this.fetchTrip();
            this.fetchFolders();
        }
    }

    async fetchTrip() {
        await authedApi.get(`creator/trip/${this.state.id}`)
            .then(({data}) => {
                if (data.folderId) {
                    this.onFolderClick(data.folderId);
                }
                this.setState({
                    mapId: data.mapId,
                    trip: data,
                    tripFiles: data.files,
                    activeFolder: data.folderId
                })
            })
            .catch(({response}) => console.error(response));
    }

    fetchFolders = () => {
        googleDrive.getFolders()
            .then(folders => this.setState({folders}))
            .catch(({message}) => this.showAlert(message))
    }

    fetchFile(fileId) {
        googleDrive.getFile(fileId)
            .then(file => this.setState({tripFiles: [...this.state.tripFiles, file]}))
            .catch(({message}) => this.showAlert(message))
    }

    onChangeHandle = ({name, value}) => this.setState({trip: {...this.state.trip, [name]:value}});

    onSaveClick = event => {
        event.preventDefault();
        this.setState({loading: true});
        authedApi.post('creator/trip/', {...this.state.trip})
            .then(() => {
                console.log(':::saving trip');
                setTimeout(() => this.props.history.push(`/creator/${this.state.mapId}`), 100);
            })
            .catch(({response}) => this.showAlert(response.data))
            .finally(() => this.setState({loading: false}));
    }

    onFolderClick = folderId => {
        if (this.state.activeFolder === folderId) return;
        this.setState({activeFolder: folderId, folderFiles: []});

        googleDrive.getFolderFiles(folderId)
            .then(folderFiles => this.setState({folderFiles}) )
            .catch(({message}) => {
                this.showAlert(message);
                this.setState({activeFolder: null, folderFiles: []});
            })
    }

    onFileClick = (fileId, fetch) => {
        console.log(fileId, fetch);
        if (fetch) {
            this.fetchFile(fileId);
        } else {
            const tripFiles = this.state.tripFiles.filter(trip => trip.id !== fileId);
            this.setState({tripFiles: tripFiles});
        }
    }

    showAlert(msg?) {
        this.setState({
            showError: true,
            errorMessage: msg || 'Sorry, there was an error'
        });

        setTimeout(() => this.hideAlert(), 3000);
    }

    hideAlert() {
        this.setState({
            showError: false,
            errorMessage: ''
        });
    }

    renderAlert() {
        return this.state.showError ? (
            <div className="ui warning message">
                <i className="close icon" onClick={() => this.hideAlert()}></i>
                <div className="header">
                    { this.state.errorMessage }
                </div>
            </div>
        ) : null;
    }

    render() {
        return (
            <div className="ui container">
                { this.renderAlert() }

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
                    onFetchFolders={this.fetchFolders}
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