import * as React from 'react';
import styles from './stars.module.scss';

const Stars = (props) => {
    return (
        <div className={styles.col5}>
            <i className="ms-Icon ms-Icon--FavoriteStarFill"></i>
            <i className="ms-Icon ms-Icon--FavoriteStarFill"></i>
            <i className="ms-Icon ms-Icon--FavoriteStarFill"></i>
            <i className="ms-Icon ms-Icon--FavoriteStarFill"></i>
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
        <div className="ms-Grid-col ms-sm5">
            ...
        </div>
    );
};

const Numbers = (props) => {
    return (
        <div className={styles.card}>
            <span>1</span>
            <span className={styles.selected}>2</span>
            <span>3</span>
            <span className={styles.used}>4</span>
            <span>5</span>
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
