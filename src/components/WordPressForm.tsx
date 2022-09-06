import React, { useEffect } from 'react';
import { PropsForm } from '../interfaces/PropsForm';
import { IMap } from '../interfaces/IMap';
import TextInput from './TextInput';
import { displayData } from '../features/displayData';
import { fetchData } from '../features/fetchData';

export const WordPressForm = (props: PropsForm): JSX.Element => {
  useEffect(() => {
    fetchData(props.open, props.id, props.setDrawerData, props.url);
  }, []);

  useEffect(() => {
    displayData(props.varState, props.id, props.varData, props.setData);
  }, [props.varState]);

  return props.parsedData ? (
    <div className="form-container">
      {props.lang} HI
      <form onSubmit={props.onSubmit} className="form">
        {props.parsedData
          ?.filter(
            (element: IMap) =>
              props.wordpress_module_filter.includes(element?.ancetre) &&
              props.wordpress_module_filter.includes(element?.key)
          )
          ?.map((item: IMap, i) => (
            <div key={i}>
              <div className="input-margin">
                <TextInput
                  defaultValue={item?.content}
                  label={item.key === 'rendered' ? item?.ancetre : item?.key}
                  name={item?.ancetre}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    props.setTabInput(
                      item?.ancetre === props.custom_fields
                        ? {
                            ...props.tabInput,
                            [item.ancetre]: { [item?.key]: e.target.value },
                            status: 'darft',
                          }
                        : {
                            ...props.tabInput,
                            [item?.ancetre]: e.target.value,
                            status: 'draft',
                          }
                    );
                  }}
                />
              </div>
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
