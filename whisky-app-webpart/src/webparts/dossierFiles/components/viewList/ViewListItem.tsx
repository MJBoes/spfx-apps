import * as React from 'react';
import { IViewListItemProps } from '../IComponentProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';

export default class ViewListItem extends React.Component<IViewListItemProps, {}> {
    constructor(props: IViewListItemProps) {
        super(props);
        this._onSelect=this._onSelect.bind(this);
        this._createMarkup=this._createMarkup.bind(this);
    }
    public render(): JSX.Element {
        return (
            <div className="ms-ListBasicExample-itemCell" data-is-focusable={true} onClick={this._onSelect}>
                {/* <Image className="ms-ListBasicExample-itemImage" src={this.props.item.iconurl} width={50} height={50} imageFit={ImageFit.cover} /> */}
                <div className="ms-ListBasicExample-itemContent">
                    <div className="ms-ListBasicExample-itemName">{this.props.item.title}</div>
                    {/* <div className="ms-ListBasicExample-itemIndex">{`Item ${index}`}</div> */}
                    {/* <div className="ms-ListBasicExample-itemDesc truncate">{this.props.item.description}</div> */}
                    <div className="ms-ListBasicExample-itemDesc truncate" dangerouslySetInnerHTML={this._createMarkup()} />
                </div>
                <Icon className="ms-ListBasicExample-chevron" iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} />
            </div>
        );
    }
    private _createMarkup(){
        return {__html: this.props.item.description};
    }
    private _onSelect(){
        this.props.onSelectItem(this.props.item);
    }
}