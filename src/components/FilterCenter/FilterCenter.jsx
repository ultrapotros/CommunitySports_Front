import { LateralButtons } from "./internalComponents/LateralButtons"
import { MultiRangeSlider } from "./internalComponents/MultiRangeSlider"
import { NavSports } from "./internalComponents/NavSports"
import { useEffect, useState } from "react"
import Map from "components/Map/Map"
import getCentersWithSports from "helpers/centers/getCentersWithSports"

export const FilterCenter = ({ search }) => {
    //Params
    const [distance, setDistance] = useState(0); //nº entero 0-100
    const [adapt, setAdapt] = useState([]); //arr de Strings
    const [sports, setSports] = useState([]); //arr de Strings
    //Data
    const [data, setData] = useState(null);

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        filters();
    }, [distance, adapt, sports])

    const getData = async () => {
        if (search === 'center') {
            setData(await getCentersWithSports())
        } else { setData(await getCentersWithSports()) }
    }

    const filters = () => {

    }

    return (
        <section className="filter_center--exterior-main">
            <NavSports sports={sports} setSports={setSports} />
            <div className="filter_center--body">
                <div className="filter_center--body-map">
                    {data !== null ? <Map data={data} /> : null}
                </div>
                <LateralButtons adapt={adapt} setAdapt={setAdapt} />
            </div>
            <div className="filter_center--slider">
                <MultiRangeSlider value={distance} setValue={setDistance} />
            </div>

        </section>
    )
}

