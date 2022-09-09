import React, { useEffect, ChangeEvent } from 'react';
import { PropsWordpressForm } from '../../interfaces/PropsWordpressForm';
import { IWordpressMap } from '../../interfaces/IWordPressMap';
import TextInput from '../inputs/TextInput';
import NumberInput from '../inputs/NumberInput';
import { displayData } from '../../features/displayData';
import { fetchData } from '../../features/fetchData';
import { removeHtmlTags } from '../../features/removeHtmlTag';

export const WordPressForm = (props: PropsWordpressForm): JSX.Element => {
  useEffect(() => {
    fetchData(props.open, props.id, props.setDrawerData, props.url);
  }, [props.open]);

  useEffect(() => {
    displayData(props.varState, props.id, props.varData, props.setData);
  }, [props.varState]);

  return props.parsedData ? (
    <div className="form-container">
      {props.lang} HI
      <form onSubmit={props.onSubmit} className="form">
        {props.parsedData
          ?.filter(
            (element: IWordpressMap) =>
              props.wordpress_module_filter.includes(element?.ancetre) &&
              props.wordpress_module_filter.includes(element?.key)
          )
          ?.map((item: IWordpressMap, i) => (
            <div key={i}>
              {typeof item?.content === 'string' ? (
                <div className="input-margin">
                  <TextInput
                    defaultValue={removeHtmlTags(item?.content)}
                    label={item.key === 'rendered' ? item?.ancetre : item?.key}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      props.setTabInput(
                        item?.ancetre === props.custom_fields
                          ? {
                              ...props.tabInput,
                              [item.ancetre]: {
                                ...props.tabInput[item.ancetre],
                                [item?.key]: e.target.value,
                              },
                              status: props.draft,
                            }
                          : {
                              ...props.tabInput,
                              [item?.ancetre]: e.target.value,
                              status: props.draft,
                            }
                      );
                    }}
                  />
                </div>
              ) : typeof item?.content === 'number' ? (
                <div className="input-margin">
                  <NumberInput
                    inputLabel=""
                    defaultValue={item?.content}
                    label={item.key === 'rendered' ? item?.ancetre : item?.key}
                    name={item?.ancetre}
                    onChange={(e) => {
                      props.setTabInput(
                        item?.ancetre === props.custom_fields
                          ? {
                              ...props.tabInput,
                              [item.ancetre]: {
                                ...props.tabInput[item.ancetre],
                                [item?.key]: e.target.value,
                              },
                              status: props.draft,
                            }
                          : {
                              ...props.tabInput,
                              [item?.ancetre]: e.target.value,
                              status: props.draft,
                            }
                      );
                    }}
                  />
                </div>
              ) : null}
            </div>
          ))}
        <div className="form-btn">
          <button className="btn-send">send</button>
        </div>
      </form>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
