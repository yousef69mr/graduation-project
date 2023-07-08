import React, { Suspense, lazy } from "react"

import { LandmarkCard } from "./SliderCards";

const CategoriesContextProvider = lazy(() => import('../../contexts/CategoriesContext'))
const GovernorateContextProvider = lazy(() => import('../../contexts/GovernorateContext'))
const LanguageContextProvider = lazy(() => import('../../contexts/LanguageContext'))

const SliderController = (props) => {
    const { control, ...rest } = props
    switch (control) {
        case "landmark":
            return (
                <Suspense>
                    <LanguageContextProvider>
                        <CategoriesContextProvider>
                            <GovernorateContextProvider>
                                <LandmarkCard {...rest} />
                            </GovernorateContextProvider>
                        </CategoriesContextProvider>
                    </LanguageContextProvider>
                </Suspense>
            )

        default:
            return null
    }
}
export default SliderController;