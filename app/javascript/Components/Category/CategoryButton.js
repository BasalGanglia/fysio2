
import React, { Component } from 'react';
import { Button } from 'reactstrap';

class CategoryButton extends Component {

    constructor(props) {
        super(props);

        this.selected = this.selected.bind(this);
    }

    selected() {
        this.props.setCategoryState(this.props.id);
    }

    render() {

        const style1 = {
            backgroundColor: 'white',
            whiteSpace: 'normal'
        }
        const style2 = {
            backgroundColor: 'green',
            whiteSpace: 'normal'
        }

    return (
        <Button style={this.props.status ? style2 : style1} onClick={this.selected}>
            {this.props.name}
        </Button>
        );
    }
}

export default CategoryButton;
