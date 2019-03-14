import * as React from 'react';
import { IViewItemProps, IDossierItemDetails } from '../IDossierFilesProps';

export default class DossierItem extends React.Component<IViewItemProps> {
  private _item: IDossierItemDetails;

  constructor(props: IViewItemProps) {
    //, setPage(pageType: string, dossierType: string)
    super(props);
  }

  public componentDidMount() {
    console.log('DossierItem componentDidMount');
    this.props.setCurrentDossier("","");
  }

  public render(): React.ReactElement<IViewItemProps> {
    const _title: string = this.props.dataProvider.currentDossierItem!=null ? this.props.dataProvider.currentDossierItem.title : 'Waiting...';
    return (
      <div>
        Item view {_title}
      </div>
    );
  }
}
