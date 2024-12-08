const fs = require("fs");

const gcd = (a, b) => {
    if (!b) {
        return a;
    }
    
    return gcd(b, a % b);
}

const in_bounds = (position, size) => {
    return position[0] >= 0 && position[0] < size[0] && position[1] >= 0 && position[1] < size[1];
}

const day8 = () => {
    const data = fs.readFileSync("day8.txt", "utf8").trim().split("\n");
   /*const data = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`.trim().split("\n");*/


    let part1 = 0;
    let part2 = 0;

    const antennas = {};
    const antinodes_1 = {};
    const antinodes_2 = {};
    const map_size = [data.length, data[0].length];

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            if(data[i][j] !== ".") {
                if(!antennas[data[i][j]]) {
                    antennas[data[i][j]] = [];
                }
                antennas[data[i][j]].push([i,j]);
            }
        }
    }

    Object.keys(antennas).forEach(frequency => {
        for(let i = 0; i < antennas[frequency].length - 1; i++) {
            for(let j = i+1; j < antennas[frequency].length; j++) {
                const antenna_a = [...antennas[frequency][i]];
                const antenna_b = [...antennas[frequency][j]];
                const vect = [antenna_b[0]-antenna_a[0], antenna_b[1]-antenna_a[1]];

                const temp_antinodes = [[antenna_a[0]-vect[0], antenna_a[1]-vect[1]], [antenna_b[0]+vect[0], antenna_b[1]+vect[1]]];
                for(let k = 0; k < 2; k++) {
                    if(in_bounds(temp_antinodes[k], map_size)) {
                        antinodes_1[temp_antinodes[k]] = true;
                    }
                }

                const divisor = gcd(vect[0],vect[1]); //apparently GCD is not needed as it will be 1 for any vector in the task, oh well
                const min_vect = [vect[0]/divisor, vect[1]/divisor];
                
                while(in_bounds(antenna_a, map_size)) {
                    antinodes_2[antenna_a] = true;
                    antenna_a[0] -= min_vect[0];
                    antenna_a[1] -= min_vect[1];
                }
                while(in_bounds(antenna_b, map_size)) {
                    antinodes_2[antenna_b] = true;
                    antenna_b[0] += min_vect[0];
                    antenna_b[1] += min_vect[1];
                }
            }
        }
    });


    part1 = Object.keys(antinodes_1).length;
    part2 = Object.keys(antinodes_2).length;
    //more than 565
    return {part1, part2};
}

module.exports = day8;
