import React from "react"

import { LandmarkCard } from "./SliderCards";

const SliderController = (props) => {
    const { control, ...rest } = props
    switch (control) {
        case "landmark":
            return <LandmarkCard {...rest} />

        default:
            return null
    }
}
export default SliderController;