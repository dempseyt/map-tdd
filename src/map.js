function getIsPlainObject(value) {
    return (
        value !== null &&
        typeof value === 'object' &&
        Object.getPrototypeOf(value) === Object.prototype
    );
}

function map(mapper, functor) {
    let mappedFunctor;
    const isPlainObject = getIsPlainObject(functor);
    if (
        Object.hasOwn(functor, "map") && 
        typeof functor.map === 'function' && 
        functor.map.length === 1
        ) {
            return functor.map(mapper);
    }
    if (isPlainObject) {
        mappedFunctor = {};

        for (const [key, value] of Object.entries(functor)) {
            mappedFunctor[key] = mapper(value);
        }
    } 
    else if (Array.isArray(functor)) {
        mappedFunctor = [];

        for (let i = 0; i < functor.length; i++) {
            mappedFunctor[i] = mapper(functor[i]);
        }
    }  
    else if (typeof functor === 'function') {
        return function(value) {
            return mapper(functor(value));
        }
    }
    return mappedFunctor;
}

export default map;