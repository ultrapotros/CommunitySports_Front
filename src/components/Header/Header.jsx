import { useTranslation } from "react-i18next"
import { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';

export const Header = () => {
    const header = useRef(null);
    const [t, i18n] = useTranslation("global");
    const [navbar, setnavbar] = useState(false)
    const [viewLanguages, setViewLanguages] = useState(false)
    const [viewOptions, setViewOptions] = useState(false)

    const navLinks = [
        { text: t("header.sports") },
        { text: t("header.centers") },
        { text: t("header.events") }
    ]

    const allLanguages = [
        { text: t("header.language.english"), code: 'en' },
        { text: t("header.language.spanish"), code: 'es' }
    ]

    const changeHeader = () => {
        window.scrollY > 0 ? setnavbar(true) : setnavbar(false)
    }

    const selectedLanguage = () => {
        if (i18n.language === 'en') {
            return t("header.language.english")
        } else {
            return t("header.language.spanish")
        }
    }

    window.addEventListener('scroll', changeHeader)

    return (
        <header className={navbar ? "header--main header--sticky" : "header--main"} ref={header}>
            <div className="app--wrapper">
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
                    <button className="header--button-language" onClick={() => setViewLanguages(!viewLanguages)}>
                        <p className="header--text-button">{selectedLanguage()}</p>
                        {viewLanguages ?
                            <KeyboardArrowUpIcon className="header--icon" fontSize="small" />
                            : <KeyboardArrowDownIcon className="header--icon" fontSize="small" />}

                        {viewLanguages ?
                            <section className="header--modal-languages">
                                {allLanguages.map((e, i) => {
                                    return <p className="header--text-button" key={i} onClick={() => i18n.changeLanguage(e.code)}>{e.text}</p>
                                })}
                            </section>
                            : null}
                    </button>

                    <button className="header--button-login">{t("header.login")}</button>
                    <button className="header--button" onClick={() => setViewOptions(!viewOptions)}><MenuIcon className="header--icon" />
                    </button>
                    {viewOptions ?
                        <section className="header--menu-modal">
                            {navLinks.map((e, i) => {
                                return <p className="header--nav-link header--modal-link" key={i}>{e.text}</p>
                            })}
                            <p className="header--modal-login" >{t("header.login")}</p>
                            <button className="header--button header--close" onClick={() => setViewOptions(!viewOptions)} >
                                <CloseIcon className="header--icon header--modal-icon" />
                            </button>
                        </section>
                        : null}
                    {!viewOptions ?
                        <button className="header--button header--language" onClick={() => setViewLanguages(!viewLanguages)}>
                            <LanguageIcon className="header--icon" />
                        </button>
                        : null}
                    {viewLanguages ?
                        <section className="header--modal-responsive">
                            {allLanguages.map((e, i) => {
                                return <p className="header--text-button" key={i} onClick={() => i18n.changeLanguage(e.code)}>{e.text}</p>
                            })}
                            <button className="header--button header--close" onClick={() => setViewLanguages(!viewLanguages)} >
                                <CloseIcon className="header--icon header--modal-icon" />
                            </button>
                        </section>
                        : null}
                </div>
            </div>
        </header>
    )
}