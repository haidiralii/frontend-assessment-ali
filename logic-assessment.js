function processUserData(users) {
    if (!Array.isArray(users) || users.length === 0) {
        return {};
    }

    const eligibleUsers = users.filter((user) => {
        return typeof user.age === 'number' && user.age >= 18;
    });

    const grouped = eligibleUsers.reduce((acc, user) => {
        const genderKey = user.gender || 'unspecified';

        if (!acc[genderKey]) {
            acc[genderKey] = {
                count: 0,
                totalAge: 0,
                users: []
            };
        }

        acc[genderKey].count += 1;
        acc[genderKey].totalAge += user.age;
        acc[genderKey].users.push(user);

        return acc;
    }, {});

    const result = {};

    for (const genderKey in grouped) {
        const group = grouped[genderKey];

        result[genderKey] = {
            count: group.count,
            averageAge: Number(
                (group.totalAge / group.count).toFixed(1)
            ),
            users: group.users
        };
    }

    return result;
}

function countCharacterFrequency(text) {
    const frequency = {};

    for (const char of text.toLowerCase()) {
        if (!/[a-z]/.test(char)) {
            continue;
        }

        frequency[char] = (frequency[char] || 0) + 1;
    }

    return frequency;
}

module.exports = { 
    processUserData,
    countCharacterFrequency
 };