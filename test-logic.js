const { 
    countCharacterFrequency,
    processUserData
} = require('./logic-assessment')

// Test Task 1.1 
console.log("Test 1.1:");
console.log(countCharacterFrequency("Hello, World!"));

// Test Task 1.2  
const users = [
    { 
        id: 1, 
        name: "Ali", 
        age: 22, 
        gender: "male" 
    },
    { 
        id: 2, 
        name: "Budi", 
        age: 26, 
        gender: "male" 
    },
    { 
        id: 3, 
        name: "Nisa", 
        age: 30, 
        gender: "female" 
    },
    { 
        id: 4, 
        name: "Rifa", 
        age: 20, 
        gender: "female" 
    },
    { 
        id: 5, 
        name: "Andi", 
        age: 16, 
        gender: "male" 
    },
    { 
        id: 6, 
        name: "Dewi",
        age: 10,
        gender: "female"
    },
];

console.log("\nTest 1.2:");
console.log(processUserData(users));