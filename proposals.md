# Pulse Editor Verbeteringsvoorstellen Prompts voor Jules

## 1. Functionaliteit Uitbreidingen
*   **Afbeelding Bewerking:** "Jules, voeg de mogelijkheid toe om afbeeldingen te schalen (resizen) binnen de editor. Gebruikers moeten een geselecteerde afbeelding groter of kleiner kunnen maken door te slepen of via een input veld."
*   **Tabellen:** "Jules, voeg ondersteuning toe voor het invoegen, bewerken en formatteren van tabellen. Zorg ervoor dat er functies zijn om rijen en kolommen toe te voegen of te verwijderen."
*   **Markdown Ondersteuning:** "Jules, voeg functionaliteit toe om Markdown-tekst te importeren en de huidige opmaak van de editor te exporteren als Markdown. Voeg hiervoor de nodige knoppen of API-methoden toe."
*   **Code Blokken met Syntax Highlighting:** "Jules, verbeter de weergave van codeblokken in de editor door syntaxkleuring (syntax highlighting) toe te voegen voor verschillende programmeertalen. Integreer indien nodig een geschikte library."
*   **Volledig Scherm Modus:** "Jules, voeg een knop toe aan de toolbar om de editor in fullscreen modus (volledig scherm) te openen en sluiten voor een afleidingsvrije schrijfervaring. Houd rekening met de mousedown events in plaats van click events voor toolbar knoppen, zoals beschreven in de memory/guidelines."

## 2. AI Assistent Verbeteringen
*   **Tekst Uitbreiden (Expand):** "Jules, voeg een AI-preset toe genaamd 'Expand' (Tekst Uitbreiden). Deze preset moet een geselecteerde korte zin of tekst via de Gemini API uitbreiden tot een volledige, logische alinea."
*   **Toon Aanpassen (Divers):** "Jules, voeg meer presets toe voor de toon van de tekst via AI. Voeg ten minste de opties 'Informeel', 'Overtuigend' en 'Academisch' toe."
*   **SEO Optimalisatie:** "Jules, creëer een AI-tool in de editor die suggesties geeft om de geselecteerde of volledige tekst beter te optimaliseren voor zoekmachines, inclusief feedback over trefwoord dichtheid."
*   **Automatische Tags/Categorieën:** "Jules, voeg een functie toe waarbij de AI automatisch tags of categorieën kan voorstellen op basis van de geschreven tekst in de editor."
*   **Chat Interface:** "Jules, bouw een zijpaneel (chat interface) waar gebruikers direct met de AI (Gemini API) kunnen chatten over het document, als alternatief voor of aanvulling op de toolbar acties."

## 3. Samenwerking en Integratie
*   **Real-time Samenwerking:** "Jules, implementeer real-time samenwerking in de editor zodat meerdere gebruikers tegelijk in hetzelfde document kunnen werken. Gebruik hiervoor een geschikte technologie zoals WebSockets of Yjs."
*   **Opmerkingen/Annotaties:** "Jules, voeg de mogelijkheid toe voor gebruikers om opmerkingen of annotaties toe te voegen aan specifieke tekstselecties in het document, zonder dat de hoofdtekst zelf wordt gewijzigd."
*   **Versiegeschiedenis:** "Jules, bouw een systeem voor versiegeschiedenis. Gebruikers moeten eerdere versies van het document kunnen inzien en de tekst kunnen terugzetten naar een eerdere staat."
*   **Cloud Opslag Integratie:** "Jules, voeg integraties toe zodat de inhoud van de editor direct kan worden opgeslagen naar, of geladen vanuit, cloud opslag diensten zoals Google Drive en Dropbox."

## 4. UI / UX Optimalisaties
*   **Aanpasbare Toolbar:** "Jules, pas de `initializePulseEditor` configuratie aan zodat gebruikers (developers) zelf kunnen kiezen welke knoppen zichtbaar zijn in de toolbar wanneer ze de editor initialiseren."
*   **Sneltoetsen Overzicht:** "Jules, voeg een help-menu of modal toe aan de editor met een overzicht van alle beschikbare sneltoetsen (bijv. Ctrl+B, Ctrl+I). Zorg voor een logische manier om dit menu te openen."
*   **Zwevende Toolbar (Floating Toolbar):** "Jules, verander de huidige vaste toolbar in een zwevende toolbar (floating toolbar). De toolbar moet direct boven de geselecteerde tekst verschijnen (zoals bij Medium of Notion) in plaats van altijd bovenaan te staan."
*   **Dark Mode Ondersteuning:** "Jules, implementeer volledige ondersteuning voor een donker thema (Dark Mode). Zorg ervoor dat zowel de editor, de toolbar, als eventuele dialogen en menu's correct worden weergegeven in donkere modus."
