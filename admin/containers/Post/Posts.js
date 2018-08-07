import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";

import { PostRows } from "../../components/Post";
import PostsHoc from "../Hoc/PostsHoc";
import Paginate from "../../components/Paginate";
import { PostFilters } from "../../components/Post";
import Search from "../../components/Post/Search";

class Posts extends Component {
    static propTypes = {
        posts: PropTypes.object,
        changePage: PropTypes.func,
        variables: PropTypes.object,
        changeStatus: PropTypes.func,
        loading: PropTypes.bool,
        history: PropTypes.object,
        setSelection: PropTypes.func,
        selectAllPosts: PropTypes.func,
        deleteSelectedPosts: PropTypes.func,
        searchPosts: PropTypes.func,
        allPostsSelected: PropTypes.bool,
        selectedPosts: PropTypes.array,
        status: PropTypes.string,
        page: PropTypes.number,
        t: PropTypes.func
    };

    state = {
        status: "publish",
        loading: true,
        posts: null
    };

    componentDidMount() {
        document.body.classList.add("posts-page");
    }

    componentWillUnmount() {
        document.body.classList.remove("posts-page");
    }

    render() {
        const { t } = this.props;
        const loading = this.props.loading; //|| !this.props.networkStatus === 2;
        const { status } = this.props;
        let checked = {
            checked: this.props.allPostsSelected
        };
        return (
            <section className="module-xs">
                <div className="card">
                    <div className="module-title">{t("posts.title")}</div>
                    <div className="module-subtitle">{t("posts.tagline")}</div>
                    <div className="action-bar">
                        <Search
                            type="post"
                            searchPosts={this.props.searchPosts}
                        />
                        <div className="action-delete">
                            {this.props.selectedPosts.length > 0 && (
                                <button
                                    className="btn btn-xs btn-danger"
                                    onClick={this.props.deleteSelectedPosts}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                    <PostFilters
                        changeStatus={this.props.changeStatus}
                        selectedStatus={status}
                    />
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th width="5%" className="col-check">
                                    <label className="control control--checkbox">
                                        <input
                                            type="checkbox"
                                            onClick={e => {
                                                this.props.selectAllPosts(
                                                    e,
                                                    this.props.posts
                                                );
                                            }}
                                            {...checked}
                                        />
                                        <div className="control__indicator" />
                                    </label>
                                </th>
                                <th width="25%" className="col-text">
                                    {t("common.title")}
                                </th>
                                <th width="20%" className="col-text hidden-xs">
                                    {t("common.categories")}
                                </th>
                                <th width="20%" className="col-text hidden-xs">
                                    {t("common.tags")}
                                </th>
                                <th width="5%" className="col-text">
                                    {t("common.status")}
                                </th>
                                <th width="10%" className="col-text hidden-xs">
                                    {t("common.author")}
                                </th>
                                <th width="10%" className="col-text">
                                    {t("common.updatedAt")}
                                </th>
                            </tr>
                        </thead>

                        <PostRows
                            colSpan={7}
                            posts={this.props.posts}
                            loading={loading}
                            setSelection={this.props.setSelection}
                            selectedPosts={this.props.selectedPosts}
                        />
                    </table>

                    {!loading && (
                        <Paginate
                            count={this.props.posts.count}
                            page={this.props.page}
                            changePage={this.props.changePage}
                        />
                    )}
                </div>
            </section>
        );
    }
}

export default translate("translations")(PostsHoc(Posts, "post"));
