import { Controller } from "react-hook-form";
import {
  TextField, InputAdornment
} from "@mui/material";
import { useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function InputCustomPassword({ name, control, label, id, errors}) {
    const [viewPassword,setViewPassword] = useState(false)

    const handleViewPassword = () => {
        setViewPassword(!viewPassword)
    }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={''}
      render={({ field }) => (
        <TextField
          {...field}
          defaultValue={''}
          id={id}
          label={label}
          className="form--input-text"
          variant="standard"
          error={!!errors}
          type={viewPassword ? 'text' : 'password'}
          helperText={errors ? errors.message : ""}
          InputProps={{ endAdornment : <InputAdornment position='end'>{viewPassword ? <VisibilityIcon onClick={handleViewPassword}/> : <VisibilityOffIcon onClick={handleViewPassword}/>}  </InputAdornment> }}
        />
      )}
    />
  )
}
