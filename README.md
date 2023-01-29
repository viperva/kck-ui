| Wydział Informatyki Politechniki Białostockiej Przedmiot:<br/>Komunikacja Człowiek - Komputer | Data realizacji: 09.01.2023                  |
| --------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Projekt 2: Tryb graficzny<br/>Adam Brzozowski                                                 | Prowadzący: dr inż. Teodora Dimitrova-Grekow |

# Generator planu lekcji (responsywny interfejs graficzny)

## Opis projektu

Aplikacja ma na celu umożliwić dla użytkownika wygenerowanie presonalizwanego oraz aktualnego planu lekcji z wykorzystaniem bazy danych Degry.<br/>
Aplikacja webowa powinna wyświetlać się poprawnie na urządzeniach o szerokości ekranu powyżej 350px (w dzisiejszych czasach nie spotyka się mniejszych użądzeń).<br/>
Brak ograniczenia górnego.

## Opis funkcjonalności

Użytkownik może:

- zaktualizować swoje dane (kierunek studiów, semestr, grupy ćwiczeniowe itp.)
- wygenerować plan (zawierający przedmioty wyłącznie podanych grup)
- zapisać swoje ustawienia
- wydrukować plan
- pobrać PDF z planem
- design responsywny

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
Wymaga ona minimalnej ilości konfiguracji i jest przystępna wizualnie.<br/>
Poprawnie obsługuje popularne formaty urządzeń

## Samoocena

Wszystkie elementy aplikacji:

- nagłówek
- konfiguracja
- podsumowanie
- plan

otrzymały wsparcie designu responsywnego.<br/>
Urządzenia szerokoeranowe, mniejsze oraz urządzenia mobilne posiadają inne rozkłady intertfejsu.<br/>
Opcja generowania pliku PDF została ulepszona nowym widokiem w celu tworzenia estetycznego pliku działającego tak samo we wszystkich formatach. Pojawiły się też nowe, lepsze powiadomienia :)<br/>
Osobiście jestem bardzo zadowolony z projektu. Trzymanie się jednego tematu w zakresie trzech projektów pozwoliło na rozbudowanie aplikacji do wysokiego standardu. Korzystanie z niej na telefonie jest przyjemne i estetyczne tak samo jak nie bardziej niż na komputerze.
