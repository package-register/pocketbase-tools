# Makefile for automating release tasks

.PHONY: help update version commit

# Default command: Show help
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  help      Show this help message."
	@echo "  update    Commit pending changes, bump the package version, and push (BUMP=patch|minor|major, default: patch)."
	@echo "  version   Bump the package version only (BUMP=patch|minor|major, default: patch)."
	@echo "  commit    Commit all pending changes (MSG=\"Your commit message\", default: \"chore: update files\")."

# Default version bump is 'patch'
BUMP ?= patch
# Default commit message
MSG ?= "chore: update files"

# Commit pending changes, bump the version, and push
update:
	@if [ -n "$$(git status --porcelain)" ]; then \
		$(MAKE) commit MSG="chore: pre-release commit"; \
	fi
	@$(MAKE) version
	@git push --follow-tags

# Bump the package version
version:
	@npm version $(BUMP) -m "chore(release): v%s"

# Commit all pending changes
commit:
	@git add .
	@git commit -m "$(MSG)"
