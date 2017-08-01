
class DatabaseConnector {

    static getLayersForType(id) {
        return fetch('/layer_types/' + id + '.json')
            .then(response => response.json())
            .then(layerType => {
                return layerType.layers;
            });
    }

    static getLayers() {
        return fetch('/layer_types/1.json')
            .then(response => response.json())
            .then(layerType => {
                return layerType.layers;
            });
    }

    static getLayerTypes() {
        return fetch('layer_types.json')
            .then(response => response.json())
            .then(layerTypes => {
                return layerTypes;
            });
    }

    static getPublications() {
        return fetch('publications.json')
            .then(response => response.json())
            .then(publications => {
                return publications;
            });
    }

    static getCategories() {
        return fetch('/categories.json')
            .then(response => response.json())
            .then(categories => {
                return categories;
            });
    }

    static fetchFromPath(path) {
        return fetch(path)
            .then(response => response.json())
            .then(results => {
                return results;
            })
    }

    static createPublication(data) {

    }
}

export default DatabaseConnector;
