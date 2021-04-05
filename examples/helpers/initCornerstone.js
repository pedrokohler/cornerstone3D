// @TODO: Only using `cornerstone-tools` for `requestPoolManager` in `prefetchImageIds`
// This can be replaced w/ an implementation in render library
import dicomParser from 'dicom-parser';
import * as cornerstone from '@cornerstone';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import WADORSHeaderProvider from './WADORSHeaderProvider';

import { registerImageLoader, registerWebImageLoader } from '@cornerstone';
// ~~
import * as csTools3d from '@cornerstone-tools';

// Wire up listeners for renderingEngine's element enabled events
csTools3d.init();

window.cornerstone = cornerstone;
window.cornerstoneWADOImageLoader = cornerstoneWADOImageLoader;

cornerstone.metaData.addProvider(
WADORSHeaderProvider.get.bind(WADORSHeaderProvider),
  9999
);

cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneWADOImageLoader.configure({ useWebWorkers: true });

var config = {
  maxWebWorkers: navigator.hardwareConcurrency || 1,
  startWebWorkersOnDemand: false,
  taskConfiguration: {
    decodeTask: {
      initializeCodecsOnStartup: false,
      usePDFJS: false,
      strict: false,
    },
  },
};

cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
registerImageLoader(cornerstone);
registerWebImageLoader(cornerstone);
//volumeLoader(cornerstone);
