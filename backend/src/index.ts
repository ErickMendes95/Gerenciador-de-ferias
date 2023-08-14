import app from "./app";
import EmployeeVacationUpdater from "./node-cron/cron-vacation";

const PORT = process.env.PORT || 4000;

const updater = new EmployeeVacationUpdater();
updater.startCronJob();

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})