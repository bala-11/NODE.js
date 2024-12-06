// List of numbers
const numbers = [12345674, 12345675, 12345679, 12345673];

// Target number
const target = 3456;

// Function to find the closest number
function findClosest(numbers, target) {
    return numbers.reduce((closest, current) => {
        return Math.abs(current - target) < Math.abs(closest - target) ? current : closest;
    });
}

// Find the closest number
const closestNumber = findClosest(numbers, target);

console.log(`The closest number to ${target} is ${closestNumber}`);



function findClosestInSortedArray(numbers, target) {
    let left = 0, right = numbers.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (numbers[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    const leftNum = numbers[left - 1] ?? Infinity;
    const rightNum = numbers[left] ?? Infinity;
    return Math.abs(leftNum - target) < Math.abs(rightNum - target) ? leftNum : rightNum;
}
