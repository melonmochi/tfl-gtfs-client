import { tfl } from '@/utils';

const getLines = (): string => tfl.tlfApi('/line/route');

// eslint-disable-next-line import/prefer-default-export
export { getLines };
