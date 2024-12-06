# Scenariusze testowe dla testów strony wikipedia
## Scenariusz 1: Sprawdzenie, czy strona posiada nagłówek
Kroki:
- Przejdź na stronę główną.
- Znajdź element header na stronie.
  
Oczekiwany wynik: Element header powinien być widoczny.
## Scenariusz 2: Sprawdzenie, czy strona posiada pole wyszukiwania
Kroki:
- Przejdź na stronę główną.
- Znajdź element input[type='search'] na stronie.

Oczekiwany wynik: Pole wyszukiwania powinno być widoczne.
## Scenariusz 3: Sprawdzenie, czy strona posiada przycisk wyszukiwania
Kroki:
- Przejdź na stronę główną.
- Znajdź element .cdx-search-input__end-button na stronie (klasa przycisku wyszukiwania).

Oczekiwany wynik: Przycisk wyszukiwania powinien być widoczny.
## Scenariusz 4: Sprawdzenie funkcjonalności wyszukiwania
Kroki:
- Przejdź na stronę główną.
- Wpisz tekst Selenium w pole wyszukiwania.
- Kliknij przycisk wyszukiwania.
- Znajdź element z ID ```firstHeading``` i pobierz jego tekst.

Oczekiwany wynik: Wynik wyszukiwania powinien prowadzić do strony, której nagłówek zawiera słowo Selenium.
## Scenariusz 5: Sprawdzenie obecności selektora języka
Kroki:
- Przejdź na stronę główną.
- Znajdź element o ID ```p-lang-btn``` (klasa selektora języka).
Oczekiwany wynik: Selektor języka powinien być widoczny.
## Scenariusz 6: Sprawdzenie, czy istnieje sekcja główna treści
Kroki:
- Przejdź na stronę główną.
- Znajdź element z ID ```mw-content-text``` (ID kontenera z treścią).
Oczekiwany wynik: Główna sekcja treści powinna być widoczna.
## Scenariusz 7: Sprawdzenie, czy strona posiada stopkę
Kroki:
- Przejdź na stronę główną.
- Znajdź element footer na stronie.
Oczekiwany wynik: Element footer powinien być widoczny.
## Scenariusz 8: Sprawdzenie, czy logo jest widoczne
Kroki:
Przejdź na stronę główną.
- Znajdź element .mw-logo-icon.
Oczekiwany wynik: Logo powinno być widoczne.
## Scenariusz 9: Sprawdzenie działania linku do losowego artykułu
Kroki:
- Przejdź na stronę główną.
- Kliknij menu główne (element z ID vector-main-menu-dropdown-checkbox).
- Kliknij link do losowego artykułu (element z accesskey='x').
- Znajdź element z ID firstHeading.
Oczekiwany wynik: Kliknięcie w link powinno przenieść do nowej strony z nagłówkiem.
## Scenariusz 10: Sprawdzenie, czy strona posiada tytuł
Kroki:
- Przejdź na stronę główną.
- Pobierz tytuł strony.
Oczekiwany wynik: Strona powinna mieć tytuł, którego długość jest większa niż 0 znaków.
