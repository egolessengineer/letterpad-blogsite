import React, { Component } from "react";
import PropTypes from "prop-types";

// A hack to remember the search text locally without asking parent
let SEARCH_TEXT_STATE = "";
export default class Search extends Component {
    static propTypes = {
        history: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            search: SEARCH_TEXT_STATE
        };
        this.onChange = this.onChange.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }
    componentDidMount() {
        if (this.props.history.location.pathname.includes("/search/")) {
            this.setState({
                search: this.props.history.location.pathname.split("/").pop(-1)
            });
        } else {
            this.setState({ search: "" });
        }
    }

    onChange(e) {
        this.setState({ search: e.target.value });
    }

    doSearch(e) {
        const query = e.target.value.trim();
        if (query.length > 0) {
            SEARCH_TEXT_STATE = query;
            this.props.history.push("/search/" + query);

            setTimeout(() => {
                // refs will not work because it looses value
                document.querySelector("#search-input").focus();
            }, 600);
        }
    }

    render() {
        return (
            <div className="search-box">
                <div className="x_content">
                    <div className="form-group">
                        <input
                            className="form-control"
                            value={this.state.search}
                            onChange={this.onChange}
                            placeholder="Search the site"
                            onKeyPress={e =>
                                e.charCode === 13 && this.doSearch(e)
                            }
                            id="search-input"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
