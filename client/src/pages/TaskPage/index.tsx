import {
    For,
    Input,
    ListCollection,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
    Stack,
    createListCollection,
} from "@chakra-ui/react";
import { useState } from "react";
import { ITask, Status } from "../../commons/interfaces";

export function TaskPage() {
    const [taskForm, setForm] = useState<ITask>({
        description: "",
        title: "",
        date: new Date(),
        status: Status.PENDING,
    });

    return (
        <>
            <form id="taskForm">
                <input
                    className="form-control"
                    placeholder="Título"
                    value={taskForm.title}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                />
                <input
                    className="form-control"
                    placeholder="Descrição"
                    value={taskForm.description}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                />
                <input
                    className="form-control"
                    type="date"
                    value={taskForm.date.toISOString().split("T")[0]} // Converter para yyyy-MM-dd
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            date: new Date(e.target.value),
                        }))
                    }

                />
               
            
            </form>
        </>
    );
}
