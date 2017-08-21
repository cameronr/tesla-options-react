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
    if (this.props.option['description'] && (this.props.option['description'] != this.props.option['name'])) {
      name = <Button bsStyle="link" onClick={this.onClick}>{this.props.option['name']}</Button>
    } else {
      name = this.props.option['name']
    }

    let description = "";
    if (this.state.expanded) {
      let data = {__html: this.props.option['description']};

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
