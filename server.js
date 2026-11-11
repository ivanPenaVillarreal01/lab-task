
import express from "express";

const app = express();
const port = 3000;

// Task database
const db = [
    { id: "1", title: "Take a shower", completed: false },
    { id: "2", title: "Get wingstop for dinner", completed: false },
    { id: "3", title: "Work on the project for 3330", completed: true }
];

// Middleware
app.use(express.json());

// GET - Retrieve all tasks
app.get("/api/tasks", (req, res, next) => {
    try {
        const allTasks = db;

        res.status(200).json({
            success: true,
            data: allTasks
        });
    } catch (error) {
        next(error);
    }
});

// POST - Create a new task
app.post("/api/tasks", (req, res, next) => {
    try {
        const params = req.body;

        if (typeof params.title !== "string" ||
            !params.title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Task title is required"
            });
        }

        const newTask = {
            id: String(
                Math.max(0, ...db.map(task => Number(task.id))) + 1
            ),
            title: params.title.trim(),
            completed: false
        };

        db.push(newTask);

        res.status(201).json({
            success: true,
            data: newTask
        });

    } catch (error) {
        next(error);
    }
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err);

    const status = err.status || 500;

    res.status(status).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};