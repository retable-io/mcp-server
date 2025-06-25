# Retable MCP Server: AI-Assisted Data Management

Connect AI agents like Claude, Cursor and Windsurf to Retable. With this MCP server, AI agents can help manage your Retable data seamlessly.

## Usage

To use the MCP server, you must first configure your client (e.g., Claude, Cursor and Windsurf). Most clients provide an option to add a new MCP server.

### Cursor one-click installation

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=retable&config=eyJjb21tYW5kIjoibnB4IC15IHJldGFibGUtbWNwLXNlcnZlciIsImVudiI6eyJSRVRBQkxFX0FQSV9LRVkiOiIifX0%3D)

### Usage for Claude Desktop

For Claude Desktop, You’ll need to edit the `claude_desktop_config.json` file, which can be found via:

```bash
Settings → Developer → Edit Config
```

Add the following configuration to the "mcpServers" section of your `claude_desktop_config.json`:

```jsonc
{
  "mcpServers": {
    "retable": {
      "command": "npx",
      "args": ["-y", "retable-mcp-server"],
      "env": {
        "RETABLE_API_KEY": "$RETABLE_API_KEY"
      }
    }
  }
}
```

⚠️ Replace `$RETABLE_API_KEY` with your [Retable API Key](https://docs.retable.io/retable-user-guide/retable-api/api#how-to-find-my-retable-api-key).

After the configuration, restart Claude Desktop and you will see the active Retable tools

## Prerequisites & Development

Before getting started, make sure you have the following:

- [Node.js](https://nodejs.org/) (version **20.0.0 or later**)
- A [Retable](https://retable.io) account
- A [Retable API Key](https://docs.retable.io/retable-user-guide/retable-api/api#how-to-find-my-retable-api-key)

The project includes several npm scripts to help with development:

```bash
# Run TypeScript compiler in watch mode for development
npm run dev

# Build the project for production
npm run build

# Run ESLint on source files
npm run lint

# Automatically fix ESLint issues where possible
npm run lint:fix

# Test the MCP server locally with the inspector tool
npm run inspect
```

⚠️ To run `npm run inspect`, replace RETABLE_API_KEY to the inspect script.
