import * as React from 'react';
import { IMainProps } from './IMainProps';
import { ItemList } from './itemlist/itemlist';
import styles from './Main.module.scss';
import { DossierService,IDossierService } from '../whiskyservice/dossierservice';
import { CommandBarBasicExample } from './elements/CommandBar';

export class Main extends React.Component<IMainProps, {}> {
    constructor(props: IMainProps) {
        super(props);
    }

    public componentDidMount(): void {
        //this.props.dataService.loadData();
    }
    

    public render(): JSX.Element {
        const { currentPage, dataService } = this.props;
        return (
            <div>
                <CommandBarBasicExample/>
                { currentPage ==='distillerylist' && <ItemList />}
            </div>
        );
    }
}