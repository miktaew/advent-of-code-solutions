const fs = require("fs");

const day3 = () => {
    const data = fs.readFileSync("day3.txt", "utf8");
    //const data = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
    let data_1 = data.split("mul(").map(x => x.split(")").map(y => y.split(",")));
    let data_2 = data.split("do()").map(x => x.split("don't()")[0]).map(y => y.split("mul(").map(z => z.split(")").map(a => a.split(","))));

    let part1 = 0;
    let part2 = 0;

    for(let i = 0; i < data_1.length; i++) {
        for(let j = 0; j < data_1[i].length; j++) {
            if(data_1[i][j].length == 2) {
                if(!data_1[i][j][0].includes(" ") && !data_1[i][j][0].includes(" ")) {
                    const a = Number(data_1[i][j][0]);
                    const b = Number(data_1[i][j][1]);
                    if(a && b) {
                        part1 += a*b;
                    }
                }
            }
        }
    }

    for(let i = 0 ; i < data_2.length; i++) {
        for(let j = 0; j < data_2[i].length; j++) {
            
            for(let k = 0; k < data_2[i][j].length; k++) {
                
                if(data_2[i][j][k].length == 2) {
                    if(!data_2[i][j][k][0].includes(" ") && !data_2[i][j][k][0].includes(" ")) {
                        
                        const a = Number(data_2[i][j][k][0]);
                        const b = Number(data_2[i][j][k][1]);

                        if(a && b) {
                            part2 += a*b;
                        }
                    }
                }
            }
        }
    }

    return {part1, part2};
}

module.exports = day3;

//    "Just use regex" - Nuh uh, I refuse!
