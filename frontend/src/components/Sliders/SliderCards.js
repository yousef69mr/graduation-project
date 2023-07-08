import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import { backendBaseURL } from '../../axios'
// import Link from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from '@mui/material/Chip';
import Avatar from "@mui/material/Avatar";
import { useCategoriesContext } from "../../contexts/CategoriesContext";
import { useTranslation } from "react-i18next";
import css from './Slider.module.css'
import { useGovernorateContext } from "../../contexts/GovernorateContext";
import { useNavigate } from "react-router-dom";




export const LandmarkCard = (props) => {
    const { t } = useTranslation()
    const { tourismCategories } = useCategoriesContext()
    const { governorates } = useGovernorateContext()
    // const governorates = [{}]
    const { object } = props
    // console.log(object)
    // console.log(tourismCategories[0])
    // console.log(object?.landmark?.tourism_categories)
    // console.log()
    const navigate = useNavigate()
    const landmark_data = useMemo(() => CalculateLandmarkLanguageData(tourismCategories, governorates, object), [tourismCategories, governorates, object])
    // console.log(landmark_tourism_categories)
    return (
        <Box className={`text-color ${css.card}`} >
            <Box className={css.image}>
                <img src={backendBaseURL + object?.landmark?.image} alt={object?.landmark?.name} />
            </Box>

            <Box className={css.card_content}>


                <Box className={`flex`} sx={{ width: '100%', justifyContent: 'space-between' }}>
                    <Box className={`flex`}>
                        <Typography className="text-color">{object?.title}</Typography>
                    </Box>
                    <Box className={`flex`} sx={{ justifyContent: 'center' }}>
                        <Box className={`flex`}>
                            <FaEye className="icon primary-color" />
                        </Box>
                        <Box className={`flex`} sx={{ margin: '0 .5rem' }}>
                            <Typography className="text-color">{object?.landmark?.num_of_views}</Typography>
                        </Box>
                    </Box>
                </Box>
                {/* <Box sx={{ display: "flex", alignItems: 'center' }}>
                    <FaEye className="icon" />  <Typography>{object?.landmark?.num_of_views}</Typography>
                </Box> */}
                {/* <Box className={`flex`}>
                    <Box className={`flex`}>
                        <FaEye className="icon" />
                    </Box>
                    <Box className={`flex`} sx={{ margin: '0 .5rem' }}>
                        <Typography>{object?.landmark?.num_of_views}</Typography>
                    </Box>
                </Box> */}
                <Box className={`flex`}>
                    <Box className={`flex`}>
                        <HiOutlineLocationMarker className="icon primary-color" />
                    </Box>
                    <Box className={`flex`} sx={{ margin: '0 .5rem' }}>
                        <Typography className="text-color">{landmark_data?.governorate.title}</Typography>
                    </Box>
                </Box>
                <Box className={`flex`} sx={{ width: '100%', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Box className={`flex`}>
                        <Typography className="text-color">{object?.category_type}</Typography>
                    </Box>
                </Box>

                {landmark_data?.tourismCategories?.length > 0 &&
                    <Box sx={{ display: "flex", justifyContent: 'center', flexDirection: 'column' }}>
                        {/* <Typography className="text-color">{t('tourism_categories')}</Typography> */}
                        <Box className={`flex flex-wrap`} sx={{ marginBottom: ".5rem" }}>
                            {
                                landmark_data?.tourismCategories?.map((instance) => (
                                    <Chip
                                        key={instance?.category?.id}
                                        avatar={<Avatar alt={instance?.category?.name} src={backendBaseURL + instance?.category?.image} />}
                                        label={instance?.title}
                                        className="text-color"
                                        sx={{ margin: ".15rem" }}
                                        // sx={{
                                        //     backgroundColor: "var(--PrimaryColor)",
                                        //     color: "var(--whiteColor)",
                                        //     "& .MuiChip-deleteIcon": {
                                        //         color: "var(--whiteColor)",
                                        //         margin: '0 5px 0 5px'
                                        //     },
                                        // }}
                                        variant="outlined"
                                    />
                                ))
                            }
                        </Box>
                    </Box>}
                <Button className="btn border-radius" sx={{ width: '100%' }} onClick={() => navigate(`/landmarks/${object?.landmark?.id}`)}>{t('readMore')}</Button>
            </Box>
        </Box >
    )
}

const CalculateLandmarkLanguageData = (categories, governorates, landmark) => {
    const tourism_categories = categories?.filter((category) => landmark?.landmark?.tourism_categories?.includes(category?.category?.id))
    const landmark_governorate = governorates.find((instance) => instance?.governorate?.id === landmark?.landmark?.governorate?.id)
    return { governorate: landmark_governorate, tourismCategories: tourism_categories }
}