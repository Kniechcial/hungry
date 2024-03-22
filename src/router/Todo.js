//  PLAN NA TYDZIEŃ 18.03.- 24.03.
// 1. Home View.
// 1.1. Hover.
// 1.1.1. Przyciemnić tło.
// 1.1.2. Powiększyć nieco obraz / tekst.
// 1.1.3. Dodać przyciski do przejść na stronę odpowiadającą kafelkowi.
// 1.1.4. W miejscach gdzie konieczna jest autoryzacja. Dodać tekst że trzeba się zalogować. plus przycisk do logowania.
// 1.1.5. Box Shadows.
// 1.2. Menu.
// 1.2.1. Usunąć setting.
// 1.2.2. Dodać taką opcję jak w googlu. okno z inicjałami. W tym wszystkie ustawienia.
// 2. Recipe List.
// 2.1. Lista wyświetla się nazwa dania, czas i kalorie / alergie.
// 2.2. Dodać przycisk do otworzenia okna z daniem.
// 3. Przygotować pobieranie i wyświetlanie danych z API.

//  PLAN NA TYDZIEŃ 26.02 - 03.02
// 1. Skończyć dodawanie przepisu. (Dodać przycisk edycji) ++++++++++++++++++++++++++

// 2. Poprawić baseRecipe. (Dodać wyśiwtlanie czasu) ++++++++++++++++++++++++++++++++

// 3. Przygotować pytania do Damiana. Powiedzieć co jest zrobione w jakaim i w jakim stopniu, co jeszcze nie jest zrobione i jak bym chciał jak by to miało działać. .++++++++++++++++++++++++++++
// 4. Przygotować HomeView. Nie musi być w 100% skończone (choć fajnie by było) przed wysłaniem Damianowi.++++++++++++++++++++++++++++

// _______________________________________________________________________________________________________
// Add Recipe
//

// 3. Dodać przycisk do edycji danych podanych we wcześniejszym oknie. (narazie tylko dodać przycisk i niech przekierowuje, docelowo zasanowić się nad opcją automatycznego uzupenienia w danych podanych w przepisie. )

// 2. Po wprowadzeniu wszystkich elementów dania przejście do okna zatwierdzającego przepis.
// 2.1. Przepis wyświetla się w formie domyślnej przygotowanej baseRecipe.
// 2.2. Pod przepisem znajdują się 2 przyciski.
// 2.2.1. Pierwszy zatwierdzający przepis. i przekierowujący na stronę główną, wyświetlający informację o sukcesie.
// 2.2.2. Drugi z opcją cofnięcia się to okna wpisywania przepisu w celu zmiany wprowadzonych informacji.
// 2.3. Zobaczyć czy z mouted można najpierw domyślnie mieć wczytaną newRecipe-1 następnie po zatwierdzeniu odmątować ją i zamontować newRecipe-2 i finalnie listę wszystkich przepisów.
//

// _______________________________________________________________________________________________________
// My recipe list
//
// 1. Na stronie wyświetla się nagłówek do filtrowania przepisów po, tagach, wyszukiwarka po nazwie.
// 2. Poniżej znajduje się lista z nazwami przepisów.
// 2.1. Zastanowić się nad sposobem wyświetlania. Czy wszystkie przepisy mają być na jednej stronie, czy może podzielić je na strony. Tzn. max 10 przepisów na stronę i żeby zobaczyć kolejne trzeba przejść na kolejną stronę, czy wszystkie ciągiem na jednej?
// 2.2. Po kliknięciu na nazwę przepisu wyświetla się domyślny obraz przepisu. baseRecipe.
// 2.3. Obok nazwy przepisu znajdują się dwie ikony odpowiedzialne za edycję i usunięcie przepisu z listy.
// 2.3.1. Po kliknięciu na przycisk wyskakuje okno komunikatem czy na pewno chcesz to zrobić i dwoma przyciskami Tak lub Nie.
// 2.3.2. Jeśli tak przekierowuje do okna edycji lub usuwa przepis wyświetlając Toast-a z informacją że usunięto przepis.
// 2.3.3.  Jeśli nie okno się zamyka i zostajemy na stronie z listą przepisów.

// _______________________________________________________________________________________________________
// ZROBIONE!

// 1. Zastanowić się jak ma wyglądać główna strona.
// 2. Co i gdzie ma się na niej znajdować.
// 3. Ma to być strona pierwsza, która odpala się po włączeniu strony oraz ta po wylogowaniu się użytkownika.
// 4. Zastanowić się czy strona przed zalogowaniem i po zalogowaniu ma wyglądać tak samo czy ma się w jakiś sposób różnić. Jeśli tak to jak?
// 1.4. Wprowadzeni wymogu podania watości przy wyborze składników i opisu ilości oraz kalorii.
// 1.4. Dodać Opcję wyboru alergii.
// 1.5. Dodać opcję wprowadzenia czasu w min.
//
// 1.3. Zastanowić się nad opcją wpisywania ilości składników.
// 1.6. Dodać przycisk wyboru przy składnikach co wybieramy (l, kg, szt.)

// 1.4.  Nazwa dania, składniki, i opis są wymagane! w przypradku braku którego kolwiek z nich zwaracamy błąd.
// / 1.4. Efekt końcowy zwracany w formie obiektu.
// 1.1 Poustawiać wszystko na stwoich miejscach.
// 1.2. Zmienić opcję wyboru składników i tagów.
// 1. Zgrupować widoki 1. Główne (footer, header, top bar, ...) 2. User(singIn, LogIn,).
// 2. Dopracować wyświetlanie błędów.
// 6. Wyczyścić i uczytelnić kod. Poukładać let, cons, function
// 4. Dodać warunek że żaden input nie może być pusty.
// 7. Przygotować okno logowania z tymi warunkami co do singIn-a
// 5. Sprawdzić jak działa Toast i dodać w momęcien zalogowania lub zarejestrowania użytkownika
// 10. Dodać przycisk do przywrócenia hasła w na ekranie zakładania konta.
// 11. Dodać przejście po porawnym założeniu konta to strony wpisania kodu weryfikacyjnego z linku?
// 14. Doprowadzić LogIn do etapu singIn
// 17. Poprawić wyświetlanie błędu przy logowaniu. Okno do przywrócenia konta powinno się wyświetlać nie tylko po wprowadzeniu błędnego emaila ale i hasła.
// 18. Dodać Toast do Log In.
// 17. Przygotować wyświetlanie przepisu .
// 17.1. Gdzie maja się wyświetlać poszczególne elementy przepisu.
// 17.2. Tytuł, przepis, zdjęcie, tagi,
// 9. Trim Function.

// 1. Dodać hovera do div na home view powiekszenie poszarzenie plus guzik do przejścia.
// 2.
