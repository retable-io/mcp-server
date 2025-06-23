import { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
import ProjectTypes from 'retablejs/dist/project/project.types';
import TableTypes from 'retablejs/dist/table/table.types';
import WorkspaceTypes from 'retablejs/dist/workspace/workspace.types';

import { z } from 'zod';

export const CreateProjectArgsSchema = z.object({
  workspaceId: z.string(),
  name: z.string(),
  description: z.string(),
  color: z.string(),
});

export const AddColumnArgsSchema = z.object({
  tableId: z.string(),
  newColumn: z.object({
    columns: z.array(
      z.object({
        title: z.string(),
        type: z.string(),
      })
    ),
  }),
});

export const DeleteColumnArgsSchema = z.object({
  tableId: z.string(),
  columns: z.object({
    column_ids: z.array(z.string()),
  }),
});

export const InsertRowArgsSchema = z.object({
  tableId: z.string(),
  newRow: z.object({
    columns: z.array(
      z.object({
        title: z.string(),
        type: z.string(),
      })
    ),
    data: z.array(
      z.object({
        columns: z.array(
          z.object({
            column_id: z.string(),
            cell_value: z.string(),
          })
        ),
      })
    ),
  }),
});

export const UpdateRowArgsSchema = z.object({
  tableId: z.string(),
  newRow: z.object({
    rows: z.array(
      z.object({
        row_id: z.number(),
        columns: z.array(
          z.object({
            column_id: z.string(),
            update_cell_value: z.string(),
          })
        ),
      })
    ),
  }),
});

export const DeleteRowArgsSchema = z.object({
  tableId: z.string(),
  rows: z.object({
    row_ids: z.array(z.number()),
  }),
});

export interface IRetableService {
  //#region Workspace Functions
  /**
   * Fetches a specific Workspace and its Projects.
   * @param workspaceId - The ID of the workspace to fetch.
   * @returns A promise that resolves to the workspace object.
   */
  getWorkspace(workspaceId: string): Promise<WorkspaceTypes.Workspace>;

  /**
   * Fetches all workspaces from Retable.
   * @returns A promise that resolves to the list of all workspaces.
   */
  getAllWorkspaces(): Promise<WorkspaceTypes.AllWorkspaces>;

  /**
   * Creates a new workspace in Retable.
   * @param newWorkspace - The details of the new workspace to create.
   * @returns A promise that resolves to the newly created workspace.
   */
  createWorkspace(
    newWorkspace: WorkspaceTypes.NewWorkspace
  ): Promise<WorkspaceTypes.Workspace>;

  /**
   * Deletes a workspace by its ID.
   * @param workspaceId - The ID of the workspace to delete.
   * @returns A promise that resolves to the deleted workspace.
   */
  deleteWorkspace(workspaceId: string): Promise<WorkspaceTypes.DeleteWorkspace>;

  /**
   * Fetches all projects in a specific workspace.
   * @param workspaceId - The ID of the workspace to fetch projects from.
   * @returns A promise that resolves to the list of projects in the workspace.
   */
  getWorkspaceProjects(
    workspaceId: string
  ): Promise<WorkspaceTypes.WorkspaceProjects>;
  //#endregion

  //#region Project Functions
  /**
   * Create a Project under the given Workspace with a default Retable.
   * @param newProject - The details of the new project to create.
   * @returns A promise that resolves to the newly created project.
   */
  createProject(
    workspaceId: string,
    newProject: WorkspaceTypes.NewProject
  ): Promise<WorkspaceTypes.Project>;

  /**
   * Fetches a specific Project with Retables.
   * @param projectId - The ID of the project to fetch.
   * @returns A promise that resolves to the project object.
   */
  getProject(projectId: string): Promise<ProjectTypes.Project>;

  /**
   * Deletes a project by its ID.
   * @param projectId - The ID of the project to delete.
   * @returns A promise that resolves to the deleted project.
   */
  deleteProject(projectId: string): Promise<ProjectTypes.DeleteProject>;

  /**
   * Fetches all tables in a specific project.
   * @param projectId - The ID of the project to fetch tables from.
   * @returns A promise that resolves to the list of tables in the project.
   */
  getProjectTables(projectId: string): Promise<ProjectTypes.ProjectTables>;
  //#endregion

  //#region Table Functions
  /**
   * Creates a new table in the specified project.
   * @param projectId - The ID of the project where the table will be created.
   * @returns A promise that resolves to the newly created table.
   */
  createTable(projectId: string): Promise<ProjectTypes.NewTable>;

  /**
   * Fetches a specific Retable by its ID.
   * @param retableId - The ID of the Retable to fetch.
   * @returns A promise that resolves to the Retable object.
   */
  getTable(retableId: string): Promise<TableTypes.Table>;

  /**
   * Delete column from a specific Retable.
   * @param retableId - The ID of the Retable.
   * @param columns - The columns to delete.
   * @returns  A promise that resolves to the result of the deletion.
   */
  deleteColumn(
    retableId: string,
    columns: TableTypes.Column
  ): Promise<TableTypes.DeleteColumn>;

  /**
   * Adds a new column to a specific Retable.
   * @param retableId - The ID of the Retable to add the column to.
   * @param newColumn - The details of the new column to add.
   * @returns A promise that resolves to the newly created column.
   */
  addColumn(
    retableId: string,
    newColumn: TableTypes.NewColumn
  ): Promise<TableTypes.CreatedColumn>;

  /**
   * Fetches all rows in a specific table.
   * @param tableId - The ID of the table to fetch rows from.
   * @returns A promise that resolves to the rows in the table.
   */
  getRows(tableId: string): Promise<TableTypes.Row>;

  /**
   * Adds a new row to a specific Retable.
   * @param retableId - The ID of the Retable to add the row to.
   * @param newRow - The details of the new row to add.
   * @returns A promise that resolves to the newly created row.
   */
  insertRow(
    retableId: string,
    newRow: TableTypes.NewRow
  ): Promise<TableTypes.Row>;

  /**
   * Updates an existing row in a specific Retable.
   * @param retableId - The ID of the Retable to update the row in.
   * @param newRow - The details of the row to update.
   * @returns A promise that resolves to the updated row.
   */
  updateRow(
    retableId: string,
    newRow: TableTypes.UpdateRow
  ): Promise<TableTypes.UpdatedRow>;

  /**
   * Deletes rows from a specific Retable.
   * @param retableId - The ID of the Retable to delete rows from.
   * @param rows - The rows to delete.
   * @returns A promise that resolves to the result of the deletion.
   */
  deleteRow(
    retableId: string,
    rows: TableTypes.DeleteRow
  ): Promise<TableTypes.DeletedRow>;
  //#endregion
}

export interface IRetableMCPServer {
  connect(transport: Transport): Promise<void>;
}
