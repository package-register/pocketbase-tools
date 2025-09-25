# Makefile for automating release tasks

.PHONY: help update version

# Default command: Show help
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  help      Show this help message."
	@echo "  update    Bump the package version, commit, and push (BUMP=patch|minor|major, default: patch)."
	@echo "  version   Bump the package version only (BUMP=patch|minor|major, default: patch)."

# Default version bump is 'patch'
BUMP ?= patch

# Bump the version, commit, and push
update: version
	@git push --follow-tags

# Bump the package version
version:
	@npm version $(BUMP) -m "chore(release): v%s"
