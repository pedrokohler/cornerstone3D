import { createSynchronizer } from '../../store/SynchronizerManager';
import { Enums } from '@cornerstonejs/core';
import Synchronizer from '../../store/SynchronizerManager/Synchronizer';
import rotationSyncCallback from '../callbacks/rotationSyncCallback';

const { CAMERA_MODIFIED } = Enums.Events;

/**
 * A helper that creates a new `Synchronizer` which listens to the `CAMERA_MODIFIED`
 * rendering event and calls the `cameraSyncCallback`.
 *
 * @param synchronizerName - The name of the synchronizer.
 * @returns A new `Synchronizer` instance.
 */
export default function createRotationSynchronizer(
  synchronizerName: string
): Synchronizer {
  const rotateSynchronizer = createSynchronizer(
    synchronizerName,
    CAMERA_MODIFIED,
    rotationSyncCallback
  );

  return rotateSynchronizer;
}
