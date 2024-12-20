import type { Types } from '@cornerstonejs/core';
import { getToolGroup } from '../../store/ToolGroupManager';
import triggerAnnotationRenderForViewportIds from '../triggerAnnotationRenderForViewportIds';
import { getRenderingEngine } from '@cornerstonejs/core';
import { getBrushToolInstances } from './getBrushToolInstances';

export function setBrushThresholdForToolGroup(
  toolGroupId: string,
  threshold: Types.Point2,
  otherArgs: Record<string, unknown> = { isDynamic: false }
) {
  const toolGroup = getToolGroup(toolGroupId);

  if (toolGroup === undefined) {
    return;
  }

  const brushBasedToolInstances = getBrushToolInstances(toolGroupId);
  const configuration = {
    ...otherArgs,
    ...(threshold !== undefined && { threshold }),
  };

  brushBasedToolInstances.forEach((tool) => {
    tool.configuration.strategySpecificConfiguration.THRESHOLD = {
      ...tool.configuration.strategySpecificConfiguration.THRESHOLD,
      ...configuration,
    };
  });

  // Trigger an annotation render for any viewports on the toolgroup
  const viewportsInfo = toolGroup.getViewportsInfo();

  if (!viewportsInfo.length) {
    return;
  }

  const { renderingEngineId } = viewportsInfo[0];

  // Use helper to get array of viewportIds, or we just end up doing this mapping
  // ourselves here.
  const viewportIds = toolGroup.getViewportIds();

  const renderingEngine = getRenderingEngine(renderingEngineId);

  triggerAnnotationRenderForViewportIds(viewportIds);
}

export function getBrushThresholdForToolGroup(toolGroupId: string) {
  const toolGroup = getToolGroup(toolGroupId);

  if (toolGroup === undefined) {
    return;
  }

  const toolInstances = toolGroup._toolInstances;

  if (!Object.keys(toolInstances).length) {
    return;
  }

  const brushBasedToolInstances = getBrushToolInstances(toolGroupId);
  const brushToolInstance = brushBasedToolInstances[0];

  if (!brushToolInstance) {
    return;
  }

  // TODO -> Assumes the
  return brushToolInstance.configuration.strategySpecificConfiguration.THRESHOLD
    .threshold;
}
