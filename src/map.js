function getIsPlainObject(value) {
    return (
        value !== null &&
        typeof value === 'object' &&
        Object.getPrototypeOf(value) === Object.prototype
    );
}

function map(func, functor) {
    let mappedFunctor;
    const isPlainObject = getIsPlainObject(functor);
    console.log(func)
    
    if (isPlainObject) {
        mappedFunctor = {};

        for (const [key, value] of Object.entries(functor)) {
            mappedFunctor[key] = func(value);
        }
    } 
    else if (Array.isArray(functor)) {
        mappedFunctor = [];

        for (let i = 0; i < functor.length; i++) {
            mappedFunctor[i] = func(functor[i]);
        }
    }  
    return mappedFunctor;
}

export default map;