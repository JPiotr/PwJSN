## Canvas, kanwasik. 

### Wersja Nic się nie działo, naprawdę nic się... :
- [x] Narysuj X kulek poruszających się w dowolnym kierunku z losową prędkością
> ilośc kulek do wygenerowania jest rozbita proporcją po typie kulki. Wyróżniłem 4 typy kulek. 
> Funkcja powstała ze względów estetycznych, losowe generowanie kulek może powodować wygenerowanie większości takich samych.
```javascript
    const Oforces = {
    Large : {
        max: Oforce,
        min: (Oforce/4)+1,
        color : "#fd0606",
        colorF : "rgba(253,6,6,0.65)",
        colorF2 : "rgba(253,6,6,0.34)"
    },
    Big   : {
        max: Oforce/4,
        min: (Oforce/8)+1,
        color : "#ffae00",
        colorF : "rgba(255,174,0,0.65)",
        colorF2 : "rgba(255,174,0,0.34)"
    },
    Small : {
        max: Oforce/8,
        min: (Oforce/16)+1,
        color : "#397eff",
        colorF : "rgba(57,126,255,0.65)",
        colorF2 : "rgba(57,126,255,0.34)"
    },
    Mini  : {
        max: Oforce/16,
        min: Oforce/32,
        color : "#00fa74",
        colorF : "rgba(0,250,116,0.65)",
        colorF2 : "rgba(0,250,116,0.34)",
    },
    Mouse : {
        color : "rgb(29,255,4)",
        colorF : "rgba(4,255,226,0.22)",
        colorF2 : "rgba(255,4,196,0.21)"
    }
}
```
- [x] Jeśli odległość pomiędzy kulkami jest mniejsza niż Y rysuj pomiędzy nimi linię
> linia powstaje w momencie wykrycia jednej kulki przez drugą. Dynamicznie liczona odległość między obiektami. 
- [x] Kulki odbijają się od krawędzi strony
- [x] Dodaj przyciski Start i Reset
- [x] Zbadaj ile jesteś w stanie wyświetlić kulek (stabilne 60fps) przy założeniu Y = 20% szerokości ekranu  
> w przypadku mojej maszyny było to 180 kulek, max jaki można wygenerować na starcie aplikacji. 
X, Y jest definiowane przez użytkownika (pola tekstowe lub np. suwaki - wstępnie uzupełnione)

### Wersja Task Failed Successfully: 
- [x] Kursor myszy odpycha/przyciąga znajdujące się w pobliżu kulki. Siła odpychania/przyciągania jest konfigurowalna.
> Kursor także jest obiektem typu Orb. 
> Po przez przytrzymanie PPM realizowane są dwie funkcje: 
> - Jeśli kursor jest w bezruchu (lub jej prętkość jest mniejsza niż innej kulki) obija.
> - Jeśli najedziemy na kulkę o mniejszej sile, wtedy zostaje ona "przyciągnięta". 
> Jej siłę (standardowo) nie widoczną siłę definiujemy po przez suwak: 
> 
> ![image](https://user-images.githubusercontent.com/48734419/216425319-4028dca9-5f20-4f84-adf3-55b4a7068e4f.png)
> Aby pokazać siłę kulek należy zaznaczyć opcję "Fields Visible":
> 
> ![image](https://user-images.githubusercontent.com/48734419/216425553-ea5b8e09-96c8-4818-a9f8-ca7ea731a354.png)
>
> Dodatkowo można zmienić współczynnik siły, im większy współczynnik tym "trudniej" kulkom się poruszać 😏
> ![image](https://user-images.githubusercontent.com/48734419/216426290-5edd995d-01e8-4fd2-9872-ab8ccb5b2737.png)


- [x] Kliknięcie w kulkę powoduje jej usunięcie i utworzenie dwóch nowych w losowych miejscach.

### Wersja Męczy nas piłka:
- [x] Każda kulka ma początkowo losowy rozmiar. Rozmiar kulki określa jej energię. Agarrr:)
- [ ] Gdy kulka łączy się z drugą (linia) energia płynie od kulki słabszej do silniejszej (kulki zmieniają rozmiar).   
Siła kulki to X \* Prędkość + Y \* Masa.  
X, Y oraz prędkość przepływu energii konfigurowalne przez użytkownika.
- [ ] Kulki o rozmiarze mniejszym niż 1 umierają
- [x] W miarę jak kulka rośnie jej prędkość zwalnia (gdy maleje - przyspiesza)
