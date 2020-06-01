import * as React from "react";
import {Card, Elevation} from "@blueprintjs/core";

export class Movie extends React.Component {
    constructor(props) {
        super(props);

        console.log('Move props', this.props);
        this.state = {
            movie: props.movie,
            rating: 0
        }
    }

    handleRatingChange = (event) => {
        this.setState({rating: event.target.value});
    }

    submitRating = () => {
        if (!this.state.rating) return;
        const ratingInfo = {
            movie: `http://localhost:8000/movies/${this.state.movie.id}/`,
            rating: this.state.rating
        };
        this.props.saveRating(ratingInfo);
    }

    render() {
        const {movie} = this.state;
        return (
            <Card interactive={false} elevation={Elevation.TWO}>
                <h2>
                    Title: {movie.title}
                </h2>
                <div>
                    Rating: {movie.rating}
                </div>
                <div>
                    <input type="number" onChange={this.handleRatingChange}/>
                    <button type={"submit"} value={"Submit"} onClick={this.submitRating}>Save</button>
                </div>
            </Card>
        );
    }
}

