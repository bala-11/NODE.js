function hashFnv1a(str) {
    const FNV_OFFSET_BASIS = 2166136261;
    const FNV_PRIME = 16777619;

    let hash = FNV_OFFSET_BASIS;

    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i); 
        hash *= FNV_PRIME;         
        hash >>>= 0;               
    }

    return hash.toString(16); 
}

// Example usage:
const hashedValue = hashFnv1a("Hello, World!");
console.log("Hashed Value:", hashedValue);