import Retable from 'retablejs';

import ProjectTypes from 'retablejs/dist/project/project.types';
import TableTypes from 'retablejs/dist/table/table.types';
import WorkspaceTypes from 'retablejs/dist/workspace/workspace.types';
import { IRetableService } from './types';

export class RetableService implements IRetableService {
  private api: Retable;

  constructor(apiKey: string) {
    this.api = new Retable({ apiKey: apiKey });
  }

  //#region Workspace Functions
  async getWorkspace(workspaceId: string): Promise<WorkspaceTypes.Workspace> {
    return this.api.getWorkspace(workspaceId);
  }

  async getAllWorkspaces(): Promise<WorkspaceTypes.AllWorkspaces> {
    return this.api.getAllWorkspaces();
  }

  async createWorkspace(
    newWorkspace: WorkspaceTypes.NewWorkspace
  ): Promise<WorkspaceTypes.Workspace> {
    return this.api.createWorkspace(newWorkspace);
  }

  async deleteWorkspace(
    workspaceId: string
  ): Promise<WorkspaceTypes.DeleteWorkspace> {
    return this.api.deleteWorkspace(workspaceId);
  }

  async getWorkspaceProjects(
    workspaceId: string
  ): Promise<WorkspaceTypes.WorkspaceProjects> {
    return this.api.getWorkspaceProjects(workspaceId);
  }
  //#endregion

  //#region Project Functions
  async createProject(
    workspaceId: string,
    newProject: WorkspaceTypes.NewProject
  ): Promise<WorkspaceTypes.Project> {
    return this.api.createProject(workspaceId, newProject);
  }

  async getProject(projectId: string): Promise<ProjectTypes.Project> {
    return this.api.getProject(projectId);
  }

  async deleteProject(projectId: string): Promise<ProjectTypes.DeleteProject> {
    return this.api.deleteProject(projectId);
  }

  async getProjectTables(
    projectId: string
  ): Promise<ProjectTypes.ProjectTables> {
    return this.api.getProjectTables(projectId);
  }
  //#endregion

  //#region Table Functions
  async createTable(projectId: string): Promise<ProjectTypes.NewTable> {
    return this.api.createTable(projectId);
  }

  async getTable(retableId: string): Promise<TableTypes.Table> {
    return this.api.getTable(retableId);
  }

  async deleteColumn(
    retableId: string,
    columns: TableTypes.Column
  ): Promise<TableTypes.DeleteColumn> {
    return this.api.deleteColumn(retableId, columns);
  }

  async addColumn(
    retableId: string,
    newColumn: TableTypes.NewColumn
  ): Promise<TableTypes.CreatedColumn> {
    return this.api.addColumn(retableId, newColumn);
  }

  async getRows(retableId: string): Promise<TableTypes.Row> {
    return this.api.getRows(retableId);
  }

  async insertRow(
    retableId: string,
    newRow: TableTypes.NewRow
  ): Promise<TableTypes.Row> {
    return this.api.insertRow(retableId, newRow);
  }

  async updateRow(
    retableId: string,
    newRow: TableTypes.UpdateRow
  ): Promise<TableTypes.UpdatedRow> {
    return this.api.updateRow(retableId, newRow);
  }

  async deleteRow(
    retableId: string,
    rows: TableTypes.DeleteRow
  ): Promise<TableTypes.DeletedRow> {
    return this.api.deleteRow(retableId, rows);
  }
  //#endregion
}
