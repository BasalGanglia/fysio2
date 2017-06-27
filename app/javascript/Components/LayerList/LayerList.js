
import React, { Component } from 'react';
import Layer from "../Layer/Layer";


class LayerList extends Component {
    constructor(props) {
        super(props);

        }

    render() {

        const style = {
            width: '150px',
            minWidth: '150px',
            maxWidth: '150px'
        }

        return (
            <tbody>
                <tr>
                    <th style={style}>
                        <span >
                            pubs
                        </span>
                    </th>
                        {this.props.publications.map(publication =>
                        <td key={publication.id}>
                            {publication.name}
                        </td>
                        )}
                </tr>
                    {this.props.layers.map(layer =>
                    <Layer  categorySelected={this.props.categorySelected}
                            key={layer.id} layer={layer}
                            categories={this.props.layerCategories[layer.id]}
                            publications={this.props.publications}
                            setCategoryState={this.props.setCategoryState}
                    />
                    )}
            </tbody>
      );
    }

}

export default LayerList;