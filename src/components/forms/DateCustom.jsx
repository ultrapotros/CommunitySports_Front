import React from 'react'
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const DateCustom = ({name, control, label, id,placeholder, defaultValue, errors}) => {
    return (<>
        <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
            <DatePicker
            {...field}
            id={id}
            label={label}
            className='form--date-input'
            placeholderText={placeholder}
            onChange={(date) => field.onChange(date)}
            selected={field.value}
            />
        )}
        />
        <p className='date-error-message'>{errors ? errors.message : null}</p>
        
    </>
    )
}