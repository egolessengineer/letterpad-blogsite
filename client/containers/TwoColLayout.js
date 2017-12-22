import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Menu from "../components/Menu";

export default function Layout(Element) {
    return class Layout extends Component {
        render() {
            let page = Element.name.toLowerCase();
            return (
                <div className={"wrapper " + page}>
                    <Menu
                        settings={this.props.settings}
                        menu={JSON.parse(this.props.settings.menu.value)}
                    />
                    {/*<section className="module-sm top-head">
                        <div className="container-fluid container-custom">
                            <div className="row">
                                <div className="col-sm-6 col-sm-offset-3">
                                    <h2 className="module-title font-alt m-b-0">
                                        {""}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </section>
                    <hr className="divider" />*/}

                    <section className="module-xs">
                        <div className="row">
                            <div className="col-lg-8 column">
                                <Element {...this.props} />
                            </div>
                            <div className="col-lg-4 column">
                                <Sidebar settings={this.props.settings} />
                            </div>
                        </div>
                    </section>

                    <hr className="divider" />
                    <Footer />
                </div>
            );
        }
    };
}
