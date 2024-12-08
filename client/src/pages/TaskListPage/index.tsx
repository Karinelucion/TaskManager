import { ITask, Status } from "@/commons/interfaces"
import TaskService from "@/service/TaskService"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useEffect, useState } from "react"
import { GoTrash } from "react-icons/go"
import { AiOutlineEdit } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const getStatusStyle = (status: string) => {
    switch (status) {
        case "PENDING":
            return { backgroundColor: "#D6E4FF", color: "#1A73E8" }
        case "IN_PROGRESS":
            return { backgroundColor: "#FFF8DC", color: "#FFC107" }
        case "DONE":
            return { backgroundColor: "#DFFFE0", color: "#28A745" } 
        default:
            return { backgroundColor: "#F5F5F5", color: "#000000" }
    }
}

export function TaskListPage() {
    const [data, setData] = useState<ITask[]>([])
    const [filteredData, setFilteredData] = useState<ITask[]>([]) 
    const [searchQuery, setSearchQuery] = useState("") 
    const [apiError, setApiError] = useState("")
    const { findAll, remove } = TaskService
    const navigate = useNavigate()
    const [filterStatus, setFilterStatus] = useState("Todos")

    useEffect(() => {
        loadData()
    }, [])
    
    useEffect(() => {
        applyFilters() 
    }, [data, searchQuery, filterStatus])

    const loadData = async () => {
        const response = await findAll()
        if (response.status === 200) {
            setData(response.data)
            setFilteredData(response.data) 
            setApiError("")
        } else {
            setApiError("Falha ao carregar a lista de tarefas")
        }
    }

    const onRemove = async (id: number) => {
        const response = await remove(id)
        if (response.status === 204) {
            toast.success("Tarefa removida com sucesso!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            })

            setData((prevData) => prevData.filter((task) => task.id !== id))
            setFilteredData((prevData) => prevData.filter((task) => task.id !== id))
            setApiError("")
        } else {
            toast.error("Falha ao remover a tarefa!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            })
            setApiError("Falha ao remover a tarefa")
        }
    }

    const onEdit = (id: number) => {
        navigate(`/task/${id}`)
    }
    
    const applyFilters = () => {
        let filtered = data
    
        if (filterStatus !== "Todos") {
            filtered = filtered.filter((task) => task.status === filterStatus)
        }
    
        if (searchQuery) {
            filtered = filtered.filter(
                (task) =>
                    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    task.id?.toString().includes(searchQuery)
            )
        }
    
        setFilteredData(filtered)
    }
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase()
        setSearchQuery(query)
        applyFilters()
    }
    
    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value
        setFilterStatus(status)
        applyFilters()
    }
    
    return (
        <div className="task-list-page d-flex flex-column" style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
            <ToastContainer />
    
            <div className="pt-3 row" >
                <h1 className="text-center flex-grow-1">Listagem de tarefas</h1>
                <a href="/task/incluir" className="text-center">
                    <button className="btn btn-success">Cadastrar</button>
                </a>
            </div>
    
            {apiError && <div className="error-message">{apiError}</div>}
    
            <div className="grid row p-0">
                <div className="p-3 col-12 col-md-8">
                    <label htmlFor="search">Pesquisar</label>
                    <input
                        id="search"
                        type="text"
                        className="form-control"
                        placeholder="Pesquisar por título ou ID"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <div className="p-3 col-12 col-md-4">
                    <label htmlFor="filter">Filtrar por status</label>
                    <select
                        id="status"
                        className={`form-control`}
                        onChange={handleFilter}
                    >
                        <option value="Todos">Todos</option> 
                        {Object.entries(Status).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
    
            <div className="flex-grow-1 p-3 d-flex flex-column" style={{ overflow: "hidden", display: "flex" }}>
                <div className="table-responsive" style={{ height: "100%", overflowY: "auto", width: "100%" }}>
                    <DataTable
                        className="w-100"
                        value={filteredData}
                        paginator
                        rows={10}
                        dataKey="id"
                        emptyMessage="Nenhuma tarefa encontrada."
                        scrollable
                        scrollHeight="flex"
                    >
                        <Column field="id" header="ID" style={{ minWidth: "3rem" }} />
                        <Column field="title" header="Título" style={{ minWidth: "8rem" }} />
                        <Column field="date" header="Data" style={{ minWidth: "6rem" }} />
                        <Column
                            field="status"
                            header="Status"
                            body={(rowData) => (
                                <div
                                    style={{
                                        ...getStatusStyle(rowData.status),
                                        padding: "0.5rem 1rem",
                                        borderRadius: "1rem",
                                        display: "inline-block",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}
                                >
                                    {Status[rowData.status as keyof typeof Status]}
                                </div>
                            )}
                            style={{ minWidth: "10rem" }}
                        />
                        <Column
                            header="Ações"
                            body={(rowData) => (
                                <div className="d-flex gap-2">
                                    <button className="btn" onClick={() => onEdit(rowData.id)}>
                                        <AiOutlineEdit />
                                    </button>
                                    <button className="btn" onClick={() => onRemove(rowData.id)}>
                                        <GoTrash />
                                    </button>
                                </div>
                            )}
                            style={{ minWidth: "4rem" }}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    )
}
