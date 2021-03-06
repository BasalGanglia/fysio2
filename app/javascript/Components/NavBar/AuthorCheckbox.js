/**
 * Created by perkoila on 24.8.2017.
 */
import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class AuthorCheckbox extends Component{
    constructor() {
        super();
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    handleCheckbox() {
        this.props.handleCheckbox(this.props.author);
    }

    render() {
        return(
            <FormGroup >

                    <Input type="checkbox" onChange={this.handleCheckbox} />
                    {this.props.author}

            </FormGroup>
        )
    }
}

export default AuthorCheckbox;
