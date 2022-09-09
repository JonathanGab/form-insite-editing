import React, { useEffect, ChangeEvent } from 'react';
import TextInput from '../inputs/TextInput';
import NumberInput from '../inputs/NumberInput';
import { PropsDrupalForm } from '../../interfaces/PropsDrupalForm';
import { IDrupalMap } from '../../interfaces/IDrupalMap';
import { displayData } from '../../features/displayData';
import { fetchData } from '../../features/fetchData';
import { removeHtmlTags } from '../../features/removeHtmlTag';
export function DrupalForm(props: PropsDrupalForm): JSX.Element {
  useEffect(() => {
    fetchData(props.open, props.id, props.setDataBeforeIterate, props.url);
  }, [props.open]);

  useEffect(() => {
    displayData(
      props.dataBeforeIterate,
      props.id,
      props.dataAfterIterate,
      props.seDataAfterIterate
    );
  }, [props.dataBeforeIterate]);

  return props.emptyArray ? (
    <div>
      <form onSubmit={props.onSubmit}>
        {props.emptyArray
          ?.filter(
            (element: IDrupalMap) =>
              props.drupal_module_filter.includes(element?.ancetre) &&
              props.drupal_module_filter.includes(element?.key)
          )
          ?.map((item: IDrupalMap, i) => (
            <div key={i}>
              {typeof item?.content === 'string' ? (
                <TextInput
                  defaultValue={removeHtmlTags(item?.content)}
                  label={item.key}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    props.setInputDataObject(
                      item.parent === 'attributes'
                        ? {
                            ...props.inputDataObject,
                            type: 'node--article',
                            id: props.id,
                            [item.ancetre]: {
                              ...props.inputDataObject[item.ancetre],
                              [item.key]: e.target.value,
                            },
                          }
                        : {
                            ...props.inputDataObject,
                            type: 'node--article',
                            id: props.id,
                            [item.ancetre]: {
                              ...props.inputDataObject[item.ancetre],
                              [item.parent]: e.target.value,
                            },
                          }
                    );
                  }}
                />
              ) : null}
            </div>
          ))}
        <button>send</button>
      </form>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
