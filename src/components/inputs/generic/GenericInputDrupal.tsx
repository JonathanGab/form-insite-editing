import React from 'react';
import TextInput, { ITextInputProps } from '../TextInput';
import NumberInput, { INumberInputProps } from '../NumberInput';
import SelectInput, { ISelectProps } from '../SelectInput';
import Image, { IImageProps } from '../Image';

interface IGenericInputProps {
  type: string | number | boolean;
  itemAncetre: string;
  itemGrandParent: string;
  itemParent: string;
  itemKey: string;
  drupal_string_input: string[];
  drupal_number_input: string[];
  drupal_boolean_input: string[];
  drupal_image_field: string[];
  [x: string]: any;
}

export default function GenericInputDrupal({
  type,
  itemAncetre,
  itemGrandParent,
  itemParent,
  itemKey,
  drupal_string_input,
  drupal_number_input,
  drupal_boolean_input,
  drupal_image_field,
  ...props
}: IGenericInputProps): JSX.Element {
  switch (true) {
    case typeof type === 'string' &&
      itemAncetre !== 'included' &&
      !drupal_string_input.includes(itemGrandParent): {
      return <TextInput {...(props as ITextInputProps)} />;
    }
    case typeof type === 'number' &&
      !drupal_number_input.includes(itemGrandParent): {
      return <NumberInput {...(props as INumberInputProps)} />;
    }
    case typeof type === 'boolean' &&
      drupal_boolean_input.includes(itemGrandParent): {
      return <SelectInput {...(props as ISelectProps)} />;
    }
    case drupal_image_field.includes(itemAncetre) &&
      drupal_image_field.includes(itemParent) &&
      drupal_image_field.includes(itemKey): {
      return <Image {...(props as IImageProps)} />;
    }
    default: {
      return <></>;
    }
  }
}
