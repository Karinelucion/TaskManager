import { ChangeEvent, useEffect, useState } from "react";
import { ITask, Status } from "../../commons/interfaces";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskService from "@/service/TaskService";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { format, parse } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function TaskPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ITask>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const { save, findById } = TaskService;
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [pendingApiCall, setPendingApiCall] = useState(false);

  useEffect(() => {
    if (id) {
      loadData(parseInt(id));
    }
  }, []);

  const loadData = async (id: number) => {
    const response = await findById(id);
    if (response.status === 200) {
      reset(response.data);
      setStartDate(parse(response.data.date, "dd-MM-yyyy", new Date()));
    } else {
      setApiError("Falha ao carregar o registro.");
    }
  };

  const onSubmit = async (data: ITask) => {
    setPendingApiCall(true); 
    const formattedDate = format(startDate, "dd-MM-yyyy");
  
    const taskToSend = {
      ...data,
      date: formattedDate,
    };
  
    try {
      const response = await save(taskToSend);
      if (response.status === 201 || response.status === 200) {
        toast.success("Tarefa salva com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setTimeout(() => navigate("/"), 1000); 
      } else {
        setApiError("Falha ao salvar o registro.");
        toast.error("Falha ao salvar o registro!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      setApiError("Ocorreu um erro ao salvar a tarefa.");
      toast.error("Erro ao tentar salvar a tarefa.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } 
    // finally{
    //   setPendingApiCall(false)
    // }
  };
  

  return (
    <div className="px-5 pt-5">
      <ToastContainer />
      <form id="taskForm" onSubmit={handleSubmit(onSubmit)} className="grid">
        <div className="d-flex justify-content-around">
          <div>
            <a className="link-dark" href="/"><GoArrowLeft /></a>
          </div>
          <div className="flex-grow-1 text-center">
            <h1>Cadastro de tarefas</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <label htmlFor="title">Título<span style={{color: '#FF0000'}}>*</span></label>
            <input
              id="title"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              placeholder="Título"
              {...register("title", {
                required: "O campo título é obrigatório.",
              })}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title.message}</div>
            )}
          </div>
          <div className="col-2">
            <label htmlFor="date">Data de vencimento</label>
            <DatePicker
              id="date"
              className="form-control"
              placeholderText="dd/mm/yyyy"
              selected={startDate}
              onChange={(date) => date && setStartDate(date)}
              dateFormat="dd-MM-yyyy"
            />
        
          </div>  
        </div>
        <div className="row">
          <div className="col-12">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              className={`form-control ${errors.description ? "is-invalid" : ""
                }`}
              placeholder="Descrição"
              {...register("description")}
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description.message}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <label htmlFor="status">Status<span style={{color: '#FF0000'}}>*</span></label>
            <select
              id="status"
              className={`form-control ${errors.status ? "is-invalid" : ""}`}
              {...register("status", {
                required: "O campo status é obrigatório.",
              })}
            >
              {Object.entries(Status).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            {errors.status && (
              <div className="invalid-feedback">{errors.status.message}</div>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button type="submit" className="btn btn-success w-25" disabled={pendingApiCall}>
          {pendingApiCall ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
      {apiError && <p className="text-danger text-center">{apiError}</p>}
    </div>
  );
}
