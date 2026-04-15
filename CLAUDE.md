# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hugo static website for Typograph Tech Limited, a tech consulting company based in Hong Kong.

## Development Commands

```bash
hugo server -D    # Start dev server at localhost:1313
hugo              # Build static site to /public
```

## Architecture

- **Framework**: Hugo (Go-based static site generator)
- **Hosting**: GitHub Pages via GitHub Actions
- **License**: GNU General Public License v3

## Key Files

- `hugo.toml` - Site configuration (title, description, contact email)
- `layouts/index.html` - Homepage template
- `layouts/_default/baseof.html` - Base HTML template with SEO tags
- `static/css/style.css` - Styling
- `data/services.yaml` - Services content
- `data/projects.yaml` - Projects content
- `data/team.yaml` - Team bios
- `.github/workflows/hugo.yml` - Deployment workflow

## Content Updates

Edit YAML files in `data/` directory for content changes. Site rebuilds automatically on push to main.
