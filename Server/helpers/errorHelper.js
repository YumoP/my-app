module.exports = {
    normalizeErrors: function(errors){
        let array = [];
        for(let item in errors){
            if(errors.hasOwnProperty(item)){
                array.push({title: item, detail:errors[item].message});
            }
        }
        return array;
    }
}