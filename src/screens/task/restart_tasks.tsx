import { Task } from "../../types/shared";

// TODO: Tasks should be global so that we don't have to copy it every single time.
export default function restartTasks(tasks: Array<Task>) {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const daySeconds = 60 * 60 * 24;
    tasks.forEach((task) => {
        if (task.meta_start + daySeconds >= currentTime) {
            task.meta_start = currentTime;
            task.done = 0;
        }
    });
}
