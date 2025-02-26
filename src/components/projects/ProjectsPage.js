// @flow
import * as React from 'react';

import type { Repository } from '../commons/repository/repository';
import getRepositories from '../../lib/github';
import RepositoryGrid from '../commons/repository/RepositoryGrid';

import './ProjectsPage.css';

type AppState = {
    repositoryList: Repository[],
    cursor: string | null,
};

function updateListState(data: Repository[], cursor) {
    return (state: AppState) => ({
        repositoryList: [...state.repositoryList, ...data],
        cursor,
    });
}

export default class ProjectsPage extends React.Component<void, AppState> {
    state = {
        repositoryList: [],
        cursor: null,
    };

    componentDidMount() {
        this.updateRepositoryList();
    }

    updateRepositoryList = () => {
        const { cursor } = this.state;
        getRepositories(cursor).then(({ repos, lastCursor }) => {
            this.setState(updateListState(repos, lastCursor));
        });
    };

    render() {
        const { repositoryList } = this.state;
        return (
            <div>
                <RepositoryGrid repositories={repositoryList} />
                <div className="footer">
                    <button
                        type="button"
                        className="show-more-btn"
                        onClick={this.updateRepositoryList}>
                        <h2 className="show-more-btn-text">Ver mais</h2>
                    </button>
                </div>
            </div>
        );
    }
}
