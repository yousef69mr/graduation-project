import React, { useState, lazy, useEffect } from "react"
import {
    FormControl, FormLabel, FormHelperText, Radio, FormControlLabel,
    RadioGroup, Box, Slider
} from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
// import { Field } from "formik"
// import { Image } from "react-bootstrap";
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
// import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Chip from "@mui/material/Chip";


// import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
// import { Viewer, Worker } from 'react-doc-viewer';
// import { Worker } from 'react-doc-viewer/';
// import { WordViewer } from '@react-pdf-viewer/word';

// // import Document  from 'react-pdf/src/Document';
// // import Page from'react-pdf/src/Page';
// import { Document, Page, pdfjs } from 'react-pdf'

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// console.log(pdfjs)

export function RangeInput(props) {
    const { t } = useTranslation()
    const { name, label, error, required, errorText, value, helperText, range, setfieldvalue, ...rest } = props
    // const [value, setValue] = useState([20, 80]);

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    return (
        <div>
            <FormControl fullWidth className="inputField">
                <FormLabel sx={{ padding: '.5rem 14px' }} className="text-color inputLabel" htmlFor={name}> {label}{required && <span style={{ margin: ".4rem", color: "red" }}>*</span>}</FormLabel>
                <Box sx={{ padding: '.5rem 14px' }}>{t('money.egypt', { money: value })}</Box>
                <Slider

                    valueLabelDisplay="auto"
                    value={value}
                    sx={{ color: "var(--PrimaryColor)" }}
                    min={range?.min}
                    max={range?.max}
                    {...rest}
                    name={name}
                    id={name}
                />
                {error && (
                    <FormHelperText error>{errorText}</FormHelperText>
                )}
                {helperText && (
                    <FormHelperText className="text-color helperText">** {helperText}</FormHelperText>
                )}
            </FormControl>
        </div>
    );
}

export function Input(props) {
    const { name, label, error, required, errorText, helperText, setfieldvalue, ...rest } = props
    return (
        <FormControl fullWidth className="inputField">
            <FormLabel sx={{ padding: '.5rem 14px' }} className="text-color inputLabel" htmlFor={name}> {label}{required && <span style={{ margin: ".4rem", color: "red" }}>*</span>}</FormLabel>
            <TextField sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--textColor)", // change the border color
                },
                "& .MuiInputBase-input": {
                    color: "var(--textColor)", // change the text color
                },
                borderRadius: "20px",
                "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                },
                "& .MuiAutocomplete-popupIndicator": {
                    color: "var(--textColor)",
                }
            }} color={error ? "error" : ""} name={name} id={name} className="form-control" {...rest} required={required} />
            {error && (
                <FormHelperText error>{errorText}</FormHelperText>
            )}
            {helperText && (
                <FormHelperText className="text-color helperText">** {helperText}</FormHelperText>
            )}
            {/* <TextField fullWidth name={name} id={name} {...rest} /> */}
            {/* <ErrorMessage name={name} /> */}
        </FormControl>
    )
}

