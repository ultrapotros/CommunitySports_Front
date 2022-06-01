import { useTranslation } from "react-i18next"


export const Header = () => {
    const [t, i18n] = useTranslation("global");

    const navLinks = [
        { text: t("header.sports") },
        { text: t("header.centers") },
        { text: t("header.events") },
        { text: t("header.login") }
    ]

    const changeLanguage = () => {
        if (i18n.language === "es") {
            i18n.changeLanguage("en")
        } else { i18n.changeLanguage("es") }
    }

    return (
        <header className="header--main">
            <h1 className="header--title">{t("header.title")}</h1>
            <button className="header--button-language" onClick={() => changeLanguage()}>{t("header.language.english")}</button>

            <nav className="header--nav">
                {navLinks.map((e, i) => {
                    return (
                        <div key={i} className={i === navLinks.length - 1 ? "header--nav-group header--nav-login" : "header--nav-group"}>
                            <p className="header--nav-link">{e.text}</p>
                        </div>
                    )
                })}
            </nav>


        </header>
    )
}