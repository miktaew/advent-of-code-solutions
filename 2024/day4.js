const fs = require("fs");

const day4 = () => {
    const data = fs.readFileSync("day4.txt", "utf8").trim().split("\n");
   /* const data = 
`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.trim().split("\n");
*/
    let part1 = 0;
    let part2 = 0;

    const words = [];
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            words.push([data[i][j], data[i][j+1], data[i][j+2], data[i][j+3]]);
            if(data[i+3]) {
                words.push([data[i][j], data[i+1][j], data[i+2][j], data[i+3][j]]);
                words.push([data[i][j], data[i+1][j+1], data[i+2][j+2], data[i+3][j+3]]);
                words.push([data[i][j], data[i+1][j-1], data[i+2][j-2], data[i+3][j-3]]);
            }
        }
    }

    part1 = words.map(word => word.join("")).filter(word => word === "XMAS" || word === "SAMX").length;

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            if(data[i][j] === "A") {
                if(data[i-1] && data[i+1]) {
                    const top = data[i-1][j-1] + data[i-1][j+1];
                    const bot = data[i+1][j-1] + data[i+1][j+1];

                    if(top === "MS" && bot === "MS" 
                        || top === "SM" && bot === "SM" 
                        || top === "SS" && bot === "MM"
                        || top === "MM" && bot === "SS"
                    ) {
                        part2++;
                    }
                }
            }
        }
    }

    return {part1, part2};
}

module.exports = day4;

//maybe not the most elegant solution, but there's no point in overcomplicating it
