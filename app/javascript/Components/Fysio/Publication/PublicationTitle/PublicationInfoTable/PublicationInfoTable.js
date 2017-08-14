import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PublicationCategoryList from './PublicationCategoryList/PublicationCategoryList.js';
import PropTypes from 'prop-types';

class PublicationInfoTable extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        {this.props.layers.map(layer =>
                            <th key={layer.name + "-table-header"}>
                                {layer.name}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {this.props.layers.map(layer =>
                                <td key={layer.id + "-tablecell"}>
                                    <PublicationCategoryList
                                        key={this.props.publication.id + "-info-" + layer.id}
                                        layer={layer.id}
                                        categories={this.props.categories}
                                        publication_id={this.props.publication.id}
                                    />
                                </td>
                        )}
                    </tr>
                </tbody>
            </Table>
        );
    }
}

PublicationInfoTable.propTypes = {
};

export default PublicationInfoTable;