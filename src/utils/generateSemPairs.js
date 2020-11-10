export const generateSemPairs = (sems) => {
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
    
    let semPairs = [];
    let currPair = [];
    for (const semData of semsData) {
        let foundSem = false;
        for (let i = 0; i < completeSemsNames.length; i++) {
            const name = completeSemsNames[i];
            if (name !== semData.name) {
                currPair.push({name: `!${name}`});
            } else {
                currPair.push(semData);
                foundSem = true;
            }

            if (currPair.length >= 2) {
                semPairs.push(currPair);
                currPair = [];
            }

            if (foundSem && i < completeSemsNames.length - 1) {
                completeSemsNames = completeSemsNames.slice(i + 1);
                break;
            }
        }
    }

    // create instruction to give user button to add new sem
    if (currPair.length === 1) {
        // extra sem got left behind
        const prevName = currPair[0].name;
        currPair.push({ name: `!${prevName.substring(0, prevName.length - 1)}2` });
        semPairs.push(currPair);
    } else {
        let prevName = semPairs[semPairs.length - 1][1].name;
        if (prevName.charAt(0) === "!") prevName = prevName.substring(1);
        const isPrevSemSpecialTerm = prevName.substring(2, 4) === "ST";
        const newYear = parseInt(prevName.charAt(1)) + (isPrevSemSpecialTerm ? 1 : 0);
        const newName = `Y${newYear}${isPrevSemSpecialTerm ? "S" : "ST"}1`;
        currPair.push({ name: `!${newName}` });
        currPair.push({ name: "-" }); // instruction to not return a sem or an add sem button
        semPairs.push(currPair);
    }
    
    return semPairs;
};