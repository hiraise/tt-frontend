import {
  NewProject,
  GetProjects,
  ProjectService,
  AddMembers,
  GetProjectCandidates,
} from "@/domain/project/project.contracts";
import axiosClient from "./axiosClient";
import { API_ROUTES } from "../config/apiRoutes";
import { mapProjectFromApi } from "../mappers/projectMappers";
import { clientLogger } from "../config/clientLogger";
import { AppError, AppErrorType } from "@/shared/errors/types";
import { ApiProject, ApiProjectMembers } from "./types";
import { mapUserFromApi } from "../mappers/userMapper";

//TODO: Handle different error types appropriately

const getProjects: GetProjects = async () => {
  try {
    const response = await axiosClient.get<ApiProject[]>(API_ROUTES.PROJECTS);

    if (!Array.isArray(response.data)) {
      throw new AppError(
        AppErrorType.SERVER,
        "Invalid response format: expected array"
      );
    }

    return response.data.map((rawProject) => mapProjectFromApi(rawProject));
  } catch (error) {
    clientLogger.error("Get projects error", { error });
    throw new AppError(AppErrorType.SERVER, "Failed to get projects");
  }
};

const newProject: NewProject = async (payload) => {
  try {
    const response = await axiosClient.post<ApiProject>(
      API_ROUTES.PROJECTS,
      payload
    );
    const { id } = response.data;
    return await getProjectById(id);
  } catch (error) {
    clientLogger.error("Create project error", { error, payload });
    throw new AppError(AppErrorType.SERVER, "Failed to create project");
  }
};

const getProjectById = async (id: number) => {
  try {
    const response = await axiosClient.get<ApiProject>(
      API_ROUTES.PROJECT_BY_ID(id)
    );
    return mapProjectFromApi(response.data);
  } catch (error) {
    clientLogger.error("Get project by ID error", { error });
    throw new AppError(AppErrorType.SERVER, "Failed to get project by ID");
  }
};

const addMembers: AddMembers = async (emails, id) => {
  try {
    await axiosClient.post<ApiProjectMembers>(
      API_ROUTES.ADD_PROJECT_MEMBERS(id),
      { emails }
    );
  } catch (error) {
    clientLogger.error("Add members error", { error });
    throw new AppError(AppErrorType.SERVER, "Failed to add members to project");
  }
};

const getProjectCandidates: GetProjectCandidates = async (id?: number) => {
  try {
    const response = await axiosClient.get(API_ROUTES.GET_CANDIDATES(id));
    if (!Array.isArray(response.data)) {
      throw new AppError(
        AppErrorType.SERVER,
        "Invalid response format: expected array"
      );
    }
    return response.data.map((rawUser) => mapUserFromApi(rawUser));
  } catch (error) {
    clientLogger.error("Get project candidates error", { error });
    throw new AppError(AppErrorType.SERVER, "Failed to get project candidates");
  }
};

export const projectService: ProjectService = {
  getProjects: getProjects,
  newProject: newProject,
  getProjectById: getProjectById,
  addMembers: addMembers,
  getProjectCandidates: getProjectCandidates,
};
