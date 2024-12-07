const fs = require("fs");

const calibrate = (target, arr, already_done = {}, concat) => {
    const key = target + ":" + arr.join(",");
    if(key in already_done) {
        return already_done[key];
    }

    if(target == 0) {
        return true;
    }

    if(arr.length == 0) {
        return false;
    }

    const last = arr[arr.length - 1];

    const remaining_arr = [...arr.slice(0,-1)];

    if(calibrate(target - last, remaining_arr, already_done, concat)) {
        already_done[key] = true;
        return true;
    }

    if(calibrate(target / last, remaining_arr, already_done, concat)) {
        already_done[key] = true;
        return true;
    }

    if(concat) {
        const size = Math.floor(Math.log10(last))+1;
        if(target % 10**size == last && calibrate(Math.floor(target/10**size), remaining_arr, already_done, concat)) {
            already_done[key] = true;
            return true;
        }
    }

    already_done[key] = false;
    return false;
}

const day7 = () => {
    const data = fs.readFileSync("day7.txt", "utf8").trim().split("\n").map(x => x.split(": ").map(y => y.split(" ").map(z => Number(z))));
   /*const data = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`.trim().split("\n").map(x => x.split(": ").map(y => y.split(" ").map(z => Number(z))));
*/

    let part1 = 0;
    let part2 = 0;
    
    for(let i = 0; i < data.length; i++) {
        if(calibrate(Number(data[i][0]), data[i][1])) {
            part1 += Number(data[i][0]);
        }
        if(calibrate(Number(data[i][0]), data[i][1], {}, true)) {
            part2 += Number(data[i][0]);
        }
    }

    return {part1, part2};
}

module.exports = day7;
