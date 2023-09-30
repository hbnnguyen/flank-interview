import './filterselection.scss'

function FilterSelection({ options, selected, setSelected }) {
  const optionValues = options.map((o) => o.value);

  function handleClick(value) {
    // Handles single selection
    if (value === null) {
      setSelected([null]);
    } else if (selected.includes(null)) {
      setSelected([value]);
    } else if (selected.includes(value)) {
      const newSelected = selected.filter((v) => v !== value);
      setSelected(newSelected);
    } else {
      setSelected([...selected, value]);
    }

    // Handles range selection (assumes we want to select buttons by value rather than index)
    if (selected.length === 1 && selected[0] !== null && selected[0] !== value) {
      const valuesToAdd = [];

      // Forward case
      if (selected[0] < value) {
        optionValues.forEach((e) => {
          if (e < value && e > selected[0] && !selected.includes(e)) {
            valuesToAdd.push(e);
          }
        });
      }

      // Backward case
      if (selected[0] > value) {
        optionValues.forEach((e) => {
          if (e > value && e < selected[0] && !selected.includes(e)) {
            valuesToAdd.push(e);
          }
        });
      }

      setSelected([...selected, value, ...valuesToAdd]);
    }
  }

  return (
    <div className='options'>
      {options.map((option) => (
        <button
          type='button'
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={selected.includes(option.value) ? 'selected-button' : ''}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default FilterSelection;