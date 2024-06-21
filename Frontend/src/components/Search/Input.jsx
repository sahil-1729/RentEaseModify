import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FiltersContext from '../../context/filters';
const FixedTags = () => {
  const {setSearchValue}=React.useContext(FiltersContext)
  const fixedOptions = [
    // Location[6]
];
  const [value, setValue] = React.useState();

  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        const newValues = [
          ...fixedOptions,
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
        ];
      
        if (JSON.stringify(newValues) !== JSON.stringify(value)) {
          setValue(newValues);
      
          var sss = "";
          for (var i = 0; i < newValues.length; i++) {
            sss += newValues[i].station;
          }
          setSearchValue(sss);
        }
      }}
      
      options={Location}
      getOptionLabel={(option) => option.station}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.station}
            {...getTagProps({ index })}
            disabled={fixedOptions.indexOf(option) !== -1}
          />
        ))
      }
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Search" placeholder="Add more" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const Location = [
  { "station": "Borivali(W)" },
  { "station": "Borivali(E)" },
  { "station": "Andheri(W)" },
  { "station": "Andheri(E)" },
  { "station": "Malad(W)" },
  { "station": "Malad(E)" },
  { "station": "Kandivali(W)" },
  { "station": "Kandivali(E)" },
  { "station": "Goregaon(W)" },
  { "station": "Goregaon(E)" },
  { "station": "Vile Parle(W)" },
  { "station": "Vile Parle(E)" },
  { "station": "Santacruz(W)" },
  { "station": "Santacruz(E)" },
  { "station": "Khar(W)" },
  { "station": "Khar(E)" },
  { "station": "Bandra(W)" },
  { "station": "Bandra(E)" }, 
  { "station": "Mumbai Central" }

];

export default FixedTags