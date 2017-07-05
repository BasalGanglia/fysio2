import React, { Component } from 'react';
import NavBar from './Components/NavBar/NavBar';
import IndexView from "./Components/IndexView/IndexView";

class App extends Component {
    constructor() {
        super();
        this.state = {
            visible: "LayersPage",
            layers: [],
            categories: [],
            publications: [],
            categorySelected: [],
            categoryAvailable: []
        }
        this.updatePublications = this.updatePublications.bind(this);
        this.updateCategories = this.updateCategories.bind(this);
        this.parsePath = this.parsePath.bind(this);
        this.setCategoryState = this.setCategoryState.bind(this);
    }

    componentWillMount() {
        fetch('/layers.json')
            .then(response => response.json())
            .then(layers => {
                this.setState({
                    layers: layers
                })
            });

        fetch('/categories.json')
            .then(response => response.json())
            .then(categories => {
                this.setState({
                    categories: categories,
                    categoryAvailable: categories
                })
            });

        fetch('publications.json')
            .then(response => response.json())
            .then(results => {
                this.setState({
                    publications: results
                })
            });
    }

    setCategoryState(newState) {



        var categorySelectedArray = this.state.categorySelected;

        var index = categorySelectedArray.indexOf(newState);

        if (index > -1) {
            categorySelectedArray.splice(index, 1);
        } else {
            categorySelectedArray.push(newState);
        }

        //this.state.categorySelected = categorySelectedArray;

        //console.log(categorySelectedArray);
        this.updatePublications(categorySelectedArray);





    }

    updatePublications(categories) {
        let path = this.parsePath(categories, "publications", "names");
        let pubs = [];
        let cats = [];
        fetch(path)
            .then(response => response.json())
            .then(results => {
                pubs = results;
                console.log(1);
                return results
            })
            .then(results => {
                let pIds = this.extractIds(results);
                let path2 = this.parsePath(pIds, "categories", "pubIds");
                console.log(path2);
                return path2;
            })
            .then(path2 => {
                console.log(3);
                fetch(path2)
                    .then(response => response.json())
                    .then(results => {
                        cats = results;
                        console.log(results);
                        return results
                    })
                    .then(results => {
                        //console.log(categories);
                        //console.log(pubs);
                        console.log(cats);
                        //console.log(5);
                        this.setState({
                            publications: pubs,
                            categorySelected: categories,
                            categoryAvailable: cats
                        })
                        }
                    )
            });



    }

    extractIds(pubs) {
        let pIds = [];
        pubs.map(p => {
            pIds.push(p.id)
        });
        return pIds;
    }

    updateCategories(publications) {

        let pubIds = [];

        publications.map(p => pubIds.push(p.id));

        let path = this.parsePath(pubIds, "categories", "pubIds");
        let cats = [];

        fetch(path)
            .then(response => response.json())
            .then(results => {

                this.setState({
                    categoryAvailable: results
                })

            });




    }

    parsePath(categoriesArray, table, paramName) {
        //console.log(categoriesArray);
        let path = table + ".json?";
        let length = path.length;
        categoriesArray.map(cat => path += paramName + "[]=" + cat + "&");
        if (path.length === length) {
            return path.substring(0, path.length - 1);
        }
        return path.substring(0, path.length - 1);
    }

    render() {

        const loading = {
            textAlign: 'center',
            verticalAlign: 'center',
            fontSize: '40px',
            color: '#343434',
        }

        let categories = this.state.categoryAvailable;
        let layers = this.state.layers;
        let publications = this.state.publications;

        console.log("Render");

        if (publications.length === 0) {
            return (
                <div>
                    <NavBar/>
                    <span style={loading}>
                        Loading
                    </span>
                </div>
            );
        } else {
            return (
                <div>
                    <NavBar/>
                    <IndexView
                        key="1"
                        categories={categories}
                        layers={layers}
                        publications={publications}
                        setCategoryState={this.setCategoryState}
                        categorySelected={this.state.categorySelected}
                        categoryAvailable={this.state.categoryAvailable}
                    />
                </div>
            );
        }

  }
}

export default App;
