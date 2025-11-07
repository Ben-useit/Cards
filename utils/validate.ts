export function hasEmptyEntries(
  arrays: string[][],
  selected: string
): {
  error: boolean;
  message: string;
} {
  if (!selected || selected === '')
    return { error: true, message: 'At least one record must be selected.' };
  const isSelectedItem = selected === 'new';

  const resultArray = [];
  for (let i = 0; i < arrays[0].length; i++) {
    const newArray = arrays.map((array) => array[i]);
    resultArray.push(newArray);
  }

  // if the row has an id no empty fields are allowed
  let result = {
    error: false,
    message: 'All good! ',
  };
  resultArray.some((v) => {
    if (v[0] !== '') {
      const notValid = v[1] === '' || v[2] === '' || v[3] === '';
      if (notValid) {
        result = {
          error: true,
          message: 'Existing records must be complete.',
        };
        return true;
      }
    } else {
      // the last row for a new entry is only valid if completely empty ( skip )
      // otherwise all fields must be filled.
      const emptyRecord = v[1] === '' && v[2] === '' && v[3] === '';
      const selected = isSelectedItem; // TODO
      if (emptyRecord) {
        if (selected) {
          result = {
            error: true,
            message: 'A selected record cannot be empty.',
          };
          return true;
        }
        return true;
      }
      const notValid = v[1] === '' || v[2] === '' || v[3] === '';
      if (notValid) {
        result = { error: true, message: 'A record must be complete' };
        return true;
      }
    }
  });
  return result;
}

export function isNoEntrySelected(a: string[]) {
  return a.length === 0;
}

export function hasIndexDuplicates(
  firstArray: string[],
  secondArray: string[]
): { error: boolean; message: string } {
  if (firstArray.length !== secondArray.length) {
    throw new Error('Both arrays must have the same length.');
  }

  const seenPairs = new Set();

  for (let i = 0; i < firstArray.length; i++) {
    // Create a pair string from both arrays at the current index
    const pair = `${firstArray[i]}-${secondArray[i]}`;

    // Check if the pair already exists
    if (seenPairs.has(pair)) {
      return { error: true, message: 'Duplicate record detected.' };
    }

    // Add the pair to the set
    seenPairs.add(pair);
  }

  return { error: false, message: 'No duplicates.' };
}
