export const requiredRules = [v => {
    if(v === '' || v === null || v === undefined){
        return 'The field is required';
    }

    return true;
}];
export const selectValueRules = [v => !!v.value || 'Выберите значение'];
export const emailRules = [v => !!v || 'The field is required', v => /.+@.+\..+/.test(v) || 'Email must be valid'];


export const numberRuleOrNull = [v => {
    if(v === '' || v === null || v === undefined){
        return true;
    }
    return Number.isFinite(Number(v)) || 'The field  must be an integer';
}];

export const jsonRule = [v => {
    try {
        JSON.parse(v);
    } catch (e) {
        return 'The field  must be a valid JSON';
    }
    return true;
}];

export const jsonRuleOrNull = [v => {
    if(!v) return true;

    try {
        JSON.parse(v);
    } catch (e) {
        return 'The field  must be a valid JSON';
    }

    return true;
}];

