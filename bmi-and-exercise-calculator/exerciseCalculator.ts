interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: Rating["value"]
    ratingDescription: Rating["description"]
    target: number,
    average: number
}

interface ExerciseInput {
    target: number,
    dailyExercises: number[]
}

interface Rating {
    value: number,
    description: string
}

const parseExerciseArguments = (args: Array<string>): ExerciseInput => {
    if (args.length < 4) {
        throw new Error("Not enough arguments");
    }
    const target = Number(args[2]);
    if (isNaN(target)) {
        throw new Error("Target must be a number");
    }
    const dailyExercises = [];
    for (let i = 3; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error("One of the exercise hours is not a number");
        }
        dailyExercises.push(Number(args[i]));
    }
    return {
        target,
        dailyExercises
    };

};

const getRating = (averageHours: number, targetHours: number): Rating => {
    if (averageHours < targetHours) {
        return { value: 3, description: "You didn't meet your target, work harder!" };
    }
    return ((averageHours - targetHours) > 3) ? { value: 1, description: "Great job!" } : { value: 2, description: "Not great, not terrible" };
};


export const calculateExercises = (dailyExercises: Array<number>, target: number): ExerciseResult => {
    const periodLength = dailyExercises.length;
    const trainingDays = dailyExercises.filter(e => e > 0).length;
    const averageHours = dailyExercises.reduce((acummulator, currentValue) => acummulator + currentValue, 0) / periodLength;
    const success = averageHours >= target;
    const rating = getRating(averageHours, target);

    return {
        periodLength,
        trainingDays,
        success,
        rating: rating.value,
        ratingDescription: rating.description,
        target,
        average: averageHours
    };
};

try {
    const { dailyExercises, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyExercises, target));
} catch (error: unknown) {
    let errorMessage = "Something bad happenned";
    if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`;
    }
    console.log(errorMessage);
}

