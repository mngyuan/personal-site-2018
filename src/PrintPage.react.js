import {importAllAsArray, importAllAsDict, SinglePhotoGallery} from './lib';
import React from 'react';
import Helmet from 'react-helmet';

import Print from './Print';
import {Gallery} from './Photos.react';
import Topbar from './Topbar.react';

export const STORIES = {
  'oakland-just-yesterday': importAllAsArray(
    require.context(
      './stories/oakland-just-yesterday',
      false,
      /\.(png|jpe?g|svg)$/,
    ),
  ),
  ghosts: importAllAsArray(
    require.context('./stories/ghosts', false, /\.(png|jpe?g|svg)$/),
  ),
  milkfat: importAllAsArray(
    require.context('./stories/milkfat', false, /\.(png|jpe?g|svg)$/),
  ),
  'those-years-will-come-someday': importAllAsDict(
    require.context(
      './stories/those-years-will-come-someday',
      false,
      /\.(png|jpe?g|svg)$/,
    ),
  ),
};

const PrintPage = (props: {match: {params: {[string]: string}}}) => {
  const {match} = props;
  const photoElems = STORIES[match.params.set];
  const gallery =
    match.params.set === 'milkfat' ? (
      <div className="page">
        <div className="photowrapper">
          <SinglePhotoGallery
            className="photowrapperInner single"
            photoElems={[
              <React.Fragment>
                <div className="preamble">
                  milkfat<br />
                  zine<br />
                  <br />
                  milkfat is a celebration of dairy and dairy-related packaging,
                  <br />
                  and an excuse to compile fresh photos.
                  <br />07.28.18
                </div>
                {photoElems[0]}
              </React.Fragment>,
              ...photoElems.slice(1),
            ]}
          />
        </div>
      </div>
    ) : (
      <Gallery>{Print[match.params.set](photoElems)}</Gallery>
    );
  return (
    <React.Fragment>
      <Helmet title="print · Kevin Lee" />
      <div className="story">{gallery}</div>
      <Topbar />
    </React.Fragment>
  );
};

export default PrintPage;
