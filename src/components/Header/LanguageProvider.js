/**
 * Language Select Dropdown
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";

// actions
import { setLanguage } from "../../actions";

class LanguageProvider extends Component {
  state = {
    langDropdownOpen: false
  };

  // function to toggle dropdown menu
  toggle = () => {
    this.setState({
      langDropdownOpen: !this.state.langDropdownOpen
    });
  };

  // on change language
  onChangeLanguage(lang) {
    this.setState({ langDropdownOpen: false });
    this.props.setLanguage(lang);
  }

  render() {
    const { locale, languages } = this.props;
    return (
      <Dropdown
        nav
        className="list-inline-item rct-dropdown tour-step-4"
        isOpen={this.state.langDropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle caret nav className="dropdown-group-link">
          <img
            src={require(`../../assets/flag-icons/${locale.icon}.png`)}
            className="mr-10"
            width="25"
            height="16"
            alt=""
          />{" "}
          {locale.name}
        </DropdownToggle>
        <DropdownMenu className="mt-15" right>
          <ul className="list-unstyled mb-0">
            {languages.map((language, key) => (
              <li key={key} onClick={() => this.onChangeLanguage(language)}>
                <a href="javascript:void(0)">
                  <img
                    src={require(`../../assets/flag-icons/${
                      language.icon
                    }.png`)}
                    className="mr-10"
                    width="25"
                    height="16"
                    alt=""
                  />{" "}
                  {language.name}
                </a>
              </li>
            ))}
          </ul>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings }) => {
  return settings;
};

export default connect(
  mapStateToProps,
  {
    setLanguage
  }
)(LanguageProvider);
