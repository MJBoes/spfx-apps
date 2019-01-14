import * as React from 'react';
import styles from './Camera.module.scss';
import { ICameraProps } from './ICameraProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Camera extends React.Component<ICameraProps, {}> {
  public componentDidMount(){
    const video = document.querySelector('video');
    navigator.mediaDevices.getUserMedia({video: true})
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      });
  }

  public render(): React.ReactElement<ICameraProps> {
    return (
      <div className={ styles.camera }>
        {/* <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <video id="video-chat"></video>
              <p className={ styles.description }>{escape(this.props.targetList)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div> */}
        <video id="video-chat"></video>
      </div>
    );
  }
}
