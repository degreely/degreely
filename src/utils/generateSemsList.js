export const generateSemsList = (sems) => {
    const semsData = Object.values(sems).sort((first, second) => first.name.localeCompare(second.name));
    let completeSemsNames = [
        "Y1S1", "Y1S2", "Y1ST1", "Y1ST2",
        "Y2S1", "Y2S2", "Y2ST1", "Y2ST2",
        "Y3S1", "Y3S2", "Y3ST1", "Y3ST2",
        "Y4S1", "Y4S2", "Y4ST1", "Y4ST2",
        "Y5S1", "Y5S2", "Y5ST1", "Y5ST2",
        "Y6S1", "Y6S2", "Y6ST1", "Y6ST2",
        "Y7S1", "Y7S2", "Y7ST1", "Y7ST2",
        "Y8S1", "Y8S2", "Y8ST1", "Y8ST2",
        "Y9S1", "Y9S2", "Y9ST1", "Y9ST2"
    ];

    let semsList = [];
    for (const semData of semsData) {
        for (let i = 0; i < completeSemsNames.length; i++) {
            const name = completeSemsNames[i];
            if (name === semData.name) {
                semsList.push(semData);
                if (i < completeSemsNames.length - 1) {
                    completeSemsNames = completeSemsNames.slice(i + 1);
                }

                break;
            } else {
                semsList.push({ name: `!${name}` });
            }
        }
    }

    // create instruction to give user button to add new sem
    let prevName = semsList[semsList.length - 1].name;
    if (prevName.charAt(0) === "!") prevName = prevName.substring(1);
    const isPrevSemSpecialTerm = prevName.substring(2, 4) === "ST";
    const prevSemNumber = parseInt(prevName.charAt(prevName.length - 1));

    const newYear = parseInt(prevName.charAt(1)) + (isPrevSemSpecialTerm && prevSemNumber === 2 ? 1 : 0);
    const newSemType = (isPrevSemSpecialTerm && prevSemNumber === 2) || (!isPrevSemSpecialTerm && prevSemNumber === 1) ? "S" : "ST";
    const newSemNumber = prevSemNumber === 1 ? 2 : 1;
    const newName = `!Y${newYear}${newSemType}${newSemNumber}`;
    semsList.push({ name: newName });
    
    return semsList;
};