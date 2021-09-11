import React from 'react'
import { useLocation } from 'react-router-dom';
import Quiz from 'components/Quiz';

const Game = () => {
    const location = useLocation();
    const { artists } = location.state || {};

    return (
        <Quiz allArtists={artists} />
    )
}

Game.propTypes = {

}

export default Game
