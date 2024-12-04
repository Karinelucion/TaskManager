import { ChangeEvent, useEffect, useState } from "react";
import { ITask, Status } from "../../commons/interfaces";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskService from "@/service/TaskService";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export function TaskPage() {
   
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
      } = useForm<ITask>();

    const [statusList, setStatusList] = useState<{ chave: string; descricao: string }[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const { save, findById } = TaskService;
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
          loadData(parseInt(id));
        }
      }, []);
      
      const loadData = async (id: number) => {
        const response = await findById(id);
        if (response.status === 200) {
          reset(response.data);
        } else {
          setApiError("Falha ao carregar o registro.");
        }
      };

      const onSubmit = async (data: ITask) => {
        const response = await save(data);
        if (response.status === 201 || response.status === 200) {
          navigate("/tasklist");
        } else {
          setApiError("Falha ao salvar o registro.");
        }
      };

    return (
        <>
            <form id="taskForm" onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="form-control"
                    placeholder="Título"
                    {...register("title", {
                        required: "O campo título é obrigatório.",
                      })}
                />
                <input
                    className="form-control"
                    placeholder="Descrição"
                    {...register("description", {
                        required: "O campo descrição é obrigatório.",
                      })}
                />
            
               <DatePicker 
                    className='form-control' 
                    selected={startDate} 
                    onChange={(date) => date && setStartDate(date)} 
               />
            
                <select className="form-control" 
                    name="status"
                    id="status">

                    <option value="">Selecione um tipo</option>
                    {statusList.map((status) => (
                      <option key={status.chave} value={status.chave}>
                        {status.descricao}
                      </option>
                    ))}
                </select>
                <button className="btn btn-success">
                        Salvar
                </button>
            </form>
        </>
    );
}
