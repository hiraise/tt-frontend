import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/infrastructure/redux/hooks";
import { clientLogger } from "@/infrastructure/config/clientLogger";
import {
  getProjectByIdThunk,
  getProjectCandidatesThunk,
  getProjectsThunk,
  newProjectThunk,
} from "../thunks/projectsThunks";
import { ProjectPayload } from "@/domain/project/project.payload";
import { Project } from "@/domain/project/project.entity";
import { ROUTES } from "@/infrastructure/config/routes";
import { clearProject } from "../slices/projectSlice";
import { User } from "@/domain/user/user.entity";

type UseProjectsResult = {
  createProject: (payload: ProjectPayload) => Promise<Project | undefined>;
  getProjects: () => Promise<void>;
  getCandidates: (projectId?: number) => Promise<User[] | undefined>;
  getProjectById: (id: number) => Promise<void>;
  clearCurrentProject: () => void;
  isLoading: boolean;
  projects: Project[];
};

export const useProjects = (): UseProjectsResult => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const projects = useAppSelector((s) => s.projects);
  const [isLoading, setIsLoading] = useState(false);

  const getProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(getProjectsThunk()).unwrap();
    } catch (error) {
      clientLogger.error("useProjects error:", { error });
      toast.error("Failed to load projects. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const createProject = async (payload: ProjectPayload) => {
    setIsLoading(true);
    try {
      const project = await dispatch(newProjectThunk(payload)).unwrap();
      if (project) router.push(ROUTES.project(project.id.toString()));
      toast.success("Project created successfully");
      return project;
    } catch (error) {
      clientLogger.error("useProjects createProject error:", { error });
      toast.error("Failed to create project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getCandidates = useCallback(
    async (projectId?: number) => {
      setIsLoading(true);
      try {
        return await dispatch(getProjectCandidatesThunk(projectId)).unwrap();
      } catch (error) {
        clientLogger.error("useProjects getCandidates error:", { error });
        toast.error("Failed to load project candidates. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  const getProjectById = useCallback(
    async (id: number) => {
      setIsLoading(true);
      try {
        await dispatch(getProjectByIdThunk(id)).unwrap();
      } catch (error) {
        clientLogger.error("useProjects getProjectById error:", { error });
        toast.error("Failed to load project. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  const clearCurrentProject = useCallback(() => {
    dispatch(clearProject());
  }, [dispatch]);

  return {
    createProject,
    getProjects,
    getCandidates,
    getProjectById,
    clearCurrentProject,
    isLoading,
    projects,
  };
};
