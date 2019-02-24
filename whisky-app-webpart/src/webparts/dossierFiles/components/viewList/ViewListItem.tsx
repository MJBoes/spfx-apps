import * as React from 'react';
import { IViewListItemProps } from '../IComponentProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';

export default class ViewListItem extends React.Component<IViewListItemProps, {}> {
    constructor(props: IViewListItemProps) {
        super(props);
        this._onSelect=this._onSelect.bind(this);
    }
    public render(): JSX.Element {
        return (
            <div className="ms-ListBasicExample-itemCell" data-is-focusable={true} onClick={this._onSelect}>
                {/* <Image className="ms-ListBasicExample-itemImage" src={item.imageurl} width={50} height={50} imageFit={ImageFit.cover} /> */}
                <div className="ms-ListBasicExample-itemContent">
                    <div className="ms-ListBasicExample-itemName">{this.props.item.shortname}</div>
                    {/* <div className="ms-ListBasicExample-itemIndex">{`Item ${index}`}</div> */}
                    <div className="ms-ListBasicExample-itemDesc truncate">{this.props.item.description}</div>
                </div>
                <Icon className="ms-ListBasicExample-chevron" iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} />
            </div>
        );
    }
    private _onSelect(){
        this.props.onSelectItem(this.props.item);
    }
}