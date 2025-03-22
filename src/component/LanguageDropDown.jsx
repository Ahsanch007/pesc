import React, { useEffect, useRef, useState } from "react";
import { LanguageIcon } from "./Icons";
import { useTranslation } from "react-i18next";
import ar from '../assets/svg/ar.svg';
import bg from '../assets/svg/bg.svg';
import en from '../assets/svg/en.svg';
import fr from '../assets/svg/fr.svg';
import cz from '../assets/svg/cz.svg';
import nl from '../assets/svg/nl.svg';
import de from '../assets/svg/de.svg';
import el from '../assets/svg/el.svg';
import hu from '../assets/svg/hu.svg';
import id from '../assets/svg/id.svg';
import it from '../assets/svg/it.svg';
import jp from '../assets/svg/jp.svg';
import pl from '../assets/svg/pl.svg';
import pt from '../assets/svg/pt.svg';
import ro from '../assets/svg/ro.svg';
import sk from '../assets/svg/sk.svg';
import es from '../assets/svg/es.svg';
import th from '../assets/svg/th.svg';
import tr from '../assets/svg/tr.svg';
import vn from '../assets/svg/vn.svg';
const svgImports = { ar, bg, en, fr, cz, nl, de, el, hu, id, it, jp, pl, pt, ro, sk, es, th, tr, vn };
const options = ["ar","bg","en","fr","cz","nl","de","el","hu","id","it","jp","pl","pt","ro","sk","es","th","tr","vn"];
const optionslang = ["عربي","БЪЛГАРСКИ","ENGLISH","FRANÇAIS","ČEŠTINA","NEDERLANDS","DEUTSCH","ΕΛΛΗΝΙΚΆ","MAGYAR","INDONESIA","ITALIANO","日本語","POLSKI","PORTUGUÊS","ROMÂNĂ","SLOVENSKÝ","ESPAÑOL","แบบไทย","TÜRKÇE","TIẾNG VIỆT"];
const LanguageDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { t, i18n: { changeLanguage, language } } = useTranslation();

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-[4px] border-[2px] border-white bg-darkGreen xl:py-[10px] py-2 xl:px-3 px-2 xl:text-base text-sm font-regular text-white gap-1 flex justify-between items-center transition-all duration-300 ease-in-out hover:bg-opacity-95 group"
      >
        <span className="transition-all duration-300 ease-in-out group-hover:rotate-[360deg]">
          <LanguageIcon />
        </span>
        <span className="uppercase">{selected}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"
            }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="h-60 w-64 absolute left-0 mt-4 bg-white border rounded-lg shadow-lg z-20 overflow-y-auto custom-scroll">
        <ul className="py-2 uppercase">
        {options.map((option, index) => {
        const svgPath = svgImports[option];
        return (
          <li
            key={index}
            className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer uppercase"
            onClick={() => {
              changeLanguage(option);
              setSelected(option);
              setIsOpen(false);
            }}
          >
            {svgPath && <img src={svgPath} alt={option} className="w-5 h-5 mr-2" />}
            {optionslang[index]}
          </li>
        );
      })}
        </ul>
      </div>      
      )}
    </div>
  );
};

export default LanguageDropDown;
