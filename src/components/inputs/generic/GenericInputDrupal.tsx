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
  drupal_string_input: string[];
  drupal_number_input: string[];
  drupal_boolean_input: string[];
  [x: string]: any;
}

export default function GenericInputDrupal({
  type,
  itemAncetre,
  itemParent,
  itemKey,
  drupal_string_input,
  drupal_number_input,
  drupal_boolean_input,
  ...props
}: IGenericInputProps): JSX.Element {
  switch (true) {
    case typeof type === 'string' &&
      //. if itemAncetre is strictly equal to included
      itemAncetre !== 'included' &&
      //. if drupal_string_input array doesn't includes itemKey
      !drupal_string_input.includes(itemKey) &&
      itemParent !== 'meta': {
      return <TextInput {...(props as ITextInputProps)} />;
    }
    case typeof type === 'number' &&
      //. if drupal_number_input array from config doesn't includes itemParent
      !drupal_number_input.includes(itemParent): {
      return <NumberInput {...(props as INumberInputProps)} />;
    }
    case typeof type === 'boolean' &&
      //. if drupal_boolean_input array includes itemKey
      drupal_boolean_input.includes(itemKey): {
      return <SelectInput {...(props as ISelectProps)} />;
    }
    case itemAncetre.includes('field_'): {
      return <Image {...(props as IImageProps)} />;
    }
    default: {
      //. return nothing
      return <></>;
    }
  }
}
