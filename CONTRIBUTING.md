# Contributing to Pyrogit

Thank you for your interest in contributing to Pyrogit! We welcome contributions from the community.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/Pyrogit.git`
3. Install dependencies: `bun install`
4. Start development: `bun dev`

## Testing

Before submitting a PR, ensure:
- All tests pass: `bun test`
- Code is formatted: `bunx @biomejs/biome format --write .`
- Linting passes: `bunx @biomejs/biome check .`
- No security vulnerabilities: `bun audit`

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes with tests
3. Ensure CI passes
4. Submit a PR with a clear description

## Code Guidelines

- Use TypeScript for all new code
- Follow the existing Clean Architecture pattern
- Add tests for new functionality
- Keep the codebase well-documented

## Questions?

Feel free to open an issue or discussion for any questions!