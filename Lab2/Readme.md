## Slider/karuzela

### Wersja anacotokomu:
- [x] Wykonaj slider poziomy - zdjęcia przewijają się z prawej do lewej strony z użyciem animacji CSS lub animacji z JS.
- [x] Ilość slajdów jest stała, źródłem slajdów jest tablica z grafikami lub np. &lt;div&gt; zawierający &lt;img&gt;.
- [x] Slajder posiada przyciski odpowiadające każdemu slajdowi (kropeczki/numerki etc). Kliknięcie w przycisk przenosi do konkretnego slajdu niezależnie od slajdu aktualnie wyświetlanego
- [x] Slajder posiada przycisk dalej/wstecz
- [x] Slajder po wyświetleniu ostatniego slajdu animuje się do początku
### Wersja dasięludziompokazać:
- [x] Slider można zapauzować/wznowić 
> pauza zrealizowana po przez najechanie na elementy slider-a, wyście z jego obrębu powoduje wznowienie
- [x] Każdy slajd jest html-em (może zawierać teksty, grafikę, video etc)
> elementem slider-a może być każdy obiekt html-a, który posiada przypisaną klasę "slide". Przykład:
   ```html
                <img class="slide" src="http://picsum.photos/seed/picsum/600/400" alt="">
                <div class="slide"><span>JS is the BEST!</span></div>
                <img class="slide" src="http://picsum.photos/seed/picsum/600/400" alt="">
  ```
### Wersja kenburnssięchowa:
- [ ] Dostępne są dwa sposoby animacji: przewijanie lewo/prawo oraz przenikanie. Sposób konfiguracji dowolny.
- [ ] Jeżeli slajd jest grafiką lub video, można go kliknąć i powiększyć (tzw. lightbox). Kliknęcie w grafikę zatrzymuje slider.
