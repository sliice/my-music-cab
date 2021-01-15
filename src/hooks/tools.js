export const extractCode = search => {
    if (search){ 
        let code = btoa((search.split('='))[1]);       
        return code
    } 
    else return 'no code...';
}