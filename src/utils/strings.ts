import { Route } from '@/types';

export const getLineCode = (lineId: string): string => {
  const idChunks = lineId.split('-');
  if (idChunks.length > 1) {
    return idChunks.map((chunk) => chunk[0].toUpperCase()).join('');
  }
  return idChunks[0].toUpperCase();
};

export const getRouteSectionDesc = (routeSections: Route[]): string => {
  const route = routeSections[0];
  const points = [route.originationName, route.destinationName];
  return points.join(routeSections.length === 1 ? ' → ' : ' ⇄ ');
};
