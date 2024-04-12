function getIsPlainObject(value) {
    return (
        value !== null &&
        typeof value === 'object' &&
        Object.getPrototypeOf(value) === Object.prototype
    );
}

function getIsTransformer(value) {
    return typeof value['@@transducer/init'] === 'function' &&
    typeof value['@@transducer/step'] === 'function' &&
    typeof value['@@transducer/result'] === 'function';
}

function getIsTransducer(value) {
    return getIsPlainObject(value.xf) && 
    (getIsTransformer(value.xf) || getIsTransducer(value.xf)) &&
    typeof value.f === 'function';
}

function map(mapper, functor) {
    if (arguments.length === 1) {
        return function (valueToMap) {
            return map(mapper, valueToMap)
        }
    }

    let mappedFunctor;

    if (functor === null || functor === undefined) {
        throw new TypeError();
    }
    if (
        Object.hasOwn(functor, "map") && 
        typeof functor.map === 'function' && 
        functor.map.length === 1
        ) {
            return functor.map(mapper);
    } 
    else if (getIsTransformer(functor) || getIsTransducer(functor)) {
        return {xf: functor, f: mapper};
    }
    else if (getIsPlainObject(functor)) {
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
    console.log("mappedFunctor", mappedFunctor)
    return mappedFunctor;
}

export default map;