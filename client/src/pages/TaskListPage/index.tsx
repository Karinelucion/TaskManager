import { ITask } from "@/commons/interfaces";
import TaskService from "@/service/TaskService";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";

export function TaskListPage() {
    const [data, setData] = useState<ITask[]>([]);
    const [apiError, setApiError] = useState("");
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const { findAll, remove } = TaskService;

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await findAll();
        if (response.status === 200) {
            setData(response.data);
            setApiError("");
        } else {
            setApiError("Falha ao carregar a lista de tarefas");
        }
    };

    const onRemove = async (id: number) => {
        const response = await remove(id);
        if (response.status === 204) {
            setShowDeleteMessage(true);
            setData((prevData) => prevData.filter((task) => task.id !== id)); // Atualiza a lista após remoção
            setTimeout(() => {
                setShowDeleteMessage(false);
            }, 1500);
            setApiError("");
        } else {
            setApiError("Falha ao remover a tarefa");
        }
    };

    return (
        <>
            {apiError && <div className="error-message">{apiError}</div>} 
            
            <DataTable value={data} paginator rows={10} dataKey="id" emptyMessage="Nenhuma tarefa encontrada.">
                <Column field="name" header="Nome" style={{ minWidth: '12rem' }} />
                <Column field="description" header="Descrição" style={{ minWidth: '20rem' }} />
                <Column field="status" header="Status" style={{ minWidth: '10rem' }} />
                <Column 
                    header="Ações" 
                    body={(rowData) => (
                        <button onClick={() => onRemove(rowData.id)}>Remover</button>
                    )}
                    style={{ minWidth: '8rem' }}
                />
            </DataTable>

            {showDeleteMessage && <div className="success-message">Tarefa removida com sucesso!</div>}

            <a href="/task"><button>Cadastrar</button></a>
            
        </>
    );
}
