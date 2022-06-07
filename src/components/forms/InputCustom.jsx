import { Controller } from "react-hook-form";
import {
  TextField, InputAdornment
} from "@mui/material";
export default function InputCustom({ name, control, label, id, errors, type, adornment}) {
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
          type={type ? type : "text"}
          helperText={errors ? errors.message : ""}
          InputProps={adornment ? { endAdornment : <InputAdornment   position='end'>{adornment}</InputAdornment>, } : null}
        />
      )}
    />
  )
}
