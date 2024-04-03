function map(mapper, iterable) {
    const mapped = [];
    for (const item of iterable) {
        mapped.push(mapper(item))
    }
    return mapped;
}

export default map;