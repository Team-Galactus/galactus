/* validating functions*/

var validator = (function () {

    function validateStringType(string) {
        if (typeof string !== "string") {
            throw Error("The required type is string");
        }
    }

    function validateIfStringIsEmpty(string) {
        if (string === "" || string === " " || string === null) {
            throw Error("String cannot be empty!");
        }
    }

    function validateStringLength(string, minValue, maxValue) {
        var length = string.length,
            isValidMinValue = length >= minValue,
            isValidMaxValue = length <= maxValue;

        if (!isValidMinValue) {
            throw Error(`String cannot be less than ${minValue} symbols`);
        } else if (!isValidMaxValue) {
            throw Error(`String cannot be more than ${maxValue} symbols`);
        }
    }
    return {
        validateIfStringIsEmpty: (string) => validateIfStringIsEmpty(string),
        validateStringLength: (string, minValue, maxValue) => validateStringLength(string, minValue, maxValue),
        validateStringType: (string) => validateStringType(string),
        validateISBN: (string) => validateISBN(string),
        validateRange: (number, min, max) => validateRange(number, min, max)
    }
} ());

/*function generator*/

function* idGenerator() {
    var id = 1;
    while (true) {
        yield id += 1;
    }
}

/*constants*/
const LENGTHS_OF_STRINGS = {
    MIN_TITLE_LENGTH=2,
    MAX_TITLE_LENGTH=20,
    MIN_DASHBOARD_DESCRIPTION_LENGTH=5,
    MAX_DASHBOARD_DESCRIPTION_LENGTH=2,
    MIN_LIST_DESCRIPTION_LENGTH=5,
    MAX_LIST_DESCRIPTION_LENGTH=30,
    MIN_TASK_DESCRIPTION_LENGTH=5,
    MAX_TASK_DESCRIPTION_LENGTH=90,
    MIN_USERNAME_LENGTH=3,
    MAX_USERNAME_LENGTH=15
}

const ERROR_MESSAGES = {
    WRONG_LIST_ID='There is not a list with such id in this dashboard.',
    WRONG_TASK_ID='There is not a task with such id in this list of tasks.',
    WRONG_USERNAME='The username should content only characters.'
}


/*classes*/

class Item {
    constructor(obj) {
        this.id = 0;
        this.title = obj.title;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        validator.validateStringType(value);
        validator.validateIfStringIsEmpty(value);
        validateStringLength(value, LENGTHS_OF_STRINGS.MIN_TITLE_LENGTH, LENGTHS_OF_STRINGS.MAX_TITLE_LENGTH);
        this._title = value;
    }
}

var dashBoardIdGenerator = idGenerator();

class DashBoard extends Item {
    constructor(obj) {
        super(obj.title);
        this.id = dashBoardIdGenerator.next().value;
        this.description = obj.description;
        this.lists[] = null;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        validator.validateStringType(value);
        validator.validateIfStringIsEmpty(value);
        validator.validateStringLength(value, LENGTHS_OF_STRINGS.MIN_DASHBOARD_DESCRIPTION_LENGTH, MAX_DASHBOARD_DESCRIPTION_LENGTH);
        this._description = value;
    }
    get lists() {
        return this._lists;
    }
    addList(list) {
        this.lists.push(list);

        return this;
    }

    deleteList(id) {
        var index = lists.indexOf(id);
        if (index > -1) {
            lists.splice(index, 1);
        }

        return this;
    }

    //TODO
    getAllLists() {

    }
    getListById(id) {
        for (let i = 0; i < lists.length; i += 1) {
            if (lists[i].id === id) {
                return lists[i];
            }
        }
        return ERROR_MESSAGES.WRONG_DASHBOARD_ID;

    }
}

var listIdGenerator = idGenerator();

class List extends Item {
    constructor(obj) {
        super(obj.title);
        this.id = listIdGenerator.next().value;
        this.description = obj.description;
        this.tasks[] = null;
    }
    get description() {
        return this._description;
    }

    set description(value) {
        validator.validateStringType(value);
        validator.validateIfStringIsEmpty(value);
        validator.validateStringLength(value, LENGTHS_OF_STRINGS.MIN_LIST_DESCRIPTION_LENGTH, LENGTHS_OF_STRINGS.MAX_LIST_DESCRIPTION_LENGTH);
        this._description = value;
    }
    get tasks() {
        return this._tasks;
    }
    addTask(task) {
        this.tasks.push(task);

        return this;
    }
    deleteTask(id) {
        let index = tasks.indexOf(id);

        if (index > -1) {
            tasks.splice(index, 1);
        }

        return this;
    }
    //TODO
    getAllTasks() {

    }
    getTaskById(id) {
        for (let task of tasks) {
            if (task.id === id) {
                return task;
            }
        }
        return ERROR_MESSAGES.WRONG_LIST_ID;
    }
}

var taskIdGenerator = idGenerator();

class Task extends Item {
    constructor(obj) {
        super(obj.title)
        this.id = taskIdGenerator.next().value;
        this.description = obj.description;
        this.deadline = obj.deadline;
        this.checkList[] = null;
        this.taskSolvedInPercenteges = 0;
    }

    get description() {
        return this._description;
    }
    set description(value) {
        validator.validateStringType(value);
        validator.validateIfStringIsEmpty(value);
        validator.validateStringLength(value, LENGTHS_OF_STRINGS.MIN_TASK_DESCRIPTION_LENGTH, LENGTHS_OF_STRINGS.MAX_TASK_DESCRIPTION_LENGTH)
        this._description = value;
    }
    get deadline() {
        return this._deadline;
    }
    set deadline(value) {
        this._deadline = deadline;
    }
    get checkBox() {
        return this._checkBox;
    }
    get isTaskSolved() {
        return this._isTaskSolved;
    }
    addCheckBox(checkBox) {
        this.checklist.push(checkBox);
    }

    deleteCheckBox(id) {
        let index = checkList.indexOf(id);

        if (index > -1) {
            checklist.splice(index, 1);
        }
        return this;
    }
    //TODO:make function to list all checkboxes in the checklist
    isTaskDone() {
        var countOfCompletedCheckBoxes = 0;
        for (let checkbox of checkList) {
            if (checkbox.isComplete === true) {
                countOfCompletedCheckBoxes += 1;
            }
        }
        let percentegePerOneCheckBox = 100 / checkList.length;
        this.TaskSolvedInPercenteges = percentegePerOneCheckBox * countOfCompletedCheckBoxes;
    }
}

var checkBoxIdGenerator = idGenerator();

class CheckBox extends Item {
    constructor(obj) {
        super(obj.title);
        this.id = checkBoxIdGenerator.next().value;
        this.isComplete = false;
    }
    get isComplete() {
        return this._isComplete;
    }
}

var usernameIdGenerator = idGenerator();

class Username {
    constructor(obj) {
        this.id = usernameIdGenerator.next().value;
        this.username = obj.username;
    }

    get id() {
        return this._id;
    }
    get username() {
        return this._name;
    }
    set username(value) {
        var nameRegex = /^[a-zA-Z\-]+$/;
        validator.validateStringType(name);
        validator.validateIfStringIsEmpty(name);
        validator.validateStringLength(value, MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH);
        if (nameRegex.test(value)) {
            this.username = value;
        }
        else {
            throw new Error(ERROR_MESSAGES.WRONG_USERNAME);
        }
    }
}