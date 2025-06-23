import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
import { z } from 'zod';
import {
  IRetableService,
  IRetableMCPServer,
  CreateProjectArgsSchema,
  AddColumnArgsSchema,
  DeleteColumnArgsSchema,
  InsertRowArgsSchema,
  UpdateRowArgsSchema,
  DeleteRowArgsSchema,
} from './types';

function wrapToolHandler<TArgs>(handler: (args: TArgs) => Promise<unknown>): (
  args: TArgs
) => Promise<{
  content: { type: 'text'; mimeType: 'application/json'; text: string }[];
  isError: boolean;
}> {
  return async (args: TArgs) => {
    try {
      const result = await handler(args);
      return {
        content: [
          {
            type: 'text',
            mimeType: 'application/json',
            text: JSON.stringify(result),
          },
        ],
        isError: false,
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            mimeType: 'application/json',
            text: JSON.stringify({
              error: error instanceof Error ? error.message : String(error),
            }),
          },
        ],
        isError: true,
      };
    }
  };
}

export class RetableMCPServer implements IRetableMCPServer {
  private server: McpServer;
  private retableService: IRetableService;

  constructor(retableService: IRetableService) {
    this.retableService = retableService;

    const server = new McpServer(
      {
        name: 'retable-mcp-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    //#region Workspace Tools
    server.tool(
      'get_workspace',
      'Get a specific Workspace and its Projects',
      { workspaceId: z.string() },
      wrapToolHandler(async ({ workspaceId }) => {
        return await this.retableService.getWorkspace(workspaceId);
      })
    );

    server.tool(
      'get_all_workspaces',
      "Get user's all Workspaces",
      {},
      wrapToolHandler(async () => {
        return await this.retableService.getAllWorkspaces();
      })
    );

    server.tool(
      'create_workspace',
      'Create a new Workspace with a default Project',
      {
        name: z.string(),
        description: z.string(),
      },
      wrapToolHandler(async ({ name, description }) => {
        return await this.retableService.createWorkspace({ name, description });
      })
    );

    server.tool(
      'delete_workspace',
      'Delete a specific Workspace',
      { workspaceId: z.string() },
      wrapToolHandler(async ({ workspaceId }) => {
        return await this.retableService.deleteWorkspace(workspaceId);
      })
    );

    server.tool(
      'get_workspace_projects',
      'Get projects in a workspace',
      { workspaceId: z.string() },
      wrapToolHandler(async ({ workspaceId }) => {
        return await this.retableService.getWorkspaceProjects(workspaceId);
      })
    );
    //#endregion

    //#region Project Tools

    server.tool(
      'create_project',
      'Create a Project under the given Workspace with a default Retable',
      CreateProjectArgsSchema.shape,
      wrapToolHandler(async ({ workspaceId, name, description, color }) => {
        return await this.retableService.createProject(workspaceId, {
          name,
          description,
          color,
        });
      })
    );

    server.tool(
      'get_project',
      'Get a specific Project with Retables',
      { projectId: z.string() },
      wrapToolHandler(async ({ projectId }) => {
        return await this.retableService.getProject(projectId);
      })
    );

    server.tool(
      'delete_project',
      'Delete a specific Project',
      { projectId: z.string() },
      wrapToolHandler(async ({ projectId }) => {
        return await this.retableService.deleteProject(projectId);
      })
    );

    server.tool(
      'get_project_tables',
      'Get tables in a project',
      { projectId: z.string() },
      wrapToolHandler(async ({ projectId }) => {
        return await this.retableService.getProjectTables(projectId);
      })
    );
    //#endregion

    //#region Table Tools
    server.tool(
      'create_table',
      'Create new table in a project',
      { projectId: z.string() },
      wrapToolHandler(async ({ projectId }) => {
        return await this.retableService.createTable(projectId);
      })
    );

    server.tool(
      'get_table',
      'Get information about a specific Retable',
      { tableId: z.string() },
      wrapToolHandler(async ({ tableId }) => {
        return await this.retableService.getTable(tableId);
      })
    );

    server.tool(
      'delete_column',
      'Delete column from a specific Retable',
      DeleteColumnArgsSchema.shape,
      wrapToolHandler(async ({ tableId, columns }) => {
        return await this.retableService.deleteColumn(tableId, columns);
      })
    );

    server.tool(
      'add_column',
      'Create a new column on the specific Retable',
      AddColumnArgsSchema.shape,
      wrapToolHandler(async ({ tableId, newColumn }) => {
        return await this.retableService.addColumn(tableId, newColumn);
      })
    );

    server.tool(
      'get_rows',
      'Get data in a table',
      { tableId: z.string() },
      wrapToolHandler(async ({ tableId }) => {
        return await this.retableService.getRows(tableId);
      })
    );

    server.tool(
      'insert_row',
      'Insert a new row in a specific Retable',
      InsertRowArgsSchema.shape,
      wrapToolHandler(async ({ tableId, newRow }) => {
        return await this.retableService.insertRow(tableId, newRow);
      })
    );

    server.tool(
      'update_row',
      'Update an existing row in a specific Retable',
      UpdateRowArgsSchema.shape,
      wrapToolHandler(async ({ tableId, newRow }) => {
        return await this.retableService.updateRow(tableId, newRow);
      })
    );

    server.tool(
      'delete_row',
      'Delete rows from a specific Retable',
      DeleteRowArgsSchema.shape,
      wrapToolHandler(async ({ tableId, rows }) => {
        return await this.retableService.deleteRow(tableId, rows);
      })
    );
    //#endregion

    this.server = server;
  }

  async connect(transport: Transport): Promise<void> {
    await this.server.connect(transport);
  }

  async close(): Promise<void> {
    await this.server.close();
  }
}
