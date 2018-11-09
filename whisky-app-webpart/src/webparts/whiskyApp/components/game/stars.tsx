import * as React from 'react';
import styles from './stars.module.scss';
import {range} from 'lodash';

const Stars = (props) => {
    const numberOfStars=1+Math.floor(Math.random()*9);

    return (
        <div className={styles.col5}>
            {range(numberOfStars).map(i=>
                <i key={i} className="ms-Icon ms-Icon--FavoriteStarFill"></i>
            )}
        </div>
    );
};

const Button = (props) => {
    return (
        <div className="ms-Grid-col ms-sm2">
            <button>...</button>
        </div>
    );
};

const Answer = (props) => {
    return (
        <div className="ms-Grid-col ms-sm5 ">
            <div className={styles.numbers}>
            <span>5</span>
            <span>6</span>
            </div>
        </div>
    );
};

const Numbers = (props) => {
    const list=range(1,10);
    return (
        <div className={styles.card}>
            <div className={styles.numbers}>
                {list.map((number,i)=>
                    <span key={i}>{number}</span>
                )}
            </div>
        </div>
    );
};

export class Game extends React.Component {
    public render() {
        return (
            <div className="ms-Grid" dir="ltr">
                <h3>Play nine</h3>
                <div className={styles.row}>
                    <Stars />
                    <Button />
                    <Answer />
                </div>
                <br/>
                <Numbers/>
                <br/>
            </div>
        );
    }
}
