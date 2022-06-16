import { ItemSports } from "components/ItemSports/ItemSports";
import getAllEvents from "helpers/events/getAllEvents";
import getAllSports from "helpers/sports/getAllSports"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";

export const Sports = () => {
    const [sports, setSports] = useState(null)
    const [event, setEvents] = useState(null)
    const [t, i18n] = useTranslation("global");

    useEffect(() => {
        generateSports();
    }, [])

    const generateSports = async () => {
        setSports(await getAllSports())
        setEvents(await getAllEvents())
    }


    return (
        <section className="sports--main">

            {sports !== null ?
                sports.map((e, i) => {
                    return (
                        <ItemSports sport={e} index={i} events={event} />
                    )
                })
                : null}

        </section>
    )
}