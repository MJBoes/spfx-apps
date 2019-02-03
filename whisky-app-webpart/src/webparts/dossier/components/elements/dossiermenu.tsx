import * as React from 'react';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

export class DossierMenu extends React.Component<{}, {}> {
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
        // iconProps: {
        //   iconName: 'Add'
        // },
        ariaLabel: 'New. Use left and right arrow keys to navigate',
      },
      {
        key: 'bottlerList',
        name: 'Bottlers',
        iconProps: {
          iconName: 'Upload'
        },
        href: 'https://dev.office.com/fabric',
        ['data-automation-id']: 'uploadButton'
      },
      {
        key: 'brandList',
        name: 'Brands',
        iconProps: {
          iconName: 'Share'
        },
        onClick: () => console.log('Share')
      },
      {
        key: 'bottlingList',
        name: 'Bottlings',
        iconProps: {
          iconName: 'Download'
        },
        onClick: () => console.log('Download')
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