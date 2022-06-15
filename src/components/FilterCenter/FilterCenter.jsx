import { LateralButtons } from "./internalComponents/LateralButtons"
import { MultiRangeSlider } from "./internalComponents/MultiRangeSlider"
import { NavSports } from "./internalComponents/NavSports"
import { useEffect, useState } from "react"
import Map from "components/Map/Map"
import getCentersWithSports from "helpers/centers/getCentersWithSports"
import { distanceToPoint } from "./funcionality"

export const FilterCenter = ({ search }) => {
    //Params
    const [distance, setDistance] = useState(100); //nº entero 0-100
    const [adapt, setAdapt] = useState([]); //arr de Strings
    const [sports, setSports] = useState([]); //arr de Strings
    const [myPosition, setMyPosition] = useState({ lat: 0, long: 0 })
    //Data
    const [data, setData] = useState(null);
    const [dataFiltered, setDataFiltered] = useState(null);

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (data !== null) {
            filters();
        }
    }, [distance, adapt, sports])

    const getData = async () => {
        if (search === 'center') {
            const myData = await getCentersWithSports()
            setData(myData)
            setDataFiltered(myData)
        } else {
            const myData = await getCentersWithSports()
            setData(myData)
            setDataFiltered(myData)
        }
    }

    const filters = () => {
        const myCenters = []
        for (const center of data) {
            let comp = true
            for (const sport of data) {
                if (center.sports.indexOf(sport, 0) > -1) {
                    comp = false
                }
            }
            for (const discapacitie of adapt) {
                if (center[discapacitie] === 0) {
                    comp = false
                }
            }
            center.distanceToPoint = distanceToPoint(myPosition.lat, myPosition.long, center.latitude, center.longitude)
            myCenters.push(center)
        }
        console.log(myCenters[0]);
        const myCentersByDistance = myCenters.filter(e => e.distanceToPoint < distance)
        console.log(myCentersByDistance);
        setDataFiltered(myCentersByDistance)
    }

    return (
        <section className="filter_center--exterior-main">
            <NavSports sports={sports} setSports={setSports} />
            <div className="filter_center--body">
                <div className="filter_center--body-map">
                    {data !== null ? <Map data={dataFiltered} setMyPosition={setMyPosition} /> : null}
                </div>
                <LateralButtons adapt={adapt} setAdapt={setAdapt} />
            </div>
            <div className="filter_center--slider">
                <MultiRangeSlider value={distance} setValue={setDistance} />
            </div>

        </section>
    )
}

