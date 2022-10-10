import React from 'react';
import TextInput, { ITextInputProps } from '../TextInput';
import NumberInput, { INumberInputProps } from '../NumberInput';
import SelectInput, { ISelectProps } from '../SelectInput';
import Image, { IImageProps } from '../Image';
interface IGenericInputProps {
  type: string | number | boolean;
  itemAncetre: string;
  itemParent: string;
  itemKey: string;
  rows?: number;
  [x: string]: any;
}
export default function GenericInputWordPress({
  type,
  itemAncetre,
  itemParent,
  itemKey,
  ...props
}: IGenericInputProps): JSX.Element {
  switch (true) {
    case typeof type === 'string' && itemAncetre !== 'better_featured_image': {
      return <TextInput {...(props as ITextInputProps)} />;
    }
    case typeof type === 'number': {
      return <NumberInput {...(props as INumberInputProps)} />;
    }
    case typeof type === 'boolean': {
      return <SelectInput {...(props as ISelectProps)} />;
    }
    case itemAncetre === 'better_featured_image' &&
      itemParent === 'better_featured_image' &&
      itemKey === 'source_url': {
      return <Image {...(props as IImageProps)} />;
    }
    default: {
      return <></>;
    }
  }
}
