| Wydział Informatyki Politechniki Białostockiej Przedmiot:<br/>Komunikacja Człowiek - Komputer | Data realizacji: 09.01.2023                  |
| --------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Projekt 2: Tryb graficzny<br/>Adam Brzozowski                                                 | Prowadzący: dr inż. Teodora Dimitrova-Grekow |

# Generator planu lekcji (interfejs graficzny)

## Opis projektu

Aplikacja ma na celu umożliwić dla użytkownika wygenerowanie presonalizwanego oraz aktualnego planu lekcji z wykorzystaniem bazy danych Degry.

## Opis funkcjonalności

Użytkownik może:

- zaktualizować swoje dane (kierunek studiów, semestr, grupy ćwiczeniowe itp.)
- wygenerować plan (zawierający przedmioty wyłącznie podanych grup)
- zapisać swoje ustawienia
- wydrukować plan
- pobrać PDF z planem

## Opis realizacji zmiany warstwy prezentacji

Logika filtrowania oraz umieszczenia lekcji w tabeli pozostała niezmienna. Główną różnicą w logice jest wykorzystanie zmiennych stanowych (ustawień użytkownika). Zmiana takiej zmiennej powoduje ponowne wywołanie funkcji filtrujących, które następnie porównywane są z obecnymi a ich róznica aktualizowana w warstwie wizualnej.<br/>
Aplikacja graficzna istnieje w formie aplikacji webowej (strony internetowej) stworzonej z pomocą biblioteki React implementującej opisane wyżej odświeżanie jedynie różnic widoku oraz zmienne stanowe.<br/>

## Szczególnie interesujące zagadnienia projektowe

W momencie zakończenia konfiguracji ustawień aplikacja automatycznie przenosi widok użytkownika na wysokość tabeli z planem lekcji. Dzieje się to w następujący sposób:<br/>

```js
event.target.name === "workshop" &&
  window.scrollTo({
    top: 565,
    behavior: "smooth",
  });
```

Tworzenie plików PDF zazwyczaj sprawia dużo problemów deweloperom. Dzięki bibliotekom _jsPDF_ (https://github.com/parallax/jsPDF) oraz _html2canvas_ (https://html2canvas.hertzen.com) proces ten został znacznie usprawniony:<br/>

```js
const download = () => {
  const input = table.current;
  if (input) {
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", [297, 210]);
      pdf.addImage(imgData, "JPEG", 0, 0, 297, 180);
      pdf.save("plan-lekcji.pdf");
    });
  }
};
```

Zmienna _input_ przechowuje element HTML (tabelę z planem). Element ten przetwarzany jest przez bibliotekę na element HTML Canvas, który następnie zmieniany jest w obraz. Następnie tworzymy nowy dokument PDF w orientacji poziomej i umieszczamy na nim wcześniej stworzony obraz.<br/>
Biblioteka MaterialUI (https://mui.com/) wprowadza komponent z zakładkami wykorzystany do konfiguracji ustawień. Podczas sterowania zakładkami za pomocą strzałek aktywny element podkreślany jest przyjemnym, animowanym stylowaniem.<br/>Chciałem uyskać ten efekt również podczas najeżdżania na zakładkę myszką.<br/>Po dłuższym śledztwie dowiedziałem się, że stylowanie przyznawane jest elementowi na podstawie stanu skupienia na elemencie (tzw. focus). Nadanie stanu Focus na element ręcznie (przy okazji zdażenia najechania na element myszką) spowodowało nadanie zakładce pożądanego stylowania:

```js
<Tab
  ref={t.ref}
  value={isEnabled ? tabIndex : -1}
  label={t.label}
  disabled={!isEnabled}
  className="tab"
  onMouseOver={() => {
    t.ref.current && t.ref.current.focus();
  }}
  onMouseLeave={() => {
    t.ref.current && t.ref.current.blur();
  }}
/>
```

Aplikacja napisana jest w języku Typescript będącego nadzbiorem języka Javascript.<br/> Dzięki temu projekt posiada statyczne typowanie co czyni go bardziej odpornym na nieoczekiwane błędy.

## Instrukcja instalacji

Aby uruchomic aplikację należy w pierwszej kolejności pobrac i rozpakować powyższe repozytorium. (https://github.com/viperva/kck-ui)<br/>
Aby umożliwić uruchomienie projektu, na komputerze powinno być zainstalowane środowisko uruchomieniowe Node.js (https://nodejs.org/en/download/)<br/>
Należy uruchomić konsolę i wejsc do katalogu projektu.
Następnie wykonać polecenia:<br/>
`npm install` oraz `npm start`.<br/>

## Instrukcja konfiguracji

Zakładając poprawne wykonanie kroków poprzedniego punktu, nie przewiduje się dodatkowych kroków potrzebnych do prawidłowego działania aplikacji.

## Instrukcja użytkownika

Korzystanie z programu jest wybitnie proste.<br/>
Jeżeli interfejs został wykonany poprawnie użytkownik powinen domyśleć się jak z niego korzystać.<br/>
Na środku ekranu znajdują się zakładki zawierające rozwijane menu z listą możliwych opcji ustawień.
Plan lekcji generuje się automatycznie.<br/>
Istnieją również opcje zapisu, wydruku oraz pobrania planu.<br/>
Opcje te znajdują się w rozwijanym menu w prawym górnym rogu ekranu.

## Wnioski

Aplikacja jest mała i prosta w obsłudze. Oferuje aktualny, estetyczny plan lekcji.<br/>
Przewagę nad dostępnymi planami lekcji oferowanymi przez Degrę, stanowi możliwość personalizacji.<br/>
Wymaga ona minimalnej ilości konfiguracji i jest przystępna wizualnie.

## Samoocena

Aplikacja z interfejsem graficznym jest dużo prostsza w użytkowaniu od poprzedniej wersji konsolowej.
Proces zmieniania ustawień jest prosty i maksymalnie zautomatyzowany, a sam plan generuje się automatycznie.<br/>
Aplikacja odświeża widok jedynie w miejscach wymagających odświeżenia (tj. okna planu po zmianie ustawień).<br/>
Dodane zostały nowe funkcjonalności takie jak wydruk i pobranie planu, które generują estetyczny dokument.<br/>
Aplikacja posiada atrakcyjny i przejrzysty interfejs. Znajdują się w niej oznaczenia oraz animacje i powiadomienia pomagające użytkownikowi rozumieć zachodzące procesy.<br/>
Wprowadzone zostały również liczne kolorowe ikonki uproszczające zrozumienie treści oraz budujące pozytywną atmosferę.
