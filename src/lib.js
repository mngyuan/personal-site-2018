import * as React from 'react';

import './singlePhotoGallery.css';

export const importAll = r => r.keys().map(r);
// importAll(require.context('./photos2/asia', false, /\.(png|jpe?g|svg)$/));
export const importAllAsDict = r =>
  r
    .keys()
    .reduce(
      (agg, cur) => ({...agg, [cur]: <img key={cur} src={r(cur)} />}),
      {},
    );
export const importAllAsArray = r =>
  r.keys().reduce((agg, cur) => [...agg, <img key={cur} src={r(cur)} />], []);

export class SinglePhotoGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curPhoto: 0,
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className={`singlephotogallery-container ${this.props.className}`}>
          <div
            className="left"
            onClick={_ =>
              this.setState(prevState => ({
                curPhoto: Math.max(prevState.curPhoto - 1, 0),
              }))
            }
          />
          <div
            className="right"
            onClick={_ =>
              this.setState(prevState => ({
                curPhoto: Math.min(
                  prevState.curPhoto + 1,
                  this.props.photoElems.length - 1,
                ),
              }))
            }
          />
          {this.props.photoElems[this.state.curPhoto]}
        </div>
        <div className="mobileOnly">
          {this.props.photoElems.map((photoElem, i) => (
            <div key={i}>{photoElem}</div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
