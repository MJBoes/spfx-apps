import * as React from 'react';
import{ IDataCardContainerProps } from '../datacardcontainer';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

export class DossierMenu extends React.Component<IDataCardContainerProps, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <CommandBar
          items={this.getItems()}
          overflowItems={this.getOverlflowItems()}
          farItems={this.getFarItems()}
          //ariaLabel={'Use left and right arrow keys to navigate between commands'}
        />
      </div>
    );
  }

  // Data for CommandBar
  private getItems = () => {
    return [
      {
        key: 'distilleryList',
        name: 'Distilleries',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick: () => {
          this.props.setPage('list');
          this.props.setDosierType('Distilleries');
        }
      },
      {
        key: 'bottlerList',
        name: 'Bottlers',
        onClick: () => {
          this.props.setPage('list');
          this.props.setDosierType('Bottlers');
        }
      },
      {
        key: 'brandList',
        name: 'Brands',
        onClick: () => {
          this.props.setPage('list');
          this.props.setDosierType('Brands');
        }
      },
      {
        key: 'bottlingList',
        name: 'Bottlings',
        onClick: () => {
          this.props.setPage('list');
          this.props.setDosierType('Bottlings');
        }
      }
    ];
  }

  private getOverlflowItems = () => {
    return [
      {
        key: 'move',
        name: 'Move to...',
        onClick: () => console.log('Move to'),
        iconProps: {
          iconName: 'MoveToFolder'
        }
      },
      {
        key: 'copy',
        name: 'Copy to...',
        onClick: () => console.log('Copy to'),
        iconProps: {
          iconName: 'Copy'
        }
      },
      {
        key: 'rename',
        name: 'Rename...',
        onClick: () => console.log('Rename'),
        iconProps: {
          iconName: 'Edit'
        }
      }
    ];
  }

  private getFarItems = () => {
    return [
      {
        key: 'sort',
        name: 'Sort',
        iconProps: {
          iconName: 'SortLines'
        },
        onClick: () => console.log('Sort')
      },
      {
        key: 'tile',
        name: 'Grid view',
        iconProps: {
          iconName: 'Tiles'
        },
        iconOnly: true,
        onClick: () => console.log('Tiles')
      },
      {
        key: 'info',
        name: 'Info',
        iconProps: {
          iconName: 'Info'
        },
        iconOnly: true,
        onClick: () => console.log('Info')
      }
    ];
  }
}