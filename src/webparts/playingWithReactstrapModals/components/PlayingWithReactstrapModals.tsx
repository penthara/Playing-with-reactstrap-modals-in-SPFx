import * as React from 'react';
import styles from './PlayingWithReactstrapModals.module.scss';
import { IPlayingWithReactstrapModalsProps } from './IPlayingWithReactstrapModalsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import TravelRequestInfo from './TravelRequestInfo';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PlayingWithReactstrapModals extends React.Component<IPlayingWithReactstrapModalsProps, {}> {
  public render(): React.ReactElement<IPlayingWithReactstrapModalsProps> {
    console.log("props are", this.props);
    return (    
      <>
          <TravelRequestInfo siteUrl={this.props.siteUrl} context={this.props.context}/>
      </>
    )
  }
}
