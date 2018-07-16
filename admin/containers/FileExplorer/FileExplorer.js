import React, { Component } from "react";
import PropTypes from "prop-types";

import FileItem from "./FileItem";
import InfiniteScrollList from "../../components/InfiniteScrollList";
import GetMedia from "../../data-connectors/GetMedia";
import config from "../../../config";

class FileExplorer extends Component {
    static propTypes = {
        media: PropTypes.object,
        author: PropTypes.object,
        loading: PropTypes.bool,
        onPageClick: PropTypes.func,
        onSelect: PropTypes.func,
        fetchMore: PropTypes.func,
        count: PropTypes.number
    };

    static defaultProps = {
        media: {
            rows: []
        },
        onPageClick: () => {}
    };

    static contextTypes = {
        t: PropTypes.func
    };

    page = 1;

    state = {
        selected_id: 0
    };

    onMediaSelected = media => {
        const newState = {};
        if (media.id === this.state.selected_id) {
            newState.selected_id = 0;
        } else {
            newState.selected_id = media.id;
            this.props.onSelect(media.url);
        }
        this.setState(newState);
    };

    loadMore = async num => {
        await this.props.fetchMore({
            author_id: this.props.author.id,
            offset: (num - 1) * config.mediaPerPage,
            limit: config.mediaPerPage,
            merge: true
        });
        this.page = num;
        this.forceUpdate();
    };

    render() {
        const rows = this.props.media.rows.map(media => (
            <FileItem
                key={media.id}
                media={media}
                selected_id={this.state.selected_id}
                onMediaSelected={this.onMediaSelected}
            />
        ));
        return (
            <section className="module-xs">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="media-grid">
                            <InfiniteScrollList
                                data={rows}
                                count={this.props.count}
                                page={this.page}
                                loadMore={this.loadMore}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default GetMedia(FileExplorer);
