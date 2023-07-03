export type UserData = {
    id: string;
    bio?: string;
    name?: string;
    username?: string;
    dateofbirth?: string;
    gender?: string;
    photo?: string;
    /*
        For the gamification of tasks, habits, and routines being
        followed.
        We can renderise the "level" of the user with the xp. 
    */
    xp: number;
    /*
        The list of tasks included in this user.
    */
    tasks: Array<Task>;
    /*
        The list of habits included in this user.
    */
    habits: Array<Habit>;
    /*
        The list of routines included in this user.
    */
    routines: Array<Routine>;
};

/*
    A routine is a list of habits separated by day.
*/
export type Routine = {
    /*
        Will be used to access/update the same task in the database.
    */
    id: number;
    /*
        The list of habits included in this routine separated by day.
        In-client what we basically render is a list of days with habits
        for each day.
        NOTE: if you have a better idea, let's discuss it!
    */
    habits: Array<Habit>;
};

/*
    A habit is a time-range that includes a list of tasks.
*/
export type Habit = {
    /*
        Will be used to access/update the same task in the database.
    */
    id: number;

    /*
        Which day(s) this habit applies to?
    */
    day: Array<
        | "sunday"
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
    >;

    /*
        The time range where this habit is applied.
        NOTE: start and end cannot be equals.
    */
    start: string;
    end: string;

    /*
        The list of tasks included in this habit.
    */
    tasks: Array<Task>;
};

/*
    A task is activity that must be done (once or more)
*/
export type Task = {
    /*
        Will be used to access/update the same task in the database.
    */
    id: number;
    /*
        Guards the message of the task, for example "Drink Water".
    */
    name: string;
    /* 
        Can be used to differentiate the status of the task.
        For example, if there 5 'times' a task must be made:
        then 5 'done' means it is complete;
        1 to 4 'done' means it is in progress;
        0 means it was not completed.
    */
    done: number;
    times: number;
    /*
        Defined by the user to have higher priority display 
        going from the highest "high" to the lowest.
    */
    priority: "high" | "medium" | "low";
    /*
        To see if it's in current time, and give lower priority
        (perhaps even gray out) in case it already has passed.
        If it's a pair of strings not included:
            its elements is a time "hour:minute" formatted such as:
            ["20:00", "22:00"]
    */
    period:
        | "morning"
        | "afternoon"
        | "evening"
        | "morning-afternoon"
        | "morning-evening"
        | "afternoon-evening"
        | string;
    /*
        Counts in hours to be repeated every N hours after
        started its time.
        Has to be positive.
        If it is string, it will reset by a static time instead.
    */
    repeated: "daily" | "weekly" | "monthly" | "yearly" | number;
    /*
        Meta variables are here to calculate if a task has already
        passed enough time or not since its start time was conceived.
        
        For example: 1344646810
        TODO: Use 
              Math.floor(new Date('2012-08-10 22:00:10').getTime() / 1000)
        TODO: Should be calculated using a external system (one idea is to
              have a local array of IDs of tasks with meta_start atributes.)
    */
    // meta_start: number;
    /*
        To set if it can be shared?
        NOTE: Should not exist such varible when we add a 
        sharing system, because when we do we should not check
        if shared is false or true, instead we should check
        if the task has a list of users attached to that specific task...
        That's why Tasks is global in the database.
    */
    shared: boolean;

    /*
        Get reminders for the habit in the device from the application.
        TODO: how such system would work?
        TODO: see background running application with Expo.
        TODO: see local data access through background running.
    */
    // reminders: boolean;
};

export type Habits = {
    completed: boolean;
};
