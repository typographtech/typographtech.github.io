# Typograph Tech Limited

Website for Typograph Tech Limited, a tech consulting company based in Hong Kong.

## Development

Requires [Hugo](https://gohugo.io/) (extended version).

```bash
# Start local dev server
hugo server -D

# Build static site
hugo
```

## Content Editing

Edit content in these files:
- `data/services.yaml` - Service offerings
- `data/projects.yaml` - Featured projects
- `data/team.yaml` - Team member bios
- `hugo.toml` - Site settings (contact email, description)

## Deployment

Push to `main` branch. GitHub Actions automatically builds and deploys to GitHub Pages.
