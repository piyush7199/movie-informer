import React from "react"
import "../index.css"
import { addMovieToList, handleMovieSearch } from '../actions';
import { StoreContext } from "..";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        }
    }

    handleAddToMovies = (movie) => {
        this.props.dispatch(addMovieToList(movie));
    }

    handleSearch = () => {
        const { searchText } = this.state;
        this.props.dispatch(handleMovieSearch(searchText));

    }

    handleChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }

    render() {
        const { results, showSearchResults } = this.props.search;
        console.log(showSearchResults)
        return (<div className="nav">
            <div className="search-container">
                <input placeholder="Search movie..." onChange={this.handleChange} />
                <button id="search-btn" onClick={this.handleSearch}>Search</button>
                {showSearchResults &&
                    (<div className="search-results">
                        <div className="search-result">
                            <img src={results.Poster} alt="search-pic" />

                            <div className="movie-info">
                                <span>{results.Title} ({results.Year})</span>
                                <button onClick={() => this.handleAddToMovies(results)}>
                                    Add to Movies</button>
                            </div>
                        </div>
                    </div>

                    )}
            </div>



        </div>);
    }
}

class NavbarWrapper extends React.Component{
    render(){
        return(
            <StoreContext.Consumer>
                {(store) => <Navbar dispatch={store.dispatch} search={this.props.search} /> }
            </StoreContext.Consumer>
        )
    }
}

export default NavbarWrapper