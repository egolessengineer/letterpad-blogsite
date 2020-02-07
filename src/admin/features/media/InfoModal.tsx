import React, { Component } from "react";
import { WithNamespaces, translate } from "react-i18next";

import Loader from "../../components/loader";
import { Media } from "../../../__generated__/gqlTypes";
import ModalHoc from "../../components/modal";
import StyledButton from "../../components/button";
import StyledInfoModal from "./InfoModal.css";
import StyledInput from "../../components/input";

interface IEditMediaInfoProps extends WithNamespaces {
  media: Media;
  previous: () => void;
  next: () => void;
  onClose: () => void;
  updateMedia: Function;
}

class EditMediaInfo extends Component<IEditMediaInfoProps, any> {
  state = {
    media: {
      id: this.props.media.id,
      name: this.props.media.name,
      description: this.props.media.description,
    },
    saving: false,
  };

  itemName = React.createRef<HTMLInputElement>();

  static getDerivedStateFromProps(newProps: IEditMediaInfoProps, oldState) {
    if (oldState.media.id === newProps.media.id) return null;
    return {
      media: {
        id: newProps.media.id,
        name: newProps.media.name,
        description: newProps.media.description,
      },
    };
  }

  componentDidMount() {
    if (this.itemName.current) {
      this.itemName.current.focus();
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (e.target["name"]) {
      this.setState({
        media: { ...this.state.media, [e.target["name"]]: value },
      });
    }
  };

  goPrevious = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.updateMedia();
    this.props.previous();
  };

  goNext = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.updateMedia();
    this.props.next();
  };

  updateMedia = async (e?: React.SyntheticEvent) => {
    if (e) {
      e.persist();
    }
    // get the old values
    const { name, description } = this.props.media;
    // compare with current state to see if there is a change.
    if (
      this.state.media.name !== name ||
      this.state.media.description !== description
    ) {
      this.setState({ saving: true });
      // if yes, update the backend.
      const { id, name, description } = this.state.media;
      this.props.updateMedia(id, name, description);
      this.props.onClose();
    }
  };

  render() {
    const url = this.props.media.url;
    const { t } = this.props;
    return (
      <StyledInfoModal>
        <ModalHoc title="Add info to your media" onClose={this.props.onClose}>
          <div className="modal-body text-center">
            <div className="media-container">
              <div className="media-wrapper">
                {this.state.saving && <Loader />}
                <img src={url} />
              </div>

              <div className="media-info">
                <div className="navigation">
                  <StyledButton onClick={this.goPrevious}>
                    <i className="fa fa-long-arrow-left" />
                  </StyledButton>{" "}
                  <StyledButton onClick={this.goNext}>
                    <i className="fa fa-long-arrow-right" />
                  </StyledButton>
                </div>
                <StyledInput
                  label="Title"
                  value={this.state.media.name || ""}
                  placeholder="Give a name for this item"
                  name="name"
                  onChange={this.onChange}
                />
                <StyledInput
                  label="Description"
                  value={this.state.media.description || ""}
                  name="description"
                  placeholder="Write a short description about this item"
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <StyledButton onClick={this.props.onClose}>
              {t("common.cancel")}
            </StyledButton>
            <StyledButton success onClick={this.updateMedia}>
              Update
            </StyledButton>
          </div>
        </ModalHoc>
      </StyledInfoModal>
    );
  }
}
export default translate("translations")(EditMediaInfo);
