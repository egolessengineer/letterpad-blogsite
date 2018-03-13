import React, { Component } from "react";
import PropTypes from "prop-types";
import { PostRows } from "../../components/Post";
import PostsHoc from "../Post/PostsHoc";
import Paginate from "../../components/Paginate";
import { PostFilters } from "../../components/Post";
import Search from "../../components/Post/Search";

class Pages extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        document.body.classList.add("pages-page");
    }

    componentWillUnmount() {
        document.body.classList.remove("pages-page");
    }

    handleClick(id) {
        this.props.history.push("/admin/pages/" + id);
    }
    render() {
        const loading = this.props.loading;
        const { t } = this.context;
        const { status } = this.props;

        return (
            <section className="module-xs">
                <div className="card">
                    <div className="module-title">{t("pages.title")}</div>
                    <div className="module-subtitle">{t("pages.tagline")}</div>
                    <div className="action-bar">
                        <Search
                            type="page"
                            searchPosts={this.props.searchPosts}
                        />
                        <div className="action-delete">
                            {this.props.selectedPosts.length > 0 && (
                                <button
                                    className="btn btn-xs btn-danger"
                                    onClick={this.props.deletedSelectedPosts}
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
                                        <input type="checkbox" />
                                        <div className="control__indicator" />
                                    </label>
                                </th>
                                <th width="25%" className="col-text">
                                    {t("common.title")}
                                </th>
                                <th width="20%" className="col-text">
                                    {t("common.categories")}
                                </th>
                                <th width="20%" className="col-text">
                                    {t("common.tags")}
                                </th>
                                <th width="5%" className="col-text">
                                    {t("common.status")}
                                </th>
                                <th width="10%" className="col-text">
                                    {t("common.author")}
                                </th>
                                <th width="10%" className="col-text">
                                    {t("common.createdAt")}
                                </th>
                            </tr>
                        </thead>

                        <PostRows
                            colSpan={7}
                            handleClick={this.handleClick}
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

Pages.propTypes = {
    posts: PropTypes.object,
    changePage: PropTypes.func,
    variables: PropTypes.object,
    changeStatus: PropTypes.func,
    loading: PropTypes.bool,
    history: PropTypes.object
};

Pages.contextTypes = {
    t: PropTypes.func
};

export default PostsHoc(Pages, "page");
