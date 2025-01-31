const students = [
    {name: 'Alice', score: 86},
    {name: 'James', score: 45},
    {name: 'Charlie' , score: 45},
];

//Map()
const studentsName = students.map(studentName => studentName.name);
console.log(studentsName)

const highestScoringStudent = students.reduce((highest, current) => {
    return (current.score > highest.score) ? current : highest;
});

const highestScore =students.reduce((highestScores, currentScore) => {
    if(currentScore.score > highestScores){
        console.log(currentScore)
    }else{
        console.log(highestScore)
    }
});
const array = [1, 2, 3, 4, 5, 6];
const newArray =  array.filter(num => num % 2 == 0);
console.log(newArray)
