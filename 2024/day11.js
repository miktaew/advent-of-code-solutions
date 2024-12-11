const fs = require("fs");

const blink = (stones, blink_count) => {
    for(let i = 0; i < blink_count; i++) {
        const new_stones = {};
        Object.keys(stones).forEach(stone_number => {
            if(stone_number == 0) {
                new_stones[1] = stones[stone_number];
            } else {
                const number_length = Math.floor(Math.log10(stone_number))+1;
                if(number_length%2 == 0) {
                    const num_a = Math.floor(stone_number/10**(number_length/2));
                    const num_b = stone_number % 10**(number_length/2);

                    new_stones[num_a] = stones[stone_number] + (new_stones[num_a] || 0);
                    new_stones[num_b] = stones[stone_number] + (new_stones[num_b] || 0);

                } else {
                    new_stones[stone_number*2024] = stones[stone_number] + (new_stones[stone_number*2024] || 0);
                }
            }
        });
        stones = new_stones;
    }
    return stones;
}

const day11 = () => {
    const data = fs.readFileSync("day11.txt", "utf8").trim().split(" ").map(x => +x);
    //const data = "125 17".split(" ");
    let part1 = 0;
    let part2 = 0;

    let stones = {};

    for(let i = 0; i < data.length; i++) {
        if(!stones[data[i]]) {
            stones[data[i]] = 1;
        } else {
            stones[data[i]]++;
        }
    }

    stones = blink(stones, 25);
    
    part1 = Object.values(stones).reduce((a,b)=>a+b);

    stones = blink(stones, 50);

    part2 = Object.values(stones).reduce((a,b)=>a+b);

    return {part1, part2};
}

module.exports = day11;

