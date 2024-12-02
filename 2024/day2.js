const fs = require("fs");

const is_safe = (row) => {
    let is_decreasing = row[0] > row[1];

    for(let j = 0; j < row.length-1; j++) {
        if(is_decreasing && row[j] <= row[j+1]) {
            return false;
        } 
        if(!is_decreasing && row[j] >= row[j+1]) {
            return false;
        }

        if(Math.abs(row[j] - row[j+1]) > 3) {
            return false;
        }
    }
    return true;
}

const day2 = () => {
    const data = fs.readFileSync("day2.txt", "utf8").trim().split("\n").map(row => row.split(" ").map(val => Number.parseInt(val)));

    
    /*
    const data = [
        [7,6,4,2,1],
        [1,2,7,8,9],
        [9,7,6,2,1],
        [1,3,2,4,5],
        [8,6,4,4,1],
        [1,3,6,7,9]
    ];
    */
    
    let part1 = 0;
    let part2 = 0;

    for(let i = 0; i < data.length; i++) {
        if(is_safe(data[i])) {
            part1++;
            part2++;
        } else {
            for(let j = 0; j < data[i].length; j++) {
                if(is_safe(data[i].toSpliced(j,1))) {
                    part2++;
                    break;
                }
            }
        }
    }

    return {part1, part2};
}

module.exports = day2;