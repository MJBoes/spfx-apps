import * as React from 'react';
import styles from './stars.module.scss';
import { range } from 'lodash';

var possibleCombinationSum = (arr, n) => {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize);
    for (var i = 1; i < combinationsCount; i++) {
        var combinationSum = 0;
        for (var j = 0; j < listSize; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

const Stars = (props) => {
    return (
        <div className={styles.col5}>
            {range(props.numberOfStars).map(i =>
                <i key={i} className="ms-Icon ms-Icon--FavoriteStarFill"></i>
            )}
        </div>
    );
};

const Button = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button = <button className={styles.buttonSuccess} onClick={props.acceptAnswer}><i className="ms-Icon ms-Icon--Accept"></i></button>;
            break;
        case false:
            button = <button className={styles.buttonDanger}><i className="ms-Icon ms-Icon--CalculatorMultiply"></i></button>;
            break;
        default:
            button = <button className={styles.button} disabled={props.selectedNumbers.length === 0} onClick={props.checkAnswer}>=</button>;
            break;
    }
    return (
        <div className={styles.col2}>
            {button}<br />
            <button onClick={props.redraw} disabled={props.redraws === 0}><i className="ms-Icon ms-Icon--Refresh" /> {props.redraws}</button>
        </div>
    );
};

const Answer = (props) => {
    return (
        <div className="ms-Grid-col ms-sm5 ">
            <div className={styles.numbers}>
                {props.selectedNumbers.map((number, i) => <span key={i} onClick={() => props.unselectNumber(number)}>
                    {number}
                </span>)}
            </div>
        </div>
    );
};

const Numbers = (props) => {
    const numberClassName = (number) => {
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return styles.selected;
        }
        if (props.usedNumbers.indexOf(number) >= 0) {
            return styles.used;
        }
    };
    const list = range(1, 10);
    return (
        <div className={styles.card}>
            <div className={styles.numbers}>
                {list.map((number, i) =>
                    <span key={i} className={numberClassName(number)}
                        onClick={() => props.selectNumber(number)}>
                        {number}
                    </span>
                )}
            </div>
        </div>
    );
};

const DoneFrame = (props) => {
    return (<div className={styles.doneFrame}>
        <h2>{props.doneStatus}</h2>
        <button onClick={props.resetGame}>Play Again</button>
    </div>);
};

export class Game extends React.Component {
    private static randomNumber = () => 1 + Math.floor(Math.random() * 9);
    private static initialState = {
        selectedNumbers: [],
        numberOfStars: Game.randomNumber(),
        usedNumbers: [],
        answerIsCorrect: null,
        redraws: 5,
        doneStatus: null
    };
    public state=Game.initialState;
    private selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
        this.setState(prevState => ({
            // in video this.state is prevState
            answerIsCorrect: null,
            selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)
        }));
    }
    private unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            // in video this.state is prevState
            answerIsCorrect: null,
            selectedNumbers: this.state.selectedNumbers
                .filter(number => number !== clickedNumber)
        }));
    }
    private checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: this.state.numberOfStars === this.state.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    }
    private acceptAnswer = () => {
        this.setState(prevState => ({
            // in video this.state is prevState
            usedNumbers: this.state.usedNumbers.concat(this.state.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars: Game.randomNumber(),
        }),()=>{
            this.updateDoneStatus();
        });
    }
    private redraw = () => {
        if (this.state.redraws === 0) { return; }
        this.setState(prevState => ({
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars: Game.randomNumber(),
            redraws: this.state.redraws - 1
        }),()=>this.updateDoneStatus());
    }
    private possibleSolutions = ({ numberOfStars, usedNumbers }) => {
        const possibleNumbers = range(1, 10).filter(number =>
            usedNumbers.indexOf(number) === -1
        );
        return possibleCombinationSum(possibleNumbers, numberOfStars);
    }
    private updateDoneStatus = () => {
        this.setState(prevState => {
            if (this.state.usedNumbers.length === 9) {
                return { doneStatus: 'Done. Nice!' };
            }
            if (this.state.redraws === 0 && !this.possibleSolutions(this.state)) {
                return { doneStatus: 'Game Over!' };
            }
        });
    }
    private resetGame=()=>{
        this.setState(Game.initialState);
    }
    public render() {
        const { selectedNumbers, numberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus } = this.state;
        return (
            <div className="ms-Grid" dir="ltr">
                <h3>Play nine v1.0</h3>
                <div className={styles.row}>
                    <Stars numberOfStars={numberOfStars} />
                    <Button selectedNumbers={selectedNumbers}
                        checkAnswer={this.checkAnswer}
                        acceptAnswer={this.acceptAnswer}
                        answerIsCorrect={answerIsCorrect}
                        redraw={this.redraw}
                        redraws={redraws} />
                    <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber} />
                </div>
                <br />
                {doneStatus ? <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame} /> :
                    <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} usedNumbers={usedNumbers} />
                }
                <br />
            </div>
        );
    }
}
