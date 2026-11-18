# Pridie marketing website

Astro + Tailwind CSS v4. Static output, no UI framework.

## Run it

Node comes from the Nix flake (`direnv allow` loads it automatically, or prefix commands with `nix develop -c`).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npx astro check   # type check
```

## Waitlist

Copy `.env.example` to `.env` and set `PUBLIC_WAITLIST_ENDPOINT` to a URL that accepts a JSON POST `{ "email": "..." }` (Tally, Formspree, Loops, your own API).
Without it, the form only shows its success state and **signups are not saved**. Do not deploy without it.

## Where things are

- `src/styles/global.css`: design tokens (colors, fonts, shadows) and the few custom animations.
- `src/components/sections/`: one file per page section, assembled in `src/pages/index.astro`.
- `src/components/mockups/`: product UI drawn in HTML. Edit the copy and data at the top of each file.
- `src/components/ui/`: icons, tool logos, handwritten annotations, section headings.

## Content rule

Copy only states what `docs/overview.md` supports: no customer logos, testimonials, metrics, certifications or integrations beyond Google Workspace, Slack and Linear. Security commitments still to confirm are listed in a TODO in `src/components/sections/Security.astro`.
