import { useState } from "react"

export default function NewTask({ onAdd }) {
    const [taskName, setTaskName] = useState('');

    function handleChange(event) {
        setTaskName(event.target.value)
    }

    function handleSave() {
        onAdd(taskName);
        setTaskName('');
    }

    return (
        <div className="flex items-center gap-4">
            <input onChange={handleChange} value={taskName} type="text" required className="w-64 px-2 py-1 rounded-sm bg-stone-200" />
            <button className="text-stone-700 hover:text-stoone-950" onClick={handleSave}>Add task</button>
        </div>
    )
}