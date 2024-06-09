import { useFormikContext } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';

import ErrorMessage from './ErrorMessage';

export default function FormDropdown(props) {
  const { submitCount, errors, setFieldValue, values } = useFormikContext();

  const isFormFieldInvalid = (name) => errors[name] && submitCount > 0;

  const onChange = (e) => {
    setFieldValue(props.name, e.target.value);

    if (props.onChange) {
      props.onChange(e);
    }
  };

  const input = (
    <Dropdown
      {...props}
      value={values?.[props.name]}
      optionLabel={props.optionLabel || 'name'}
      onChange={onChange}
      className={classNames(
        {
          'form-error': isFormFieldInvalid(props.name),
        },
        'form-input-primary w-full h-8 lg:h-10 items-center disabled:placeholder-gray-300 disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed',
        props.className
      )}
      disabled={props.disabled ? true : false}
      showClear={props.showClear ? true : false}
    />
  );

  const withLabel = (
    <div className="w-full">
      {props.layout === 'vertical' ? (
        <div className="flex flex-col w-full grid-cols-2">
          <div className="flex items-center w-full">
            <label
              className={classNames(
                {
                  'text-dark-secondary': !isFormFieldInvalid(props.name),
                  'text-[#FF808B]': isFormFieldInvalid(props.name),
                },
                'font-medium items-center'
              )}
            >
              {props.label}
            </label>
          </div>

          {input}
        </div>
      ) : (
        <div className="flex flex-row  w-full grid-cols-2">
          <div
            className={`flex items-center ${
              props.layout === 'vertical' ? 'w-full' : 'w-1/3'
            }`}
          >
            <label
              className={classNames(
                {
                  'text-dark-secondary': !isFormFieldInvalid(props.name),
                  'text-[#FF808B]': isFormFieldInvalid(props.name),
                },
                'font-medium items-center'
              )}
            >
              {props.label}
            </label>
          </div>

          {input}
        </div>
      )}

      {errors && errors[props.name] && submitCount > 0 && (
        <ErrorMessage text={errors[props.name]} />
      )}
    </div>
  );

  const withoutLabel = (
    <>
      <div className="flex flex-col  w-full gap-2 grid-cols-2">
        {input}
        {errors && errors[props.name] && submitCount > 0 && (
          <ErrorMessage text={errors[props.name]} />
        )}
      </div>
    </>
  );

  return props.label ? withLabel : withoutLabel;
}
