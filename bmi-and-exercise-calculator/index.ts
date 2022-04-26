import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { isArrayOfNumbers } from "./utils";
const app = express();
app.use(express.json());



app.get("/hello", (_req, res) => {
    res.status(200).send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

    if (isNaN(Number(height)) && isNaN(Number(weight))) {
        res.status(400).json({ error: "malformatted parameters" });
    }

    const bmi = calculateBmi(Number(height), Number(weight));

    res.status(200).json({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        res.status(400).json({ error: "parameters missing" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (isNaN(target) || !isArrayOfNumbers(daily_exercises)) {
        res.status(400).json({ error: "malformatted parameters" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);

    res.status(200).json(result);
});


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});