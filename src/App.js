import React, { useEffect, useState } from "react";
import "./App.css";
import { useForm, useFieldArray } from "react-hook-form";
import ESFlag from "./img/ES.png";
import ENFlag from "./img/EN.png";
import FRFlag from "./img/FR.png";
import ITFlag from "./img/IT.png";
import DEFlag from "./img/DE.png";
import PTFlag from "./img/PT.png";

function App() {
  const [wearer, setWearer] = useState("");
  const [winner, setWinner] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [translations, setTranslations] = useState();
  const [language, setLanguage] = useState();
  const [flag, setFlag] = useState("");
  const [showLang, setShowLang] = useState("none");

  const { register, handleSubmit, control, getValues } = useForm({
    defaultValues: {
      availableOptions: [{ value: "" }, { value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availableOptions",
  });

  useEffect(() => {
    setTranslations(TRANSLATIONS);
    setLanguage("ENGLISH");
    setFlag(ENFlag);
  }, []);

  let TRANSLATIONS = {
    ENGLISH: {
      title: "Who's wearing the hat?",
      options: `What are the options that ${wearer} has?`,
      removeButton: "Remove",
      addOptionButton: "Add Option",
      submitButton: "Ask the Hat!",
      modalTitle: `Hmm hmm hmmm... I choooooose for ${wearer}...`,
      acceptButton: "Accept",
      error: "I need at least 2 options to choose from!",
    },
    SPANISH: {
      title: "Quién se pone el sombrero?",
      options: `Qué opciones tiene ${wearer}?`,
      removeButton: "Eliminar",
      addOptionButton: "Añadir Opcion",
      submitButton: "Pregúntale!",
      modalTitle: `Hmm hmm hmmm... Elijo para ${wearer}...`,
      acceptButton: "Aceptar",
      error: "Necesito al menos dos opciones para elegir!",
    },
    FRENCH: {
      title: "Qui porte le chapeau?",
      options: `Quelles sont les options de ${wearer}?`,
      removeButton: "Retirer",
      addOptionButton: "Ajouter une option",
      submitButton: "Demander!",
      modalTitle: `Hmm hmm hmmm... Je choisis pour ${wearer}...`,
      acceptButton: "Accepter",
      error: "J'ai besoin d'au moins 2 options parmi lesquelles choisir",
    },
    ITALIAN: {
      title: "Chi indossa il cappello?",
      options: `Quali sono le opzioni di ${wearer}?`,
      removeButton: "Rimuovere",
      addOptionButton: "Aggiungi Opzione",
      submitButton: "Domandare!",
      modalTitle: `Hmm hmm hmmm... Scelgo per ${wearer}...`,
      acceptButton: "Accettare",
      error: "Ho bisogno di almeno 2 opzioni tra cui scegliere",
    },
    GERMAN: {
      title: "Wer trägt den Hut?",
      options: `Welche Möglichkeiten hat ${wearer}?`,
      removeButton: "Entfernen",
      addOptionButton: "Option hinzufügen",
      submitButton: "Nachfragen!",
      modalTitle: `Hmm hmm hmmm... Ich wähle für ${wearer}...`,
      acceptButton: "Akzeptieren",
      error: "Ich brauche mindestens 2 Optionen zur Auswahl",
    },
    PORTUGUESE: {
      title: "Quem usa o chapéu?",
      options: `Quais são as opções de ${wearer}?`,
      removeButton: "Retirar",
      addOptionButton: "Adicionar Opção",
      submitButton: "Perguntar!",
      modalTitle: `Hmm hmm hmmm... Eu escolho pelo ${wearer}...`,
      acceptButton: "Aceitar",
      error: "Preciso de pelo menos 2 opções para escolher",
    },
  };

  const handleChange = (e) => {
    setWearer(e.target.value);
    translations.options = setTranslations({
      ENGLISH: {
        ...translations.ENGLISH,
        options: `What are the options that ${e.target.value} has?`,
        modalTitle: `Hmm hmm hmmm... I choooooose for ${e.target.value}...`,
      },
      SPANISH: {
        ...translations.SPANISH,
        options: `Qué opciones tiene ${e.target.value}?`,
        modalTitle: `Hmm hmm hmmm... Elijo para ${e.target.value}...`,
      },
      FRENCH: {
        ...translations.FRENCH,
        options: `Quelles sont les options de ${e.target.value}?`,
        modalTitle: `Hmm hmm hmmm... Je choisis pour ${e.target.value}...`,
      },
      ITALIAN: {
        ...translations.ITALIAN,
        options: `Quali sono le opzioni di ${e.target.value}?`,
        modalTitle: `Hmm hmm hmmm... Scelgo per ${e.target.value}...`,
      },
      GERMAN: {
        ...translations.GERMAN,
        options: `Welche Möglichkeiten hat ${e.target.value}?`,
        modalTitle: `Hmm hmm hmmm... Ich wähle für ${e.target.value}...`,
      },
      PORTUGUESE: {
        ...translations.PORTUGUESE,
        options: `Quais são as opções de ${e.target.value}?`,
        modalTitle: `Hmm hmm hmmm... Eu escolho pelo ${e.target.value}...`,
      },
    });
  };

  const sortOptions = (options) => {
    const winnerOption = Math.floor(Math.random() * options.length);
    const winner = options[winnerOption].value;

    setWinner(winner);
    setShowModal(true);
  };

  const onSubmit = (data) => {
    if (!data.availableOptions || data.availableOptions.length < 2) {
      alert(translations[language].error);
    } else {
      document.getElementById("submitButton").disabled = true;

      sortOptions(data.availableOptions);
    }

    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.width = "100vw";
  };

  const handleAcceptButton = () => {
    setShowModal(false);
    document.getElementById("submitButton").disabled = false;

    document.body.style.position = "static";
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.width = "100%";
  };

  const handleKey = (e, index) => {
    if (e.target.id === "wearer" && e.keyCode === 9) {
      e.preventDefault();
      document.getElementsByName(`availableOptions[${0}].value`)[0].focus();
      return;
    }
    if (e.target.id === "wearer" && e.keyCode === 13) {
      e.preventDefault();
      if (e.target.value !== "") {
        document.getElementsByName(`availableOptions[${0}].value`)[0].focus();
      }
      return;
    }

    if (e.keyCode === 13 || e.keyCode === 9) {
      e.preventDefault();
      let array = getValues().availableOptions;

      if (index === array.length - 1) {
        document.getElementById("submitButton").focus();
      } else {
        document
          .getElementsByName(`availableOptions[${index + 1}].value`)[0]
          .focus();
      }
    }
  };

  const handleOpenLang = () => {
    showLang === "none" ? setShowLang("flex") : setShowLang("none");
  };

  const changeLanguage = (lang, flag) => {
    setLanguage(lang);
    setFlag(flag);
  };

  return (
    <div className="homeContainer">
      <div onClick={handleOpenLang} className="dropdown">
        <div className="currentLang">
          <img src={flag} />
          <i className="fas fa-angle-down"></i>
        </div>

        <ul style={{ display: `${showLang}` }}>
          <li onClick={() => changeLanguage("SPANISH", ESFlag)}>
            <img src={ESFlag} />
          </li>
          <li onClick={() => changeLanguage("ENGLISH", ENFlag)}>
            <img src={ENFlag} />
          </li>
          <li onClick={() => changeLanguage("FRENCH", FRFlag)}>
            <img src={FRFlag} />
          </li>
          <li onClick={() => changeLanguage("ITALIAN", ITFlag)}>
            <img src={ITFlag} />
          </li>
          <li onClick={() => changeLanguage("GERMAN", DEFlag)}>
            <img src={DEFlag} />
          </li>
          <li onClick={() => changeLanguage("PORTUGUESE", PTFlag)}>
            <img src={PTFlag} />
          </li>
        </ul>
      </div>
      <div className="homeContent">
        <img className="homeHat" src="/Sorting_Hat.png" alt="Sorting Hat" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="wearer">
            <h2>{translations && translations[language].title}</h2>
            <input
              ref={register({ required: true })}
              id="wearer"
              name="wearer"
              type="text"
              defaultValue={wearer}
              onChange={(e) => {
                handleChange(e);
              }}
              onKeyDown={(e) => handleKey(e)}
              placeholder="E.g Michael"
            />
          </label>
          <label id="optionInputs" htmlFor="options">
            <h2>{translations && translations[language].options}</h2>
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="option">
                  <input
                    name={`availableOptions[${index}].value`}
                    ref={register({ required: true })}
                    defaultValue={field.value}
                    onKeyDown={(e) => handleKey(e, index)}
                  />

                  <button
                    className="removeButton"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    {translations && translations[language].removeButton}
                  </button>
                </div>
              );
            })}
          </label>
          <div className="formButtons">
            <button id="addOption" onClick={append}>
              {translations && translations[language].addOptionButton}
            </button>
            <button id="submitButton" type="submit">
              {translations && translations[language].submitButton}
            </button>
          </div>
        </form>
        {showModal && (
          <div className="modalContainer">
            <div className="winnerModal">
              <img
                className="modalHat"
                src="/Sorting_Hat.png"
                alt="Sorting Hat"
              />
              <h2>{translations && translations[language].modalTitle}</h2>
              <h2 className="winner">{winner}</h2>
              <button className="acceptButton" onClick={handleAcceptButton}>
                {translations && translations[language].acceptButton}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
