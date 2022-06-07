import React from 'react';
import { Controller } from "react-hook-form";
import {
    InputLabel,
    FormControl,
    NativeSelect,
    Box
  } from "@mui/material";


export const SelectCustom = ({ name, control, label, id, defaultValue , options }) => {
    
    return <Box sx={{ minWidth: 120 }}>
        <FormControl
        sx={{ width: '100%' }} >
        <InputLabel variant="standard" htmlFor="uncontrolled-native" id={id}>{label}</InputLabel>
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <NativeSelect
                defaultValue={defaultValue}
                inputProps={{
                name,
                id
                }}
                variant='standard'
                {...field}
                >
                    {options.map((e,i)=> <option key={i} value={e}>{e}</option>)}
                </NativeSelect>
            )}
        />
        </FormControl>
    </Box>
}