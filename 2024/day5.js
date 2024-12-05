const fs = require("fs");

const day5 = () => {
    const [rules_array, pages_array] = fs.readFileSync("day5.txt", "utf8").trim().split("\n\n").map(x => x.split("\n"));
    /*
    const [rules_array, pages_array] = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`
.trim().split("\n\n").map(x => x.split("\n"));
*/
    const pages = pages_array.map(x => x.split(",").map(y => Number(y)));
    const rules = {};
    const corrected = [];
    
    let part1 = 0;
    let part2 = 0;
    
    for(let i = 0; i < rules_array.length; i++) {
        const a = Number(rules_array[i].split("|")[0]);
        const b = Number(rules_array[i].split("|")[1]);
        if(!rules[a]) {
            rules[a] = {};
        }
        rules[a][b] = true;
    }

    for(let i = 0; i < pages.length; i++) {
        let is_correct = true;
        corrected.push([...pages[i]]);
        for(let j = 0; j < pages[i].length; j++) {
            if(!is_correct) {
                break;
            }
            if(rules[pages[i][j]]) {
                for(let k = 0; k < pages[i].length; k++) {
                    if(rules[pages[i][j]][pages[i][k]]) {
                        if(j > k) {
                            is_correct = false;
                            break;
                        }
                    }
                }
            }
        }
        if(is_correct) {
            corrected[i] = [0];
        } else {
            corrected[i].sort((a,b) => {
                if(rules[a] && rules[a][b]) { return -1} 
                else if(rules[b] && rules[b][a]) {return 1}
            });
        }
        part1 += pages[i][Math.floor(pages[i].length/2)] * is_correct;
        part2 += corrected[i][Math.floor(corrected[i].length/2)];
    }

    return {part1, part2};
}

module.exports = day5;
