import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
    ArticleCreate,
    PostPublish,
    PostActions,
    PostActionDrawer
} from "../../components/Post";
import CreatePost from "../../data-connectors/CreatePost";
import FileExplorerModal from "../../components/Modals/FileExplorerModal";
import MdPreview from "../../components/Post/MdPreview";
import SyncScroll from "../Hoc/SyncScroll";

export class Create extends Component {
    static propTypes = {
        history: PropTypes.object,
        createPost: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
        manageScroll: PropTypes.func
    };

    state = {
        loading: true,
        post: {},
        fileExplorerProps: {},
        actionDrawerOpen: false
    };

    componentDidMount() {
        const { type } = this.props;
        // we need this only to listen mardown/richtext changes
        window.addEventListener("onPostChange", this.handlePostChanges);

        // This is going to hold all the changes done to the post.
        PostActions.data = {};
        // Add a default title to the newly created post
        const title = "Draft - " + moment().format("L LT");

        // create an empty post with the type and title
        this.props.createPost({ type, title }).then(result => {
            PostActions.setData(result.data.createPost.post);
            this.setState({
                loading: false,
                post: result.data.createPost.post,
                preview: ""
            });
        });

        document.body.classList.add("create-" + this.props.type + "-page");
    }

    componentWillUnmount() {
        document.body.classList.remove("create-" + this.props.type + "-page");
        window.removeEventListener("onPostChange", this.handlePostChanges);
    }

    handlePostChanges = e => {
        if (PostActions.data.mode == "markdown") {
            this.props.manageScroll();
            if ("mdPreview" in e.detail) {
                this.setState({ preview: e.detail.mdPreview });
            }
        } else {
            this.setState({ preview: "" });
        }
    };

    toggleActionDrawer = e => {
        e.preventDefault();
        this.setState({ actionDrawerOpen: !this.state.actionDrawerOpen });
    };

    toggleFileExplorerModal = props => {
        this.setState({
            fileExplorerProps: props
        });
    };

    toggleZenView = e => {
        e.preventDefault();
        document.body.classList.toggle("distract-free");
    };

    render() {
        if (this.state.loading) {
            return <div />;
        }
        return (
            <section className="module-xs create-post">
                <div className="row">
                    <Link
                        to="#"
                        className="toggle-zenview"
                        onClick={this.toggleZenView}
                    >
                        <i className="fa fa-eye" />
                    </Link>
                    <div className="col-lg-12 distractor">
                        <PostPublish
                            create
                            history={this.props.history}
                            post={this.state.post}
                            toggleActionDrawer={this.toggleActionDrawer}
                        />
                    </div>
                    <div className="col-lg-6 column article-holder">
                        <ArticleCreate post={this.state.post} />
                    </div>
                    <div className="col-lg-6 column preview distractor">
                        <MdPreview
                            post={PostActions.data}
                            preview={this.state.preview}
                        />
                    </div>
                </div>
                <PostActionDrawer
                    post={this.state.post}
                    isOpen={this.state.actionDrawerOpen}
                    toggleActionDrawer={this.toggleActionDrawer}
                    toggleFileExplorerModal={this.toggleFileExplorerModal}
                />
                {this.state.fileExplorerProps.display && (
                    <FileExplorerModal {...this.state.fileExplorerProps} />
                )}
                {this.state.actionDrawerOpen && (
                    <div
                        id="modal-backdrop"
                        onClick={this.toggleActionDrawer}
                    />
                )}
            </section>
        );
    }
}

export default CreatePost(SyncScroll(Create));
