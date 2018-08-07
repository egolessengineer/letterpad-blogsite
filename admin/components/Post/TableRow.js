import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Loader from "../Loader";

class PostRows extends Component {
    static propTypes = {
        selectedPosts: PropTypes.array,
        setSelection: PropTypes.func,
        colSpan: PropTypes.number,
        loading: PropTypes.bool.isRequired,
        posts: PropTypes.object
    };

    postSelected = e => {
        this.props.setSelection(e.target.value);
    };

    render() {
        if (this.props.loading) {
            return (
                <tbody>
                    <tr>
                        <td colSpan={this.props.colSpan}>
                            <Loader type="spin" />
                        </td>
                    </tr>
                </tbody>
            );
        }
        let content = null;
        if (this.props.posts.rows.length === 0) {
            content = (
                <tr>
                    <td colSpan={this.props.colSpan}>Nothing found..</td>
                </tr>
            );
        } else {
            content = this.props.posts.rows.map(post => {
                const categories = post.taxonomies
                    .filter(item => item.type == "post_category")
                    .map(cat => cat.name)
                    .join(", ");

                const tags = post.taxonomies
                    .filter(item => item.type == "post_tag")
                    .map(tag => tag.name)
                    .join(", ");

                const checked = {
                    checked:
                        this.props.selectedPosts
                            .map(id => id.toString())
                            .indexOf(post.id.toString()) >= 0
                };
                return (
                    <tr key={post.id}>
                        <td align="center">
                            <label className="control control--checkbox">
                                <input
                                    type="checkbox"
                                    {...checked}
                                    onClick={this.postSelected}
                                    value={post.id}
                                />
                                <div className="control__indicator" />
                            </label>
                        </td>
                        <td>
                            <Link to={"/admin/posts/" + post.id}>
                                {post.title || "Draft"}
                            </Link>
                        </td>
                        {post.type == "post" && (
                            <td className="hidden-xs">{categories}</td>
                        )}
                        {post.type == "post" && (
                            <td className="hidden-xs">{tags}</td>
                        )}
                        <td>{post.status}</td>
                        <td className="hidden-xs">
                            {post.author.fname} {post.author.lname}
                        </td>
                        <td>
                            {moment(new Date(post.created_at)).format("MMM Do")}
                        </td>
                    </tr>
                );
            });
        }

        return <tbody>{content}</tbody>;
    }
}

export default PostRows;
