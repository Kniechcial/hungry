<!--  Wyświetlanie konkretnego przepisu.

baseRecipe. Tak nazwałem swój szablon do wyświetlania konkretnego przepisu. Chciał bym żeby podpinały się pod nim poszczególne elementy danego przepisu,tj. nazwa, alergie(o ile są podane), czas, zdjęcie, kalorie (o ile są podane), opis przygotowania przepisu, i składniki.
Mój baseRecipe na ten moment nie ma przygotowanej żadnej logiki do wyświetlania poszczególnych elementów. Przygotowałem tylko szablon do ich wyświetlania.

Chciał bym żebyś ocenił czy to wygląda spoko, czy coś byś zmienił, i jak się zdzwonimy to żebyśmy przegadali jak to zrobić żeby wyświetlało się tak jak powinno. Ponadto zastanawiam się czy nie dodać do tego szblonu 2 przycisków. Jeden służył by edycji a drugi do usunięcia przepisu (co sądzisz?).

Na ten moment dodałem to sobie do Menu żeby nie trzeba było szukać. Docelowo nie będzie tam tego.
 
Wydaje mi się że szbalon jest gotowy nie przewiduje tutaj żadnych dodatkowych rzeczy, poza tymi ewentualnymi przyciskami.



 -->
<!-- Dodawanie przepisu 
    
    w menu wybieramy recipe, a następnie addRecipe.


    W nagłówku pojawia się mały opis jak dodać potrawę.

Moje dodawanie przepisu składa się z 2 etapów. 

Pierwszym jest wprowadzenie przez użytkownika  nazwy dania, tagu, składników, linku do zdjęcia, opisu przygotowania potwary, oraz zaznaczenia czy użytkownik chce dodać kaloryczność potrawy czy nie. Użytkownik obowiązkowo musi wprowadzić nazwę, wybrać składniki oraz dodać opis, pozostałe elementy są dobrowolne. 

Chciał bym żeby wybór składników i wybur tagu był z list, które będę mieć w swojej bazie. 
Zastanawiam się nad wprowadzeniem minimalnej liczby znaków przy wprowadzeniu przepisu (co myślisz?).

Drugim etapem jest wprowadzenie przez użytkownika sprecyzowanych informacji dotyczących przepisu.
Użytkownik wprowadza, alergie, czas, kalorie i składniki oraz ich ilość. 

Docelowo chciał bym żeby wybór kalorii był uzależniony od wyboru w etapie pierwszym przez użytkownika czy chce je dodać czy nie.
Wybrane w et.1 składniki powinny wyświetlać się jako "już wybrane", żeby użytkownik mógł przypisać do nich konkretne ilości i gramaturę.

Wszystkie dane w tym etapie są obowiązkowe i dodanie przepisu bez ich wprowadzenia nie jest możliwe.
Po poprawnym dodaniu przepisu chciał bym żeby wyświetlała się lista z przepisami przypisanymi do konta użytkownika. (Jeszcze nie stworzyłem szablonu takiej listy.)

Na tym etapie użytkownik ma też możliwość cofnięcia się do poprzedniego etapu i wyedytowanie wprowadzonych tam elementów. I teraz pytanie. Chciał bym żeby to było uniwersalne. Chciał bym to wykożystać nie tylko w momęcie tworzenia nowego obiektu ale też edytowania już istniejących przepisów. Jak zrobić żeby w et.1 wyśiwetlały się dane. Chodzi mi o to że jeśli np. użytkownik zrobił literówkę w opisie i kliknie cofnij to żeby cały tekst przygotowania przepisu był wprowadzony w inpucie. Tak samo jeśli użytkownik będzie edytował już istniejący przepis, żeby wyświetlało się to w ten sam sposób. Masz jakiś pomysł jak to zrobić ?

Chciał bym żeby taki przepis został zapisany w formie obiektu. Wszystkie elementy wprowadzane przez użytkownika były by na zasadzie key-value.

Nie wiem jak zrobić ze składnikami, ponieważ użytkownik wprowadza składniki i one teoretycznie powinny być jednocześnie wartością w tablicy ze składnikami, jak i do każdego składnika musi być przypisana jednocześnie jego ilość i gramatura. Jak myślisz jak najlepiej było by rozwiązać taki problem ?

Co myślisz na temat takiego wprowadzania przepisu? Czy jest lepszy / prostszy sposób na uzyskanie takiego efektu jak bym chciał w inny sposób?


-->
<!--  Dodanie użytkownika / logowanie

Na ten moment znajduje się to na stronie głównej. Docelowo stworzę strona będzie wyglądać inaczej. Chciał bym żebyś zerknął na schemat zarówno logowania jak i zakładania konta. Czy tak jak to przygotowałem jesteśmy w stanie przy użyciu firebase łatwo wykorzystać, czy to będzie musiało być jeszcze w jakiś znaczący sposób wyedytowane?

 -->
<!-- Pytania ogólne

1. Jak oceniasz nową stylistykę strony? lepsza coś byś zmienił?
2. Jak używać mounted? przy dodawaniu przespisu chciał bym żeby na początku był "zamontowany" et.1 następnie jak użytkownik kliknie dalej, chciał bym odmontować et.1 i zamontować et.2. I to samo w przypadku kiedy użytkownik kliknie cofnij chciał bym "odmontować" et.2 i zamontować et.1.
3. Chciał bym żebyśmy założyli tego firebase żebyś mi wytłumaczył jak to działa, żebym mógł sobie już w oparciu o niego coś tworzyć bazę i kończyć poszczególne rzeczy. Teraz mam wrażenie że mam takie puzle trochę zaczęte nieskończone. Mam na myśli panel logowania, panel dodawania użytkownika, dodawanie przepisu.
4. Jak uważasz w jakim stopniu zaawansowania jest projekt ?
5. Co uważasz za co zabrać się w następnej kolejności?
6. Też zastanawiam się nad kwestią struktury pisania kodu. Czy lepiej mieć kod css w każdym pliku oddzielnie, czy lepiej sobie je jakoś grupować? Jaka jest konwencja nazywania komponentów. Chciał bym żeby to wyglądało profesjonalnie.
7. NewRecipe-2 przy wyborze ilości ( ml, g, szt.) wartość źle się wyśiwetla jak to naprawić ?
8. Przekazywanie danych pomiędzy obiektami. Pobieram dane z NewRecipe-1 i chcę je wyświetlić w NewRecipe-2, w formie listy. Składniki wybrane przez użytkownika mają służyć następnie do stworzenia obiektu - jako klucze i przypisana do nich ma zostać wartość tzn. ilość w formie cyfry oraz opicu (ml, g, szt.)
9. Co z responsywnością strony? Na ten moment wgl. się tym nie przejmuję. Pytanie docelowo powinienem coś z tym robić, czy nie ma to większego sensu?
10. Chciał bym ustalać wymiary mojego okna do wprowadzania teksu. W newRecipe1 chciał bym żeby nazwa dania i link do wklejenia zdjęcia miały taką samą szerokość jak Składniki. Podobnie w newRecipe2 chciał bym żeby alergie i czas miały taką samą długość. Jak to zrobić?
11.Wysypało mi się to Tasty i nie wiem jak to naprawić.