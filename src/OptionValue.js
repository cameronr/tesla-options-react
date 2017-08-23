import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

class OptionValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  onClick = (event) => {
    this.setState({'expanded': !this.state.expanded});
  }

  render() {
    let name = "";
    let option = this.props.option;
    let expandable =
      option['requires'] ||
      option['excludes'] ||
      option['required_by'] ||
      (option['description'] && (option['description'] !== option['name']));
    if (expandable) {
      let strippedName = this.props.code;
      if (option['name'])
        strippedName = option['name'].replace(/<\/?[^>]+(>|$)/g, "");
      name = <Button bsStyle="link" onClick={this.onClick}>{strippedName}</Button>
    } else if (this.props.code !== option['name']) {
      name = option['name'];
    }

    let description = "";
    if (this.state.expanded) {
      let additionalData = "";
      if (option['description'] && option['description'] !== option['name'])
        additionalData += option['description'];
      if (option['requires'])
        additionalData += "<p>requires: " + option['requires'].join(', ')  + "</p>"
      if (option['required_by'])
        additionalData += "<p>required by: " + option['required_by'].join(', ')  + "</p>"
      if (option['excludes'])
        additionalData += "<p>excludes: " + option['excludes'].join(', ')  + "</p>"
      let data = {__html:  additionalData};

      description = <div dangerouslySetInnerHTML={data} />
    }

    return (
      <dd>
          {name}
          {description}
      </dd>
    );
  }
}


OptionValue.propTypes = {
  code: PropTypes.string.isRequired,
  option: PropTypes.object.isRequired
}

export default OptionValue;
