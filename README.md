# Wordsy

A powerful word cards generating and reviewing system which can let users to learn english or other languages.

## Quick Start

1. **Read CLAUDE.md first** - Contains essential rules for Claude Code
2. Follow the pre-task compliance checklist before starting any work
3. Use proper module structure under `src/main/[language]/`
4. Commit after every completed task

## Universal Flexible Project Structure

This project uses a **Standard** structure designed for full applications with modular organization.

```
wordsy/
├── CLAUDE.md              # Essential rules for Claude Code
├── README.md              # Project documentation
├── .gitignore             # Git ignore patterns
├── src/                   # Source code (NEVER put files in root)
│   ├── main/              # Main application code
│   │   ├── [language]/    # Language-specific code
│   │   │   ├── core/      # Core business logic
│   │   │   ├── utils/     # Utility functions/classes
│   │   │   ├── models/    # Data models/entities
│   │   │   ├── services/  # Service layer
│   │   │   └── api/       # API endpoints/interfaces
│   │   └── resources/     # Non-code resources
│   │       ├── config/    # Configuration files
│   │       └── assets/    # Static assets
│   └── test/              # Test code
│       ├── unit/          # Unit tests
│       └── integration/   # Integration tests
├── docs/                  # Documentation
├── tools/                 # Development tools and scripts
├── examples/              # Usage examples
└── output/                # Generated output files
```

## Development Guidelines

- **Always search first** before creating new files
- **Extend existing** functionality rather than duplicating  
- **Use Task agents** for operations >30 seconds
- **Single source of truth** for all functionality
- **Language-agnostic structure** - works with Python, JS, Java, etc.
- **Scalable** - start simple, grow as needed
- **Flexible** - choose complexity level based on project needs

## Features

- 📚 Word card creation and management
- 🎯 Intelligent review system
- 🌐 Multi-language support
- 📊 Progress tracking
- 🎨 Customizable card designs
- 💾 Export/import functionality

## Getting Started

1. Choose your preferred programming language
2. Set up the development environment
3. Follow the project structure guidelines in CLAUDE.md
4. Start implementing core features in `src/main/[language]/`

## Contributing

Please read CLAUDE.md for development rules and guidelines before contributing.