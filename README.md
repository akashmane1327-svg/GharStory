# Ghar Story — Premium Real Estate Website

A React + Vite real-estate marketing site redesigned with a warm-ivory/navy/gold
design system, a fully functional Projects search & filter experience, and
persistent favourites.

## Getting started

```bash
npm install
npm run dev       # starts the dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

Requires Node.js 18+.

## What's implemented

- **Design system** — every color, spacing value, radius, shadow, font, and
  transition lives in CSS variables in `src/styles/global.css`. A single
  `.container` (max-width 1320px, responsive padding) and `.section` /
  `.section--alt` rhythm are reused on every page, so margins and alignment
  are consistent site-wide. The old arbitrary `border-b` divider lines have
  been removed entirely; visual hierarchy now comes from background-tint
  alternation and spacing instead.
- **Home** — premium hero with floating decorative shapes, an overlapping
  quick-search card, a featured-projects grid, trust badges, a testimonials
  preview (new — previously only existed on Client Stories), a stats strip,
  and a CTA banner. Sections fade/stagger into view on scroll via a small
  `useInView` hook + `<Reveal>` wrapper component (`prefers-reduced-motion`
  is respected and disables all motion).
- **Projects page** — the most heavily reworked page:
  - **Search** filters live across project name, location, and type as you
    type, with a clear (✕) button once text is entered.
  - **Sort** supports Default/Featured, Price Low→High, Price High→Low,
    Newest, and Name A→Z.
  - **Filters** open in a slide-in drawer with checkbox groups for Property
    Type, Location, Price Range, Bedrooms (BHK), and Status. Changes are
    kept in local "draft" state until **Apply Filters** is pressed; **Clear
    All** resets everything. The Filters button shows a live active-count
    badge, and every active filter also renders as a removable chip below
    the toolbar.
  - **Favourites** — every card has a heart button; toggling it updates a
    "Favourites only" view and is **persisted in `localStorage`** under the
    key `ghar-story:favourites`, so it survives a page refresh.
  - Search, filters, sort, and favourites all compose together correctly,
    and the results count updates live.
  - **Empty state** with a "Clear Filters" button instead of a blank page.
  - Results load with a **Load More** button (6 at a time) sized to the
    actual filtered count — there's no fake "Showing 8 of 48" pagination.
  - The Home page's quick-search bar hands off to this page via URL query
    params (`?location=&type=&bhk=&price=`), which seed the same filter
    state.
- **Project cards** — fixed aspect-ratio image with object-fit cover, a
  status badge + type badge, a heart/favourite button (`stopPropagation` so
  it never triggers card navigation), title truncation, location/price/
  config/area/amenities, and a "View Details" button. Hover adds a subtle
  3D lift + image zoom; keyboard focus is clearly visible.
- **View Details / Contact handoff** — clicking "View Details" on any card
  links to `/contact?project=<id>`. The Contact page reads that param, shows
  an "Inquiring about…" banner, and prefills the message field — without
  inventing a fake project-detail route.
- **Navbar** — sticky with a blur/shadow on scroll, animated hamburger menu
  (used from tablet width down to avoid cramped overlap), body-scroll lock
  while open.
- **Footer** — responsive 4-column layout, no unnecessary divider lines.
  Location links pre-filter the Projects page by that city.
- **Bug fix** — Client Stories' video thumbnail referenced
  `.client-stories__video-play` / `.client-stories__video-label` classes
  that didn't exist in the old CSS, leaving the play button/"Play Video"
  label unstyled. These are now fully styled.
- **Accessibility** — semantic landmarks, aria-labels/aria-pressed on every
  icon-only control, visible focus-visible outlines, and a global
  `prefers-reduced-motion` override that disables all animation/transition.

## How favourites & filters persist

Favourites live in React Context (`src/context/FavouritesContext.jsx`) backed
by `localStorage`. Filter/search/sort state lives in `Projects.jsx` component
state (not persisted) — it does, however, seed itself once from the URL query
string so links from Home (or the footer's location links) land on a
pre-filtered Projects page.

## Project structure

```
src/
  components/   Navbar, Footer, ProjectCard, ProjectToolbar, FilterPanel,
                SearchBar, TestimonialCard, CTABanner, Reveal, ScrollToTop
  context/      FavouritesContext (localStorage-backed)
  hooks/        useInView (scroll-reveal)
  data/         projects.js, testimonials.js — centralized data sources
  pages/        Home, Projects, About, ClientStories, Contact
  styles/       global.css (design system) + one CSS file per component/page
```

## Build verification

`npm install` and `npm run build` both complete without errors or warnings
on this codebase (verified before delivery).
