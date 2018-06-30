import React, { Component } from "react";
import PropTypes from "prop-types";
import { notify } from "react-notify-toast";

import GetTaxonomies from "../../data-connectors/GetTaxonomies";
import UpdateTaxonomy from "../../data-connectors/UpdateTaxonomy";
import DeleteTaxonomy from "../../data-connectors/DeleteTaxonomy";

class Taxonomy extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        updateTaxonomy: PropTypes.func.isRequired,
        deleteTaxonomy: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        networkStatus: PropTypes.number.isRequired
    };

    static contextTypes = {
        t: PropTypes.func
    };

    constructor(props, context) {
        super(props);
        const { t } = context;
        this.texts = {
            post_tag: {
                title1: t("tags.title"),
                subtitle1: t("tags.tagline"),
                title2: t("tags.create"),
                input1: t("tags.create.name.placeholder"),
                input2: t("tags.create.desc.placeholder")
            },
            post_category: {
                title1: t("categories.title"),
                subtitle1: t("categories.tagline"),
                title2: t("categories.create"),
                input1: t("categories.create.name.placeholder"),
                input2: t("categories.create.desc.placeholder")
            }
        };
        this.defaultText = this.texts[this.props.type];
        this.refList = {};
        this.state = {
            taxonomies: [],
            filteredData: [],
            editMode: false
        };
    }

    componentDidMount() {
        document.body.classList.add("taxonomy-" + this.props.type + "-page");
    }

    componentWillUnmount() {
        document.body.classList.remove("taxonomy-" + this.props.type + "-page");
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            !nextProps.loading &&
            prevState.taxonomies.length !== nextProps.taxonomies.length
        ) {
            return {
                taxonomies: [...nextProps.taxonomies],
                filteredData: [...nextProps.taxonomies]
            };
        }
        return null;
    }

    setRef(ele, idx, key) {
        if (!this.refList[idx]) {
            this.refList[idx] = {};
        }
        this.refList[idx][key] = ele;
    }

    editSaveTaxonomy = async idx => {
        let item = { ...this.state.filteredData[idx] };
        let oldItem = this.state.taxonomies[idx];

        if (typeof item.edit === "undefined") {
            item.edit = false;
        }
        //  dont allow multiple edits
        if (this.state.editMode && !item.edit) {
            return false;
        }

        const newState = { editMode: !item.edit };
        newState.filteredData = [...this.state.filteredData];
        newState.filteredData[idx] = item;

        //  make the item editable
        if (!item.edit) {
            newState.filteredData[idx].edit = true;

            return this.setState(newState, () => {
                this.refList[idx].name.focus();
            });
        } else if (
            item.name == oldItem.name &&
            item.desc == oldItem.desc &&
            item.slug == oldItem.slug &&
            item.edit
        ) {
            delete newState.filteredData[idx].edit;
            return this.setState(newState);
        }
        // dont allow empty taxonomies
        if (item.edit && item.name == "") {
            return alert("Cannot be empty");
        }
        if (!item.slug) {
            item.slug = item.name.toLowerCase().replace(/ /g, "-");
        }
        newState.editMode = false;
        item.type = this.props.type;
        const result = await this.props.updateTaxonomy(item);
        if (result.data.updateTaxonomy.ok) {
            newState.filteredData[idx].id = result.data.updateTaxonomy.id;
            delete newState.filteredData[idx].edit;
            this.setState(newState);
            notify.show("Taxonomy Saved", "success", 3000);
        } else {
            notify.show(
                result.data.updateTaxonomy.errors[0].message,
                "error",
                3000
            );
        }
    };

    newTaxClicked = () => {
        const newState = {
            filteredData: [
                ...this.state.filteredData,
                {
                    id: 0,
                    name: "",
                    desc: "",
                    edit: true
                }
            ],
            editMode: false
        };

        this.setState(newState, () => {
            this.refList[0].name.focus();
        });
    };

    handleChange = (idx, key, value) => {
        const filteredData = this.state.filteredData.map((item, pointer) => {
            if (idx == pointer) {
                item[key] = value;
            }
            return item;
        });

        this.setState(filteredData);
    };

    deleteTax = idx => {
        let id = this.state.filteredData[idx].id;
        this.props.deleteTaxonomy({ id: id });
        delete this.state.filteredData[idx];
        this.setState(this.state);
    };

    render() {
        const { t } = this.context;
        const loading = this.props.loading || !this.props.networkStatus === 2;
        if (loading) return null;

        const rows = this.state.filteredData.map((item, idx) => (
            <tr key={idx} className={item.edit ? "row-selected" : ""}>
                <td width="25%">
                    <span
                        style={{ display: "block" }}
                        ref={ele => this.setRef(ele, idx, "name")}
                        onKeyUp={e =>
                            this.handleChange(
                                idx,
                                "name",
                                e.currentTarget.innerText
                            )
                        }
                        className={item.edit ? "inline-edit" : ""}
                        placeholder={this.defaultText.input1}
                        contentEditable={item.edit}
                    >
                        {item.name}
                    </span>
                </td>
                <td width="35%">
                    <span
                        style={{ display: "block" }}
                        ref={ele => this.setRef(ele, idx, "desc")}
                        onKeyUp={e =>
                            this.handleChange(
                                idx,
                                "desc",
                                e.currentTarget.innerText
                            )
                        }
                        className={item.edit ? "inline-edit" : ""}
                        placeholder={this.defaultText.input2}
                        contentEditable={item.edit}
                    >
                        {item.desc || ""}
                    </span>
                </td>
                <td width="20%">
                    <span
                        style={{ display: "block" }}
                        ref={ele => this.setRef(ele, idx, "slug")}
                        onKeyUp={e =>
                            this.handleChange(
                                idx,
                                "slug",
                                e.currentTarget.innerText
                            )
                        }
                        className={item.edit ? "inline-edit" : ""}
                        placeholder="Enter a slug"
                        contentEditable={item.edit}
                    >
                        {item.slug || ""}
                    </span>
                </td>
                <td width="20%">
                    <button
                        onClick={() => this.editSaveTaxonomy(idx, item.edit)}
                        className={
                            "btn btn-xs btn-" + (item.edit ? "success" : "dark")
                        }
                    >
                        {item.edit ? t("common.save") : t("common.edit")}
                    </button>
                    &nbsp;&nbsp;
                    <button
                        onClick={() => this.deleteTax(idx)}
                        className="btn btn-xs btn-danger btn-danger-invert"
                    >
                        {t("common.delete")}
                    </button>
                </td>
            </tr>
        ));

        return (
            <section className="module-xs">
                <div className="card">
                    <div className="module-title">
                        {this.defaultText.title1}
                    </div>
                    <div className="module-subtitle">
                        {this.defaultText.subtitle1}
                    </div>

                    <div className="m-b-20">
                        <button
                            className="btn btn-xs btn-dark"
                            aria-label="Add"
                            onClick={this.newTaxClicked}
                        >
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th width="25%" className="col-text">
                                    {t("common.name")}
                                </th>
                                <th width="25%" className="col-text">
                                    {t("common.description")}
                                </th>
                                <th width="25%" className="col-text">
                                    {t("common.slug")}
                                </th>
                                <th width="25%" className="col-text">
                                    {t("common.actions")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            </section>
        );
    }
}

export default DeleteTaxonomy(UpdateTaxonomy(GetTaxonomies(Taxonomy)));
