const fs = require("fs");

const move_robots = (arr, size, seconds, check_for_unique_positions) => {
    const quadrant_scores = [0,0,0,0];
    for(let i = 0; i < arr.length; i++) {
        let posX = arr[i][0][0];
        let posY = arr[i][0][1];
        const vX = arr[i][1][0];
        const vY = arr[i][1][1];
        posX = (posX + seconds*vX) % size[0];
        posY = (posY + seconds*vY) % size[1];
        if(posX < 0) {
            posX = size[0] + posX;
        } 
        if(posY < 0) {
            posY = size[1] + posY;
        }
        arr[i][0][0] = posX;
        arr[i][0][1] = posY;

        if(posX < Math.floor(size[0]/2)) {
            if(posY < Math.floor(size[1]/2)) {
                quadrant_scores[0]++;
            } else if(posY >= Math.ceil(size[1]/2)) {
                quadrant_scores[1]++;
            }
        } else if(posX >= Math.ceil(size[0]/2)) {
            if(posY < Math.floor(size[1]/2)) {
                quadrant_scores[2]++;
            } else if(posY >= Math.ceil(size[1]/2)) {
                quadrant_scores[3]++;
            }
        }
    }

    let unique = true;
    if(check_for_unique_positions) {
        let positions = {};
        for(let i = 0; i < arr.length; i++) {
            if(positions[[arr[i][0][0], arr[i][0][1]]]) {
                unique = false;
                break;
            } else {
                positions[[arr[i][0][0], arr[i][0][1]]] = true;
            }
        }
    }

    return [quadrant_scores, unique];
} 

const day14 = () => {
    const data = fs.readFileSync("day14.txt", "utf8").trim().replaceAll("p=","").replaceAll("v=","").split("\n").map(x => x.split(" ").map(y => y.split(",").map(z => +z)));
    /*const data = 
`p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`.trim().replaceAll("p=","").replaceAll("v=","").split("\n").map(x => x.split(" ").map(y => y.split(",").map(z => +z)));
    */
    const size = [101, 103];
    //const size = [11,7];
    const seconds = 100;
    

    let part1 = move_robots(structuredClone(data), size, 100)[0].reduce((a,b)=>(a*b));
    let part2;
    for(let i = 0; i < 103*101; i++) {
        const [_, unique] = move_robots(data, size, 1, true);

        if(unique) {
            part2 = i+1;
            break;
        }
    }

    return {part1, part2};
}

module.exports = day14;
