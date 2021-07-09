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
`;


const App = () => {
    const [artist, setArtist] = useState();
    const [artists, setArtists] = useState([
        'Roxette',
        'Snowstorm ',
        'Eminem',
        'Niklas Strömstedt ',
        'Madonna ',
        'Dr. Alban',
        'GES',
        'Carola',
        // 'Hooters ',
        // 'Alice Cooper',
        'Bryan Adams ',
        'Rihanna ',
        'Lillasyster',
        'Tommy Nilsson',
        'Magnus Uggla ',
        'Orup ',
        'Jakob Karlberg ',
        'De vet du',
        'Albatraoz ',
        'Michael Jackson',
        'ABBA',
        'Queen',
        'Toto',
        'Train ',
        'Maroon 5',
        'Flo rida ',
        'Owl City ',
        'Jason Mraz ',
        'Bruno Mars ',
        'Sean Kingston ',
        'fun.',
        'Miley Cirus',
        'Den svenska björnstammen',
        'Håkan Hellström',
        'Gyllene Tider ',
        'Daniel Adams Ray',
        'kent ',
        'Ted Gärdestad',
        'Mares ',
        'Elvis Presley ',
        'Beatles',
        // 'Elton John ',
        // 'Pink Floyd ',
        // 'Rolling Stones ',
        // 'Led Zeppelin',
        // 'Mustasch',
        'Mariah Carey ',
        'Taylor Swift ',
        'Whitney Houston',
        // 'Eagles',
        'Justin Bieber',
        'Ed Sheeran',
        'Kanye West',
        // 'U2',
        'Bruce Springsteen',
        'Dansbandskungen',
        'Oskar Linnros',
        'Post Malone',
        'Jay-Z',
        'Rasmus Gozzi',
        'Calvin Harris',
        'Tove Lo',
        'Benjamin Ingrosso',
        'A36',
        'Miriam Bryant',
        'Veronica Maggio',
        'Miss Li',
        'Norlie & KKV',
        'Tjuvjakt',
        'Newkid',
        'Hov1',
        'Victor Leksell',
        'Einar',
        'Dua Lipa',
        'The Weeknd',
        'Broiler',
        'Mwuana',
        'Dani M',
        'Kartellen',
        'Movits!',
        'Fricky',
        'Yasin',
        'Dree Low',
        'Taylor Swift',
        'Olivia Rodrigo',
        'Ariana Grande',
        'The Beatles'.
        'Shawn Mendes',
        'Cardi B',
    ]);
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
    }

    const handleReset = () => {
        setPoints(0);
    };

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
                <Select className="wrong" onClick={nextArtist}>X</Select>
                <Select className="correct" onClick={handleCorrect}>&#10003;</Select>
            </SelectWrapper>
        </Wrapper>
        </>
    );
};

export default App;
