export type Mode =
  | 'bus'
  | 'cable-car'
  | 'dlr'
  | 'national-rail'
  | 'overground'
  | 'river-bus'
  | 'tflrail'
  | 'tram'
  | 'tube';
export type Direction = 'inbound' | 'outbound';
export type ServiceTypeName = 'regular' | 'night';
export type ServiceTypeDetalleName = 'Regular' | 'Night';
export interface Tfl {
  $type: string;
}
export interface TflRoute extends Tfl {
  destination: string;
  destinationName: string;
  direction: Direction;
  name: string;
  originationName: string;
  originator: string;
  serviceType: ServiceTypeName;
  validFrom: string;
  validTo: string;
}
export type Route = Omit<TflRoute, '$type'>;
export interface TflServiceTypeDetalle extends Tfl {
  name: ServiceTypeDetalleName;
  uri: string;
}
export type ServiceTypeDetalle = Omit<TflServiceTypeDetalle, '$type'>;
export interface TflLine extends Tfl {
  created: string;
  crowding: Tfl;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disruptions: any[];
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lineStatuses: any[];
  modeName: Mode;
  modified: string;
  name: string;
  routeSections: Route[];
  serviceTypes: ServiceTypeDetalle[];
}
export type Line = Omit<
  TflLine,
  '$type' | 'crowding' | 'disruptions' | 'lineStatuses'
>;
export type LineColor =
  | 'magenta'
  | 'red'
  | 'volcano'
  | 'orange'
  | 'gold'
  | 'lime'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple';
