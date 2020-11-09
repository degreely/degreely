export const gradeToCap = (grade) => {
    switch (grade) {
        case "A+":
        case "A":
            return 5.0;
        case "A-":
            return 4.5;
        case "B+":
            return 4.0;
        case "B":
            return 3.5;
        case "B-":
            return 3.0;
        case "C+":
            return 2.5;
        case "C":
            return 2.0;
        case "D+":
            return 1.5;
        case "D+":
            return 1.0;
        case "F":
            return 0.0;
        default:
            return "THIS AIN'T A GRADE!";
    }
};

export const calculateProjectedCap = (plan) => {
    let numerator = 0; // sum(mod CAP * mod MCs)
    let denominator = 0; // sum(mod MCs)
    for (const sem of Object.values(plan.sems)) {
        for (const mod of sem.mods) {
            // check if mod's grade is S/U
            if ((mod.taken && (mod.actualGrade === "S" || mod.actualGrade === "U"))
                || (!mod.taken && (mod.projectedGrade === "S" || mod.projectedGrade === "U")))
                continue;
            
            numerator += (mod.taken ? gradeToCap(mod.actualGrade) : gradeToCap(mod.projectedGrade)) * mod.mcs;
            denominator += mod.mcs;
        }
    }

    return denominator === 0 ? denominator : numerator / denominator;
};

export const calculateActualCap = (plan) => {
    let numerator = 0; // sum(mod CAP * mod MCs)
    let denominator = 0; // sum(mod MCs)
    for (const sem of Object.values(plan.sems)) {
        for (const mod of sem.mods) {
            // only non-SUed taken mods used in calculation
            if (!mod.taken || (mod.actualGrade === "S" || mod.actualGrade === "U")) continue;
            numerator += gradeToCap(mod.actualGrade) * mod.mcs;
            denominator += mod.mcs;
        }
    }

    return denominator === 0 ? denominator : numerator / denominator;
};