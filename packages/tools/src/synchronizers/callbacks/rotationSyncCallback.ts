import { getRenderingEngine, StackViewport, Types } from '@cornerstonejs/core';
import { Synchronizer } from '../../store';

/**
 * Synchronizer callback to synchronize the camera. Synchronization
 *
 * @param synchronizerInstance - The Instance of the Synchronizer
 * @param sourceViewport - The list of IDs defining the source viewport.
 * @param targetViewport - The list of IDs defining the target viewport, different
 *   from sourceViewport
 */
export default function rotationSyncCallback(
  synchronizerInstance: Synchronizer,
  sourceViewport: Types.IViewportId,
  targetViewport: Types.IViewportId
): void {
  const renderingEngine = getRenderingEngine(targetViewport.renderingEngineId);
  if (!renderingEngine) {
    throw new Error(
      `No RenderingEngine for Id: ${targetViewport.renderingEngineId}`
    );
  }

  const tViewport = renderingEngine.getViewport(targetViewport.viewportId);
  const sViewport = renderingEngine.getViewport(sourceViewport.viewportId);

  if (tViewport instanceof StackViewport) {
    const srcRotation = sViewport.getRotation();
    tViewport.setProperties({ rotation: srcRotation });
  }

  tViewport.render();
}
