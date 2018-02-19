import React from "react";
import PropTypes from "prop-types";

const Filter = ({ id, label, status, changeStatus }) => {
    let selected = "publish";
    if (status) {
        selected = status;
    }
    const active = selected == id ? "active" : "";
    return (
        <a
            onClick={e => {
                e.preventDefault();
                changeStatus(id);
            }}
            className={"filter-item " + id + " " + active}
        >
            {label}
        </a>
    );
};
Filter.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    status: PropTypes.string,
    changeStatus: PropTypes.func
};

export const PostFilters = ({ selectedStatus, changeStatus }) => {
    return (
        <div className="post-filters m-b-20">
            <Filter
                id="all"
                label="All"
                status={selectedStatus}
                changeStatus={changeStatus}
            />
            <Filter
                id="publish"
                label="Published"
                status={selectedStatus}
                changeStatus={changeStatus}
            />
            <Filter
                id="draft"
                label="Drafts"
                status={selectedStatus}
                changeStatus={changeStatus}
            />
            <Filter
                id="trash"
                label="Deleted"
                status={selectedStatus}
                changeStatus={changeStatus}
            />
        </div>
    );
};

PostFilters.propTypes = {
    selectedStatus: PropTypes.string,
    changeStatus: PropTypes.func
};
export default PostFilters;
