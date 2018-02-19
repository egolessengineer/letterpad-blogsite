import React, { Component } from "react";
import { notify } from "react-notify-toast";
import PostActions from "./PostActions";
import { gql, graphql } from "react-apollo";
import moment from "moment";
import config from "../../../config";
import { UPDATE_POST_QUERY } from "../../../shared/queries/Mutations";

const actions = {
    publish: "Published",
    draft: "Save Draft"
};
class PostPublish extends Component {
    constructor(props) {
        super(props);
        this.changePostStatus = this.changePostStatus.bind(this);
        this.changeSlug = this.changeSlug.bind(this);
        this.state = {
            post: this.props.post,
            published: 0
        };
    }
    componentWillReceiveProps(nextProps) {
        const status = nextProps.post.status == "publish" ? 1 : 0;
        this.setState({ published: status });
    }

    componentDidMount() {
        PostActions.setData(this.props.post);
    }

    changePostStatus(e) {
        this.setState({
            published: ~~e.target.checked
        });
    }
    changeSlug(e) {
        this.state.post.slug = e.target.value;
        this.setState(this.state);
        PostActions.setData({ slug: this.state.post.slug });
    }

    async updatePost(e, status) {
        e.preventDefault();
        PostActions.setData(status);
        let data = PostActions.getData();
        const update = await this.props.update({
            ...this.props.post,
            ...data
        });
        if (update.data.updatePost.ok) {
            // If any component has subscribed to get notifications on update/delete, it will be notified.
            PostActions.postUpdated(update.data.updatePost.post);
            if (this.props.create) {
                return notify.show("Post created", "success", 3000);
            }
            if (this.props.post.status === "trash") {
                return notify.show("Post trashed", "success", 3000);
            }
            this.setState({ post: update.data.updatePost.post });
            return notify.show("Post updated", "success", 3000);
        }
        let errors = update.data.updatePost.errors;
        if (errors && errors.length > 0) {
            errors = errors.map(error => error.message);
            notify.show(errore.join("\n"), "error", 3000);
        }
    }

    getButton(label, btnType = "btn-dark", status) {
        if (typeof status == "undefined") {
            status = this.state.published ? "publish" : "draft";
        }
        if (status)
            return (
                <div className="btn-item">
                    <button
                        type="submit"
                        onClick={e => this.updatePost(e, { status: status })}
                        className={"btn btn-sm " + btnType}
                    >
                        {label}
                    </button>
                </div>
            );
    }

    render() {
        const publishedCls = this.state.published ? "on" : "off";
        const permalink =
            config.rootUrl + this.state.post.type + "/" + this.state.post.slug;
        const actionLabel = this.props.create ? "Create" : "Update";
        return (
            <div className="card">
                <div className="module-title">Publishing</div>
                <div className={"switch-block m-b-20 " + publishedCls}>
                    <span className="switch-label switch-off-text">Draft</span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            onChange={this.changePostStatus}
                            checked={this.state.published}
                        />
                        <span className="slider round" />
                    </label>
                    <span className="switch-label switch-on-text">Publish</span>
                </div>
                <div className="x_content m-b-20">
                    <label className="custom-label">
                        <i className="fa fa fa-calendar" /> Published at
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Published date"
                        value={moment(
                            new Date(this.state.post.created_at)
                        ).format("DD-MM-Y hh:mm A")}
                    />
                </div>
                <div className="x_content m-b-20">
                    <label className="custom-label">
                        <i className="fa fa fa-link" /> Slug
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Slug"
                        defaultValue={this.state.post.slug}
                        onBlur={this.changeSlug}
                    />
                </div>
                <div className="x_content m-b-20">
                    <label className="custom-label">
                        <i className="fa fa fa-link" /> Permalink
                    </label>
                    <div>
                        <a target="_blank" href={permalink}>
                            {permalink}
                        </a>
                    </div>
                </div>
                <div className="x_content">
                    <div className="btn-together">
                        {this.getButton(actionLabel, "btn-dark")}
                        {this.getButton("Trash", "btn-danger", "trash")}
                    </div>
                </div>
            </div>
        );
    }
}

const updateQueryWithData = graphql(UPDATE_POST_QUERY, {
    props: ({ mutate }) => ({
        update: data =>
            mutate({
                variables: data,
                updateQueries: {
                    getPost: (prev, { mutationResult }) => {
                        return {
                            post: {
                                ...prev.post,
                                ...mutationResult.data.updatePost.post
                            }
                        };
                    }
                }
            })
    })
});
export default updateQueryWithData(PostPublish);
