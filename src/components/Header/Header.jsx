import { useTranslation } from "react-i18next"

//Icons
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsIcon from '@mui/icons-material/Sports';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import LoginIcon from '@mui/icons-material/Login';

export const Header = () => {
    const [t, i18n] = useTranslation("global");

    const navLinks = [
        { icon: SportsBasketballIcon, text: t("header.sports") },
        { icon: SportsIcon, text: t("header.centers") },
        { icon: SportsScoreIcon, text: t("header.events") },
        { icon: LoginIcon, text: t("header.login") }
    ]

    return (
        <header className="header--main">
            <h1 className="header--title">{t("header.title")}</h1>
            <button className="header--button-language">{t("header.language.english")}</button>
            <nav className="header--nav">
                {navLinks.map((e, i) => {
                    return (
                        <div key={i} className="header--nav-group">
                            <e.icon className="header--icon" scale="small" />
                            <p className="header--nav-link">{e.text}</p>
                        </div>
                    )
                })}
            </nav>
        </header>
    )
}