export function TextArea(props) {
    const { label, name, error, errorText, helperText, required, ...rest } = props
    return (
        <FormControl fullWidth className="inputField">
            <FormLabel sx={{ padding: '.5rem 14px' }} className="text-color inputLabel" htmlFor={name}> {label}{required && <span style={{ margin: ".4rem", color: "red" }}>*</span>}</FormLabel>
            <textarea name={name} id={name} className="form-control" {...rest} required={required} />
            {error && (
                <FormHelperText error>{errorText}</FormHelperText>
            )}
            {helperText && (
                <FormHelperText className="text-color helperText">** {helperText}</FormHelperText>
            )}
            {/* <ErrorMessage name={name} /> */}
        </FormControl>
    )
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function DatasetInput(props) {
    const { label, name, firstoption, ismultiple, autoFocus, errorText, placeholder, error, helperText, required, options, setfieldvalue, ...rest } = props

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAll = () => {
        setSelectedOptions(options?.slice(1)?.map((option) => option?.value));
        setSelectAll(true);
    };

    const handleClearAll = () => {
        setSelectedOptions([]);
        setSelectAll(false);
        // alert(selectedOptions)
    };
    const selectAllOption = options[0].value === '*' ? options[0] : null;

    // alert(isMultiple)

    useEffect(() => {
        // alert(JSON.stringify(selectedOptions));
        setfieldvalue(name, selectedOptions);
    }, [selectedOptions, name, setfieldvalue]);

    return (
        <FormControl fullWidth className="inputField" style={{ width: "100%" }}>
            <FormLabel sx={{ padding: '.5rem 14px' }} className="text-color" htmlFor={name}>{label}{required && <span style={{ margin: ".4rem", color: "red" }}>*</span>}</FormLabel>
            {/* <Autocomplete
                multiple={isMultiple}
                autoHighlight
                fullWidth
                {...rest}
                style={{ width: "100%" }}
            /> */}
            {ismultiple ?
                <Autocomplete
                    multiple
                    autoHighlight
                    fullWidth

                    getOptionLabel={
                        options?.length > 0 &&
                        ((option) => option?.key)
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            // sx={{ color: "white", borderRadius: "20px" }}
                            // name={input.name}
                            // label={t("EventsFilterForm.filterEvents")}
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--textColor)", // change the border color
                                },
                                "& .MuiInputBase-input": {
                                    color: "var(--textColor)", // change the text color
                                },
                                borderRadius: "20px",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "20px",
                                },
                                "& .MuiAutocomplete-popupIndicator": {
                                    color: "var(--textColor)",
                                }
                            }}
                            placeholder={placeholder}

                        />
                    )}
                    options={options}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                label={option?.key}
                                {...getTagProps({ index })}
                                sx={{
                                    backgroundColor: "var(--PrimaryColor)",
                                    color: "var(--whiteColor)",
                                    "& .MuiChip-deleteIcon": {
                                        color: "var(--whiteColor)",
                                        margin: '0 5px 0 5px'
                                    },
                                }}
                            />
                        ))

                    }
                    renderOption={(props, option, { selected }) => {
                        if (option?.value === "*") {
                            return (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selectAll}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                handleSelectAll();
                                            } else {
                                                handleClearAll();
                                            }
                                        }}
                                    />
                                    {option.key}
                                </li>
                            );
                        }

                        return (
                            <li style={{ margin: "0rem 2rem" }} {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8, marginLeft: 8 }}
                                    checked={selected}
                                />
                                {option.key}
                            </li>
                        );
                    }}
                    // style={{ width: "100%" }}
                    id={name}
                    name={name}

                    value={
                        selectAll
                            ? [selectAllOption]
                            : options?.filter((option) =>
                                selectedOptions.includes(option.value)
                            )
                    }
                    onChange={(event, value_list) => {
                        if (value_list.includes(selectAllOption)) {
                            handleSelectAll();
                        } else {
                            setSelectedOptions(value_list.map((value) => value.value));
                            setSelectAll(false);
                        }

                        // alert(JSON.stringify(values));
                    }}

                />
                :
                <Autocomplete

                    autoHighlight
                    fullWidth

                    getOptionLabel={
                        options?.length > 0 &&
                        ((option) => option?.key)
                    }
                    renderOption={(props, option, { selected }) => {

                        return (
                            <li style={{ margin: "0rem 2rem" }} {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8, marginLeft: 8 }}
                                    checked={selected}
                                />
                                {option.key}
                            </li>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            // sx={{ color: "white", borderRadius: "20px" }}
                            // name={input.name}
                            // label={t("EventsFilterForm.filterEvents")}
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--textColor)", // change the border color
                                },
                                "& .MuiInputBase-input": {
                                    color: "var(--textColor)", // change the text color
                                },
                                borderRadius: "20px",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "20px",
                                },
                                "& .MuiAutocomplete-popupIndicator": {
                                    color: "var(--textColor)",
                                }
                            }}
                            placeholder={placeholder}
                            required
                        />
                    )}
                    options={options}
                    // style={{ width: "100%" }}
                    id={name}
                    name={name}
                    {...rest}
                    required={required}

                // value={
                //     options.filter((option) =>
                //         selectedOptions.includes(option?.value)
                //     )}


                />
            }

            {error && (
                <FormHelperText error>{errorText}</FormHelperText>
            )}
            {helperText && (
                <FormHelperText className="helperText text-color">** {helperText}</FormHelperText>
            )}
            {/* <ErrorMessage name={name} /> */}
        </FormControl>
    )
}

export function SelectInput(props) {
    const { label, firstoption, autoFocus, name, error, errorText, helperText, options, required, setfieldvalue, ...rest } = props
    return (
        <FormControl fullWidth className="inputField" style={{ width: "100%" }}>
            <FormLabel sx={{ padding: '.5rem 14px' }} className="text-color" htmlFor={name}>{label}{required && <span style={{ margin: ".4rem", color: "red" }}>*</span>}</FormLabel>
            <Select
                // autoHighlight
                color={error ? "error" : ""}
                fullWidth
                sx={{ background: "var(--white-color)" }}
                className="text-color"
                {...rest}
                name={name}
                id={name}
                required={required}
            // style={{ width: "100%" }}
            >
                {firstoption && (
                    <MenuItem key={firstoption.value} value={firstoption.value} selected>
                        {firstoption.key}
                    </MenuItem>
                )}
                {options?.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.key}
                    </MenuItem>
                ))}
            </Select>
            {error && (
                <FormHelperText error>{errorText}</FormHelperText>
            )}
            {helperText && (
                <FormHelperText className="helperText text-color">** {helperText}</FormHelperText>
            )}
            {/* <ErrorMessage name={name} /> */}
        </FormControl>
    )
}


