/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLines } from '@/api';
import { useState } from 'react';
import useSWR from 'swr';

type Mode = 'bus' | 'tube';
type Direction = 'inbound' | 'outbound';
type ServiceTypeName = 'regular' | 'night';
type ServiceTypeDetalleName = 'Regular' | 'Night';

interface Tfl {
  $type: string;
}

interface TflRoute extends Tfl {
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

type Route = Omit<TflRoute, '$type'>;

interface TflServiceTypeDetalle extends Tfl {
  name: ServiceTypeDetalleName;
  uri: string;
}

type ServiceTypeDetalle = Omit<TflServiceTypeDetalle, '$type'>;

interface TflLine extends Tfl {
  created: string;
  crowding: Tfl;
  disruptions: any[];
  id: string;
  lineStatuses: any[];
  modeName: Mode;
  modified: string;
  name: string;
  routeSections: Route[];
  serviceTypes: ServiceTypeDetalle[];
}

type Line = Omit<
  TflLine,
  '$type' | 'crowding' | 'disruptions' | 'lineStatuses'
>;

const useLines = (): { lines: Line[]; error: any; loading: boolean } => {
  const [lines, setLines] = useState<Line[]>([]);

  const onSuccess = (data: any) => {
    if (data?.length)
      setLines(
        data.map((line: any) => ({
          created: line.created,
          id: line.id,
          modeName: line.modeName,
          modified: line.modified,
          name: line.name,
          routeSections: line.routeSections.map((route: any) => ({
            destination: route.destination,
            destinationName: route.destinationName,
            direction: route.direction,
            name: route.name,
            originationName: route.originationName,
            originator: route.originator,
            serviceType: route.serviceType,
            validFrom: route.validFrom,
            validTo: route.validTo,
          })),
          serviceTypes: line.serviceTypes.map((serviceType: any) => ({
            name: serviceType.name,
            uri: serviceType.uri,
          })),
        }))
      );
  };

  const { error, isValidating } = useSWR(getLines(), {
    onSuccess,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { lines, error, loading: isValidating };
};

export default useLines;
