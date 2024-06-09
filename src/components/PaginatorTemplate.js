import { Dropdown } from 'primereact/dropdown';

const paginatorTemplate = {
  layout:
    'CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown',
  CurrentPageReport: (options) => {
    return (
      <div className="flex w-full lg:!flex lg:w-100 justify-center mb-3">
        <span className="text-[#595977]">
          Showing {options.first} to {options.last} of {options.totalRecords}{' '}
          entries
        </span>
      </div>
    );
  },
  RowsPerPageDropdown: (options) => {
    return (
      <Dropdown
        value={options.value}
        options={options.options.map((o) => ({
          label: `Show ${o.value} items`,
          value: o.value,
        }))}
        onChange={options.onChange}
        className="mt-3 md:mt-0"
      />
    );
  },
};

export default paginatorTemplate;
