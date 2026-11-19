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

Signups go to [Loops](https://app.loops.so). Copy `.env.example` to `.env` and set `PUBLIC_WAITLIST_ENDPOINT` to the Loops form endpoint (Loops > Forms > Settings). Set the same variable on the host before you deploy.
Without it, the form only shows its success state and **signups are not saved**. Do not deploy without it.

Each signup arrives in Loops with the source "Website waitlist". Loops limits submissions to about one per minute per visitor: wait between test submissions.

## Where things are

- `src/styles/global.css`: design tokens (colors, fonts, shadows) and the few custom animations.
- `src/components/sections/`: one file per page section, assembled in `src/pages/index.astro`.
- `src/components/mockups/`: product UI drawn in HTML. Edit the copy and data at the top of each file.
- `src/components/ui/`: icons, tool logos, the Ori mascot (`SunMascot`, `OriNote`), section headings.

## Content rule

Copy only states what `docs/overview.md` supports: no customer logos, testimonials, metrics, certifications or integrations beyond Google Workspace, Slack and Linear. Security commitments still to confirm are listed in a TODO in `src/components/sections/Security.astro`.
