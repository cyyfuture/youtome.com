# YOUTOME site

Static YOUTOME marketing site for BFC China. The current default language is Kazakh; Russian, English, Chinese, Spanish, Arabic, French, Turkish, German, Portuguese, Uzbek, Korean and Japanese pages live under `/ru/`, `/en/`, `/zh/`, `/es/`, `/ar/`, `/fr/`, `/tr/`, `/de/`, `/pt/`, `/uz/`, `/ko/` and `/ja/`. Each page has a matching language switch link, canonical URL, alternate language links, and sitemap entry. Arabic pages use right-to-left layout.

## Build and verify

Run `node build-locales.mjs`, then `node verify-site.mjs`. The build fails when a localized page leaves an English content string untranslated. The verifier checks local links, canonical URLs, alternate language links, and the sitemap. The build has no runtime dependencies. `dist/` is the published directory.

## Content status

- Product names and generated architectural images are design concepts until the commercial catalogue is confirmed.
- Kazakhstan is the first market edition; `kk` and `ru` are complete across all site routes. Chinese, English, Spanish, Arabic, French, Turkish, German, Portuguese, Uzbek, Korean and Japanese editions are also complete at the page and metadata level. Arrange native-language editorial review before major paid campaigns. More languages should be added only with complete copy and checked metadata, then included in the locale builder and verifier.
- Public contact information and a receiving address for enquiries are pending from the business. The current form only copies the visitor's details locally.
- The approved English design before localization is backed up as the `english-v1` Git tag and in `../youtome-backups/english-v1-2026-09-28.zip`.

`site-config.mjs` centralizes the canonical origin and output directory. The default build targets the private Sites preview. For the separate mchdgo.online deployment, set `YOUTOME_SITE_ORIGIN=https://mchdgo.online` and `YOUTOME_OUTPUT_DIR` to an external build directory before running the build and verifier. The public deployment uses the `mchdgo-deploy` branch in the GitHub mirror; `www.mchdgo.online` redirects to the canonical apex domain.
