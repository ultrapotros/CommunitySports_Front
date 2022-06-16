import { useTranslation } from "react-i18next";
import { ItemEvent } from "./Internal/ItemEvent";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const ItemSports = ({ sport, index, sports }) => {
    const [t, i18n] = useTranslation("global");

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const EventsOfSport = () => {

    }

    return (
        <section className={`item_sports--main-item item_sports--item-${index}`}>
            <div className="item_sports--slot-title">
                <h5 className="item_sports--item-title">{t(`sports.${removeAccents(sport.name)}`)}</h5>
                <button className="item_sports--button-deploy"><KeyboardArrowDownIcon fontSize="large" /></button>
            </div>
            <ItemEvent />
        </section>
    )
}