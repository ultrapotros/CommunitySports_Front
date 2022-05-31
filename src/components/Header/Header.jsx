import { useTranslation } from "react-i18next"

export const Header = () => {
    const [t, i18n] = useTranslation("global");

    return (
        <header className="header--main">
            <h1 className="header--title">{t("header.title")}</h1>
            <button className="header--button-language"></button>
            <nav className="header--nav">
                <p className="header--nav-link">Deportes</p>
                <p className="header--nav-link">Centros</p>
                <p className="header--nav-link">Eventos</p>
                <p className="header--nav-link">Login</p>
            </nav>
        </header>
    )
}