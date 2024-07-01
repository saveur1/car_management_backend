import schedule from "node-schedule";

const date = new Date(2024,7,1, 15,31,0o0);

schedule.scheduleJob(date, function(){
    console.log("Task completed successfully"+ new Date());
})