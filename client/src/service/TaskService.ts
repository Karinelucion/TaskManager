import { ITask } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const taskURL = "/task";

const save = async (task: ITask): Promise<any> => {
  let response;
  try {
    response = await api.post(taskURL, task);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const findAll = async (): Promise<any> => {
  let response;
  try {
    response = await api.get(taskURL);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const remove = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.delete(`${taskURL}/${id}`);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const findById = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.get(`${taskURL}/${id}`);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};


const TaskService = {
  save,
  findAll,
  remove,
  findById,
};

export default TaskService;