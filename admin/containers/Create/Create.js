import React, { Component } from "react";
import { graphql } from "react-apollo";
import moment from "moment";
import PropTypes from "prop-types";
import { plural } from "../../../shared/util";
import {
    ArticleCreate,
    PostPublish,
    PostActions,
    Tags,
    Categories,
    Excerpt
} from "../../components/Post";
import { CREATE_POST } from "../../../shared/queries/Mutations";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            post: {}
        };
    }
    componentWillMount() {
        const { type } = this.props;
        const title = "Draft - " + moment().format("L LT");
        this.props.createPost({ type, title }).then(result => {
            PostActions.setData(result.data.createPost.post);
            this.setState({
                loading: false,
                post: result.data.createPost.post
            });
        });

        PostActions.subscribe(post => {
            if ((post.status = "trash")) {
                this.props.history.push(`/admin/${plural[post.type]}`);
            } else {
                this.props.history.push(
                    `/admin/${plural[post.type]}/${post.id}`
                );
            }
        });
        document.body.classList.add(`create-${type}`);
    }
    render() {
        if (this.state.loading) {
            return <div>hello</div>;
        }
        return (
            <section className="module-xs">
                <div className="row">
                    <div className="col-lg-8 column">
                        <ArticleCreate post={this.state.post} />
                    </div>
                    <div className="col-lg-4 column">
                        <PostPublish create post={this.state.post} />
                        <Tags post={this.state.post} />
                        <Categories post={this.state.post} />
                        <Excerpt post={this.state.post} />
                    </div>
                </div>
            </section>
        );
    }
}

Create.propTypes = {
    history: PropTypes.object,
    createPost: PropTypes.func,
    type: PropTypes.string
};

const createQueryWithData = graphql(CREATE_POST, {
    props: ({ mutate }) => ({
        createPost: data =>
            mutate({
                variables: data
            })
    })
});

export default createQueryWithData(Create);
