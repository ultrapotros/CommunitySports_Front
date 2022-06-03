import { useTranslation } from "react-i18next"


export const Header = () => {
    const [t, i18n] = useTranslation("global");

    const navLinks = [
        { text: t("header.sports") },
        { text: t("header.centers") },
        { text: t("header.events") }
    ]

    const changeLanguage = () => {
        if (i18n.language === "es") {
            i18n.changeLanguage("en")
        } else { i18n.changeLanguage("es") }
    }

    return (
        <header className="header--main">
            <div className="app--group-width">
                <div className="header--display-group header--display-left">
                    <h1 className="header--title">{t("header.title")}</h1>
                    <nav className="header--nav">
                        {navLinks.map((e, i) => {
                            return (
                                <div key={i} className={i === navLinks.length - 1 ? "header--nav-group header--nav-login" : "header--nav-group"}>
                                    <p className="header--nav-link">{e.text}</p>
                                </div>
                            )
                        })}
                    </nav>
                </div>
                <div className="header--display-group header--display-right">
                    <button className="header--button-language" onClick={() => changeLanguage()}>{t("header.language.english")}</button>
                    <button className="header--button-login">{t("header.login")}</button>
                </div>
            </div>
        </header>
    )
}