import React, { Component } from "react";
import PropTypes from "prop-types";
import SortableTree, {
  changeNodeAtPath,
  removeNodeAtPath,
} from "react-sortable-tree";
import { translate } from "react-i18next";
import FileExplorerTheme from "react-sortable-tree-theme-full-node-drag";

import Resources from "./Resources";
import EditMenuModal from "./EditMenuModal";
import StyledGrid from "../../components/grid";
import StyledMenuTree from "./NavigationTreeBuilder.css";
import SortableWrapper from "./SortableWrapper.css";

/**
 * Convert deeply nested menu array to Object, one level deep.
 * Keep the key as [id-type] and value as true.
 *
 * This will be used to disable all the category items, pages which has been used in the menu
 * @param {Array} arr - Menu Data in json format
 */
const getMenuItems = function(arr) {
  const toReturn = {};
  const recur = arr => {
    arr.forEach(item => {
      if (item.children && item.children.length > 0) {
        recur(item.children);
      }
      toReturn[item.id + "-" + item.type] = true;
    });
  };
  recur(arr);
  return toReturn;
};

/**
 * Build Navigation tree
 *
 * @class NavigationTreeBuilder
 * @extends {Component}
 */
class NavigationTreeBuilder extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    updateOption: PropTypes.func.isRequired,
    t: PropTypes.func,
  };

  state = {
    loaded: false,
    categories: [],
    pages: [],
    items: [...JSON.parse(this.props.data.menu.value)],
    folder: [
      {
        id: Date.now() + "-folder",
        title: "Folder",
        type: "folder",
        label: "Folder",
        name: "Folder",
      },
    ],
    scrollTop: 0,
    nodeInfo: {}, // node which is being edited
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      !nextProps.categories.loading &&
      !nextProps.pages.loading &&
      !prevState.loaded
    ) {
      let menu = JSON.parse(nextProps.data.menu.value);
      const menuIds = getMenuItems(menu);

      // Loop through the categories and add a key "disabled".
      // The items which have been used in the navigation menu will have the value "disabled:true"
      const categories = nextProps.categories.taxonomies.map(ele => {
        return {
          id: ele.id,
          title: ele.name,
          type: "category",
          name: ele.name,
          disabled: menuIds[ele.id + "-category"] ? true : false,
          slug: "",
        };
      });
      // Loop through the pages and add a key "disabled".
      // The items which have been used in the navigation menu will have the value "disabled: true"
      const pages = nextProps.pages.posts.rows.map(ele => {
        return {
          id: ele.id,
          title: ele.title,
          slug: ele.slug,
          type: "page",
          name: ele.title,
          disabled: menuIds[ele.id + "-page"] ? true : false,
        };
      });
      return { categories, pages, loaded: true };
    }
    return null;
  }

  /**
   * Add a new item in the navigation
   *
   * @memberof NavigationTreeBuilder
   */
  addItem = (idx, type) => {
    const newState = {};
    newState[type] = [...this.state[type]];

    // All items which are added to the navigation should be disabled, so that they cannot be re-added.
    // This is not the case for folders. So when we add a folder, we change the id with a unique value
    // and then add this to the navigation to prevent mapping.
    if (type === "folder") {
      newState[type][idx] = {
        ...this.state[type][idx],
        id: Date.now() + "-folder",
      };
    } else {
      // disable the item
      newState[type][idx].disabled = true;

      // categories should have another key - "slug"
      if (type === "categories") {
        newState[type][idx].slug = newState[type][idx].name.toLowerCase();
      }
    }

    // merge the changes
    newState.items = [...this.state.items, newState[type][idx]];

    this.setState({ ...newState }, () => {
      this.props.updateOption("menu", JSON.stringify(this.state.items));

      // The newly added item will always be placed at the bottom. So Scroll the window to the bottom
      const scrollContainer = document.querySelector(
        ".ReactVirtualized__Grid__innerScrollContainer",
      );
      if (scrollContainer && scrollContainer.scrollHeight > 600) {
        this.setState({ scrollTop: 9999999 });
      }
    });
  };

  /**
   * Remove an item from the navigation menu
   *
   * @memberof NavigationTreeBuilder
   */
  removeItem = props => {
    const menuItem = props.node;

    // A utility function to changed disabled to false for the item which is being removed
    const keepItemBack = item => {
      const type = item.type == "page" ? "pages" : "categories";
      const newState = this.state[type].map(_item => {
        if (item.id == _item.id) {
          _item.disabled = false;
        }
        return _item;
      });

      this.setState({ [type]: newState });
    };

    // The menu can be a deeply nested object. The item being removed can have children which will also get deleted.
    // We need to get item which is being removed and enable them in the resources, so that then can be added later.
    const findItemsAndDelete = (node, menuNode = false) => {
      let nodeFromMenu = node;
      if (!menuNode) {
        nodeFromMenu = this.state.items.filter(_node => _node.id == node.id)[0];
      }

      if (
        nodeFromMenu &&
        nodeFromMenu.children &&
        nodeFromMenu.children.length > 0
      ) {
        nodeFromMenu.children.map(node => findItemsAndDelete(node, true));
        delete node.children;
      }
      if (node.type === "folder") return;
      // Enable them in the resources.
      keepItemBack(node);
    };
    findItemsAndDelete(menuItem);

    const getNodeKey = ({ treeIndex }) => treeIndex;

    this.setState(
      () => ({
        ...this.state,
        items: removeNodeAtPath({
          treeData: this.state.items,
          path: props.path,
          getNodeKey,
        }),
        categories: [...this.state.categories],
        pages: [...this.state.pages],
      }),
      () => {
        this.props.updateOption("menu", JSON.stringify(this.state.items));
      },
    );
  };

  /**
   * Each item in the navigation menu can have some additional properties.
   * Like, the title of every item and also Category slugs can be changed.
   *
   * @memberof NavigationTreeBuilder
   */
  changeItemProperty = (e, { node, path }, property) => {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const value = e.target.value;

    this.setState(
      () => ({
        items: changeNodeAtPath({
          treeData: this.state.items,
          path,
          getNodeKey,
          newNode: {
            ...node,
            [property]: value,
            title: value,
          },
        }),
      }),
      () => {
        this.props.updateOption("menu", JSON.stringify(this.state.items));
      },
    );
  };

  /**
   * Few items can be a child of another item. Like page and category cannot be a child
   * to each other. But they can be a child of a folder. We validate this here.
   *
   * @param {*} { node, nextParent }
   * @returns {Boolean}
   * @memberof NavigationTreeBuilder
   */
  canDrop({ node, nextParent }) {
    if (!nextParent) return true;
    if (
      ["category", "page"].indexOf(node.type) >= 0 &&
      nextParent.type === "folder"
    ) {
      return true;
    }
    if (node.type === "folder" && nextParent.type === "folder") {
      return true;
    }
    return false;
  }

  openModalToEdit = props => {
    this.setState({
      modalOpen: true,
      nodeInfo: props,
    });
  };

  /**
   *  Create UI for menu item title and toolbar to edit/delete a menu item
   *
   * @param {*} props
   * @returns Object
   * @memberof NavigationTreeBuilder
   */
  generateNodeProps(props) {
    return {
      buttons: [
        <span key="0" className={"item-type " + props.node.type}>
          {props.node.type}
        </span>,
        <i
          key="1"
          className="fa fa-pencil"
          onClick={() => this.openModalToEdit(props)}
        />,
        <i
          key="2"
          className="fa fa-trash"
          onClick={() => this.removeItem(props)}
        />,
      ],
      title: (
        <div className="menu-title-wrapper">
          <span>{props.node.title}</span>
        </div>
      ),
    };
  }

  render() {
    const { t } = this.props;
    return (
      <StyledGrid columns="repeat(2, minmax(200px, 1fr))">
        {/* Resources are collection of pages, categories and folders from where a menu will be created*/}
        <div>
          <Resources
            title="Pages"
            data={this.state.pages}
            itemClicked={idx => this.addItem(idx, "pages")}
          />
          <br />
          <Resources
            title="Categories"
            data={this.state.categories}
            itemClicked={idx => this.addItem(idx, "categories")}
          />
          <br />
          <Resources
            title="Folders"
            data={this.state.folder}
            itemClicked={idx => this.addItem(idx, "folder")}
          />
        </div>

        <StyledMenuTree>
          <h5>{t("menu.build.title")}</h5>
          <SortableWrapper style={{ height: 600 }}>
            <SortableTree
              theme={FileExplorerTheme}
              treeData={this.state.items}
              onChange={treeData => {
                this.setState({ items: treeData });
                this.props.updateOption("menu", JSON.stringify(treeData));
              }}
              reactVirtualizedListProps={{
                scrollTop: this.state.scrollTop,
                onScroll: ({ scrollTop }) => this.setState({ scrollTop }),
              }}
              canDrop={this.canDrop.bind(this)}
              generateNodeProps={this.generateNodeProps.bind(this)}
            />
          </SortableWrapper>
        </StyledMenuTree>
        {this.state.modalOpen && (
          <EditMenuModal
            title="Edit menu item"
            onClose={() => {
              this.setState({
                nodeInfo: {},
                modalOpen: false,
              });
            }}
            changeItemProperty={this.changeItemProperty}
            nodeInfo={this.state.nodeInfo}
          />
        )}
      </StyledGrid>
    );
  }
}

export default translate("translations")(NavigationTreeBuilder);
