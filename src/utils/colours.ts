import { LineColor, Mode, ServiceTypeDetalleName } from '@/types';

const lineColours: LineColor[] = [
  'red',
  'blue',
  'magenta',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'purple',
  'cyan',
];

const modes: Mode[] = [
  'bus',
  'cable-car',
  'dlr',
  'national-rail',
  'overground',
  'river-bus',
  'tflrail',
  'tram',
  'tube',
];

const serviceTypeColours = {
  Regular: '#B19693',
  Night: '#1C1C1C',
};

export const getLineColour = (modeName: Mode): LineColor => {
  const index = modes.indexOf(modeName);
  if (index) {
    return lineColours[index % lineColours.length];
  }
  return lineColours[0];
};

export const getServiceTypeColour = (
  serviceTypeName: ServiceTypeDetalleName
): string => serviceTypeColours[serviceTypeName] || 'blue';
