const fs = require("fs");

const day6 = () => {
    const data = fs.readFileSync("day6.txt", "utf8").trim().split("\n");
    
    /*const data = 
`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.trim().split("\n");
*/
    let part1 = 0;
    let part2 = 0;

    const size = [data.length, data[0].length];

    const starting_pos = [];
    const starting_vect = [];
    let pos;
    let vect = [];
    let visited = {};
    let path = [];

    const directions = {
        ">": [0,1],
        "<": [0,-1],
        "v": [1,0],
        "^": [-1,0]
    };
    const rotations = {
        "0,1":[1,0],
        "1,0": [0,-1],
        "0,-1": [-1,0],
        "-1,0": [0,1]
    };

    for(let i = 0; i < data.length; i++) {
        pos = [i, Math.max(data[i].indexOf(">"), data[i].indexOf("<"), data[i].indexOf("^"), data[i].indexOf("v"))];
        if(pos[1] > -1) {
            vect = [...directions[data[i][pos[1]]]];
            break;
        }
    }

    starting_pos.push(...pos);
    starting_vect.push(...vect);

    while(pos[0] > 0 && pos[0] < size[0] && pos[1] > 0 && pos[1] < size[1]) {  
        if(!visited[pos]) {
            visited[pos] = vect;
        }

        const next_pos = [pos[0]+vect[0], pos[1]+vect[1]];
        if(data[next_pos[0]]?.[next_pos[1]] === "#") {
            path[[...pos,...rotations[vect]]] = [...pos,...vect];
            vect = rotations[vect];
            continue;
        } else {
            path[[...next_pos,...vect]] = [...pos,...vect];
        }

        pos = [pos[0]+vect[0], pos[1]+vect[1]];
    }

    part1 = Object.keys(visited).length;

    Object.keys(visited).forEach(coords => {
        coords = coords.split(",");
        if(coords[0] == starting_pos[0] && coords[1] == starting_pos[1]) {
            return;
        }

        const tpos = [...coords];
        const tvect = [...visited[coords]];
        pos = [path[[...tpos,...tvect]][0], path[[...tpos,...tvect]][1]];
        vect = [path[[...tpos,...tvect]][2], path[[...tpos,...tvect]][3]];
        //starts one step before reaching the new obstacle

        const visited_2 = {};
        while(pos[0] > 0 && pos[0] < size[0] && pos[1] > 0 && pos[1] < size[1]) {
            if(visited_2[[pos[0],pos[1],vect[0],vect[1]]]) {
                part2++;
                return;
            }

            visited_2[[pos[0],pos[1],vect[0],vect[1]]] = true;
            const next_pos = [pos[0]+vect[0], pos[1]+vect[1]];

            if(data[next_pos[0]]?.[next_pos[1]] === "#" || next_pos[0]==coords[0] && next_pos[1]==coords[1]) {
                vect = rotations[vect];
                continue;
            } 
    
            pos = [pos[0]+vect[0], pos[1]+vect[1]];
        }
    });

    return {part1, part2};
}

module.exports = day6;