export function RadioButtons(props) {
    const { label, name, options, dir, error, errorText, helperText, required, selected, ...rest } = props
    // const direction = dir === "row" ? row : col
    return (
        <FormControl fullWidth className="inputField">
            <FormLabel sx={{ padding: '.5rem 14px' }} className="text-color"> {label}{required && <span style={{ margin: ".4rem", color: "red" }}>*</span>}</FormLabel>


            <RadioGroup
                aria-label={name}
                name={name}

                row={dir === "row" ? true : false}
                {...rest}
            >
                {
                    options?.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            value={option.value}
                            control={<Radio />}
                            label={option.key}
                        />
                    ))
                }

            </RadioGroup>
            {error && (
                <FormHelperText error>{errorText}</FormHelperText>
            )}

            {helperText && (
                <FormHelperText className="helperText">** {helperText}</FormHelperText>
            )}
            {/* <ErrorMessage name={name} /> */}
        </FormControl >
    )
}

export function CheckBoxes(props) {
    const { label, name, value, options, error, errorText, helperText, required, onChange, ...rest } = props
    return (
        <FormControl fullWidth className="inputField">
            <FormLabel className="text-color"> {label}{required && <span style={{ margin: ".4rem", color: "red" }}>*</span>}</FormLabel>
            {
                options?.map((option, index) => (
                    <FormControlLabel key={index} control={<Checkbox name={name} onChange={onChange} />} label={option.key} {...rest} />
                ))
            }
            {error && (
                <FormHelperText error>{errorText}</FormHelperText>
            )}
            {helperText && (
                <FormHelperText className="helperText">** {helperText}</FormHelperText>
            )}
            {/* <ErrorMessage name={name} /> */}
        </FormControl>
    )
}

const AudioPlayer = lazy(() => import('react-audio-player'))
// const Document = lazy(() => import('react-pdf/dist/esm/entry.webpack5').then(module => { return { default: module.Document } }))
// const Page = lazy(() => import('react-pdf/dist/esm/entry.webpack5').then(module => { return { default: module.Page } }))

export const FilePreview = (props) => {
    const { name, error, value, index, helperText, errorText, required, label, setfieldvalue, onChange, disabled, dimensions } = props;
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    // const { t } = useTranslation()
    const handleFileInputChange = (e) => {
        const selectedFile = e.target.files[0];

        // console.log(name)
        if (setfieldvalue) {
            if (index) {

                setFile(value[index])
                setfieldvalue(name, selectedFile);
                console.log(selectedFile, value[index])
            } else {

                setFile(selectedFile)
                setfieldvalue(name, selectedFile);
                // console.log(name, selectedFile)
                // console.log(value)

            }
        }

        if (!selectedFile) {
            setPreview(null);
            return;
        }
        // alert(JSON.stringify(selectedFile))

        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);

        // if (file && file.type.startsWith("application")) {
        //     window.open(file, "_blank")
        // }

    };

    const fileController = (fileType) => {
        if (fileType && fileType.startsWith("image")) {
            return <img src={preview} alt="file preview" />
        } else if (fileType && fileType.startsWith("video")) {
            return <video src={preview} controls />

            // } else if (fileType.startsWith("pdf") || fileType.startsWith("application/pdf")) {
            //     // return (
            //     //     <Document file={"https://example.com/myfile.pdf"}>
            //     //         <Page pageNumber={1} />
            //     //     </Document>
            //     // )
        } else if (fileType.startsWith('application')) {

            const url = URL.createObjectURL(file);
            return <iframe src={url} width={"80%"} height={"100%"} title="file_title" />

            //     }
        }
        else if (fileType && fileType.startsWith("audio")) {
            return (
                <AudioPlayer controls src={preview} />
            )
        }
        else {
            return "";
        }




    }



    return (
        <FormControl fullWidth className="inputField">
            <FormLabel className="text-color"> {label}{required && <span style={{ margin: ".4rem", color: "red" }}>*</span>}</FormLabel>
            <TextField color={error ? "error" : ""} type="file" name={name} id={name} disabled={disabled} onChange={(e) => { onChange(e); handleFileInputChange(e); }} />

            {/* <InputLabel fullWidth htmlFor={name} className={"fileUpload"}>
                <Button variant="contained" component="span">
                    {t("form.uploadFile")}
                </Button>
                <TextField fullWidth color={error ? "error" : ""} type="file" name={name} id={name} onChange={(e) => { onChange(e); handleFileInputChange(e); }} />
            </InputLabel> */}
            {preview && (
                <Box sx={dimensions ? { maxWidth: `${dimensions.width}px`, height: `${dimensions.height}px`, maxHeight: `${dimensions.height}px` } : ''} className="filePreview" preview="true">
                    {/* {console.log(value.type)} */}
                    {/* {value.type.startsWith('image') ? (
                        <img src={preview} alt="file preview" />
                    ) : value.type.startsWith('video') ? (
                        <video src={preview} controls />
                    ) : ""} */}
                    {fileController(file && file.type)}
                    {/* {value && <Viewer file={value} />} */}
                </Box>
            )}
            {error && (
                <FormHelperText error>{errorText}</FormHelperText>
            )}
            {helperText && (
                <FormHelperText className="helperText">** {helperText}</FormHelperText>
            )}
        </FormControl>
    );
};