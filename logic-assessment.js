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

module.exports = { countCharacterFrequency };