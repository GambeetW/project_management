import {Head, Link, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Index({auth, tasks, parameters = null}) {
    parameters = parameters || {};
    const searchFieldChanged = (name, value) => {
        if(value)
            parameters[name] = value;
        else
            delete parameters[name];

        router.get(route('task.index'), parameters);
    }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter')
            return
        searchFieldChanged(name, e.target.value);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2">ID</th>
                                    <th className="px-3 py-2">Name</th>
                                    <th className="px-3 py-2">Project</th>
                                    <th className="px-3 py-2">Status</th>
                                    <th className="px-3 py-2">Created At</th>
                                    <th className="px-3 py-2">Updated At</th>
                                    <th className="px-3 py-2">Actions</th>
                                </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2">
                                        <TextInput
                                            className="w-full"
                                            defaultValue={parameters.name}
                                            placeholder="Task Name"
                                            onBlur={e => searchFieldChanged('name', e.target.value)}
                                            onKeyPress={(e) => onKeyPress('name', e)}
                                        />
                                    </th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2">
                                        <SelectInput
                                            className="w-full"
                                            onChange={(e) => searchFieldChanged("status", e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            <option value="todo">Todo</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="done">Done</option>
                                        </SelectInput>
                                    </th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {tasks.data.map((task) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-3 py-2">{task.id}</td>
                                        <td className="px-3 py-2">{task.name}</td>
                                        <td className="px-3 py-2">{task.under.name}</td>
                                        <td className="px-3 py-2">{task.status}</td>
                                        <td className="px-3 py-2">{task.created_at}</td>
                                        <td className="px-3 py-2">{task.updated_at}</td>
                                        <td className="px-3 py-2">
                                            <Link
                                                href={route('task.edit', task.id)}
                                                className="text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={route('task.destroy', task.id)}
                                                className="text-red-600 dark:text-red-500 hover:underline mx-1"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <Pagination links={tasks.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
