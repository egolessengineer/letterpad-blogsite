import React, { Component } from "react";

const PostsHoc = WrappedComponent => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.changePage = this.changePage.bind(this);
            this.changeStatus = this.changeStatus.bind(this);
            this.state = {
                status: "publish",
                page: 1
            };
        }

        changeStatus(status) {
            this.setState({ status });
        }

        changePage(e, page) {
            e.preventDefault();
            this.setState({ page });
        }

        render() {
            const variables = {
                page: this.state.page,
                limit: 3,
                offset: (parseInt(this.state.page) - 1) * 3,
                status: this.state.status
            };
            return (
                <WrappedComponent
                    {...this.props}
                    {...this.state}
                    variables={variables}
                    changeStatus={this.changeStatus}
                    changePage={this.changePage}
                />
            );
        }
    };
};
export default PostsHoc;
