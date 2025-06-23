#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { RetableMCPServer } from './mcp-server.js';
import { RetableService } from './retable-service.js';

const main = async () => {
  const apiKey = process.env.RETABLE_API_KEY;

  if (!apiKey) {
    console.error(
      'Error: No API key provided. Set RETABLE_API_KEY in .env file.'
    );
    process.exit(1);
  }

  const retableService = new RetableService(apiKey);
  const server = new RetableMCPServer(retableService);
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

try {
  main();
} catch (error) {
  console.error(
    `Failed to start MCP server: ${
      error instanceof Error ? error.message : String(error)
    }`
  );
  process.exit(1);
}
