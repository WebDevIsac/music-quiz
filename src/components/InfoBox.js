import React, { useState } from 'react';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
    position: relative;
`;

const Button = styled('button')`
    color: white;
    background-color: blueviolet;
    border: none;
    height: 40px;
    width: 160px;
    position: relative;
    z-index: 2;
`;

const Box = styled('div')`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 80vh;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: blueviolet;
    max-height: 0;
    overflow: hidden;
    transition: all 500ms ease;
    max-width: 0;
    max-height: 40px;

    @keyframes animateShow {
        0% {
            max-width: 0;
            max-height: 40px;
        }
        
        35% {
            max-width: 80%;
            max-height: 40px;
            padding: 16px;
        }
        
        100% {
            max-width: 80%;
            max-height: 80vh;
            padding: 16px;
        }
    }
    
    @keyframes animateHide {
        0% {
            max-width: 80%;
            max-height: 80vh;
            padding: 16px;
        }
        
        65% {
            max-width: 80%;
            max-height: 40px;
            padding: 16px;
        }
        
        100% {
            max-width: 0;
            max-height: 40px;
        }
    }

    &.show {
        animation: animateShow 1200ms ease-in forwards;
    }
    
    &.hide {
        animation: animateHide 1200ms ease-out forwards;
    }
`;


const InfoBox = () => {
    const [showInfo, setShowInfo] = useState();

    return (
        <Wrapper>
            <Button onClick={() => setShowInfo(!showInfo)}>HOW DOES IT WORK?</Button>
            <Box className={showInfo ? 'show' : showInfo === false ? 'hide' : ''}>
                <span>This is game</span>
                <span>This is game</span>
                <span>This is game</span>
                <span>This is game</span>
                <span>This is game</span>
                <span>This is game</span>
                <span>This is game</span>
            </Box>
        </Wrapper>
    );
};

export default InfoBox;
