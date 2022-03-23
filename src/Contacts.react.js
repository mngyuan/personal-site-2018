import * as React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';

import {importAll} from './lib';
import Topbar from './Topbar.react';
import {SETS} from './Photos.react';

const getFileNameFromPath = (s: string): string => s.split('/').reverse()[0];

export const CONTACT_SETS = {
  ...SETS,
  'nyc-cinestill': {
    ...SETS['nyc-cinestill'],
    thumbs: importAll(
      require.context(
        './photos/nyc-cinestill/thumbs',
        false,
        /\.(png|jpe?g|svg)$/,
      ),
    ),
    info: {
      setName: '@lumohn at timesquare',
      filmstock: 'CINESTILL800',
      rollNumber: '29 & 30/',
      rollTotal: 'of an ongoing series',
      flavorText: 'art direction by @antoinette.chow',
      downloadExists: true,
      location: '纽约',
    },
  },
  'to-matt': {
    ...SETS['to-matt'],
    thumbs: importAll(
      require.context('./photos/to-matt/thumbs', false, /\.(png|jpe?g|svg)$/),
    ),
    info: {
      setName: 'best of',
      filmstock: 'FILM & DIGITAL',
      rollNumber: '00',
      rollTotal: 'of an ongoing series',
      flavorText: 'for matt',
      location: '奥克兰',
    },
  },
  chloe: {
    ...SETS['chloe'],
    thumbs: importAll(
      require.context('./photos/chloe/thumbs', false, /\.(png|jpe?g|svg)$/),
    ),
    info: {
      setName: '@ch1oup',
      filmstock: 'FUJI X',
      rollNumber: '00',
      rollTotal: 'of an ongoing series',
      flavorText: 'bushwick',
      location: '布鲁克林',
    },
  },
  'nyc-eva': {
    ...SETS['nyc-eva'],
    thumbs: importAll(
      require.context('./photos/nyc-eva/thumbs', false, /\.(png|jpe?g|svg)$/),
    ),
    info: {
      setName: 'with eva',
      filmstock: 'FUJI 400H',
      rollNumber: '31/',
      rollTotal: 'of an ongoing series',
      flavorText: 'X',
      location: '纽约',
      downloadExists: true,
      coverPhotoIndex: 11,
    },
  },
  'lisa-at-home': {
    ...SETS['lisa-at-home'],
    thumbs: importAll(
      require.context(
        './photos/lisa-at-home/thumbs',
        false,
        /\.(png|jpe?g|svg)$/,
      ),
    ),
    info: {
      setName: 'lisa at home',
      filmstock: '5D3',
      rollNumber: '/',
      rollTotal: 'of an ongoing series',
      flavorText: '35L',
      location: '伯克利',
      downloadExists: true,
      coverPhotoIndex: 10,
    },
  },
  'nyc-antoinette': {
    ...SETS['nyc-antoinette'],
    thumbs: importAll(
      require.context(
        './photos/nyc-antoinette/thumbs',
        false,
        /\.(png|jpe?g|svg)$/,
      ),
    ),
    info: {
      setName: 'to antoinette',
      filmstock: 'fujicolor 100 & 200',
      rollNumber: '26-28/',
      rollTotal: 'of an ongoing series',
      flavorText: 'portra 400 & 800',
      location: '纽约',
      downloadExists: true,
      coverPhotoIndex: 10,
    },
  },
};

class ContactSheet extends React.PureComponent<
  {
    photos: Array<string>,
    children: React.Node,
    downloadLink: string,
    info?: {
      setName: string,
      filmstock: string,
      rollNumber: string,
      flavorText: string,
      location: string,
      downloadExists?: boolean,
      coverPhotoIndex?: number,
    },
  },
  {currentPhotoIndex: number},
> {
  state = {
    currentPhotoIndex: this.props.info
      ? this.props.info.coverPhotoIndex || 0
      : 0,
  };

  render() {
    return (
      <div className="contactSheet">
        <div className="currentPhotoModal">
          <img
            src={this.props.photos[this.state.currentPhotoIndex]}
            width="100%"
          />
        </div>
        <div className="contactSheetHeader">
          {this.props.info ? (
            <React.Fragment>
              <div className="headerInfo">
                {this.props.info.setName}
                <br />/
              </div>
              <div className="headerInfo secondary">
                {this.props.info.filmstock}
              </div>
              <div className="headerInfo">
                {this.props.info.rollNumber}
                <br />
                <span className="small">{this.props.info.rollTotal}</span>
              </div>
              <div className="headerInfo secondary">
                {this.props.info.flavorText}
              </div>
              <div className="headerInfo">{this.props.info.location}</div>
            </React.Fragment>
          ) : null}
        </div>
        <div className="frames">
          {this.props.thumbs.map((src, i) => (
            <div
              className="frame"
              onClick={() => this.setState({currentPhotoIndex: i})}
            >
              <img src={src} />
              <span className="fileName">
                {getFileNameFromPath(src).split('.')[0] + '.JPG'}
              </span>
            </div>
          ))}
        </div>
        {this.props.info.downloadExists && this.props.downloadLink ? (
          <Link
            className="downloadLink desktopOnly"
            to={this.props.downloadLink}
            target="_blank"
          >
            {this.props.downloadLink}
          </Link>
        ) : null}
      </div>
    );
  }
}

const Contacts = (props: {
  match: {url: string, params: {set: string, downloadable: string}},
}) => {
  const queryParams =
    URLSearchParams && typeof URLSearchParams === 'function' // not in IE
      ? new URLSearchParams(window.location.search)
      : null;
  const downloadable = queryParams ? queryParams.get('downloadable') : false;
  const {set} = props.match.params;
  const humanFriendlySetName = set.replace(/-/g, ' ');
  return (
    <React.Fragment>
      <Helmet title={`${humanFriendlySetName} | contact sheet · Kevin Lee`}>
        <meta property="og:title" content={humanFriendlySetName} />
        <meta
          property="og:image"
          content={
            CONTACT_SETS[set].photos[
              CONTACT_SETS[set].info.coverPhotoIndex || 0
            ]
          }
        />
      </Helmet>
      <div className="page black film">
        <ContactSheet
          photos={CONTACT_SETS[set].photos}
          thumbs={CONTACT_SETS[set].thumbs}
          downloadLink={downloadable ? `/photos/contacts/${set}.zip` : null}
          info={CONTACT_SETS[set].info}
        />
      </div>
      <Topbar black />
    </React.Fragment>
  );
};

export default Contacts;
