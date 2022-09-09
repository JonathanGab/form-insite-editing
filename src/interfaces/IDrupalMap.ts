import { SetStateAction } from 'react';

export interface IDrupalMap {
  key: string;
  ancetre: string;
  parent: string;
  content: string | number;
  status: string;
}
