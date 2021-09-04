import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

const Wrapper = styled('div')`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const PointsWrapper = styled('div')`
    height: 15%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Points = styled('span')`
    font-size: 28px;
`;

const Reset = styled('div')`
    font-size: 20px;
    color: red;
    margin-bottom: 16px;
`;

const TextBox = styled('div')`
    height: 55%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Text = styled('span')`
    font-size: 32px;
`;

const SelectWrapper = styled('div')`
    height: 30%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Select = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    font-size: 32px;
    
    &.correct {
        background-color: green;
    }

    &.wrong {
        background-color: red;
    }

    &.start {
        width: 100%;
        color: white;
        background-color: blue;
    }
`;


const App = ({ allArtists = [] }) => {
    const [artist, setArtist] = useState();
    const [artists, setArtists] = useState(allArtists);
    const [points, setPoints] = useState(0);

    const nextArtist = () => {
        const index = Math.floor(Math.random() * artists.length);

        setArtist(artists[index]);

        const newArtists = artists;

        newArtists.splice(index, 1);

        setArtists(newArtists);
    };

    const handleCorrect = () => {
        setPoints(p => p + 1);

        nextArtist();
    };

    const handleReset = () => {
        setPoints(0);
        setArtist(null);
    };

    console.log(artists);

    return (
        <>
        <Global styles={css`body { margin: 0; }`} />
        <Wrapper>
            <PointsWrapper>
                <Reset onClick={handleReset}>Börja om</Reset>
                <Points>{points}</Points>
            </PointsWrapper>
            <TextBox>
                <Text>{artist}</Text>
            </TextBox>
            <SelectWrapper>
                {!artist ? <Select className="start" onClick={nextArtist}>START</Select> : (
                    <>
                        <Select className="wrong" onClick={nextArtist}>X</Select>
                        <Select className="correct" onClick={handleCorrect}>&#10003;</Select>
                    </>
                )}
            </SelectWrapper>
        </Wrapper>
        </>
    );
};

export default App;
