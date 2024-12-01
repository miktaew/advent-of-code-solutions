const fs = require("fs");
const day1 = () => {
    
    const arrays = fs.readFileSync("day1.txt", "utf8").trim().split("\n").map(line => line.split("   "))
        .reduce(([arr1, arr2], [a,b]) => {
                arr1.push(a);arr2.push(b); 
                return [arr1, arr2];
        },
        [[],[]]
    );
    arrays[0] = arrays[0].sort((a,b)=>a-b);
    arrays[1] = arrays[1].sort((a,b)=>a-b);

    let part1 = 0;
    let part2 = 0;
    let occurences = {};
    for(let i = 0; i < arrays[0].length; i++) {
        part1 += Math.abs(arrays[0][i] - arrays[1][i]);

        if(!occurences[arrays[1][i]]) {
            occurences[arrays[1][i]] = 1;
        } else {
            occurences[arrays[1][i]]++;
        }
    }

    for(let i = 0; i < arrays[0].length; i++) {
        part2 += (arrays[0][i]*occurences[arrays[0][i]] || 0);
    }
    
    return {part1, part2}
}

module.exports = day1;