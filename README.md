# LipariBank Dashboard - Day 3 - Fix Mission

Benvenuto al terzo sprint di debugging! Questo progetto si concentra su **liste, rendering condizionale e hook avanzati**. Troverai 3 bug legati all'uso di `key`, `useMemo` e `useCallback` con `React.memo`.

---

## Come avviare

```bash
npm install
npm run dev
```

L'applicazione sarà disponibile su [http://localhost:5173](http://localhost:5173).

---

## Le tue 3 missioni

### Missione 1 — Animazioni strane e stato perso durante il filtraggio

Quando digiti nel campo di ricerca o cambi il filtro per tipo, noti che le righe della lista si "animano" in modo inatteso: elementi che non dovrebbero spostarsi cambiano visivamente posizione, e in alcuni casi i dati visualizzati sembrano non corrispondere all'elemento corretto.

Il problema riguarda il modo in cui React identifica gli elementi della lista. Cerca nel codice del componente lista e correggi l'attributo che permette a React di tracciare ogni elemento in modo univoco.

### Missione 2 — L'interfaccia si blocca durante la digitazione

Quando scrivi nel campo di ricerca, l'input risponde con un ritardo percettibile ad ogni tasto premuto. Aprendo il Profiler di React DevTools durante la digitazione, vedrai che ogni render del componente `TransactionList` impiega decine di millisecondi.

Il problema sta in un calcolo che viene rieseguito ad ogni render anche quando i dati non sono cambiati. Trova questo calcolo e ottimizzalo con l'hook corretto.

### Missione 3 — FilterPanel si ri-renderizza inutilmente

Apri la console del browser: vedrai che il messaggio `FilterPanel re-rendered` appare ogni 5 secondi, anche senza toccare i filtri. Questo accade perché `FilterPanel` è avvolto in `React.memo`, ma `React.memo` non sta facendo il suo lavoro come previsto.

Individua quale prop di `FilterPanel` cambia riferimento ad ogni render del componente padre e correggila con l'hook appropriato.

---

## Strumenti consigliati

- **React DevTools — Profiler** — per visualizzare i re-render e misurare i tempi di render
- **React DevTools — Components** — per ispezionare props e identificare re-render inutili
- **Browser DevTools — Console** — osserva la frequenza dei log `FilterPanel re-rendered`
- **ESLint** — `npm run lint` per warning sugli hook

---

## Bonus Mission — Feature da Implementare (opzionale, ~1 ora)

Una volta risolti i 3 bug, sostituisci la gestione dei filtri con `useReducer` e aggiungi un componente di statistiche.

### Requisiti

- Lo stato dei filtri diventa un oggetto con `type`, `searchText`, `minAmount`, `maxAmount`, aggiornato tramite azioni `dispatch`
- Aggiungi un componente `TransactionStats` che mostra (con `useMemo`): numero di transazioni visibili, somma delle entrate, somma delle uscite, importo medio
- `TransactionStats` deve essere avvolto in `React.memo`

### Criteri di accettazione

- [ ] I filtri per importo `minAmount`/`maxAmount` funzionano e si combinano con gli altri
- [ ] Il `dispatch` è stabile tra i render (non crea una funzione nuova ad ogni render)
- [ ] Le statistiche si aggiornano solo quando cambiano le transazioni filtrate
- [ ] `TransactionStats` non si ri-renderizza per modifiche ai filtri che non cambiano i risultati
- [ ] Nessun bug risolto in precedenza viene reintrodotto
