import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import striptags from 'striptags';

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
    if (option['description'] && (option['description'] !== option['name'])) {
      name = <Button bsStyle="link" onClick={this.onClick}>{striptags(option['name'])}</Button>
    } else {
      name = option['name']
    }

    let description = "";
    if (this.state.expanded) {
      let data = {__html: option['description']};

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
  option: PropTypes.object.isRequired
}

export default OptionValue;
