import React, { useState } from 'react';
import styles from './test.module.css';
import { Button, Checkbox, colors, FormControl, FormControlLabel, FormHelperText, FormLabel, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';

const calculateAge = (dob) => {
  return dayjs().diff(dob, 'year');
}

const nameReg = new RegExp("^[A-Za-zÀ-Ỿà-ỿ\s-]+$");

const Test = () => {
  const [formState, setFormState] = useState({
    name: '',
    sex: '',
    dob: null,
    hobby: {
      orange: false,
      black: false,
      yellow: false
    }
  });
  const [userList, setUserList] = useState([]); 
  const [error, setErrors] = useState({});

  const handleTextChange = (event) => {
    setFormState({...formState, name: event.target.value});
    if(event.target.value.trim() == ''){
      setErrors({...error, name: "Name must not be empty."});
    }
    else if(nameReg.exec(event.target.value)) {
      setErrors({...error, name: ''});
    }else{
      setErrors({...error, name: "Name is not written correctly."});
    }
  }

  const validateForm = (currentState) => {
    let newErrors = {};
    let isValid = true;

    if (!currentState.name.trim()) {
      newErrors.name = "Name must not be empty.";
      isValid = false;
    } else if (!nameReg.test(currentState.name)) {
      newErrors.name = "Name is not written correctly.";
      isValid = false;
    }

    if (!currentState.sex) {
      newErrors.sex = "Please select your sex.";
      isValid = false;
    }

    if (!currentState.dob) {
      newErrors.dob = "Please select your date of birth.";
      isValid = false;
    } else if (calculateAge(currentState.dob) < 18) {
      newErrors.dob = "User must be 18 or older.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if(validateForm(formState)){
      setUserList(prevList => [...prevList, formState]);
      setFormState({
        name: '',
        sex: '',
        dob: null,
        hobby: { orange: false, black: false, yellow: false }
      });
      setErrors({});
    }
  }

  const handleRadioChange = (event) => {
    setFormState({...formState, sex: event.target.value});
    setErrors({...error, sex: ''})
  };

  const handleDateChange = (date) => {
    setFormState({...formState, dob: date});
    if(calculateAge(date) >= 18){
      setErrors({...error, dob: ''});
    }else{
      setErrors({...error, dob: 'User must be 18 or older.'});
    }
  };

  const handleCheckboxChange = (event) => {
    setFormState({...formState, hobby: {...formState.hobby, [event.target.name]: event.target.checked}});
  };

  return(
    <Stack direction="row"  >
      <FormControl className={styles.test} sx={{width: '50%', padding: '20px'}}>
      
        <FormLabel id="nameLabel" sx={{marginTop: '10px', marginBottom: '10px'}}>Name</FormLabel>
        <TextField 
          required 
          id='name' 
          aria-labelledby="nameLabel"
          value={formState.name} 
          onChange={handleTextChange}
        />
        <FormHelperText sx={{color: 'red'}}>{error.name}</FormHelperText>
        
        <FormLabel id="demo-error-radios" sx={{marginTop: '10px'}}>Sex</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-error-radios"
          name="sex"
          value={formState.sex}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        <FormHelperText sx={{color: 'red'}}>{error.sex}</FormHelperText>

        <FormLabel id="dobLabel" sx={{marginTop: '10px', marginBottom: '10px'}}>Day of birth</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            required 
            id='dob' 
            aria-labelledby="dobLabel"
            value={formState.dob} 
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <FormHelperText sx={{color: 'red'}}>{error.dob}</FormHelperText>

        <FormLabel id="hobbyLabel" sx={{marginTop: '10px', marginBottom: '10px'}}>Hobbby</FormLabel>
        <FormControlLabel control={<Checkbox name="orange" checked={formState.hobby.orange} onChange={handleCheckboxChange}/>} label="Orange" />
        <FormControlLabel control={<Checkbox name="black" checked={formState.hobby.black} onChange={handleCheckboxChange}/>} label="Black" />
        <FormControlLabel control={<Checkbox name="yellow" checked={formState.hobby.yellow} onChange={handleCheckboxChange}/>} label="Yellow" />
        <FormHelperText sx={{color: 'red'}}>{error.hobby}</FormHelperText>

        <Button sx={{marginTop: '10px', marginBottom: '10px'}} 
                variant="outlined"
                onClick={handleSubmit}>Add</Button>
      </FormControl>

      <TableContainer component={Paper} sx={{marginTop:'10px'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Days of birth</TableCell>
              <TableCell>Hobby</TableCell>
              <TableCell align='right'>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              userList.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.sex}</TableCell>
                  <TableCell>{row.dob.format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{Object.entries(row.hobby).filter(([, isSelected]) => isSelected).map(([hobbyName]) => (
                    hobbyName
                  ))}</TableCell>
                  <TableCell align='right'>
                      <DeleteIcon variant='contained' color='error' onClick={() => {
                        setUserList(userList.filter((_,i) => i !== index));
                    }}/>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
};

export default Test;
