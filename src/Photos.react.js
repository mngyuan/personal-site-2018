import React from 'react';
import ReactDOM from 'react-dom';

import {importAll} from 'mngyuan-lib';

const photos = {
  asian: importAll(
    require.context('./photos2/asia', false, /\.(png|jpe?g|svg)$/),
  ),
  americana: importAll(
    require.context('./photos2/americana', false, /\.(png|jpe?g|svg)$/),
  ),
  before: importAll(
    require.context('./photos2/before', false, /\.(png|jpe?g|svg)$/),
  ),
  'the drive home': importAll(
    require.context('./photos2/drive home', false, /\.(png|jpe?g|svg)$/),
  ),
  family: importAll(
    require.context('./photos2/family', false, /\.(png|jpe?g|svg)$/),
  ),
  iceland: importAll(
    require.context('./photos2/iceland', false, /\.(png|jpe?g|svg)$/),
  ),
  'not for me': importAll(
    require.context('./photos2/not for me', false, /\.(png|jpe?g|svg)$/),
  ),
  'but you': importAll(
    require.context('./photos2/you', false, /\.(png|jpe?g|svg)$/),
  ),
  アイスクリーム: importAll(
    require.context('./photos2/ice cream', false, /\.(png|jpe?g|svg)$/),
  ),
  // unlinked
  contacts: importAll(
    require.context('./photos2/loose/contacts', false, /\.(png|jpe?g|svg)$/),
  ).reverse(),
  kchao: importAll(
    require.context('./photos2/loose/kchao', false, /\.(png|jpe?g|svg)$/),
  ),
  'kchao mf': importAll(
    require.context('./photos2/loose/kchao mf', false, /\.(png|jpe?g|svg)$/),
  ),
  nyc: importAll(
    require.context('./photos2/loose/nyc', false, /\.(png|jpe?g|svg)$/),
  ),
  soph: importAll(
    require.context('./photos2/loose/soph', false, /\.(png|jpe?g|svg)$/),
  ),
  hearst: importAll(
    require.context('./photos2/loose/hearst', false, /\.(png|jpe?g|svg)$/),
  ),
  mirror: importAll(
    require.context('./photos2/loose/mirror', false, /\.(png|jpe?g|svg)$/),
  ),
  haetam: importAll(
    require.context('./photos2/loose/haetam', false, /\.(png|jpe?g|svg)$/),
  ),
};

const PREAMBLES = {
  'kchao mf': (
    <div className="preamble" key="preamble">
      Fuji GA645i<br />
      Fujicolor Pro 400H<br />
      <br />with Kelley
      <br />05.27.18
    </div>
  ),
  hearst: (
    <div className="preamble" key="preamble">
      Canon F1-n<br />
      Kodak Portra 800<br />
      <br />
      Leica M8<br />
      <br />with Linda + Cathy + Lisa
      <br />05.03.18
    </div>
  ),
  nyc: (
    <div className="preamble" key="preamble">
      Canon F1-n<br />
      Multiple rolls of Kodak Portra 800<br />
      <br />with the boiz
      <br />05.12.18-05.24.18
    </div>
  ),
  mirror: (
    <div className="preamble" key="preamble">
      Canon 5DMk4<br />
      24-70L<br />
      <br />
      <br />with @senaponin, @thepigs, for @mcmintea
      <br />07.28.18
    </div>
  ),
  haetam: (
    <div className="preamble" key="preamble">
      Zeiss Ikon / Yashica T2 / Leica CL<br />
      Fuji 100 / 400H<br />
      <br />with @haewon_hwang, @brandonachau, @_christianle_
      <br />07.15.18
    </div>
  ),
};

export class Gallery extends React.Component {
  _photowrapperInner;

  _onWheel = e => {
    if (navigator.appVersion.indexOf('Macintosh') === -1) {
      e.preventDefault();
      const node = ReactDOM.findDOMNode(this._photowrapperInner);
      node.scrollLeft += e.deltaY;
    }
  };

  render() {
    return (
      <div className="page">
        <div
          className={`photowrapper ${this.props.vertical ? 'vertical' : ''}`}
        >
          <div
            className="photowrapperInner"
            ref={ref => (this._photowrapperInner = ref)}
            onWheel={this._onWheel}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

const Photos = props => {
  const {match} = props;
  console.log(match.params.set);
  const photoElems = photos[match.params.set].map(src => (
    <img key={src} src={src} />
  ));
  const elems = ([PREAMBLES[match.params.set]] || []).concat(photoElems);
  return <Gallery>{elems}</Gallery>;
};

export default Photos;
